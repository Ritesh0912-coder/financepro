'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Newspaper,
    Globe,
    Tags,
    Bell,
    BarChart3,
    Users,
    Settings,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Sparkles,
    MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

// Mock news data
const newsItems = [
    {
        id: '1',
        title: 'Federal Reserve Signals Potential Rate Cuts in 2024',
        category: 'Economy',
        source: 'Reuters',
        publishedAt: '2024-01-10 14:30',
        views: 12450,
        hasSummary: true,
        isBreaking: true,
        isFeatured: true,
        status: 'published',
    },
    {
        id: '2',
        title: 'Bitcoin Surges Past $45,000 on ETF Approval Momentum',
        category: 'Crypto',
        source: 'Bloomberg',
        publishedAt: '2024-01-10 12:00',
        views: 8920,
        hasSummary: true,
        isBreaking: true,
        isFeatured: false,
        status: 'published',
    },
    {
        id: '3',
        title: 'NIFTY 50 Hits All-Time High Amid Strong Earnings',
        category: 'Stocks',
        source: 'MoneyControl',
        publishedAt: '2024-01-10 10:30',
        views: 6780,
        hasSummary: false,
        isBreaking: false,
        isFeatured: true,
        status: 'published',
    },
    {
        id: '4',
        title: 'Oil Prices Climb on Middle East Supply Concerns',
        category: 'Commodities',
        source: 'Financial Times',
        publishedAt: '2024-01-10 09:15',
        views: 4560,
        hasSummary: true,
        isBreaking: false,
        isFeatured: false,
        status: 'published',
    },
    {
        id: '5',
        title: 'Euro Strengthens Against Dollar on ECB Hawkish Stance',
        category: 'Forex',
        source: 'Reuters',
        publishedAt: '2024-01-10 08:00',
        views: 3210,
        hasSummary: false,
        isBreaking: false,
        isFeatured: false,
        status: 'draft',
    },
];

const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'stocks', label: 'Stocks' },
    { value: 'crypto', label: 'Crypto' },
    { value: 'forex', label: 'Forex' },
    { value: 'economy', label: 'Economy' },
    { value: 'commodities', label: 'Commodities' },
];

export default function AdminNewsPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Admin Header */}
            <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
                <div className="flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <LayoutDashboard className="h-6 w-6 text-cyan-400" />
                            <span className="text-lg font-bold text-white">Admin Dashboard</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/">
                            <Button variant="outline" size="sm">
                                View Site
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 min-h-[calc(100vh-4rem)] border-r border-slate-800 bg-slate-900/50 p-4">
                    <nav className="space-y-2">
                        <Link href="/admin/dashboard">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                <LayoutDashboard className="h-5 w-5" />
                                Dashboard
                            </div>
                        </Link>
                        <Link href="/admin/news">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 font-medium">
                                <Newspaper className="h-5 w-5" />
                                News Management
                            </div>
                        </Link>
                        <Link href="/admin/categories">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                <Tags className="h-5 w-5" />
                                Categories
                            </div>
                        </Link>
                        <Link href="/admin/global-tracker">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                <Globe className="h-5 w-5" />
                                Global Tracker
                            </div>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Page Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-white">News Management</h1>
                            <p className="text-slate-400">Manage all news articles and AI summaries</p>
                        </div>
                        <Link href="/admin/news/new">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add News
                            </Button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <Card className="mb-6">
                        <CardContent className="pt-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                    <Input placeholder="Search news..." className="pl-10" />
                                </div>
                                <Select
                                    options={categories}
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-48"
                                />
                                <Button variant="outline">
                                    <Filter className="mr-2 h-4 w-4" />
                                    More Filters
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* News Table */}
                    <Card>
                        <CardContent className="p-0">
                            <table className="w-full">
                                <thead className="border-b border-slate-800">
                                    <tr className="text-left text-xs text-slate-400">
                                        <th className="p-4">Title</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Source</th>
                                        <th className="p-4">Published</th>
                                        <th className="p-4">Views</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newsItems.map((news) => (
                                        <tr key={news.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                            <td className="p-4">
                                                <div className="max-w-md">
                                                    <p className="font-medium text-white line-clamp-1">{news.title}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        {news.isBreaking && <Badge variant="danger" className="text-xs">Breaking</Badge>}
                                                        {news.isFeatured && <Badge variant="warning" className="text-xs">Featured</Badge>}
                                                        {news.hasSummary && <Badge variant="info" className="text-xs"><Sparkles className="h-3 w-3 mr-1" />AI</Badge>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="outline">{news.category}</Badge>
                                            </td>
                                            <td className="p-4 text-slate-400">{news.source}</td>
                                            <td className="p-4 text-slate-400 text-sm">{news.publishedAt}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 text-slate-400">
                                                    <Eye className="h-4 w-4" />
                                                    {news.views.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={news.status === 'published' ? 'success' : 'outline'}>
                                                    {news.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    {!news.hasSummary && (
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-cyan-400">
                                                            <Sparkles className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-slate-400">Showing 1-5 of 1,234 news items</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled>Previous</Button>
                            <Button variant="outline" size="sm">Next</Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
