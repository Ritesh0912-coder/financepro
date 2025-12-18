import React from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Extracted data (mock)
const indicesData = [
    { symbol: 'NIFTY 50', name: 'NSE India', price: 19432.40, change: 145.30, changePercent: 0.75, country: '🇮🇳' },
    { symbol: 'SENSEX', name: 'BSE India', price: 64718.56, change: -87.20, changePercent: -0.13, country: '🇮🇳' },
    { symbol: 'NASDAQ', name: 'NASDAQ Composite', price: 14857.71, change: 234.50, changePercent: 1.60, country: '🇺🇸' },
    { symbol: 'S&P 500', name: 'S&P 500 Index', price: 4594.63, change: 45.67, changePercent: 1.00, country: '🇺🇸' },
    { symbol: 'DOW JONES', name: 'Dow Jones Industrial', price: 35150.89, change: -120.34, changePercent: -0.34, country: '🇺🇸' },
    { symbol: 'FTSE 100', name: 'Financial Times SE', price: 7489.32, change: 23.45, changePercent: 0.31, country: '🇬🇧' },
    { symbol: 'NIKKEI 225', name: 'Nikkei Stock Average', price: 33464.17, change: 456.78, changePercent: 1.38, country: '🇯🇵' },
    { symbol: 'HANG SENG', name: 'Hang Seng Index', price: 16589.44, change: -234.56, changePercent: -1.39, country: '🇭🇰' },
    { symbol: 'DAX', name: 'Deutsche Aktienindex', price: 16627.76, change: 89.12, changePercent: 0.54, country: '🇩🇪' },
    { symbol: 'CAC 40', name: 'CAC 40 Index', price: 7468.55, change: 34.67, changePercent: 0.47, country: '🇫🇷' },
    { symbol: 'SHANGHAI', name: 'Shanghai Composite', price: 3031.24, change: 12.45, changePercent: 0.41, country: '🇨🇳' },
    { symbol: 'KOSPI', name: 'Korea Composite', price: 2514.95, change: -18.67, changePercent: -0.74, country: '🇰🇷' },
];

function MarketRow({ symbol, name, price, change, changePercent, extra }: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    extra?: string;
}) {
    const isPositive = change >= 0;

    return (
        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-800/50 transition-colors border-b border-slate-800 last:border-0 bg-[#1a1f2e]">
            <div className="flex items-center gap-3">
                {extra && <span className="text-xl">{extra}</span>}
                <div>
                    <p className="font-medium text-white">{symbol}</p>
                    <p className="text-xs text-slate-500">{name}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-mono font-medium text-white">
                    {price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </p>
                <div className={cn(
                    'flex items-center gap-1 text-sm justify-end',
                    isPositive ? 'text-green-400' : 'text-red-400'
                )}>
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{isPositive ? '+' : ''}{changePercent.toFixed(2)}%</span>
                </div>
            </div>
        </div>
    );
}

export default function IndicesPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                            <BarChart3 className="h-8 w-8 text-cyan-400" />
                            Global Stock Indices
                        </h1>
                        <p className="text-slate-400">Track major market indices from around the world.</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {indicesData.map((item) => (
                        <div key={item.symbol} className="col-span-1">
                            {/* Reusing the simplified row as a card item for grid view */}
                            <div className="bg-[#1a1f2e] border border-slate-700/50 p-4 rounded-xl hover:border-cyan-500/50 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{item.country}</span>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{item.symbol}</h3>
                                            <p className="text-xs text-slate-400">{item.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-2xl font-mono font-bold text-white">
                                        {item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className={cn(
                                        'flex items-center gap-1 font-medium',
                                        item.change >= 0 ? 'text-green-400' : 'text-red-400'
                                    )}>
                                        {item.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                        {item.changePercent.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
