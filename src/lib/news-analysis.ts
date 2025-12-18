export function analyzeMarketImpact(text: string): 'Positive' | 'Negative' | 'Neutral' {
    const lowerText = text.toLowerCase();
    const positiveKeywords = ['surge', 'rise', 'jump', 'gain', 'profit', 'growth', 'record', 'bull', 'up', 'high', 'beat', 'climb', 'rally', 'soar'];
    const negativeKeywords = ['crash', 'fall', 'drop', 'loss', 'down', 'bear', 'inflation', 'crisis', 'risk', 'warn', 'weak', 'low', 'plunge', 'slump'];

    let score = 0;
    positiveKeywords.forEach(word => { if (lowerText.includes(word)) score++; });
    negativeKeywords.forEach(word => { if (lowerText.includes(word)) score--; });

    if (score > 0) return 'Positive';
    if (score < 0) return 'Negative';
    return 'Neutral';
}

export function generateAISummary(text: string): string {
    // In a real app, this would call an LLM (e.g., OpenAI, Gemini).
    // For this demo, we simulate a concise, insights-driven summary.
    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML
    const truncated = cleanText.substring(0, 150);

    return `AI Insight: Market sentiment appears mixed based on initial indicators. Key drivers include "${truncated.split(' ').slice(0, 5).join(' ')}..." and broader sector trends. Investors should monitor volume and support levels closely.`;
}
