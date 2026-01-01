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


export async function fetchMMI() {
    try {
        const response = await fetch('https://api.tickertape.in/mmi/now', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Referer': 'https://www.tickertape.in/'
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (response.ok) {
            const data = await response.json();
            return data.data; // Tickertape returns { success: true, data: { ... } }
        }
        return null;
    } catch (error) {
        console.error('Error fetching MMI:', error);
        return null;
    }
}
