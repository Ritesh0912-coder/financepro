'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, TrendingUp, TrendingDown, RefreshCw, LineChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MMIData {
    value: number;
    status: string;
    lastWeek: number;
    lastMonth: number;
    dailyChange: number;
    lastUpdated: string;
    history: Array<{ date: string, value: number, status: string }>;
}

export default function MMIPage() {
    const [data, setData] = useState<MMIData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/market/mmi');
            const json = await res.json();
            setData(json);
        } catch (error) {
            console.error('Failed to fetch MMI:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const rotation = data ? (data.value / 100) * 180 - 90 : -90;

    const getStatusColor = (status: string) => {
        if (status.includes('Fear')) return 'text-red-500';
        if (status.includes('Greed')) return 'text-green-500';
        return 'text-yellow-500';
    };

    const getStatusBg = (status: string) => {
        if (status.includes('Fear')) return 'bg-red-500/10 border-red-500/20';
        if (status.includes('Greed')) return 'bg-green-500/10 border-green-500/20';
        return 'bg-yellow-500/10 border-yellow-500/20';
    };

    if (loading && !data) {
        return (
            <div className="min-h-screen bg-[#0f1218] flex items-center justify-center">
                <RefreshCw className="w-12 h-12 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Market Mood Index (MMI)</h1>
                        <p className="text-slate-400">Real-time market sentiment analysis based on multiple indicators</p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="p-2 rounded-full hover:bg-white/5 transition-colors group"
                        title="Refresh data"
                    >
                        <RefreshCw className={cn("w-5 h-5 text-slate-400 group-hover:text-orange-500", loading && "animate-spin")} />
                    </button>
                </div>

                {/* Main Gauge Card */}
                <Card className="bg-[#1a1f2e] border-slate-700/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={data?.dailyChange}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className={cn("flex items-center gap-1 font-bold", data && data.dailyChange > 0 ? "text-green-500" : "text-red-500")}
                            >
                                {data && data.dailyChange > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                {data?.dailyChange && (data.dailyChange > 0 ? `+${data.dailyChange}` : data.dailyChange)}
                                <span className="text-[10px] uppercase ml-1 opacity-50">Today</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-white">Current Market Sentiment</CardTitle>
                            <span className={cn(`text-lg font-bold px-4 py-2 rounded-lg border transition-colors duration-500`, data && getStatusBg(data.status), data && getStatusColor(data.status))}>
                                {data?.status}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="relative h-48 w-full flex items-end justify-center overflow-hidden mb-6">
                            <div className="absolute bottom-0 w-80 h-40 bg-slate-900 rounded-t-full overflow-hidden border border-white/5">
                                <div className="w-full h-full relative">
                                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 opacity-20" />
                                    <div className="absolute inset-0 flex">
                                        <div className="flex-1 border-r border-slate-900/40"></div>
                                        <div className="flex-1 border-r border-slate-900/40"></div>
                                        <div className="flex-1 border-r border-slate-900/40"></div>
                                        <div className="flex-1"></div>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                className="absolute bottom-0 left-1/2 w-1.5 h-36 bg-orange-500 origin-bottom rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] z-10"
                                initial={{ rotate: -90 }}
                                animate={{ rotate: rotation }}
                                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                            >
                                <div className="w-5 h-5 bg-orange-500 rounded-full absolute bottom-[-10px] left-[-7px] shadow-lg border-4 border-[#1a1f2e]" />
                            </motion.div>

                            <div className="absolute bottom-12 text-5xl font-bold text-white z-20 drop-shadow-md">
                                {data?.value}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                                <span className="text-sm text-slate-500 block mb-2">Last Week</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">{data?.lastWeek}</span>
                                    {data && data.value > data.lastWeek ? (
                                        <TrendingUp className="h-5 w-5 text-green-400" />
                                    ) : (
                                        <TrendingDown className="h-5 w-5 text-red-400" />
                                    )}
                                </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                                <span className="text-sm text-slate-500 block mb-2">Last Month</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">{data?.lastMonth}</span>
                                    {data && data.value > data.lastMonth ? (
                                        <TrendingUp className="h-5 w-5 text-green-400" />
                                    ) : (
                                        <TrendingDown className="h-5 w-5 text-red-400" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                            <p className="text-sm text-orange-200 leading-relaxed">
                                <strong>Analysis:</strong> The market is currently in a state of <strong>{data?.status}</strong>.
                                Sentiment is currently {data && data.dailyChange > 0 ? "improving" : "declining"} based on institutional volume and retail behavior.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Strategic Impact Section */}
                <Card className="bg-[#1a1f2e] border-white/10 shadow-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-slate-200 flex items-center gap-2">
                            <LineChart className="h-6 w-6 text-orange-500" />
                            Strategic Impact for Investors
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors">
                                <h4 className="text-orange-400 font-bold mb-2 uppercase text-xs tracking-widest">Short Term</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Expect volatility to persist. History shows that entries made during &apos;Fear&apos; phases often yield strong tactical rebounds within 15-30 days.
                                </p>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5 hover:border-orange-500/30 transition-colors">
                                <h4 className="text-blue-400 font-bold mb-2 uppercase text-xs tracking-widest">Long Term</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Accumulation phase active. Current levels are qualitatively superior for retirement-focused portfolios compared to indices at absolute peaks.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Historical Data */}
                <Card className="bg-[#1a1f2e] border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">Recent Sentiment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {data?.history.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                                    <span className="text-slate-400 font-mono text-sm">{item.date}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-white font-bold text-lg">{item.value}</span>
                                        <span className={cn(`text-[10px] uppercase font-bold px-3 py-1 rounded border`, getStatusBg(item.status), getStatusColor(item.status))}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="bg-[#1a1f2e] border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                            <Info className="h-5 w-5 text-indigo-400" />
                            Guide to MMI Ranges
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2">
                            <p><strong className="text-red-500">&lt; 30 (Extreme Fear):</strong> Market oversold, buying opportunity.</p>
                            <p><strong className="text-red-300">30-45 (Fear):</strong> Caution persists, sector rotation active.</p>
                        </div>
                        <div className="space-y-2">
                            <p><strong className="text-blue-400">45-55 (Neutral):</strong> Balanced fundamentals vs sentiment.</p>
                            <p><strong className="text-green-500">&gt; 70 (Greed):</strong> Potential frothy conditions, trim profits.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

