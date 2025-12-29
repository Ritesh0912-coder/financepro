const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export async function fetchMarketData(symbol: string = 'SPY') {
    if (!ALPHA_VANTAGE_API_KEY) {
        console.warn('Alpha Vantage API Key is missing');
        return null;
    }

    try {
        const response = await fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`, {
            next: { revalidate: 300 }
        });
        const data = await response.json();

        if (data['Global Quote']) {
            return data['Global Quote'];
        }

        if (data['Note']) {
            console.warn(`Alpha Vantage API Limit reached for ${symbol}`);
        }

        return null;
    } catch (error) {
        console.error(`Error fetching Market Data for ${symbol}:`, error);
        return null;
    }
}

export async function fetchMultipleMarketData(symbols: string[]) {
    // Fetch in parallel for efficiency
    const results = await Promise.all(symbols.map(s => fetchMarketData(s)));
    return results.filter(r => r !== null);
}


