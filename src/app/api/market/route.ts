import { NextResponse } from 'next/server';
import { fetchMarketMood } from '@/lib/market-api';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const mood = await fetchMarketMood();
        return NextResponse.json({ success: true, data: mood });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to fetch market mood' }, { status: 500 });
    }
}
