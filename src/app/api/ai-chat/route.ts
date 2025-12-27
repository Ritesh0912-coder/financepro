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
        const systemPrompt = `You are "FGA" (Finance Global Assistant), an elite AI Financial Intelligence expert for "Global Finance IN". 
        
        Real-time Context Snapshot:
        ${context}

        Operational Guidelines:
        - Personality: Sharp, professional, visionary, yet accessible. 
        - Knowledge Scope: You have access to real-time global market trends. Use the provided context to anchor your answers.
        - Conversation: Be snappy and insightful. Don't just list facts—explain *why* they matter.
        - Branding: Always refer to yourself as "FGA".
        - Style: Minimalist excellence. Quality over quantity.
        `;

        // 4. Call OpenRouter
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
                max_tokens: 350,
            })
        });

        if (!aiResponse.ok) throw new Error(`AI API error: ${aiResponse.status}`);

        const data = await aiResponse.json();
        const reply = data.choices[0]?.message?.content || "I didn't catch that.";

        // 5. Save to MongoDB
        if (session) {
            try {
                await dbConnect();
                const userId = getUserId(session);
                if (userId) {
                    // Create Session if none exists
                    if (!sessionId) {
                        const newSession = await ChatSession.create({
                            userId,
                            title: lastUserMessage.content.substring(0, 30) + (lastUserMessage.content.length > 30 ? '...' : '')
                        });
                        sessionId = newSession._id;
                    } else {
                        // Update session timestamp
                        await ChatSession.findByIdAndUpdate(sessionId, { updatedAt: new Date() });
                    }

                    // Save Messages
                    await ChatMessage.create([
                        { userId, sessionId, role: 'user', content: lastUserMessage.content },
                        { userId, sessionId, role: 'assistant', content: reply }
                    ]);
                }
            } catch (dbErr) {
                console.error("DB Save Error:", dbErr);
            }
        }

        return NextResponse.json({ reply });

    } catch (error) {
        console.error('AI Chat Error:', error);
        return NextResponse.json({
            reply: "I'm encountering some technical difficulties. Please try again later."
        });
    }
}
