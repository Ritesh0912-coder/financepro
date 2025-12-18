import React from 'react';
import { TrendingUp, TrendingDown, Bitcoin, RefreshCw, Star, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock crypto data
const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43567.89, change: 1234.56, changePercent: 2.91, marketCap: 854.2, volume: 28.5, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', price: 2345.67, change: -45.32, changePercent: -1.89, marketCap: 281.4, volume: 15.2, icon: 'Ξ' },
    { symbol: 'BNB', name: 'BNB', price: 312.45, change: 8.67, changePercent: 2.85, marketCap: 47.8, volume: 1.2, icon: '◆' },
    { symbol: 'SOL', name: 'Solana', price: 98.45, change: 5.67, changePercent: 6.11, marketCap: 42.1, volume: 2.8, icon: '◎' },
    { symbol: 'XRP', name: 'XRP', price: 0.6234, change: 0.0234, changePercent: 3.90, marketCap: 33.8, volume: 1.5, icon: '✕' },
    { symbol: 'ADA', name: 'Cardano', price: 0.5823, change: -0.0123, changePercent: -2.07, marketCap: 20.4, volume: 0.4, icon: '₳' },
    { symbol: 'AVAX', name: 'Avalanche', price: 38.67, change: 2.34, changePercent: 6.44, marketCap: 14.2, volume: 0.8, icon: '▲' },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.0923, change: 0.0045, changePercent: 5.12, marketCap: 13.1, volume: 0.9, icon: 'Ð' },
    { symbol: 'DOT', name: 'Polkadot', price: 7.45, change: -0.23, changePercent: -2.99, marketCap: 9.8, volume: 0.3, icon: '●' },
    { symbol: 'MATIC', name: 'Polygon', price: 0.8934, change: 0.0456, changePercent: 5.38, marketCap: 8.3, volume: 0.5, icon: '⬡' },
];

const trendingCoins = [
    { symbol: 'PEPE', change: 45.67 },
    { symbol: 'BONK', change: 32.45 },
    { symbol: 'WIF', change: 28.90 },
    { symbol: 'JUP', change: 15.34 },
];

const fearGreedIndex = 72; // 0-100

function CryptoRow({ symbol, name, price, change, changePercent, marketCap, volume, icon }: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    marketCap: number;
    volume: number;
    icon: string;
}) {
    const isPositive = change >= 0;

    return (
        <div className="grid grid-cols-12 gap-4 items-center p-4 rounded-lg hover:bg-slate-800/50 transition-colors border-b border-slate-800 last:border-0">
            <div className="col-span-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center text-lg">
                    {icon}
                </div>
                <div>
                    <p className="font-medium text-white">{symbol}</p>
                    <p className="text-xs text-slate-500">{name}</p>
                </div>
            </div>
            <div className="col-span-2 text-right">
                <p className="font-mono font-medium text-white">
                    ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
            <div className="col-span-2 text-right">
                <span className={cn(
                    'inline-flex items-center gap-1 text-sm font-medium',
                    isPositive ? 'text-green-400' : 'text-red-400'
                )}>
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                </span>
            </div>
            <div className="col-span-2 text-right">
                <p className="text-sm text-slate-400">${marketCap}B</p>
            </div>
            <div className="col-span-2 text-right">
                <p className="text-sm text-slate-400">${volume}B</p>
            </div>
        </div>
    );
}

export default function CryptoPage() {
    return (
        <div className="min-h-screen py-8 px-4">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Bitcoin className="h-8 w-8 text-orange-400" />
                            <h1 className="text-3xl font-bold text-white">Cryptocurrency</h1>
                        </div>
                        <p className="text-slate-400">Live cryptocurrency prices and market data.</p>
                    </div>
                    <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-slate-400">Total Market Cap</p>
                            <p className="text-2xl font-bold text-white">$1.72T</p>
                            <p className="text-sm text-green-400">+2.34%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-slate-400">24h Volume</p>
                            <p className="text-2xl font-bold text-white">$78.5B</p>
                            <p className="text-sm text-green-400">+12.45%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-slate-400">BTC Dominance</p>
                            <p className="text-2xl font-bold text-white">52.4%</p>
                            <p className="text-sm text-red-400">-0.5%</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-sm text-slate-400">Active Cryptos</p>
                            <p className="text-2xl font-bold text-white">2,341</p>
                            <p className="text-sm text-slate-500">Tracked</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Top Cryptocurrencies</CardTitle>
                                    <div className="hidden md:grid grid-cols-12 gap-4 text-xs text-slate-500 flex-1 ml-8">
                                        <div className="col-span-4">Asset</div>
                                        <div className="col-span-2 text-right">Price</div>
                                        <div className="col-span-2 text-right">24h Change</div>
                                        <div className="col-span-2 text-right">Market Cap</div>
                                        <div className="col-span-2 text-right">Volume</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                {cryptoData.map((crypto) => (
                                    <CryptoRow key={crypto.symbol} {...crypto} />
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Fear & Greed Index */}
                        <Card className="border-orange-500/30">
                            <CardHeader>
                                <CardTitle className="text-lg">Fear & Greed Index</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="relative h-32 w-32 mx-auto mb-4">
                                        <svg className="transform -rotate-90" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="#334155"
                                                strokeWidth="10"
                                            />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="10"
                                                strokeDasharray={`${fearGreedIndex * 2.83} 283`}
                                                strokeLinecap="round"
                                            />
                                            <defs>
                                                <linearGradient id="gradient">
                                                    <stop offset="0%" stopColor="#ef4444" />
                                                    <stop offset="50%" stopColor="#eab308" />
                                                    <stop offset="100%" stopColor="#22c55e" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-3xl font-bold text-white">{fearGreedIndex}</span>
                                        </div>
                                    </div>
                                    <Badge variant="success" className="text-lg px-4 py-1">
                                        Greed
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Trending */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Star className="h-5 w-5 text-yellow-400" />
                                    Trending
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {trendingCoins.map((coin, index) => (
                                    <div key={coin.symbol} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-500 text-sm w-4">{index + 1}</span>
                                            <span className="font-medium text-white">{coin.symbol}</span>
                                        </div>
                                        <Badge variant="success">+{coin.change}%</Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Activity className="h-5 w-5 text-cyan-400" />
                                    Market Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Gainers</span>
                                    <span className="text-green-400 font-medium">1,234</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Losers</span>
                                    <span className="text-red-400 font-medium">892</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Unchanged</span>
                                    <span className="text-slate-400 font-medium">215</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
