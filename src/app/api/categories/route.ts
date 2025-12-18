import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Category } from '@/models/Category';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();

        const categories = await Category.find({ isActive: true })
            .sort({ order: 1 })
            .lean();

        return NextResponse.json({
            success: true,
            data: categories,
        });
    } catch (error) {
        console.error('Categories fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        const category = await Category.create(body);

        return NextResponse.json({
            success: true,
            data: category,
        }, { status: 201 });
    } catch (error) {
        console.error('Category create error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create category' },
            { status: 500 }
        );
    }
}
