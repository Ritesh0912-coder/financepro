'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Zap, Scale, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

const policies = [
    {
        title: "News Selection & Integrity",
        icon: Search,
        content: "Our team operates under a strict 'Logic-First' philosophy. We prioritize events with structural impact—interest rate shifts, liquidity changes, and industrial pivots—while explicitly avoiding clickbait or speculative rumors."
    },
    {
        title: "Fact-Checking & Verification",
        icon: CheckCircle2,
        content: "Every report is cross-referenced with primary filings (SEC, SEBI, RBI) and official institutional transcripts. We ensure technical precision in every reported ratio, percentage, and valuation metric."
    },
    {
        title: "AI & Human Oversight",
        icon: Zap,
        content: "While we use AI to synthesize massive datasets, we maintain a strict 'Human-in-the-Loop' policy. Every line is reviewed by a senior editor to ensure narrative context and categorical accuracy."
    },
    {
        title: "Neutral Reporting",
        icon: Scale,
        content: "Neutrality is our absolute standard. We provide data and analysis, not buy/sell recommendations. Our role is to explain the risks and opportunities, leaving the autonomy of choice to our readers."
    },
    {
        title: "Correction & Updates",
        icon: RefreshCw,
        content: "Should a material error occur, we issue immediate formal corrections. Ongoing stories are marked with live-update timestamps to reflect the real-time evolution of market events."
    }
];

export default function EditorialPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] text-white selection:bg-primary/30">
            <div className="max-w-4xl mx-auto px-4 py-20">
                <header className="text-center space-y-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest"
                    >
                        <ShieldCheck className="w-4 h-4" /> Global Standards
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Editorial Policy</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        At Global Finance News, we don’t just report the market; we respect it.
                        Our editorial standards ensure that our readers can trust every word as if their capital depended on it.
                    </p>
                </header>

                <div className="space-y-12">
                    {policies.map((policy, idx) => (
                        <motion.section
                            key={policy.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative pl-16 group"
                        >
                            <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
                                <policy.icon className="w-6 h-6 text-slate-400 group-hover:text-primary" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold flex items-center gap-2 text-white group-hover:text-primary transition-colors">
                                    {policy.title}
                                </h2>
                                <p className="text-slate-400 leading-relaxed text-lg">
                                    {policy.content}
                                </p>
                            </div>
                            {idx !== policies.length - 1 && (
                                <div className="absolute left-6 top-16 bottom-[-24px] w-[1px] bg-white/5" />
                            )}
                        </motion.section>
                    ))}
                </div>

                <footer className="mt-32 p-10 rounded-3xl bg-[#1a1f2e] border border-white/10 text-center">
                    <FileText className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h3 className="text-xl font-bold mb-4 text-white">Commitment to Transparency</h3>
                    <p className="text-slate-400 max-w-xl mx-auto mb-8">
                        Our editorial standards are a living document, evolving alongside market technology and reporting ethics.
                        We welcome feedback from our community of professionals and investors.
                    </p>
                    <div className="text-sm font-mono text-slate-500 uppercase tracking-widest">
                        Effective Date: January 12, 2026
                    </div>
                </footer>
            </div>
        </div>
    );
}
