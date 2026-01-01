'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Shield, User as UserIcon, LogOut, LayoutDashboard, MessageSquareText, Mail, Calendar, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function UserProfile() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

    const handleThemeChange = async (color: string) => {
        try {
            const res = await fetch('/api/user/update-theme', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ themeColor: color })
            });

            if (res.ok) {
                // Update local session state
                await update({ themeColor: color });
            }
        } catch (error) {
            console.error("Failed to update theme:", error);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#060606]">
                <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const isAdmin = (session.user as any)?.role === 'admin';

    return (
        <div className="min-h-screen bg-[#060606] text-white pt-28 pb-20 px-4 relative overflow-hidden selection:bg-primary/30">
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
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent border-primary/40 to-transparent" />

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-32 h-32 rounded-full border-2 border-primary/20 p-1.5 shadow-primary/20"
                            >
                                <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 flex items-center justify-center border border-white/10">
                                    {session.user?.image ? (
                                        <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <UserIcon className="w-12 h-12 text-slate-500" />
                                    )}
                                </div>
                            </motion.div>
                            <div className="absolute -bottom-2 -right-2 bg-primary text-black p-2 rounded-full shadow-lg">
                                <Crown className="w-4 h-4 fill-current" />
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-2 flex-1">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white italic">
                                    {session.user?.name}
                                </h1>
                                {isAdmin && (
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20 uppercase tracking-widest">
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
                            <div className="h-full p-8 rounded-[2rem] bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/5 border border-primary/10 group-hover:border-primary/30 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
                                <div className="flex items-start justify-between mb-6">
                                    <div className="p-4 rounded-2xl bg-primary/20 text-primary group-hover:scale-110 transition-transform">
                                        <MessageSquareText className="w-6 h-6" />
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
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

                {/* Personalization Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-8 pb-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl overflow-hidden relative"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-2xl bg-white/5 text-primary">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-light text-white">Atmospheric Branding</h3>
                            <p className="text-xs text-slate-500 tracking-wider uppercase">Customize your elite interface colors</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                        {[
                            { name: 'Elite Orange', color: '#f97316' },
                            { name: 'Royal Blue', color: '#2563eb' },
                            { name: 'Emerald Peak', color: '#10b981' },
                            { name: 'Violet Nebula', color: '#8b5cf6' },
                            { name: 'Crimson Pulse', color: '#ef4444' },
                            { name: 'Golden Sun', color: '#f59e0b' },
                            { name: 'Arctic Cyan', color: '#06b6d4' },
                            { name: 'Deep Rose', color: '#f43f5e' }
                        ].map((choice) => (
                            <button
                                key={choice.color}
                                onClick={() => handleThemeChange(choice.color)}
                                className={cn(
                                    "group relative flex flex-col items-center gap-2 transition-all p-2 rounded-2xl hover:bg-white/5",
                                    ((session?.user as any)?.themeColor || '#f97316') === choice.color && "bg-white/10 ring-1 ring-white/20"
                                )}
                            >
                                <div
                                    className="w-10 h-10 rounded-full shadow-lg transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: choice.color }}
                                />
                                <span className="text-[9px] text-slate-500 tracking-widest uppercase font-bold text-center leading-tight">
                                    {choice.name.split(' ')[1] || choice.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Custom Color Input */}
                    <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-slate-300 font-light">Custom Signature Color</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Paste your preferred hex code</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-full border border-white/10">
                            <input
                                type="color"
                                value={(session?.user as any)?.themeColor || '#f97316'}
                                onChange={(e) => handleThemeChange(e.target.value)}
                                className="w-8 h-8 rounded-full border-none bg-transparent cursor-pointer overflow-hidden p-0"
                            />
                            <span className="text-sm font-mono text-slate-400 pr-4">
                                {((session?.user as any)?.themeColor || '#f97316').toUpperCase()}
                            </span>
                        </div>
                    </div>
                </motion.div>

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
