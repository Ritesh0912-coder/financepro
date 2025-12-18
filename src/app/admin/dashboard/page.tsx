'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, Settings, Activity } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                    <p className="text-slate-400">Manage your platform content and settings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-[#1a1f2e] border-slate-700/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-indigo-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">1,234</div>
                            <p className="text-xs text-slate-500 mt-1">+12% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-slate-700/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Active Articles</CardTitle>
                            <FileText className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">456</div>
                            <p className="text-xs text-slate-500 mt-1">+23 new this week</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-slate-700/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">System Health</CardTitle>
                            <Activity className="h-4 w-4 text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">98.9%</div>
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
                        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 border-b border-slate-800/50 pb-4 last:border-0 last:pb-0">
                                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                                        <span className="text-xs font-bold text-slate-400">U{i}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-white">User {i} updated profile settings</p>
                                        <p className="text-xs text-slate-500">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300 h-20 flex flex-col gap-2">
                                <FileText className="h-5 w-5" /> Write Article
                            </Button>
                            <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300 h-20 flex flex-col gap-2">
                                <Users className="h-5 w-5" /> Manage Users
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
