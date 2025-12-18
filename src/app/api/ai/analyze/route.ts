import { NextRequest, NextResponse } from 'next/server';
import { analyzeNewsWithGroq } from '@/lib/groq-api';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { text } = body;

        if (!text) {
            return NextResponse.json({ success: false, error: 'No text provided' }, { status: 400 });
        }

        const analysis = await analyzeNewsWithGroq(text);

        return NextResponse.json({ success: true, data: analysis });
    } catch (error) {
        console.error('AI Analysis Error:', error);
        return NextResponse.json({ success: false, error: 'Analysis failed' }, { status: 500 });
    }
}
