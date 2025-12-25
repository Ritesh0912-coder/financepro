
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface NewsItem {
    title: string;
    source: string;
    publishedAt: string | Date;
    sourceUrl?: string;
    imageUrl?: string;
    summary?: string;
    content?: string;
    marketImpact?: 'Positive' | 'Negative' | 'Neutral';
    aiSummary?: string;
}

import { motion } from 'framer-motion';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function NewsFeedList({ news }: { news: NewsItem[] }) {
    const { data: session } = useSession();
    const router = useRouter();

    if (!news || news.length === 0) return <div className="text-center text-slate-500">No news available.</div>;

    // Helper for Impact Badge
    const getImpactBadge = (impact?: string) => {
        switch (impact) {
            case 'Positive':
                return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Bullish</Badge>;
            case 'Negative':
                return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Bearish</Badge>;
            default:
                return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 flex items-center gap-1"><Minus className="h-3 w-3" /> Neutral</Badge>;
        }
    };

    const handleAuthAction = (e: React.MouseEvent, url: string, target?: string) => {
        e.preventDefault();
        if (!session) {
            router.push('/auth/login');
        } else {
            if (target === '_blank') {
                window.open(url, '_blank');
            } else {
                router.push(url);
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {news.map((item, idx) => (
                <motion.div
                    key={idx}
                    className="h-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                    <div className="h-full bg-[#1a1f2e] border border-slate-700/50 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-colors flex flex-col hover:shadow-2xl hover:shadow-orange-500/10 group">
                        {/* Image Section - Link to Source */}
                        {item.imageUrl && (
                            <Link
                                href={item.sourceUrl || '#'}
                                onClick={(e) => handleAuthAction(e, item.sourceUrl || '#', '_blank')}
                                className="h-48 w-full relative shrink-0 overflow-hidden block"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=800&auto=format&fit=crop';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] to-transparent opacity-60" />
                            </Link>
                        )}

                        {/* Content Section */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-xs">
                                    {item.source}
                                </Badge>
                                <span className="text-[10px] text-slate-500" suppressHydrationWarning>
                                    {new Date(item.publishedAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                                {getImpactBadge(item.marketImpact)}
                            </div>

                            {/* Title - Link to Source */}
                            <Link
                                href={item.sourceUrl || '#'}
                                onClick={(e) => handleAuthAction(e, item.sourceUrl || '#', '_blank')}
                                className="block mb-3"
                            >
                                <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-orange-400 transition-colors leading-snug">
                                    {item.title}
                                </h3>
                            </Link>

                            <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                                {item.summary || item.content}
                            </p>

                            <div className="mt-auto pt-4 border-t border-slate-800/50 flex items-center justify-between">
                                {/* Analysis Button - Link to Internal Page */}
                                <div
                                    onClick={(e) => {
                                        const url = `/news/analysis?title=${encodeURIComponent(item.title)}&description=${encodeURIComponent(item.summary || item.content || '')}&source=${encodeURIComponent(item.source)}&publishedAt=${encodeURIComponent(new Date(item.publishedAt).toISOString())}&url=${encodeURIComponent(item.sourceUrl || '')}&imageUrl=${encodeURIComponent(item.imageUrl || '')}`;
                                        handleAuthAction(e, url);
                                    }}
                                    className="cursor-pointer inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-2 rounded-lg border border-indigo-500/20"
                                >
                                    <Zap className="h-3 w-3" /> AI Analysis
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
