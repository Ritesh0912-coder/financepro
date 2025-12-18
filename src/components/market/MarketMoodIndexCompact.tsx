'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

// Mock Data
const MMI_DATA = {
    value: 72.5,
    status: 'Greed',
};

export function MarketMoodIndexCompact() {
    const rotation = (MMI_DATA.value / 100) * 180 - 90;

    const getStatusColor = (status: string) => {
        if (status.includes('Fear')) return 'text-red-500';
        if (status.includes('Greed')) return 'text-green-500';
        return 'text-yellow-500';
    };

    return (
        <Link href="/market/mmi" className="block h-full">
            <Card className="bg-[#1a1f2e] border-slate-700/50 overflow-hidden relative h-full hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group cursor-pointer">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-bold text-white">Market Mood Index</CardTitle>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </div>
                </CardHeader>
                <CardContent className="flex items-center justify-center pb-4">
                    <div className="relative h-24 w-full flex items-end justify-center">
                        {/* Gauge Background */}
                        <div className="absolute bottom-0 w-48 h-24 bg-slate-800 rounded-t-full overflow-hidden">
                            <div className="w-full h-full relative">
                                <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-red-600 via-yellow-500 to-green-600 opacity-20" />
                            </div>
                        </div>

                        {/* Needle */}
                        <div
                            className="absolute bottom-0 left-1/2 w-1 h-20 bg-white origin-bottom rounded-full shadow-lg z-10 transition-transform duration-1000 ease-out"
                            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
                        >
                            <div className="w-3 h-3 bg-white rounded-full absolute bottom-[-6px] left-[-5px] shadow-lg" />
                        </div>

                        {/* Value */}
                        <div className="absolute bottom-4 text-2xl font-bold text-white z-20 drop-shadow-md">
                            {MMI_DATA.value}
                        </div>
                    </div>
                    <span className={`text-xs font-bold mt-2 ${getStatusColor(MMI_DATA.status)}`}>
                        {MMI_DATA.status}
                    </span>
                </CardContent>
            </Card>
        </Link>
    );
}
