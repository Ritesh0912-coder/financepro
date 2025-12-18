import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Alert } from '@/models/Alert';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');
        const active = searchParams.get('active');

        const query: any = {};

        if (type) {
            query.type = type;
        }

        if (active === 'true') {
            query.isActive = true;
            query.$or = [
                { expiresAt: { $exists: false } },
                { expiresAt: { $gt: new Date() } }
            ];
        }

        const alerts = await Alert.find(query)
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: alerts,
        });
    } catch (error) {
        console.error('Alerts fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch alerts' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        const alert = await Alert.create(body);

        return NextResponse.json({
            success: true,
            data: alert,
        }, { status: 201 });
    } catch (error) {
        console.error('Alert create error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create alert' },
            { status: 500 }
        );
    }
}
