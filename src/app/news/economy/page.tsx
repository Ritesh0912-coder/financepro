'use client';

import React, { useEffect, useState } from 'react';
import { Landmark } from 'lucide-react';
import NewsFeedList from '@/components/news-feed-list';

export default function EconomyNewsPage() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNews() {
            try {
                const res = await fetch('/api/news?search=economy&limit=40');
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
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Landmark className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Global Economy</h1>
                        <p className="text-slate-400">Macroeconomic indicators, central bank policies, and global trends.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-slate-500 text-center py-20">Loading economy news...</div>
                ) : (
                    <NewsFeedList news={news} />
                )}
            </div>
        </div>
    );
}
