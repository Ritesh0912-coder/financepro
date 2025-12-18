'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

// Mock Data (in Crores)
const ACTIVITY_DATA = [
    { date: '15 Dec', fii: 1250.45, dii: -450.20 },
    { date: '14 Dec', fii: -890.10, dii: 1200.50 },
    { date: '13 Dec', fii: 560.30, dii: 300.10 },
    { date: '12 Dec', fii: -2100.00, dii: 1800.75 },
    { date: '11 Dec', fii: 450.00, dii: 120.00 },
];

export function FiiDiiActivityCompact() {
    const totalFii = ACTIVITY_DATA.reduce((acc, curr) => acc + curr.fii, 0);
    const totalDii = ACTIVITY_DATA.reduce((acc, curr) => acc + curr.dii, 0);

    const formatCurrency = (val: number) => {
        const absVal = Math.abs(val);
        return `₹${absVal.toLocaleString('en-IN')} Cr`;
    };

    return (
        <Link href="/market/fii-dii" className="block h-full">
            <Card className="bg-[#1a1f2e] border-slate-700/50 h-full hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group cursor-pointer">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-bold text-white">FII & DII Activity</CardTitle>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">FII Net</span>
                            <div className={`text-sm font-bold flex items-center gap-1 ${totalFii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {totalFii >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                <span className="text-xs">{formatCurrency(totalFii)}</span>
                            </div>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">DII Net</span>
                            <div className={`text-sm font-bold flex items-center gap-1 ${totalDii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {totalDii >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                <span className="text-xs">{formatCurrency(totalDii)}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
