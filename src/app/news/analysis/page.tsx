'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Zap, TrendingUp, TrendingDown, Minus, Share2 } from 'lucide-react';


function AnalysisContent() {
    const { status } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Checking authentication...</div>;
    }

    if (status === 'unauthenticated') {
        return null; // Will redirect via effect
    }

    const title = searchParams.get('title') || 'No Title';
    const description = searchParams.get('description') || '';
    const source = searchParams.get('source') || 'Unknown Source';
    const publishedAt = searchParams.get('publishedAt') || new Date().toISOString();
    const url = searchParams.get('url') || '#';
    const imageUrl = searchParams.get('imageUrl');

    // State for AI Analysis
    const [analysis, setAnalysis] = React.useState<{ summary: string; impact: string; loading: boolean }>({
        summary: 'Initializing AI models...',
        impact: 'Neutral',
        loading: true
    });

    React.useEffect(() => {
        async function runAnalysis() {
            const fullText = `${title} ${description}`;
            try {
                const res = await fetch('/api/ai/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: fullText })
                });
                const data = await res.json();

                if (data.success) {
                    setAnalysis({
                        summary: data.data.summary,
                        impact: data.data.impact,
                        loading: false
                    });
                } else {
                    setAnalysis(prev => ({ ...prev, summary: 'Analysis failed. Using standard indicators.', loading: false }));
                }
            } catch (e) {
                console.error(e);
                setAnalysis(prev => ({ ...prev, summary: 'Analysis service unavailable.', loading: false }));
            }
        }

        if (title !== 'No Title') {
            runAnalysis();
        }
    }, [title, description]);

    const getImpactBadge = (impact: string) => {
        switch (impact) {
            case 'Positive':
                return <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20"><TrendingUp className="h-4 w-4" /> Bullish Impact</div>;
            case 'Negative':
                return <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20"><TrendingDown className="h-4 w-4" /> Bearish Impact</div>;
            default:
                return <div className="flex items-center gap-2 text-slate-400 bg-slate-500/10 px-3 py-1 rounded-full border border-slate-500/20"><Minus className="h-4 w-4" /> Neutral Impact</div>;
        }
    };

    return (
        <div className="container mx-auto max-w-4xl p-6 space-y-8">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="hover:bg-slate-800 text-slate-400 -ml-4"
            >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
            </Button>

            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4 text-sm text-slate-500">
                            <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">{source}</Badge>
                            <span>{new Date(publishedAt).toLocaleString()}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 leading-tight">
                            {title}
                        </h1>
                    </div>

                    {imageUrl && (
                        <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-video">
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=800&auto=format&fit=crop';
                                }}
                            />
                        </div>
                    )}

                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-slate-300 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button className="flex-1 bg-white text-black hover:bg-slate-200" onClick={() => window.open(url, '_blank')}>
                            Read Full Article <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="bg-[#1a1f2e]/50 border-indigo-500/30 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-indigo-400">
                                <Zap className="h-5 w-5" /> AI Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 relative">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Market Sentiment</h4>
                                {analysis.loading ? <div className="text-slate-500 animate-pulse">Analyzing...</div> : getImpactBadge(analysis.impact)}
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Smart Summary</h4>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5 text-sm text-indigo-100 leading-relaxed font-mono relative">
                                    {analysis.loading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm rounded-xl">Processing...</div>}
                                    {analysis.summary}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Risk Level</h4>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${analysis.impact === 'Negative' ? 'bg-red-500 w-[75%]' : analysis.impact === 'Positive' ? 'bg-green-500 w-[25%]' : 'bg-yellow-500 w-[40%]'}`}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>Low</span>
                                    <span>High</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function AnalysisPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-500">Loading Analysis...</div>}>
            <AnalysisContent />
        </Suspense>
    );
}
