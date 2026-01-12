'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldAlert, Globe, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const insights = [
    {
        label: "Trust Crisis",
        content: "DOJ probe into Fed Chair Jerome Powell triggers a 'Risk-Off' surge; Gold hits fresh record highs.",
        icon: ShieldAlert,
        color: "text-red-500",
        bg: "bg-red-500/10"
    },
    {
        label: "Trade Optimism",
        content: "Hopes for major India-US trade deal scheduled for Jan 13 revive Dalal Street sentiment.",
        icon: TrendingUp,
        color: "text-green-500",
        bg: "bg-green-500/10"
    },
    {
        label: "Resilient India",
        content: "UN projects India as fastest-growing major economy at 6.6% for 2026 despite global headwinds.",
        icon: Globe,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10"
    }
];

export function AIMarketInsight() {
    return (
        <section className="py-12">
            <div className="bg-[#1a1f2e] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                {/* Decorative background radiance */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />

                <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/3 space-y-6">
                        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1">
                            <Sparkles className="w-3 h-3 mr-2" /> AI Intelligence
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            Daily Market <br /> Intelligence Box
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Real-time structural shifts synthesized by our neural analysis desk.
                        </p>
                        <div className="pt-4">
                            <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">Last Updated: Jan 12, 19:00 IST</div>
                        </div>
                    </div>

                    <div className="lg:w-2/3 grid gap-4 w-full">
                        {insights.map((insight, idx) => (
                            <motion.div
                                key={insight.label}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group/item"
                            >
                                <div className={`h-12 w-12 rounded-xl ${insight.bg} flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform`}>
                                    <insight.icon className={`w-6 h-6 ${insight.color}`} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-1">{insight.label}</h4>
                                    <p className="text-slate-200 font-medium">{insight.content}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-700 group-hover/item:text-primary transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
