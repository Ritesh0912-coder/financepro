'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, TrendingUp, TrendingDown, Info } from 'lucide-react';

const ACTIVITY_DATA = [
    { date: '22 Dec', fii: -457.34, dii: 4058.22 },
    { date: '15 Dec', fii: 1250.45, dii: -450.20 },
    { date: '14 Dec', fii: -890.10, dii: 1200.50 },
    { date: '13 Dec', fii: 560.30, dii: 300.10 },
    { date: '12 Dec', fii: -2100.00, dii: 1800.75 },
    { date: '11 Dec', fii: 450.00, dii: 120.00 },
    { date: '10 Dec', fii: -320.50, dii: 890.25 },
];

export default function FiiDiiPage() {
    const totalFii = ACTIVITY_DATA.reduce((acc, curr) => acc + curr.fii, 0);
    const totalDii = ACTIVITY_DATA.reduce((acc, curr) => acc + curr.dii, 0);

    const formatCurrency = (val: number) => {
        const absVal = Math.abs(val);
        return `₹${absVal.toLocaleString('en-IN')} Cr`;
    };

    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">FII & DII Activity</h1>
                    <p className="text-slate-400">Institutional investor buying and selling activity in Indian markets</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-[#1a1f2e] border-slate-700/50">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-white">Total FII Net</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-4xl font-bold flex items-center gap-3 ${totalFii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {totalFii >= 0 ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
                                {formatCurrency(totalFii)}
                            </div>
                            <p className="text-sm text-slate-500 mt-2">Last 7 days</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-slate-700/50">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-white">Total DII Net</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-4xl font-bold flex items-center gap-3 ${totalDii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {totalDii >= 0 ? <TrendingUp className="h-8 w-8" /> : <TrendingDown className="h-8 w-8" />}
                                {formatCurrency(totalDii)}
                            </div>
                            <p className="text-sm text-slate-500 mt-2">Last 7 days</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Table */}
                <Card className="bg-[#1a1f2e] border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white">Daily Activity Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="grid grid-cols-3 text-xs text-slate-500 font-semibold px-4 py-2 bg-slate-900/50 rounded">
                                <span>Date</span>
                                <span className="text-right">FII Net (Cr)</span>
                                <span className="text-right">DII Net (Cr)</span>
                            </div>
                            {ACTIVITY_DATA.map((item, idx) => (
                                <div key={idx} className="grid grid-cols-3 text-sm py-3 px-4 rounded hover:bg-white/5 transition-colors border-b border-slate-800/50 last:border-0">
                                    <span className="text-slate-300 font-mono">{item.date}</span>
                                    <span className={`text-right font-mono font-bold ${item.fii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {item.fii >= 0 ? '+' : '-'}{Math.abs(item.fii).toLocaleString('en-IN')}
                                    </span>
                                    <span className={`text-right font-mono font-bold ${item.dii >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {item.dii >= 0 ? '+' : '-'}{Math.abs(item.dii).toLocaleString('en-IN')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Market Impact Analysis */}
                <Card className="bg-[#1a1f2e] border-indigo-500/30 border-2 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-indigo-400 flex items-center gap-2">
                            <TrendingUp className="h-6 w-6" />
                            Strategic Impact of Institutional Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 space-y-4">
                            <p className="text-slate-300 leading-relaxed">
                                <strong className="text-white text-lg block mb-2">Buy on DII Strength?</strong>
                                Currently, <strong>DIIs are aggressively supporting the market</strong> with a net buy of ₹4,058 Cr, completely absorbing the selling pressure from FIIs (₹457 Cr). This divergence suggests that domestic liquidity is exceptionally strong.
                            </p>
                            <div className="h-px bg-slate-800 w-full" />
                            <p className="text-sm text-indigo-300 leading-relaxed italic">
                                <strong>Key Strategy:</strong> When FII selling is low and DII buying is high, it indicates a "bottoming out" sentiment amongst domestic funds. Investors can look for entry points in large-cap stocks where DIIs are increasing their stakes.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="bg-[#1a1f2e] border-slate-700/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                            <Info className="h-5 w-5 text-indigo-400" />
                            Understanding FII & DII
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-slate-300">
                        <div>
                            <p className="font-bold text-white mb-1">FII (Foreign Institutional Investors):</p>
                            <p>Overseas entities investing in Indian markets. Their activity often indicates global sentiment towards India.</p>
                        </div>
                        <div>
                            <p className="font-bold text-white mb-1">DII (Domestic Institutional Investors):</p>
                            <p>Indian mutual funds, insurance companies, and banks. They often provide stability during FII outflows.</p>
                        </div>
                        <div className="pt-2 border-t border-slate-800">
                            <p className="text-indigo-300">
                                <strong>Key Insight:</strong> When FIIs sell heavily and DIIs buy, it shows domestic confidence.
                                Conversely, when both sell together, it may signal broader market concerns.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
