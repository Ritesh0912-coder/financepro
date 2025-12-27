'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Settings, Activity, LogOut, Mail } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { getAdminStats } from '@/actions/admin';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalArticles: 0,
        systemHealth: 100,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await getAdminStats();
                if (res.success && res.data) {
                    setStats(res.data);
                }
            } catch (error) {
                console.error("Failed to load stats", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                        <p className="text-slate-400">Manage your platform content and settings.</p>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="bg-red-600 hover:bg-red-700 gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-[#1a1f2e] border-slate-700/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-indigo-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {loading ? '...' : stats.totalUsers}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Registered Accounts</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-slate-700/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Active Articles</CardTitle>
                            <FileText className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {loading ? '...' : stats.totalArticles}
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Published News</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-slate-700/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">System Health</CardTitle>
                            <Activity className="h-4 w-4 text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.systemHealth}%</div>
                            <p className="text-xs text-slate-500 mt-1">Operational</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-slate-700/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Settings</CardTitle>
                            <Settings className="h-4 w-4 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" size="sm" className="w-full mt-1 border-slate-600 hover:bg-slate-700 text-slate-300">
                                Manage
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/admin/news">
                                <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 h-20 flex flex-col gap-2">
                                    <FileText className="h-5 w-5" /> Write Article
                                </Button>
                            </Link>
                            <Link href="/admin/users">
                                <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 h-20 flex flex-col gap-2">
                                    <Users className="h-5 w-5" /> Manage Users
                                </Button>
                            </Link>
                            <Link href="/admin/messages">
                                <Button variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-slate-300 h-20 flex flex-col gap-2">
                                    <Mail className="h-5 w-5" /> Contact Messages
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
