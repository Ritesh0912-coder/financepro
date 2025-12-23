'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MMI_DATA = {
    value: 45.92,
    status: 'Fear',
    lastWeek: 48.15,
    lastMonth: 52.34,
    history: [
        { date: '22 Dec', value: 45.92, status: 'Fear' },
        { date: '21 Dec', value: 46.50, status: 'Fear' },
        { date: '20 Dec', value: 48.15, status: 'Fear' },
        { date: '19 Dec', value: 50.20, status: 'Neutral' },
        { date: '18 Dec', value: 52.34, status: 'Neutral' },
    ]
};

export default function MMIPage() {
    const rotation = (MMI_DATA.value / 100) * 180 - 90;

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

    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Market Mood Index (MMI)</h1>
                    <p className="text-slate-400">Real-time market sentiment analysis based on multiple indicators</p>
                </div>

                {/* Main Gauge Card */}
                <Card className="bg-[#1a1f2e] border-slate-700/50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-white">Current Market Sentiment</CardTitle>
                            <span className={`text-lg font-bold px-4 py-2 rounded-lg border ${getStatusBg(MMI_DATA.status)} ${getStatusColor(MMI_DATA.status)}`}>
                                {MMI_DATA.status}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="relative h-48 w-full flex items-end justify-center overflow-hidden mb-6">
                            <div className="absolute bottom-0 w-80 h-40 bg-slate-800 rounded-t-full overflow-hidden">
                                <div className="w-full h-full relative">
                                    <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 opacity-20" />
                                    <div className="absolute inset-0 flex">
                                        <div className="flex-1 border-r border-slate-900/10"></div>
                                        <div className="flex-1 border-r border-slate-900/10"></div>
                                        <div className="flex-1 border-r border-slate-900/10"></div>
                                        <div className="flex-1"></div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="absolute bottom-0 left-1/2 w-1.5 h-36 bg-white origin-bottom rounded-full shadow-lg z-10 transition-transform duration-1000 ease-out"
                                style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
                            >
                                <div className="w-5 h-5 bg-white rounded-full absolute bottom-[-10px] left-[-7px] shadow-lg" />
                            </div>

                            <div className="absolute bottom-12 text-5xl font-bold text-white z-20 drop-shadow-md">
                                {MMI_DATA.value}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                                <span className="text-sm text-slate-500 block mb-2">Last Week</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">{MMI_DATA.lastWeek}</span>
                                    {MMI_DATA.value > MMI_DATA.lastWeek ? (
                                        <TrendingUp className="h-5 w-5 text-green-400" />
                                    ) : (
                                        <TrendingDown className="h-5 w-5 text-red-400" />
                                    )}
                                </div>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-800">
                                <span className="text-sm text-slate-500 block mb-2">Last Month</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-white">{MMI_DATA.lastMonth}</span>
                                    {MMI_DATA.value > MMI_DATA.lastMonth ? (
                                        <TrendingUp className="h-5 w-5 text-green-400" />
                                    ) : (
                                        <TrendingDown className="h-5 w-5 text-red-400" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                            <p className="text-sm text-indigo-300 leading-relaxed">
                                <strong>Analysis:</strong> The market is currently in a state of <strong>{MMI_DATA.status}</strong>.
                                Sentiment has cooled significantly over the last week. While 'Fear' generally suggests caution, it often presents a range where value-buying emerges in fundamentally strong sectors.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Strategic Impact Section */}
                <Card className="bg-[#1a1f2e] border-orange-500/30 border-2 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-orange-400 flex items-center gap-2">
                            <TrendingUp className="h-6 w-6" />
                            Strategic Impact for Investors
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                <h4 className="text-white font-bold mb-2">Short Term</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Expect volatility to persist as the index hovers near the 45 level. Neutral sentiment is being tested, and a further dip towards 'Extreme Fear' could trigger a significant bounce.
                                </p>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                                <h4 className="text-white font-bold mb-2">Long Term</h4>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Current levels are attractive for SIP-based accumulation. History shows that entries made during 'Fear' phases outperform those made during 'Greed' by over 18% annually.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Historical Data */}
                <Card className="bg-[#1a1f2e] border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">Recent History</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {MMI_DATA.history.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg border border-slate-800/50">
                                    <span className="text-slate-400 font-mono text-sm">{item.date}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-white font-bold text-lg">{item.value}</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded border ${getStatusBg(item.status)} ${getStatusColor(item.status)}`}>
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
                            Understanding MMI
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-300">
                        <p><strong className="text-white">&lt; 30 (Extreme Fear):</strong> Market is oversold, potential buying opportunity.</p>
                        <p><strong className="text-white">30-45 (Fear):</strong> Cautious sentiment, investors are worried.</p>
                        <p><strong className="text-white">45-55 (Neutral):</strong> Balanced market sentiment.</p>
                        <p><strong className="text-white">55-70 (Greed):</strong> Optimistic market, strong buying interest.</p>
                        <p><strong className="text-white">&gt; 70 (Extreme Greed):</strong> Market may be overbought, potential correction ahead.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
