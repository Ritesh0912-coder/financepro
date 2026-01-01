'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Globe,
    Zap,
    Shield,
    Target,
    Award,
    Users,
    LineChart,
    BarChart3,
    Mail,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

const stats = [
    { label: 'Market Indicators', value: '50+', icon: LineChart },
    { label: 'Active Users', value: '10K+', icon: Users },
    { label: 'AI Insights', value: '24/7', icon: Zap },
    { label: 'Accuracy Rate', value: '98%', icon: Target },
];

const offerings = [
    {
        title: "Market Mood Index",
        description: "Real-time sentiment analysis and institutional flow tracking for precise entry and exit points.",
        icon: BarChart3,
        color: "from-cyan-500 to-blue-500"
    },
    {
        title: "Ask FGA Intelligence",
        description: "Your elite financial assistant powered by advanced neural networks for customized market strategy.",
        icon: Globe,
        color: "from-orange-500 to-red-500"
    },
    {
        title: "Institutional Analysis",
        description: "Identify what the big players are doing using our specialized Chart of Accuracy (COA) metrics.",
        icon: Shield,
        color: "from-purple-500 to-pink-500"
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] text-white overflow-hidden selection:bg-orange-500/30">
            {/* Background Ambient Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10">
                {/* HERO SECTION */}
                <section className="pt-32 pb-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-6">
                                <Zap className="w-3 h-3" />
                                Redefining Financial Intelligence
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                                Elevating Every <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-white to-orange-400">
                                    Financial Decision
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
                                Global Finance IN is not just a portal; it&apos;s a high-precision intelligence engine.
                                We synthesize cosmic scales of market data into actionable, elite insights for the modern investor.
                            </p>
                        </motion.div>

                        {/* STATS STRIP */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto mt-16 px-4">
                            {stats.map((stat, idx) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300 group"
                                >
                                    <div className="mb-3 flex justify-center">
                                        <stat.icon className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* MISSION & VISION */}
                <section className="py-24 px-4 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-8">
                                Built on a Foundation of <br />
                                <span className="text-orange-500">Unyielding Precision</span>
                            </h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                                        <Target className="w-6 h-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            To democratize elite-level financial intelligence. We believe every investor deserves access to the tools and data typically reserved for institutional sharks.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                        <Globe className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            To become the world&apos;s primary neural network for financial decision-making, where AI and human expertise converge to create wealth.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl bg-[#0a0c10] border border-white/10 overflow-hidden flex items-center justify-center">
                                <img
                                    src="/images/dr-vinay-nobg.png"
                                    className="w-full h-full object-cover object-top drop-shadow-[0_0_30px_rgba(234,88,12,0.3)] transition-transform duration-700 group-hover:scale-105"
                                    alt="Dr. Vinay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-transparent to-transparent opacity-50"></div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* WHAT WE OFFER */}
                <section className="py-24 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Elite Capabilities</h2>
                            <p className="text-slate-500 max-w-2xl mx-auto italic">Powering your portfolio with institutional-grade technology.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {offerings.map((offering, idx) => {
                                const hrefs = [
                                    "/market/mmi",
                                    "/ai-voice",
                                    "/market/fii-dii"
                                ];
                                return (
                                    <Link key={offering.title} href={hrefs[idx]}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                                            className="p-8 h-full rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-300 group cursor-pointer"
                                        >
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${offering.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                                <offering.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4">{offering.title}</h3>
                                            <p className="text-slate-400 leading-relaxed mb-6">
                                                {offering.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm font-semibold text-white/50 group-hover:text-orange-400 transition-colors duration-300">
                                                Exploration Ready <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* FOUNDER SECTION */}
                <section className="py-24 px-4 relative">
                    <div className="max-w-7xl mx-auto overflow-hidden rounded-[3rem] bg-gradient-to-r from-[#1a1f2e] to-[#0f1218] border border-white/10 p-12 md:p-20 relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] -mr-32 -mt-32 rounded-full" />

                        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-6">
                                    The Visionary Behind FGA
                                </div>
                                <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
                                    Meet the <br />
                                    <span className="italic text-orange-500 underline decoration-orange-500/30 underline-offset-8">Founder</span>
                                </h2>
                                <p className="text-xl text-slate-300 font-medium mb-6">
                                    &quot;My goal was to create a digital landscape where data isn&apos;t just noise, but a path to prosperity.&quot;
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                        <span className="text-slate-400">Pioneer in AI Integration</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                        <span className="text-slate-400">Architech of Global Fin Ecosystem</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                        <span className="text-slate-400">Dedicated to Financial Literacy</span>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <div className="text-2xl font-bold text-white">Ritesh Shinde</div>
                                    <div className="text-orange-500 font-semibold tracking-wider text-sm uppercase">Creator of Global Finance IN</div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-orange-500 to-red-600 p-2 shadow-[0_0_50px_rgba(234,88,12,0.3)] group/founder">
                                    <div className="w-full h-full rounded-full bg-[#1a1f2e] flex items-center justify-center overflow-hidden border-4 border-[#0f1218]">
                                        <img
                                            src="/images/ritesh-shinde.jpg"
                                            alt="Ritesh Shinde - Founder"
                                            className="w-full h-full object-cover object-[50%_0%] grayscale-[0.3] hover:grayscale-0 transition-all duration-700 group-hover/founder:scale-110"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTACT CTA */}
                <section className="py-24 px-4 text-center">
                    <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-orange-600 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to lead the markets?</h2>
                            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
                                Join the thousands of investors who rely on Global Finance IN for their daily market edge.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-5 h-5" />
                                    Contact Our Team
                                </Link>
                                <Link
                                    href="/news"
                                    className="px-8 py-4 bg-black/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold hover:bg-black/30 transition-all"
                                >
                                    Explore Market News
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
