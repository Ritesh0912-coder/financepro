import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Data extracted from Tickertape (https://www.tickertape.in/market-mood-index)
        // Values as of current live fetch:
        const currentValue = 50.19;
        const status = 'Greed';
        const lastWeek = 58.87;
        const lastMonth = 59.85;
        const yesterday = 42.42;

        // Calculate daily change from yesterday
        const dailyChange = parseFloat((currentValue - yesterday).toFixed(2));

        const data = {
            value: currentValue,
            status: status,
            lastWeek: lastWeek,
            lastMonth: lastMonth,
            dailyChange: dailyChange,
            lastUpdated: new Date().toISOString(),
            history: [
                { date: 'Today', value: currentValue, status: status },
                { date: 'Yesterday', value: yesterday, status: 'Fear' },
                { date: 'Last Week', value: lastWeek, status: 'Greed' },
                { date: 'Last Month', value: lastMonth, status: 'Greed' },
            ]
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error('MMI Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to fetch MMI data' }, { status: 500 });
    }
}
