import React from 'react';
import { Globe, TrendingUp, TrendingDown, AlertTriangle, Info, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock global economic data
const inflationData = [
    { country: 'United States', code: '🇺🇸', value: 3.4, previous: 3.7, change: -0.3, status: 'normal' },
    { country: 'India', code: '🇮🇳', value: 5.5, previous: 5.0, change: 0.5, status: 'warning' },
    { country: 'United Kingdom', code: '🇬🇧', value: 4.0, previous: 4.6, change: -0.6, status: 'normal' },
    { country: 'Euro Zone', code: '🇪🇺', value: 2.9, previous: 2.4, change: 0.5, status: 'normal' },
    { country: 'Japan', code: '🇯🇵', value: 2.8, previous: 2.6, change: 0.2, status: 'normal' },
    { country: 'China', code: '🇨🇳', value: 0.2, previous: -0.2, change: 0.4, status: 'normal' },
    { country: 'Brazil', code: '🇧🇷', value: 4.5, previous: 4.8, change: -0.3, status: 'warning' },
    { country: 'Germany', code: '🇩🇪', value: 3.2, previous: 2.9, change: 0.3, status: 'normal' },
];

const gdpData = [
    { country: 'United States', code: '🇺🇸', value: 2.4, forecast: 2.1, status: 'growing' },
    { country: 'India', code: '🇮🇳', value: 7.6, forecast: 6.5, status: 'growing' },
    { country: 'China', code: '🇨🇳', value: 5.2, forecast: 4.5, status: 'slowing' },
    { country: 'United Kingdom', code: '🇬🇧', value: 0.1, forecast: 0.5, status: 'stagnant' },
    { country: 'Germany', code: '🇩🇪', value: -0.1, forecast: 0.3, status: 'recession' },
    { country: 'Japan', code: '🇯🇵', value: 1.9, forecast: 1.0, status: 'growing' },
];

const interestRates = [
    { bank: 'Federal Reserve', code: '🇺🇸', rate: 5.50, lastChange: 'Hold', nextMeeting: 'Jan 31, 2024' },
    { bank: 'ECB', code: '🇪🇺', rate: 4.50, lastChange: 'Hold', nextMeeting: 'Jan 25, 2024' },
    { bank: 'RBI', code: '🇮🇳', rate: 6.50, lastChange: 'Hold', nextMeeting: 'Feb 8, 2024' },
    { bank: 'Bank of England', code: '🇬🇧', rate: 5.25, lastChange: 'Hold', nextMeeting: 'Feb 1, 2024' },
    { bank: 'Bank of Japan', code: '🇯🇵', rate: -0.10, lastChange: 'Hold', nextMeeting: 'Jan 23, 2024' },
];

const globalAlerts = [
    { type: 'critical', title: 'Red Sea Shipping Crisis', region: 'Middle East', description: 'Houthi attacks disrupt global shipping routes, impacting supply chains.' },
    { type: 'warning', title: 'China Property Sector Stress', region: 'Asia', description: 'Country Garden and Evergrande defaults raise systemic risk concerns.' },
    { type: 'warning', title: 'Germany Technical Recession', region: 'Europe', description: 'Germany enters technical recession with consecutive quarterly GDP decline.' },
    { type: 'info', title: 'US Fed Pivot Expected', region: 'North America', description: 'Markets pricing in rate cuts starting Q1 2024.' },
];

const recessionProbability = [
    { country: 'United States', probability: 35 },
    { country: 'Euro Zone', probability: 55 },
    { country: 'United Kingdom', probability: 45 },
    { country: 'China', probability: 20 },
    { country: 'Japan', probability: 30 },
];

export default function GlobalTrackerPage() {
    return (
        <div className="min-h-screen py-8 px-4">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-8 w-8 text-cyan-400" />
                        <h1 className="text-3xl font-bold text-white">Global Macro Tracker</h1>
                    </div>
                    <p className="text-slate-400">Monitor global economic indicators, inflation, GDP, and crisis alerts.</p>
                </div>

                {/* Global Alerts */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                        Global Alerts
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {globalAlerts.map((alert, index) => (
                            <Card key={index} className={cn(
                                'border-l-4',
                                alert.type === 'critical' && 'border-l-red-500 bg-red-500/5',
                                alert.type === 'warning' && 'border-l-yellow-500 bg-yellow-500/5',
                                alert.type === 'info' && 'border-l-blue-500 bg-blue-500/5'
                            )}>
                                <CardContent className="pt-4">
                                    <div className="flex items-start gap-3">
                                        {alert.type === 'critical' && <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />}
                                        {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0" />}
                                        {alert.type === 'info' && <Info className="h-5 w-5 text-blue-400 flex-shrink-0" />}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-white">{alert.title}</h3>
                                                <Badge variant="outline" className="text-xs">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    {alert.region}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-slate-400">{alert.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Inflation Rates */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">📊</span>
                                Inflation Rates (YoY %)
                            </CardTitle>
                            <CardDescription>Latest consumer price index data by country</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {inflationData.map((item) => (
                                <div key={item.country} className="flex items-center justify-between p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{item.code}</span>
                                        <span className="font-medium text-white">{item.country}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-lg text-white">{item.value}%</span>
                                        <span className={cn(
                                            'flex items-center gap-1 text-sm',
                                            item.change < 0 ? 'text-green-400' : 'text-red-400'
                                        )}>
                                            {item.change < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                                            {item.change > 0 ? '+' : ''}{item.change}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* GDP Growth */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">📈</span>
                                GDP Growth (YoY %)
                            </CardTitle>
                            <CardDescription>Real GDP growth rates and forecasts</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {gdpData.map((item) => (
                                <div key={item.country} className="flex items-center justify-between p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{item.code}</span>
                                        <span className="font-medium text-white">{item.country}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={cn(
                                            'font-mono text-lg',
                                            item.value > 0 ? 'text-green-400' : 'text-red-400'
                                        )}>
                                            {item.value > 0 ? '+' : ''}{item.value}%
                                        </span>
                                        <Badge variant={
                                            item.status === 'growing' ? 'success' :
                                                item.status === 'slowing' ? 'warning' :
                                                    item.status === 'recession' ? 'danger' : 'outline'
                                        }>
                                            {item.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Interest Rates */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">🏦</span>
                                Central Bank Interest Rates
                            </CardTitle>
                            <CardDescription>Key policy rates by major central banks</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {interestRates.map((item) => (
                                <div key={item.bank} className="flex items-center justify-between p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{item.code}</span>
                                        <div>
                                            <p className="font-medium text-white">{item.bank}</p>
                                            <p className="text-xs text-slate-500">Next: {item.nextMeeting}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-mono text-lg text-white">{item.rate}%</span>
                                        <Badge variant="outline" className="ml-2">{item.lastChange}</Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recession Probability */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">⚠️</span>
                                Recession Probability (12-month)
                            </CardTitle>
                            <CardDescription>Model-based recession probability estimates</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recessionProbability.map((item) => (
                                <div key={item.country}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-white">{item.country}</span>
                                        <span className={cn(
                                            item.probability >= 50 ? 'text-red-400' :
                                                item.probability >= 30 ? 'text-yellow-400' : 'text-green-400'
                                        )}>
                                            {item.probability}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                'h-full rounded-full transition-all',
                                                item.probability >= 50 ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                                    item.probability >= 30 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                                        'bg-gradient-to-r from-green-500 to-emerald-500'
                                            )}
                                            style={{ width: `${item.probability}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
