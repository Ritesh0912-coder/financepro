import React from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, Clock, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock alerts data
const alerts = [
    {
        id: '1',
        type: 'breaking',
        title: 'Fed Chairman Powell Signals Rate Cut Timing',
        message: 'Federal Reserve Chair Jerome Powell indicated the central bank is getting closer to cutting interest rates, potentially as early as March 2024.',
        category: 'Economy',
        time: '10 minutes ago',
        isRead: false,
    },
    {
        id: '2',
        type: 'critical',
        title: 'Red Sea Shipping Routes Under Attack',
        message: 'Multiple cargo ships targeted by Houthi militants, causing major disruptions to global supply chains. Oil prices surge 3%.',
        category: 'Geopolitics',
        time: '45 minutes ago',
        isRead: false,
    },
    {
        id: '3',
        type: 'warning',
        title: 'Bitcoin ETF Decision Imminent',
        message: 'SEC expected to rule on spot Bitcoin ETF applications within 24-48 hours. Markets showing high volatility.',
        category: 'Crypto',
        time: '2 hours ago',
        isRead: false,
    },
    {
        id: '4',
        type: 'info',
        title: 'NIFTY 50 Crosses 21,500 Mark',
        message: 'Indian benchmark index reaches new all-time high driven by IT and banking sector gains.',
        category: 'Stocks',
        time: '3 hours ago',
        isRead: true,
    },
    {
        id: '5',
        type: 'warning',
        title: 'China Property Crisis Deepens',
        message: 'Country Garden misses another bond payment deadline, raising concerns about systemic risk in the Chinese economy.',
        category: 'Economy',
        time: '5 hours ago',
        isRead: true,
    },
    {
        id: '6',
        type: 'info',
        title: 'Gold Prices Hit 2-Month High',
        message: 'Safe-haven demand pushes gold above $2,050 per ounce amid geopolitical tensions.',
        category: 'Commodities',
        time: '6 hours ago',
        isRead: true,
    },
    {
        id: '7',
        type: 'info',
        title: 'US Jobs Report Beats Expectations',
        message: 'Non-farm payrolls add 216,000 jobs in December, exceeding the 170,000 forecast.',
        category: 'Economy',
        time: '1 day ago',
        isRead: true,
    },
];

const alertStats = {
    total: 24,
    unread: 3,
    breaking: 2,
    warnings: 5,
};

function getAlertIcon(type: string) {
    switch (type) {
        case 'breaking':
            return <AlertTriangle className="h-5 w-5 text-red-400" />;
        case 'critical':
            return <AlertTriangle className="h-5 w-5 text-red-400" />;
        case 'warning':
            return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
        default:
            return <Info className="h-5 w-5 text-blue-400" />;
    }
}

function getAlertBadge(type: string) {
    switch (type) {
        case 'breaking':
            return <Badge variant="danger" className="breaking-pulse">BREAKING</Badge>;
        case 'critical':
            return <Badge variant="danger">CRITICAL</Badge>;
        case 'warning':
            return <Badge variant="warning">WARNING</Badge>;
        default:
            return <Badge variant="info">INFO</Badge>;
    }
}

export default function AlertsPage() {
    return (
        <div className="min-h-screen py-8 px-4">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Bell className="h-8 w-8 text-cyan-400" />
                            <h1 className="text-3xl font-bold text-white">Alerts</h1>
                        </div>
                        <p className="text-slate-400">Stay informed with breaking news and market alerts.</p>
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-4 text-center">
                            <p className="text-2xl font-bold text-white">{alertStats.total}</p>
                            <p className="text-xs text-slate-400">Total Alerts</p>
                        </CardContent>
                    </Card>
                    <Card className="border-cyan-500/30">
                        <CardContent className="pt-4 text-center">
                            <p className="text-2xl font-bold text-cyan-400">{alertStats.unread}</p>
                            <p className="text-xs text-slate-400">Unread</p>
                        </CardContent>
                    </Card>
                    <Card className="border-red-500/30">
                        <CardContent className="pt-4 text-center">
                            <p className="text-2xl font-bold text-red-400">{alertStats.breaking}</p>
                            <p className="text-xs text-slate-400">Breaking</p>
                        </CardContent>
                    </Card>
                    <Card className="border-yellow-500/30">
                        <CardContent className="pt-4 text-center">
                            <p className="text-2xl font-bold text-yellow-400">{alertStats.warnings}</p>
                            <p className="text-xs text-slate-400">Warnings</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Alerts List */}
                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <Card
                            key={alert.id}
                            className={cn(
                                'transition-all hover:border-cyan-500/50',
                                !alert.isRead && 'border-l-4 border-l-cyan-500 bg-cyan-500/5',
                                alert.type === 'breaking' && 'border-l-red-500 bg-red-500/5',
                                alert.type === 'critical' && 'border-l-red-500 bg-red-500/5',
                                alert.type === 'warning' && !alert.isRead && 'border-l-yellow-500 bg-yellow-500/5'
                            )}
                        >
                            <CardContent className="pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        {getAlertIcon(alert.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                            {getAlertBadge(alert.type)}
                                            <Badge variant="outline">{alert.category}</Badge>
                                            {!alert.isRead && (
                                                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-white mb-2">{alert.title}</h3>
                                        <p className="text-sm text-slate-400 mb-3">{alert.message}</p>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {alert.time}
                                            </span>
                                            {alert.isRead && (
                                                <span className="flex items-center gap-1 text-green-400">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Read
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                    <Button variant="outline">
                        Load More Alerts
                    </Button>
                </div>
            </div>
        </div>
    );
}
