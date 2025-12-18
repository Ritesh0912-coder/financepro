'use client';

import React, { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';
import { fetchFinanceNews } from '@/lib/news-api';
import NewsFeedList from '@/components/news-feed-list';
import { Hero } from '@/components/home/Hero';

// Since this is a client page (to match the dynamic nature effectively or we can keep it server), 
// let's make it a server component for SEO and initial load, usually standard in Next.js 13+.
// However, the user asked for "fetching" so server component is best.

// Wait, I will use a Server Component pattern similar to the homepage for consistency.

export default function NewsPage() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNews() {
            try {
                // Use the internal API route to protect API keys (which are server-side only)
                const res = await fetch('/api/news?page=1&limit=40');
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
            {/* pb-20 to account for bottom ticker */}

            <div className="relative pt-32 pb-12 px-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                        <Newspaper className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Global Financial News</h1>
                        <p className="text-slate-400">Comprehensive coverage of markets, economy, and business.</p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-slate-500 text-center py-20">Loading news feed...</div>
                ) : (
                    <NewsFeedList news={news} />
                )}
            </div>
        </div>
    );
}
