'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function UserProfile() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#060010]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!session) return null;

    const isAdmin = (session.user as any)?.role === 'admin';

    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10">
                <Card className="bg-[#1a1f2e] border-slate-700/50 text-white shadow-2xl">
                    <CardHeader className="text-center relative pb-0">
                        <div className="absolute top-4 right-4">
                            {isAdmin && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                                    <Shield className="w-3 h-3" />
                                    Admin
                                </span>
                            )}
                        </div>
                        <div className="flex justify-center mb-4">
                            <Avatar className="w-24 h-24 border-4 border-[#0f1218]">
                                <AvatarImage src={session.user?.image || undefined} />
                                <AvatarFallback className="bg-indigo-600 text-white text-2xl">
                                    {session.user?.name?.charAt(0) || <UserIcon />}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-3xl font-bold">{session.user?.name || 'User'}</CardTitle>
                        <p className="text-slate-400">{session.user?.email}</p>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-6">
                        <div className="grid grid-cols-1 gap-4">
                            {isAdmin && (
                                <Link href="/admin/dashboard" className="block">
                                    <div className="p-4 rounded-xl bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/20 hover:border-red-500/40 transition-all group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-red-500/20 text-red-400 group-hover:bg-red-500/30 transition-colors">
                                                <LayoutDashboard className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-red-100">Admin Dashboard</h3>
                                                <p className="text-sm text-red-200/60">Manage content and users</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <h3 className="text-sm font-medium text-slate-400 mb-4">Account Information</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between py-2 border-b border-slate-700/50">
                                        <span className="text-slate-500">User ID</span>
                                        <span className="font-mono text-slate-300">{(session.user as any)?.id?.substring(0, 8)}...</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-slate-700/50">
                                        <span className="text-slate-500">Role</span>
                                        <span className="capitalize text-slate-300">{(session.user as any)?.role || 'Viewer'}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-slate-500">Status</span>
                                        <span className="text-green-400">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="justify-center pb-8">
                        <Button
                            variant="destructive"
                            className="w-full sm:w-auto gap-2 bg-red-600 hover:bg-red-700"
                            onClick={() => signOut({ callbackUrl: '/' })}
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
