import React from 'react';
import { ArrowLeftRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock forex data
const forexData = [
    { symbol: 'USD/INR', name: 'US Dollar / Indian Rupee', price: 83.12, change: 0.15, changePercent: 0.18 },
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0867, change: 0.0023, changePercent: 0.21 },
    { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2654, change: -0.0034, changePercent: -0.27 },
    { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 145.67, change: 0.45, changePercent: 0.31 },
    { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: 0.6723, change: 0.0015, changePercent: 0.22 },
    { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.3456, change: -0.0028, changePercent: -0.21 },
    { symbol: 'EUR/GBP', name: 'Euro / British Pound', price: 0.8589, change: 0.0012, changePercent: 0.14 },
    { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.8734, change: -0.0018, changePercent: -0.21 },
    { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', price: 0.6123, change: 0.0045, changePercent: 0.74 },
    { symbol: 'USD/CNY', name: 'US Dollar / Chinese Yuan', price: 7.1567, change: -0.0123, changePercent: -0.17 },
];

export default function ForexPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                        <ArrowLeftRight className="h-8 w-8 text-indigo-400" />
                        Foreign Exchange
                    </h1>
                    <p className="text-slate-400">Live currency exchange rates and forex market data.</p>
                </div>

                <div className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#151925] border-b border-slate-700">
                                <tr>
                                    <th className="p-4 font-medium text-slate-400">Currency Pair</th>
                                    <th className="p-4 font-medium text-slate-400 text-right">Price</th>
                                    <th className="p-4 font-medium text-slate-400 text-right">Change</th>
                                    <th className="p-4 font-medium text-slate-400 text-right">% Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {forexData.map((item) => (
                                    <tr key={item.symbol} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white">{item.symbol}</div>
                                            <div className="text-xs text-slate-500">{item.name}</div>
                                        </td>
                                        <td className="p-4 text-right font-mono text-white">
                                            {item.price.toFixed(4)}
                                        </td>
                                        <td className={cn("p-4 text-right font-mono", item.change >= 0 ? "text-green-400" : "text-red-400")}>
                                            {item.change >= 0 ? "+" : ""}{item.change.toFixed(4)}
                                        </td>
                                        <td className={cn("p-4 text-right font-medium", item.change >= 0 ? "text-green-400" : "text-red-400")}>
                                            <div className="flex items-center justify-end gap-1">
                                                {item.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                                {item.changePercent.toFixed(2)}%
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
