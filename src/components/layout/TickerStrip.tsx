'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TickerItem {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
}

const mockTickerData: TickerItem[] = [
    { symbol: 'NIFTY 50', price: 19432.40, change: 145.30, changePercent: 0.75 },
    { symbol: 'SENSEX', price: 64718.56, change: -87.20, changePercent: -0.13 },
    { symbol: 'NASDAQ', price: 14857.71, change: 234.50, changePercent: 1.60 },
    { symbol: 'S&P 500', price: 4594.63, change: 45.67, changePercent: 1.00 },
    { symbol: 'DOW', price: 35150.89, change: -120.34, changePercent: -0.34 },
    { symbol: 'BTC/USD', price: 43567.89, change: 1234.56, changePercent: 2.91 },
    { symbol: 'ETH/USD', price: 2345.67, change: -45.32, changePercent: -1.89 },
    { symbol: 'GOLD', price: 2048.50, change: 12.30, changePercent: 0.60 },
    { symbol: 'CRUDE', price: 78.45, change: -1.25, changePercent: -1.57 },
    { symbol: 'USD/INR', price: 83.12, change: 0.15, changePercent: 0.18 },
    { symbol: 'EUR/USD', price: 1.0867, change: 0.0023, changePercent: 0.21 },
];

export function TickerStrip() {
    const pathname = usePathname();

    if (pathname !== '/') {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-[#0f1218]/90 backdrop-blur-md border-t border-slate-800 overflow-hidden">
            <div className="relative flex">
                <motion.div
                    className="flex whitespace-nowrap py-2"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {[...mockTickerData, ...mockTickerData].map((item, index) => (
                        <div
                            key={index}
                            className="inline-flex items-center mx-6 space-x-2"
                        >
                            <span className="text-sm font-medium text-slate-300">
                                {item.symbol}
                            </span>
                            <span className="text-sm font-bold text-white">
                                {item.price.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                            <span
                                className={cn(
                                    'inline-flex items-center text-xs font-medium',
                                    item.change >= 0 ? 'text-green-400' : 'text-red-400'
                                )}
                            >
                                {item.change >= 0 ? (
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                ) : (
                                    <TrendingDown className="h-3 w-3 mr-1" />
                                )}
                                {item.change >= 0 ? '+' : ''}
                                {item.changePercent.toFixed(2)}%
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
