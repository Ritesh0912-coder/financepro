const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchMarketData(symbol: string = 'SPY') {
    if (!ALPHA_VANTAGE_API_KEY) {
        console.warn('Alpha Vantage API Key is missing');
        return null;
    }

    try {
        const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`, { next: { revalidate: 300 } });
        const data = await response.json();

        if (data['Global Quote']) {
            return data['Global Quote'];
        }
        return null;
    } catch (error) {
        console.error('Error fetching Market Data:', error);
        return null;
    }
}

export async function fetchMarketMood() {
    // Derive "Mood" from S&P 500 (SPY) performance
    const quote = await fetchMarketData('SPY');

    if (!quote) {
        // Fallback mock data if API fails (or rate limit hit)
        return {
            value: 50,
            status: 'Neutral',
            change: 0
        };
    }

    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
    const price = parseFloat(quote['05. price']);

    // Simple heuristic for "Mood" based on daily change
    // > 1% = Extreme Greed
    // > 0.5% = Greed
    // > -0.5% < 0.5% = Neutral
    // < -0.5% = Fear
    // < -1% = Extreme Fear

    let status = 'Neutral';
    let value = 50; // 0-100 scale

    if (changePercent > 1) {
        status = 'Extreme Greed';
        value = 85 + (changePercent - 1) * 10;
    } else if (changePercent > 0.2) {
        status = 'Greed';
        value = 60 + (changePercent - 0.2) * 20;
    } else if (changePercent < -1) {
        status = 'Extreme Fear';
        value = 15 + (changePercent + 1) * 10;
    } else if (changePercent < -0.2) {
        status = 'Fear';
        value = 40 + (changePercent + 0.2) * 20;
    }

    // Clamp value
    value = Math.max(0, Math.min(100, value));

    return {
        value: Math.round(value),
        status,
        change: changePercent
    };
}
