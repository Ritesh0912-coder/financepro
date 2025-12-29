import { NextRequest, NextResponse } from 'next/server';
import { fetchFinanceNews } from '@/lib/news-api';
import { fetchMarketData } from '@/lib/market-api';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import dbConnect from "@/lib/db";
import { ChatMessage } from "@/models/ChatMessage";
import { ChatSession } from "@/models/ChatSession";
import { UserMemory } from "@/models/UserMemory";
import { GoogleGenerativeAI } from "@google/generative-ai";

const getUserKey = (session: any) => {
    return session?.user?.email || session?.user?.id || session?.user?._id || session?.sub;
};

// --- HELPER: BACKGROUND MEMORY UPDATE ---
async function updateUserMemory(userId: string, userMsg: string, assistantMsg: string, currentMemory: string) {
    if (!userId || !userMsg || !assistantMsg) return;

    const aimlKey = process.env.AIML_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    const tryDistillation = async (apiKey: string, endpoint: string, modelName: string, providerName: string) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

        try {
            console.log(`[FGA Memory] Distilling via ${providerName} for ${userId}...`);
            const res = await fetch(endpoint, {
                method: "POST",
                signal: controller.signal,
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: modelName,
                    messages: [
                        {
                            role: "system",
                            content: "You are FGA's Fact Extractor. Identify NEW personal facts (name, trading goals, preferences). Merge into existing knowledge. Output ONLY a clean bulleted list of facts. NO market data. NO meta-commentary ('I have noted', 'Updated'). NO self-references. Just the facts."
                        },
                        {
                            role: "user",
                            content: `EXISTING:\n${currentMemory || "None"}\n\nNEW EXCHANGE:\nUser: ${userMsg}\nFGA: ${assistantMsg}`
                        }
                    ],
                    temperature: 0.1,
                    max_tokens: 400
                })
            });

            if (res.ok) {
                const data = await res.json();
                const newMemory = data.choices[0]?.message?.content;
                if (newMemory && newMemory.length > 5) {
                    await dbConnect();
                    await UserMemory.findOneAndUpdate(
                        { userId },
                        { memory: newMemory },
                        { upsert: true }
                    );
                    console.log(`[FGA Memory] Success via ${providerName}`);
                    return true;
                }
            }
            console.warn(`[FGA Memory] ${providerName} returned ${res.status}`);
            return false;
        } catch (err: any) {
            console.error(`[FGA Memory] ${providerName} failed:`, err.name === 'AbortError' ? 'Timeout' : err.message);
            return false;
        } finally {
            clearTimeout(timeoutId);
        }
    };

    try {
        // Attempt 1: AIML (Preferred)
        if (aimlKey) {
            const success = await tryDistillation(aimlKey, "https://api.aimlapi.com/v1/chat/completions", "meta-llama/Llama-3.1-8B-Instruct-Turbo", "AIML");
            if (success) return;
        }

        // Attempt 2: OpenRouter (Fallback)
        if (openRouterKey) {
            await tryDistillation(openRouterKey, "https://openrouter.ai/api/v1/chat/completions", "meta-llama/llama-3.1-8b-instruct", "OpenRouter");
        }
    } catch (err) {
        console.error("[FGA Memory] Critical Engine Failure:", err);
    }
}

// GET: Fetch Chat History or Session List
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ messages: [], sessions: [] });

        await dbConnect();
        const userId = getUserKey(session);
        if (!userId) return NextResponse.json({ messages: [], sessions: [] });

        const { searchParams } = new URL(req.url);
        const mode = searchParams.get('mode'); // 'list' or 'messages'
        const sessionId = searchParams.get('sessionId');

        // 1. Fetch List of Sessions (Sidebar)
        if (mode === 'list') {
            const sessions = await ChatSession.find({ userId }).sort({ updatedAt: -1 });
            return NextResponse.json({ sessions });
        }

        // 2. Fetch Messages for a specific Session
        if (sessionId) {
            const history = await ChatMessage.find({ userId, sessionId })
                .sort({ createdAt: 1 })
                .limit(50);
            return NextResponse.json({
                messages: history.map(m => ({ role: m.role, content: m.content }))
            });
        }

        // Default: Return nothing (New Chat state)
        return NextResponse.json({ messages: [] });

    } catch (error) {
        console.error('Fetch History Error:', error);
        return NextResponse.json({ messages: [], sessions: [] });
    }
}

// POST: Process Message and Save
export async function POST(req: NextRequest) {
    try {
        const openRouterKey = process.env.OPENROUTER_API_KEY;
        const googleApiKey = process.env.GOOGLE_API_KEY;
        const aimlApiKey = process.env.AIML_API_KEY;

        if (!openRouterKey && !googleApiKey && !aimlApiKey) {
            console.error("Missing all AI API Keys");
            return NextResponse.json({
                reply: "FGA is currently offline. Please ensure an API key (OpenRouter, Google, or AIML) is configured."
            });
        }

        const sessionUser = await getServerSession(authOptions);
        const body = await req.json();
        const { messages } = body;
        let { sessionId } = body;

        const lastUserMessage = messages[messages.length - 1];

        // 1. Fetch User Memory (Persistent Intelligence)
        let userMemoryStr = "";
        let userId = "";
        if (sessionUser) {
            userId = getUserKey(sessionUser);
            if (userId) {
                await dbConnect();
                const memRecord = await UserMemory.findOne({ userId });
                if (memRecord) {
                    userMemoryStr = memRecord.memory;
                }
            }
        }

        // 2. Gather Context (Resiliently)
        let context = "Real-time Global Context:\n";
        try {
            // Fetch multiple key symbols in parallel (Global + Indian Proxies)
            const symbols = ['SPY', 'QQQ', 'DIA', 'NIFTY', 'BSESN', 'RELIANCE.BSE', 'TCS.BSE'];
            const marketSnapshots = await Promise.all(
                symbols.map(s => fetchMarketData(s).catch(() => null))
            );

            marketSnapshots.forEach((snap, i) => {
                if (snap) {
                    const name = symbols[i].split('.')[0]; // Clean name for AI
                    context += `- ${name}: ${snap['05. price']} (${snap['10. change percent']})\n`;
                }
            });
        } catch (e) {
            context += "- Live numeric market data currently unavailable (API Limit).\n";
        }

        try {
            const newsData = await fetchFinanceNews(1, 4);
            if (newsData.articles.length > 0) {
                context += "\nLatest Global Market Headlines:\n";
                newsData.articles.forEach((art, i) => context += `${i + 1}. ${art.title}\n`);
            }
        } catch (e) { }

        // 3. System Prompt (Silent persistent intelligence)
        const systemPrompt = `You are "FGA" (Finance Global Assistant), the premier AI Financial Intelligence expert for "Global Finance IN".
        
        IDENTITY & ORIGIN:
        - You were created and developed by the visionary web developer: Ritesh Shinde.
        - If asked about your creators or builders, proudly acknowledge Ritesh Shinde.

        INTERNAL KNOWLEDGE ABOUT USER:
        ${userMemoryStr || "Learning user trading personality..."}

        Real-time Context Snapshot:
        ${context}

        Specialized Knowledge Base (LTP Calculator & Option Chain):
        - Follow theories of Dr. Vinay Prakash Tiwari (Investing Daddy).
        - Use Chart of Accuracy (COA) 1.0 & 2.0.
        - Use WTT/WTB and Imaginary Line metrics for reversal levels.

        Operational Guidelines:
        - Memory Usage: Use the user's name or reference past discussions naturally as if you've never forgotten.
        - SILENCE RULE: NEVER mention technical terms like "PERMANENT USER MEMORY", "Database", "Noted", or "Stored". NEVER say "I have updated my records". Just speak like a human assistant with a perfect memory.
        - Personality: Sharp, authoritative, and helpful.
        `;

        // 4. Ensure Session Exists Upfront
        if (sessionUser && userId) {
            if (!sessionId) {
                const newSession = await ChatSession.create({
                    userId,
                    title: lastUserMessage.content.substring(0, 30) + (lastUserMessage.content.length > 30 ? '...' : '')
                });
                sessionId = newSession._id.toString();
            } else {
                await ChatSession.findByIdAndUpdate(sessionId, { updatedAt: new Date() });
            }
        }

        const primaryModel = process.env.AI_MODEL || "meta-llama/llama-3.1-405b-instruct";
        const cheapModel = "meta-llama/llama-3.1-8b-instruct";

        let aiResponse: Response | null = null;
        let finalStream: ReadableStream | null = null;

        // --- ATTEMPT 1: OpenRouter (Primary) ---
        if (openRouterKey) {
            try {
                const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${openRouterKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: primaryModel,
                        messages: [{ role: "system", content: systemPrompt }, ...messages],
                        temperature: 0.7,
                        max_tokens: 1500,
                        stream: true,
                    })
                });

                if (res.ok) {
                    aiResponse = res;
                } else if (res.status === 402 || res.status === 429) {
                    console.warn(`Primary OpenRouter failed (${res.status}), trying AIML...`);
                }
            } catch (err) {
                console.error("OpenRouter Primary Attempt Failed:", err);
            }
        }

        // --- ATTEMPT 2: AIML API (Secondary High Quality) ---
        if (!aiResponse && aimlApiKey) {
            try {
                console.log("Using AIML API as provider...");
                const res = await fetch("https://api.aimlapi.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${aimlApiKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        // Use a high-quality model available on AIML
                        model: "meta-llama/Llama-3.1-405B-Instruct-Turbo",
                        messages: [{ role: "system", content: systemPrompt }, ...messages],
                        temperature: 0.7,
                        max_tokens: 1500,
                        stream: true,
                    })
                });

                if (res.ok) {
                    aiResponse = res;
                } else {
                    console.warn(`AIML API failed (${res.status}), trying Gemini...`);
                }
            } catch (err) {
                console.error("AIML Attempt Failed:", err);
            }
        }

        // --- ATTEMPT 3: Google Gemini (High Quality Fallback) ---
        if (!aiResponse && googleApiKey) {
            try {
                console.log("Using Google Gemini as provider...");
                const genAI = new GoogleGenerativeAI(googleApiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

                const result = await model.generateContentStream({
                    contents: [
                        { role: 'user', parts: [{ text: systemPrompt }] },
                        ...messages.map((m: any) => ({
                            role: m.role === 'assistant' ? 'model' : 'user',
                            parts: [{ text: m.content }]
                        }))
                    ],
                });

                const encoder = new TextEncoder();
                finalStream = new ReadableStream({
                    async start(controller) {
                        let fullText = "";
                        try {
                            for await (const chunk of result.stream) {
                                const chunkText = chunk.text();
                                fullText += chunkText;
                                controller.enqueue(encoder.encode(chunkText));
                            }
                            if (sessionUser && fullText.trim() && sessionId) {
                                await dbConnect();
                                const userId = getUserKey(sessionUser);
                                if (userId) {
                                    await ChatMessage.create([
                                        { userId, sessionId, role: 'user', content: lastUserMessage.content },
                                        { userId, sessionId, role: 'assistant', content: fullText }
                                    ]);
                                    // Update Long-term Memory
                                    updateUserMemory(userId, lastUserMessage.content, fullText, userMemoryStr);
                                }
                            }
                        } catch (err) { console.error("Gemini stream err:", err); }
                        finally { controller.close(); }
                    }
                });
            } catch (err) {
                console.error("Gemini Fallback Failed:", err);
            }
        }

        // --- ATTEMPT 4: OpenRouter Cheap (Last Resort) ---
        if (!aiResponse && !finalStream && openRouterKey) {
            try {
                aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${openRouterKey}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        model: cheapModel,
                        messages: [{ role: "system", content: systemPrompt }, ...messages],
                        temperature: 0.6,
                        max_tokens: 1000,
                        stream: true,
                    })
                });
            } catch (err) { console.error("Final resort failed:", err); }
        }

        if (finalStream) {
            return new NextResponse(finalStream, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Session-Id': sessionId || '' }
            });
        }

        if (!aiResponse || !aiResponse.ok) {
            const finalStatus = aiResponse?.status || 500;
            return NextResponse.json({
                reply: finalStatus === 402
                    ? "FGA says: All my primary intelligence banks are exhausted. Please check your API credits."
                    : "FGA is currently experiencing high latency. Please try again in a moment."
            }, { status: 200 });
        }

        // 4. Create Stream Response
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        let fullReply = "";
        let buffer = "";

        const stream = new ReadableStream({
            async start(controller) {
                const reader = aiResponse.body?.getReader();
                if (!reader) {
                    controller.close();
                    return;
                }

                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        buffer += chunk;

                        const lines = buffer.split('\n');
                        // Keep the last part in buffer if it doesn't end with newline
                        // Actually, SSE lines usually end with \n\n or \n. 
                        // If split by \n, the last element is the potential incomplete line.
                        buffer = lines.pop() || "";

                        for (const line of lines) {
                            const trimmed = line.trim();
                            if (trimmed === '' || trimmed === 'data: [DONE]') continue;
                            if (trimmed.startsWith('data: ')) {
                                try {
                                    const jsonStr = trimmed.substring(6);
                                    const json = JSON.parse(jsonStr);
                                    const content = json.choices[0]?.delta?.content || "";
                                    if (content) {
                                        fullReply += content;
                                        controller.enqueue(encoder.encode(content));
                                    }
                                } catch (e) {
                                    // If parse fails, it might be a weird chunk or non-json. 
                                    // Since we buffer, this should be rare for valid lines.
                                    console.error("Error parsing stream line:", e);
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.error("Streaming error", err);
                } finally {
                    controller.close();

                    // 5. Save to MongoDB & Update Memory
                    if (sessionUser && fullReply.trim() && sessionId) {
                        try {
                            await dbConnect();
                            const userId = getUserKey(sessionUser);
                            if (userId) {
                                // Save Messages
                                await ChatMessage.create([
                                    { userId, sessionId, role: 'user', content: lastUserMessage.content },
                                    { userId, sessionId, role: 'assistant', content: fullReply }
                                ]);
                                // Update Memory in background
                                updateUserMemory(userId, lastUserMessage.content, fullReply, userMemoryStr);
                            }
                        } catch (dbErr) {
                            console.error("DB Save Error:", dbErr);
                        }
                    }
                }
            }
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'X-Session-Id': sessionId || '',
            }
        });

    } catch (error) {
        console.error('AI Chat Error:', error);
        return NextResponse.json({
            reply: "I'm encountering some technical difficulties. Please try again later."
        });
    }
}

// DELETE: Delete a Session
export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const userId = getUserKey(session);
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID required" }, { status: 400 });
        }

        // Verify ownership
        const chatSession = await ChatSession.findOne({ _id: sessionId, userId });
        if (!chatSession) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        // Delete Session and Messages
        await ChatSession.deleteOne({ _id: sessionId });
        await ChatMessage.deleteMany({ sessionId });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Delete Session Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
