const GROQ_API_KEY = process.env.GROQ_API_KEY;
const BASE_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function analyzeNewsWithGroq(text: string): Promise<{ summary: string; impact: 'Positive' | 'Negative' | 'Neutral' }> {
    if (!GROQ_API_KEY) {
        console.warn('Groq API Key is missing');
        // Fallback mock response
        return {
            summary: "AI Analysis unavailable (Missing API Key). However, standard market analysis suggests monitoring key support levels.",
            impact: "Neutral"
        };
    }

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama3-70b-8192", // Fast and capable model
                messages: [
                    {
                        role: "system",
                        content: "You are a senior financial analyst. Analyze the provided news text. Output a JSON object with two fields: 'summary' (a concise, professional 2-sentence summary for investors) and 'impact' (exactly one of 'Positive', 'Negative', 'Neutral'). Do not output markdown, just the JSON."
                    },
                    {
                        role: "user",
                        content: `Analyze this news: "${text.substring(0, 2000)}"` // Truncate to avoid context limits
                    }
                ],
                temperature: 0.1
            })
        });

        if (!response.ok) {
            console.error(`Groq API Error: ${response.status}`);
            throw new Error(`Groq API Error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content;

        try {
            const parsed = JSON.parse(content);
            return {
                summary: parsed.summary || "Unable to generate summary.",
                impact: ['Positive', 'Negative', 'Neutral'].includes(parsed.impact) ? parsed.impact : 'Neutral'
            };
        } catch (e) {
            console.warn('Failed to parse Groq JSON response, falling back to text', content);
            // Fallback content parsing if JSON fails (sometimes models chat instead of raw JSON)
            return {
                summary: content,
                impact: 'Neutral'
            };
        }

    } catch (error) {
        console.error('Error calling Groq:', error);
        return {
            summary: "AI analysis temporarily unavailable due to connectivity issues.",
            impact: "Neutral"
        };
    }
}
