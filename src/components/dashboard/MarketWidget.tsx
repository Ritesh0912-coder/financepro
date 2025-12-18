'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';

interface MarketWidgetProps {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    type?: 'index' | 'forex' | 'commodity' | 'crypto';
}

export function MarketWidget({
    symbol,
    name,
    price,
    change,
    changePercent,
    type = 'index',
}: MarketWidgetProps) {
    const isPositive = change >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="card-hover overflow-hidden">
                <div
                    className={cn(
                        'absolute inset-x-0 top-0 h-1',
                        isPositive ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'
                    )}
                />
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-slate-400">
                            {symbol}
                        </CardTitle>
                        <span
                            className={cn(
                                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                                isPositive
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-red-500/20 text-red-400'
                            )}
                        >
                            {isPositive ? (
                                <TrendingUp className="mr-1 h-3 w-3" />
                            ) : (
                                <TrendingDown className="mr-1 h-3 w-3" />
                            )}
                            {formatPercent(changePercent)}
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        <p className="text-2xl font-bold text-white">
                            {type === 'forex' ? price.toFixed(4) : formatCurrency(price)}
                        </p>
                        <p className="text-xs text-slate-500">{name}</p>
                        <p
                            className={cn(
                                'text-sm font-medium',
                                isPositive ? 'text-green-400' : 'text-red-400'
                            )}
                        >
                            {isPositive ? '+' : ''}
                            {change.toFixed(2)}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
