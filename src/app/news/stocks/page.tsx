'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import NewsFeedList from '@/components/news-feed-list';

export default function StocksNewsPage() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNews() {
            try {
                const res = await fetch('/api/news?search=stock%20market&limit=40');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();

                if (data.success) {
                    setNews(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setLoading(false);
            }
        }
        loadNews();
    }, []);

    return (
        <div className="min-h-screen bg-[#0f1218] pb-20">
            <div className="relative pt-32 pb-12 px-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                        <TrendingUp className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Stock Market News</h1>
                        <p className="text-slate-400">Latest updates on equities, gainers, losers, and corporate actions.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-slate-500 text-center py-20">Loading stocks news...</div>
                ) : (
                    <NewsFeedList news={news} />
                )}
            </div>
        </div>
    );
}
