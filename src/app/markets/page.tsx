import React from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock market data
const globalIndices = [
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
];

const commodities = [
    { symbol: 'GOLD', name: 'Gold Spot', price: 2048.50, change: 12.30, changePercent: 0.60, unit: '/oz' },
    { symbol: 'SILVER', name: 'Silver Spot', price: 24.56, change: -0.23, changePercent: -0.93, unit: '/oz' },
    { symbol: 'CRUDE OIL', name: 'WTI Crude', price: 78.45, change: -1.25, changePercent: -1.57, unit: '/bbl' },
    { symbol: 'BRENT', name: 'Brent Crude', price: 82.34, change: -0.98, changePercent: -1.18, unit: '/bbl' },
    { symbol: 'NATURAL GAS', name: 'Natural Gas', price: 2.89, change: 0.12, changePercent: 4.33, unit: '/MMBtu' },
    { symbol: 'COPPER', name: 'Copper', price: 3.89, change: 0.05, changePercent: 1.30, unit: '/lb' },
];

const forex = [
    { symbol: 'USD/INR', name: 'US Dollar / Indian Rupee', price: 83.12, change: 0.15, changePercent: 0.18 },
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0867, change: 0.0023, changePercent: 0.21 },
    { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2654, change: -0.0034, changePercent: -0.27 },
    { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 145.67, change: 0.45, changePercent: 0.31 },
    { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: 0.6723, change: 0.0015, changePercent: 0.22 },
    { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.3456, change: -0.0028, changePercent: -0.21 },
    { symbol: 'EUR/GBP', name: 'Euro / British Pound', price: 0.8589, change: 0.0012, changePercent: 0.14 },
    { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.8734, change: -0.0018, changePercent: -0.21 },
];

const gainersLosers = {
    gainers: [
        { symbol: 'TATAMOTORS', change: 5.67 },
        { symbol: 'ADANIPORTS', change: 4.23 },
        { symbol: 'RELIANCE', change: 3.89 },
        { symbol: 'INFY', change: 3.45 },
        { symbol: 'TCS', change: 2.98 },
    ],
    losers: [
        { symbol: 'HINDUNILVR', change: -3.45 },
        { symbol: 'ITC', change: -2.89 },
        { symbol: 'NESTLEIND', change: -2.34 },
        { symbol: 'BAJFINANCE', change: -1.98 },
        { symbol: 'HDFCBANK', change: -1.67 },
    ],
};

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
        <div className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-800/50 transition-colors border-b border-slate-800 last:border-0">
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

export default function MarketsPage() {
    return (
        <div className="min-h-screen py-8 px-4">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-8 w-8 text-cyan-400" />
                            <h1 className="text-3xl font-bold text-white">Global Markets</h1>
                        </div>
                        <p className="text-slate-400">Real-time market data from exchanges worldwide.</p>
                    </div>
                    <Button variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                    </Button>
                </div>

                {/* Market Status */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <Badge variant="success" className="px-4 py-2">
                        <Activity className="mr-2 h-4 w-4" />
                        US Markets: Open
                    </Badge>
                    <Badge variant="success" className="px-4 py-2">
                        <Activity className="mr-2 h-4 w-4" />
                        Indian Markets: Open
                    </Badge>
                    <Badge variant="outline" className="px-4 py-2">
                        <Activity className="mr-2 h-4 w-4" />
                        European Markets: Closed
                    </Badge>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Global Indices */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">📈</span>
                                    Global Stock Indices
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {globalIndices.map((item) => (
                                    <MarketRow key={item.symbol} {...item} extra={item.country} />
                                ))}
                            </CardContent>
                        </Card>

                        {/* Commodities */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">🟡</span>
                                    Commodities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {commodities.map((item) => (
                                    <MarketRow key={item.symbol} {...item} />
                                ))}
                            </CardContent>
                        </Card>

                        {/* Forex */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <span className="text-xl">💱</span>
                                    Forex
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                {forex.map((item) => (
                                    <MarketRow key={item.symbol} {...item} />
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Top Gainers */}
                        <Card className="border-green-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-400">
                                    <TrendingUp className="h-5 w-5" />
                                    Top Gainers
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {gainersLosers.gainers.map((item, index) => (
                                    <div key={item.symbol} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-500 text-sm w-4">{index + 1}</span>
                                            <span className="font-medium text-white">{item.symbol}</span>
                                        </div>
                                        <Badge variant="success">+{item.change}%</Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Top Losers */}
                        <Card className="border-red-500/30">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-red-400">
                                    <TrendingDown className="h-5 w-5" />
                                    Top Losers
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {gainersLosers.losers.map((item, index) => (
                                    <div key={item.symbol} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-500 text-sm w-4">{index + 1}</span>
                                            <span className="font-medium text-white">{item.symbol}</span>
                                        </div>
                                        <Badge variant="danger">{item.change}%</Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Market Sentiment */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Market Sentiment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-green-400">Bullish</span>
                                            <span className="text-slate-400">68%</span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[68%] bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-red-400">Bearish</span>
                                            <span className="text-slate-400">32%</span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full w-[32%] bg-gradient-to-r from-red-500 to-pink-500 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
