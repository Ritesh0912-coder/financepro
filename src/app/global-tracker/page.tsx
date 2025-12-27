import React from 'react';
import { Globe, TrendingUp, TrendingDown, AlertTriangle, Info, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getGlobalIndicators } from '@/actions/admin';

// Static alerts for now - these could be moved to DB later if needed
const globalAlerts = [
    { type: 'critical', title: 'Red Sea Shipping Crisis', region: 'Middle East', description: 'Houthi attacks disrupt global shipping routes, impacting supply chains.' },
    { type: 'warning', title: 'China Property Sector Stress', region: 'Asia', description: 'Country Garden and Evergrande defaults raise systemic risk concerns.' },
    { type: 'warning', title: 'Germany Technical Recession', region: 'Europe', description: 'Germany enters technical recession with consecutive quarterly GDP decline.' },
    { type: 'info', title: 'US Fed Pivot Expected', region: 'North America', description: 'Markets pricing in rate cuts starting Q1 2024.' },
];

export default async function GlobalTrackerPage() {
    // Fetch data from DB
    const { data: allIndicators } = await getGlobalIndicators();

    // Filter by type
    const inflationData = allIndicators?.filter((i: any) => i.indicatorType === 'inflation') || [];
    const gdpData = allIndicators?.filter((i: any) => i.indicatorType === 'gdp') || [];
    const interestRates = allIndicators?.filter((i: any) => i.indicatorType === 'interest_rate') || [];
    const recessionProbability = allIndicators?.filter((i: any) => i.indicatorType === 'recession_probability') || [];

    // Country Code Logic (Simple mapping for demo, ideal: store in DB)
    const getFlag = (country: string) => {
        const flags: { [key: string]: string } = { 'United States': '🇺🇸', 'India': '🇮🇳', 'United Kingdom': '🇬🇧', 'Euro Zone': '🇪🇺', 'Japan': '🇯🇵', 'China': '🇨🇳', 'Brazil': '🇧🇷', 'Germany': '🇩🇪', 'Russia': '🇷🇺', 'Canada': '🇨🇦' };
        return flags[country] || '🌐';
    };

    return (
        <div className="min-h-screen py-8 px-4 pt-32">
            {/* Added pt-32 to account for fixed navbar */}
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-8 w-8 text-cyan-400" />
                        <h1 className="text-3xl font-bold text-white">Global Macro Tracker</h1>
                    </div>
                    <p className="text-slate-400">Monitor real-time global economic indicators.</p>
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
                            {inflationData.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No data available. Add data in Admin Panel.</div>
                            ) : (
                                inflationData.map((item: any) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{getFlag(item.country)}</span>
                                            <span className="font-medium text-white">{item.country}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-mono text-lg text-white">{item.value}%</span>
                                            <span className="text-xs text-slate-500">{item.period}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* GDP Growth */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">📈</span>
                                GDP Growth (YoY %)
                            </CardTitle>
                            <CardDescription>Real GDP growth rates</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {gdpData.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No data available. Add data in Admin Panel.</div>
                            ) : (
                                gdpData.map((item: any) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{getFlag(item.country)}</span>
                                            <span className="font-medium text-white">{item.country}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={cn(
                                                'font-mono text-lg',
                                                item.value > 0 ? 'text-green-400' : 'text-red-400'
                                            )}>
                                                {item.value > 0 ? '+' : ''}{item.value}%
                                            </span>
                                            <Badge variant="outline">{item.period}</Badge>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Interest Rates */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">🏦</span>
                                Central Bank Interest Rates
                            </CardTitle>
                            <CardDescription>Key policy rates</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            {interestRates.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No data available. Add data in Admin Panel.</div>
                            ) : (
                                interestRates.map((item: any) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{getFlag(item.country)}</span>
                                            <div>
                                                <p className="font-medium text-white">{item.country}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-mono text-lg text-white">{item.value}%</span>
                                            <p className="text-xs text-slate-500">{item.period}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Recession Probability */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-xl">⚠️</span>
                                Recession Probability
                            </CardTitle>
                            <CardDescription>Model-based estimates</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {recessionProbability.length === 0 ? (
                                <div className="p-8 text-center text-slate-500">No data available. Add data in Admin Panel.</div>
                            ) : (
                                recessionProbability.map((item: any) => (
                                    <div key={item.id}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-white">{item.country}</span>
                                            <span className={cn(
                                                item.value >= 50 ? 'text-red-400' :
                                                    item.value >= 30 ? 'text-yellow-400' : 'text-green-400'
                                            )}>
                                                {item.value}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    'h-full rounded-full transition-all',
                                                    item.value >= 50 ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                                                        item.value >= 30 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                                            'bg-gradient-to-r from-green-500 to-emerald-500'
                                                )}
                                                style={{ width: `${item.value}%` }}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
