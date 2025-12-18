'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock Data (in Crores)
const ACTIVITY_DATA = [
    { date: '15 Dec', fii: 1250.45, dii: -450.20 },
    { date: '14 Dec', fii: -890.10, dii: 1200.50 },
    { date: '13 Dec', fii: 560.30, dii: 300.10 },
    { date: '12 Dec', fii: -2100.00, dii: 1800.75 },
    { date: '11 Dec', fii: 450.00, dii: 120.00 },
];

export function FiiDiiActivity() {
    // Calculate total net for the period
    const totalFii = ACTIVITY_DATA.reduce((acc, curr) => acc + curr.fii, 0);
    const totalDii = ACTIVITY_DATA.reduce((acc, curr) => acc + curr.dii, 0);

    const formatCurrency = (val: number) => {
        const absVal = Math.abs(val);
        return `₹${absVal.toLocaleString('en-IN')} Cr`;
    };

    return (
        <Card className="bg-[#1a1f2e] border-slate-700/50 h-full">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        FII & DII Activity
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="h-4 w-4 text-slate-500 hover:text-slate-300 transition-colors" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-900 border-slate-700 text-slate-300 max-w-xs p-3">
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li><strong>FII:</strong> Foreign Institutional Investors</li>
                                        <li><strong>DII:</strong> Domestic Institutional Investors</li>
                                        <li>Data represents Net Buy (+) / Sell (-) in Crores.</li>
                                    </ul>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total FII Net</span>
                        <div className={`text-lg font-bold flex items-center gap-1 ${totalFii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {totalFii >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            {formatCurrency(totalFii)}
                        </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total DII Net</span>
                        <div className={`text-lg font-bold flex items-center gap-1 ${totalDii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {totalDii >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            {formatCurrency(totalDii)}
                        </div>
                    </div>
                </div>

                {/* Table/Rows */}
                <div className="space-y-3">
                    <div className="grid grid-cols-3 text-xs text-slate-500 font-semibold px-2">
                        <span>Date</span>
                        <span className="text-right">FII Net</span>
                        <span className="text-right">DII Net</span>
                    </div>
                    {ACTIVITY_DATA.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-3 text-sm py-2 px-2 rounded hover:bg-white/5 transition-colors border-b border-slate-800/50 last:border-0">
                            <span className="text-slate-300 font-mono">{item.date}</span>
                            <span className={`text-right font-mono ${item.fii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {item.fii >= 0 ? '+' : '-'}{Math.abs(item.fii)}
                            </span>
                            <span className={`text-right font-mono ${item.dii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {item.dii >= 0 ? '+' : '-'}{Math.abs(item.dii)}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800/50">
                    <p className="text-xs text-slate-400 grid grid-cols-[auto_1fr] gap-2 items-start">
                        <InfoIcon />
                        <span>
                            Institutional activity is a key indicator of market direction.
                            <strong> FIIs</strong> selling often leads to correction, while <strong>DIIs</strong> provide critical support.
                        </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

function InfoIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info h-3 w-3 mt-0.5 text-indigo-400"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
    )
}
