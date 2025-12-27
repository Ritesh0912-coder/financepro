'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Newspaper,
    Globe,
    Tags,
    Plus,
    Trash2,
    Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { getGlobalIndicators, createGlobalIndicator, deleteGlobalIndicator } from '@/actions/admin';
import { Label } from '@/components/ui/label';

export default function AdminGlobalTrackerPage() {
    const [indicators, setIndicators] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        country: '',
        countryCode: '',
        indicatorType: 'inflation',
        value: '',
        unit: '%',
        period: 'Q1 2024'
    });

    const fetchIndicators = async () => {
        setLoading(true);
        const res = await getGlobalIndicators();
        if (res.success && res.data) {
            setIndicators(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchIndicators();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);

        const payload = {
            ...formData,
            value: parseFloat(formData.value)
        };

        const res = await createGlobalIndicator(payload);
        if (res.success) {
            setFormData({
                country: '',
                countryCode: '',
                indicatorType: 'inflation',
                value: '',
                unit: '%',
                period: 'Q1 2024'
            });
            fetchIndicators();
        } else {
            alert('Failed to create indicator');
        }
        setCreating(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const res = await deleteGlobalIndicator(id);
        if (res.success) fetchIndicators();
        else alert('Failed to delete');
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
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
                            <Button variant="outline" size="sm">View Site</Button>
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
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
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
                            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-medium">
                                <Globe className="h-5 w-5" />
                                Global Tracker
                            </div>
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Global Economic Indicators</h1>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Table */}
                        <div className="xl:col-span-2">
                            <Card>
                                <CardContent className="p-0">
                                    <table className="w-full text-left">
                                        <thead className="border-b border-slate-800 text-xs uppercase text-slate-400">
                                            <tr>
                                                <th className="p-4">Country</th>
                                                <th className="p-4">Type</th>
                                                <th className="p-4">Value</th>
                                                <th className="p-4">Period</th>
                                                <th className="p-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            {loading ? (
                                                <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading...</td></tr>
                                            ) : indicators.length === 0 ? (
                                                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No data found.</td></tr>
                                            ) : (
                                                indicators.map((ind) => (
                                                    <tr key={ind.id} className="hover:bg-slate-900/50">
                                                        <td className="p-4 text-white font-medium">{ind.country}</td>
                                                        <td className="p-4 text-slate-400 capitalize">{ind.type.replace('_', ' ')}</td>
                                                        <td className="p-4 text-white">{ind.value}{ind.unit}</td>
                                                        <td className="p-4 text-slate-500 text-sm">{ind.period}</td>
                                                        <td className="p-4">
                                                            <Button
                                                                variant="ghost" size="icon"
                                                                className="text-red-400 hover:text-red-300"
                                                                onClick={() => handleDelete(ind.id)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Form */}
                        <div>
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-medium text-white mb-4">Add Indicator</h3>
                                    <form onSubmit={handleCreate} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-slate-400">Country</Label>
                                            <Input
                                                value={formData.country}
                                                onChange={e => setFormData({ ...formData, country: e.target.value })}
                                                placeholder="e.g. United States"
                                                className="bg-slate-900 border-slate-700 text-white"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-slate-400">Code</Label>
                                                <Input
                                                    value={formData.countryCode}
                                                    onChange={e => setFormData({ ...formData, countryCode: e.target.value })}
                                                    placeholder="e.g. US"
                                                    className="bg-slate-900 border-slate-700 text-white"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-slate-400">Value</Label>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.value}
                                                    onChange={e => setFormData({ ...formData, value: e.target.value })}
                                                    placeholder="0.00"
                                                    className="bg-slate-900 border-slate-700 text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-400">Type</Label>
                                            <Select
                                                id="indicatorType"
                                                options={[
                                                    { value: 'inflation', label: 'Inflation' },
                                                    { value: 'gdp', label: 'GDP Growth' },
                                                    { value: 'interest_rate', label: 'Interest Rate' },
                                                    { value: 'unemployment', label: 'Unemployment' },
                                                    { value: 'recession_probability', label: 'Recession Prob.' }
                                                ]}
                                                value={formData.indicatorType}
                                                onChange={(e) => setFormData({ ...formData, indicatorType: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-slate-400">Period</Label>
                                            <Input
                                                value={formData.period}
                                                onChange={e => setFormData({ ...formData, period: e.target.value })}
                                                className="bg-slate-900 border-slate-700 text-white"
                                            />
                                        </div>

                                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={creating}>
                                            {creating ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2 h-4 w-4" />}
                                            Add Data
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
