import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { GlobalIndicator } from '@/models/GlobalIndicator';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const indicatorType = searchParams.get('type');
        const country = searchParams.get('country');

        const query: any = {};

        if (indicatorType) {
            query.indicatorType = indicatorType;
        }

        if (country) {
            query.country = country;
        }

        const indicators = await GlobalIndicator.find(query)
            .sort({ country: 1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: indicators,
        });
    } catch (error) {
        console.error('Global indicators fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch global indicators' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        const indicator = await GlobalIndicator.findOneAndUpdate(
            { country: body.country, indicatorType: body.indicatorType },
            { ...body, lastUpdated: new Date() },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            data: indicator,
        });
    } catch (error) {
        console.error('Global indicator update error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update global indicator' },
            { status: 500 }
        );
    }
}
