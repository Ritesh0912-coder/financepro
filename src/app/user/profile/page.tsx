'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Shield, User as UserIcon, LogOut, LayoutDashboard, MessageSquareText, Mail, Calendar, Crown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
            <div className="min-h-screen flex items-center justify-center bg-[#060606]">
                <div className="h-8 w-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const isAdmin = (session.user as any)?.role === 'admin';

    return (
        <div className="min-h-screen bg-[#060606] text-white pt-28 pb-20 px-4 relative overflow-hidden selection:bg-orange-500/30">
            {/* Cinematic Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10 space-y-8">
                {/* Header Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-32 h-32 rounded-full border-2 border-orange-500/20 p-1.5 shadow-[0_0_30px_rgba(249,115,22,0.1)]"
                            >
                                <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center border border-white/10">
                                    {session.user?.image ? (
                                        <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-12 h-12 text-slate-500" />
                                    )}
                                </div>
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 bg-orange-500 text-black p-2 rounded-full shadow-lg">
                                <Crown className="w-4 h-4 fill-current" />
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-2 flex-1">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white italic">
                                    {session.user?.name}
                                </h1>
                                {isAdmin && (
                                    <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold border border-orange-500/20 uppercase tracking-widest">
                                        Elite Admin
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-400 font-light flex items-center justify-center md:justify-start gap-2">
                                <Mail className="w-4 h-4 opacity-40" />
                                {session.user?.email}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <Button
                                variant="outline"
                                className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-full px-8 py-6 text-sm font-light tracking-wide transition-all"
                                onClick={() => signOut({ callbackUrl: '/' })}
                            >
                                <LogOut className="w-4 h-4 mr-2 opacity-60" />
                                Log Out
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Grid Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* FGA Quick Access */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Link href="/ai-voice" className="block h-full group">
                            <div className="h-full p-8 rounded-[2rem] bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/5 border border-orange-500/10 group-hover:border-orange-500/30 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full" />
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 rounded-2xl bg-orange-500/20 text-orange-400 group-hover:scale-110 transition-transform">
                                        <MessageSquareText className="w-6 h-6" />
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                                </div>
                                <h3 className="text-xl font-light text-white mb-2">Speak with FGA</h3>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">
                                    Access your dedicated Finance Global Assistant for real-time market insights.
                                </p>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Admin/Settings Quick Access */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {isAdmin ? (
                            <Link href="/admin/dashboard" className="block h-full group">
                                <div className="h-full p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all relative">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-4 rounded-2xl bg-white/5 text-slate-300 group-hover:scale-110 transition-transform">
                                            <LayoutDashboard className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-light text-white mb-2">Admin Control</h3>
                                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                                        Manage platform content, user permissions, and global intelligence parameters.
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <div className="h-full p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 rounded-2xl bg-white/5 text-slate-500">
                                        <Shield className="w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-light text-slate-400 mb-2 italic">Standard Member</h3>
                                <p className="text-sm text-slate-500 font-light leading-relaxed">
                                    You have full access to global financial news and the FGA intelligence network.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Account Details Footer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 flex flex-wrap gap-8 items-center justify-center md:justify-between text-xs font-light tracking-widest text-slate-500 uppercase"
                >
                    <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 opacity-40" />
                        Member Since Dec 2025
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 opacity-40" />
                        Status: <span className="text-orange-500/60">Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <UserIcon className="w-3 h-3 opacity-40" />
                        ID: {(session.user as any)?.id?.substring(0, 8)}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
