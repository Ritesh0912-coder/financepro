async function testMarketData() {
    console.log('Testing Tickertape MMI API...');
    try {
        const mmiResponse = await fetch('https://api.tickertape.in/mmi/now', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Referer': 'https://www.tickertape.in/'
            }
        });
        if (mmiResponse.ok) {
            const mmiData = await mmiResponse.json();
            console.log('MMI Data:', JSON.stringify(mmiData, null, 2));
        } else {
            console.log('MMI Fetch failed with status:', mmiResponse.status);
            const text = await mmiResponse.text();
            console.log('Response text:', text.substring(0, 200));
        }
    } catch (e) {
        console.error('MMI Fetch Error:', e);
    }

    console.log('\nTesting FII/DII data sources...');
    // NSE is hard, but some aggregators like screener or moneycontrol sometimes have public-ish JSON
    // Standard approach for many is to use a 3rd party API or scrapers. 
    // Let's try a known public endpoint if it exists or fallback to a slightly better mock/scraper simulation.
    try {
        // FII DII is usually on nseindia.com/api/fiidiiTradeDetails but requires specific headers/cookies from nseindia.com
        const fiiDiiUrl = 'https://www.nseindia.com/api/fiidiiTradeDetails';
        const response = await fetch(fiiDiiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log('FII/DII Data (NSE):', JSON.stringify(data, null, 2));
        } else {
            console.warn('NSE FII/DII Fetch failed (likely due to bot protection):', response.status);
        }
    } catch (e) {
        console.error('FII/DII Fetch Error:', e);
    }
}

testMarketData();
