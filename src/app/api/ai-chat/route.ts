import { NextRequest, NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';
import { fetchFinanceNews } from '@/lib/news-api';
import { fetchMarketMood, fetchMarketData } from '@/lib/market-api';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "dummy_key", // Prevent instantiation crash, check key later
});

// Fallback/Base Snapshot
const baseIndices = [
    { symbol: 'NIFTY 50', price: 19432.40, change: 0.75 },
    { symbol: 'SENSEX', price: 64718.56, change: -0.13 },
];

export async function POST(req: NextRequest) {
    try {
        if (!process.env.GROQ_API_KEY) {
            console.error("Missing GROQ_API_KEY");
            return NextResponse.json({ reply: "I'm currently offline (Missing API Key). Please configure the system." });
            // Returning as a 'reply' so it shows up in chat instead of crashing
        }

        const body = await req.json();
        const { messages } = body;

        // 1. Gather Context (Resiliently)
        let context = "Real-time Market Context:\n";

        try {
            // Fetch Mood
            const mood = await fetchMarketMood();
            context += `Market Sentiment: ${mood.status} (Score: ${mood.value}/100). Recent trend: ${mood.change}%\n`;
        } catch (e) {
            console.error("Failed to fetch market mood", e);
            context += "Market Sentiment: Unavailable (Data Error)\n";
        }

        try {
            // Fetch SPY as a global proxy
            const spyData = await fetchMarketData('SPY');
            if (spyData) {
                context += `S&P 500 (SPY): ${spyData['05. price']} (${spyData['10. change percent']})\n`;
            }
        } catch (e) {
            console.error("Failed to fetch SPY data", e);
        }

        // Add base indices
        context += "Other Key Indices (Reference):\n";
        baseIndices.forEach(idx => {
            context += `${idx.symbol}: ${idx.price} (${idx.change > 0 ? '+' : ''}${idx.change}%)\n`;
        });

        try {
            // 2. Fetch News
            const newsData = await fetchFinanceNews(1, 4);
            if (newsData.articles.length > 0) {
                context += "\nLatest Top Headlines:\n";
                newsData.articles.forEach((art, i) => {
                    context += `${i + 1}. ${art.title} (- ${art.source})\n`;
                });
            }
        } catch (e) {
            console.error("Failed to fetch news", e);
            context += "\nLatest Headlines: Unavailable at the moment.\n";
        }

        // 3. System Prompt
        const systemPrompt = `You are an advanced AI Financial Voice Assistant for "Global Finance IN". 
        Your goal is to provide spoken-word friendly summaries of market conditions.
        
        Context:
        ${context}

        Guidelines:
        - Be concise. Spoken output should be snappy, not exhaustive lists.
        - If the user greets you, reply briefly and mention the current market mood.
        - Use the context to answer "How is the market?".
        - "Extreme Greed" means very bullish, "Fear" means bearish. Explain this simply.
        - If asked about news, pick the top 1-2 most important headlines.
        - You have broad general knowledge; use it to explain concepts (e.g., "What is a repo rate?").
        - Style: Professional, sharp, like a top financial analyst.
        `;

        // 4. Call Groq
        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages
            ],
            model: 'llama3-70b-8192',
            temperature: 0.7,
            max_tokens: 350,
        });

        const reply = completion.choices[0]?.message?.content || "I didn't catch that. Could you repeat?";

        return NextResponse.json({
            reply,
        });

    } catch (error) {
        console.error('AI Chat Error:', error);
        // Return a safe fallback reply so the UI doesn't hang
        return NextResponse.json({
            reply: "I'm encountering some technical difficulties right now. Please try again later."
        });
    }
}
