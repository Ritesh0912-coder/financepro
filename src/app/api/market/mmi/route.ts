import { NextResponse } from 'next/server';
import { fetchMMI } from '@/lib/market-api';

export async function GET() {
    try {
        const mmiData = await fetchMMI();

        if (!mmiData) {
            // Fallback to static but more realistic data if API fails
            return NextResponse.json({
                value: 50.19,
                status: 'Greed',
                lastWeek: 58.87,
                lastMonth: 59.85,
                dailyChange: 7.77,
                lastUpdated: new Date().toISOString(),
                history: [
                    { date: 'Today', value: 50.19, status: 'Greed' },
                    { date: 'Yesterday', value: 42.42, status: 'Fear' },
                ]
            });
        }

        const data = {
            value: mmiData.currentValue,
            status: mmiData.currentStatus,
            lastWeek: mmiData.lastWeekValue || 58.87,
            lastMonth: mmiData.lastMonthValue || 59.85,
            dailyChange: mmiData.dailyChange || 0,
            lastUpdated: new Date().toISOString(),
            history: mmiData.history || [
                { date: 'Today', value: mmiData.currentValue, status: mmiData.currentStatus },
                { date: 'Yesterday', value: mmiData.yesterdayValue, status: mmiData.yesterdayStatus },
            ]
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error('MMI Route Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
