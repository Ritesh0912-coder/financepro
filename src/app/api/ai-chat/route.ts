import { NextRequest, NextResponse } from 'next/server';
import { fetchFinanceNews } from '@/lib/news-api';
import { fetchMarketData } from '@/lib/market-api';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import dbConnect from "@/lib/db";
import { ChatMessage } from "@/models/ChatMessage";
import { ChatSession } from "@/models/ChatSession";

// Case-insensitive check for user id in session
const getUserId = (session: any) => {
    return session?.user?.id || session?.user?._id || session?.sub;
};

// GET: Fetch Chat History or Session List
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ messages: [], sessions: [] });

        await dbConnect();
        const userId = getUserId(session);
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
        const apiKey = process.env.OPENROUTER_API_KEY || process.env.META_API_KEY || process.env.META_MODEL_API_KEY;

        if (!apiKey) {
            console.error("Missing AI API Key (OpenRouter or Meta)");
            return NextResponse.json({
                reply: "I'm currently offline (Missing API Key). Please ensure OPENROUTER_API_KEY or META_API_KEY is configured."
            });
        }

        const session = await getServerSession(authOptions);
        const body = await req.json();
        const { messages } = body;
        let { sessionId } = body;

        const lastUserMessage = messages[messages.length - 1];

        // 1. Gather Context (Resiliently)
        let context = "Real-time Market Context:\n";

        // Base Indices Snapshot
        context += "Major Global Indices (Reference):\n";
        context += "- NIFTY 50: 19432.40 (+0.75%)\n";
        context += "- SENSEX: 64718.56 (-0.13%)\n";

        try {
            const spyData = await fetchMarketData('SPY');
            if (spyData) context += `- S&P 500 (SPY): ${spyData['05. price']} (${spyData['10. change percent']})\n`;
        } catch (e) { }

        try {
            const newsData = await fetchFinanceNews(1, 4);
            if (newsData.articles.length > 0) {
                context += "\nLatest Global Market Headlines:\n";
                newsData.articles.forEach((art, i) => context += `${i + 1}. ${art.title}\n`);
            }
        } catch (e) { }

        // 3. System Prompt
        const systemPrompt = `You are "FGA" (Finance Global Assistant), the premier AI Financial Intelligence expert for "Global Finance IN". You possess deep, specialized knowledge of the "LTP Calculator" (Last Traded Price) methodology and advanced Global Macro-economics.
        
        Real-time Context Snapshot:
        ${context}

        Specialized Knowledge Base (LTP Calculator & Option Chain):
        - Core Authority: You strictly follow the theories of Dr. Vinay Prakash Tiwari (Investing Daddy).
        - Chart of Accuracy (COA): Analyze potential trade setups based on COA 1.0 (Reversal Trading) & 2.0 (Trend Trading).
        - 6 Kinds of Reversals: Know them: Support/Resistance Reversal, Extension of Support (EOS), Extension of Resistance (EOR), Diversion, and End of Diversion.
        - WTT / WTB (Crucial Direction Indicators):
            - WTT (Weak Towards Top): Support/Resistance is shifting UPWARDS. Bullish pressure.
            - WTB (Weak Towards Bottom): Support/Resistance is shifting DOWNWARDS. Bearish pressure.
            - Rule: "Yellow Box" indicates 75%+ volume/OI strength at a new strike.
        - Game of Percentage:
            - If WTT % is increasing -> Bullish.
            - If WTB % is increasing -> Bearish.
            - If WTT/WTB % decreases or Yellow Box vanishes -> Reversal is likely failing (Pressure releasing).
        - 3 Magical Lines:
            1. Current EOS/EOR value.
            2. The "Imaginary Line" volume node.
            3. The Diversion level (EOS+1 or EOR-1).
        - Imaginary Line: The dynamic battleground between highest Call/Put Volume & OI.
        - Reversal Price Theory: Market reverses from calculated Greek-based levels, not random visuals.

        Operational Guidelines:
        - Personality: Sharp, visionary, and authoritative yet accessible. You are a "Market Wizard".
        - "Quick Answer" Protocol: For direct questions (e.g., "Nifty Trend?", "Resistance level?"), provide the answer IMMEDIATELY in the first sentence. Use "TL;DR" style if the answer is long.
        - Global Perspective: Connect Indian market moves (Nifty/Bank Nifty) to global cues (US Markets, Bond Yields, Crude Oil).
        - Knowledge Usage: When asked about trends or levels, explicitly reference "LTP Calculator theories" or "Global Macro correlations" if valid.
        - Branding: Always refer to yourself as "FGA".
        - Style: Concise, data-driven, and actionable. Avoid filler.
        `;

        // 4. Ensure Session Exists Upfront (for X-Session-Id header)
        const sessionUser = await getServerSession(authOptions);
        if (sessionUser) {
            await dbConnect();
            const userId = getUserId(sessionUser);
            if (userId) {
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
        }

        // 5. Call OpenRouter with Streaming
        const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.1-405b-instruct",
                messages: [{ role: "system", content: systemPrompt }, ...messages],
                temperature: 0.7,
                max_tokens: 1000,
                stream: true,
            })
        });

        if (!aiResponse.ok) {
            const errorStatus = aiResponse.status;
            if (errorStatus === 402) {
                return NextResponse.json({
                    reply: "FGA says: Elite intelligence requires fuel. My OpenRouter credits have run low. Please top up your API balance to continue."
                }, { status: 200 }); // Return as 200 so the UI can show the message
            }
            if (errorStatus === 429) {
                return NextResponse.json({
                    reply: "FGA says: The server is currently overwhelmed by market volume (Rate Limit). Please wait a few seconds and try again."
                }, { status: 200 });
            }
            throw new Error(`AI API error: ${errorStatus}`);
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

                    // 5. Save to MongoDB (After stream completes)
                    if (session && fullReply.trim() && sessionId) {
                        try {
                            await dbConnect();
                            const userId = getUserId(session);
                            if (userId) {
                                // Save Messages
                                await ChatMessage.create([
                                    { userId, sessionId, role: 'user', content: lastUserMessage.content },
                                    { userId, sessionId, role: 'assistant', content: fullReply }
                                ]);
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
        const userId = getUserId(session);
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
