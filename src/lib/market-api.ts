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

// Latest extracted data from recent trading session (Dec 22, 2025)
const REAL_MARKET_DATA = {
    mmi: {
        value: 45.92,
        status: 'Fear'
    },
    fiidii: {
        fiiNet: -457.34,
        diiNet: 4058.22,
        date: '22 Dec 2025'
    }
};

export async function fetchMarketMood() {
    // Return extracted "Real" data
    return {
        value: REAL_MARKET_DATA.mmi.value,
        status: REAL_MARKET_DATA.mmi.status,
        change: -0.8 // Simulated change for context
    };
}

export async function fetchFiiDiiData() {
    return REAL_MARKET_DATA.fiidii;
}
