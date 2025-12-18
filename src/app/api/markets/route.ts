import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { MarketData } from '@/models/MarketData';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');

        const query: any = { isActive: true };

        if (type && type !== 'all') {
            query.type = type;
        }

        const marketData = await MarketData.find(query)
            .sort({ symbol: 1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: marketData,
        });
    } catch (error) {
        console.error('Market data fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch market data' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        const marketData = await MarketData.findOneAndUpdate(
            { symbol: body.symbol },
            { ...body, lastUpdated: new Date() },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            data: marketData,
        });
    } catch (error) {
        console.error('Market data update error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update market data' },
            { status: 500 }
        );
    }
}
