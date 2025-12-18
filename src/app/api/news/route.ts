import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { News } from '@/models/News';
import { fetchFinanceNews } from '@/lib/news-api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const search = searchParams.get('search');

        let newsData = { articles: [], total: 0 };

        // Fetch from external API
        const externalData = await fetchFinanceNews(page, limit, search || '');

        return NextResponse.json({
            success: true,
            data: externalData.articles,
            pagination: {
                page,
                limit,
                total: externalData.total,
                pages: Math.ceil(externalData.total / limit),
            },
        });
    } catch (error) {
        console.error('News fetch error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        const news = await News.create(body);

        return NextResponse.json({
            success: true,
            data: news,
        }, { status: 201 });
    } catch (error) {
        console.error('News create error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create news' },
            { status: 500 }
        );
    }
}
