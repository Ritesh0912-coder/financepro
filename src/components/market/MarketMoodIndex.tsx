'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const [mmiData, setMmiData] = React.useState({
    value: 50,
    status: 'Neutral',
    change: 0
});

React.useEffect(() => {
    async function fetchMood() {
        try {
            const res = await fetch('/api/market');
            const data = await res.json();
            if (data.success) {
                setMmiData(data.data);
            }
        } catch (e) {
            console.error(e);
        }
    }
    fetchMood();
}, []);

// Mock historical data for display (since we only fetch current snapshot)
const historical = {
    lastWeek: 65.2,
    lastMonth: 45.8,
};

export function MarketMoodIndex() {
    // Calculate rotation for gauge needle (-90deg to 90deg)
    // 0 = -90deg, 100 = 90deg
    const rotation = (mmiData.value / 100) * 180 - 90;

    const getStatusColor = (status: string) => {
        if (status.includes('Fear')) return 'text-red-500';
        if (status.includes('Greed')) return 'text-green-500';
        return 'text-yellow-500';
    };

    return (
        <Card className="bg-[#1a1f2e] border-slate-700/50 overflow-hidden relative">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        Market Mood Index (MMI)
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Info className="h-4 w-4 text-slate-500 hover:text-slate-300 transition-colors" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-900 border-slate-700 text-slate-300 max-w-xs p-3">
                                    <p>MMI measures market sentiment based on S&P 500 daily trend. <br />
                                        <strong>&lt; 30 (Fear):</strong> Oversold, potential buy.<br />
                                        <strong>&gt; 70 (Greed):</strong> Overbought, potential correction.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                    <span className={`text-sm font-bold bg-slate-900/50 px-2 py-1 rounded border border-slate-800 ${getStatusColor(mmiData.status)}`}>
                        {mmiData.status}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative h-32 w-full flex items-end justify-center overflow-hidden mb-4">
                    {/* Gauge Background */}
                    <div className="absolute bottom-0 w-64 h-32 bg-slate-800 rounded-t-full overflow-hidden">
                        <div className="w-full h-full relative">
                            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 opacity-20" />
                            {/* Sections */}
                            <div className="absolute inset-0 flex">
                                <div className="flex-1 border-r border-slate-900/10"></div>
                                <div className="flex-1 border-r border-slate-900/10"></div>
                                <div className="flex-1 border-r border-slate-900/10"></div>
                                <div className="flex-1"></div>
                            </div>
                        </div>
                    </div>

                    {/* Needle */}
                    <div
                        className="absolute bottom-0 left-1/2 w-1 h-28 bg-white origin-bottom rounded-full shadow-lg z-10 transition-transform duration-1000 ease-out"
                        style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
                    >
                        <div className="w-4 h-4 bg-white rounded-full absolute bottom-[-8px] left-[-6px] shadow-lg" />
                    </div>

                    {/* Value */}
                    <div className="absolute bottom-8 text-3xl font-bold text-white z-20 drop-shadow-md">
                        {mmiData.value}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 mt-4 border-t border-slate-800/50 pt-4">
                    <div>
                        <span className="block mb-1">Last Week</span>
                        <span className="text-white font-mono">{historical.lastWeek}</span>
                    </div>
                    <div className="text-right">
                        <span className="block mb-1">Last Month</span>
                        <span className="text-white font-mono">{historical.lastMonth}</span>
                    </div>
                </div>

                <div className="mt-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3">
                    <p className="text-xs text-indigo-300 leading-relaxed">
                        <strong>Analysis:</strong> The market is currently in a state of <strong>{mmiData.status}</strong>. Investors are reacting to a daily change of {mmiData.change}%.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
