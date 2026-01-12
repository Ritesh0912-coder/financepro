'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Info, AlertTriangle, Scale, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] text-white selection:bg-orange-500/30">
            <div className="max-w-4xl mx-auto px-4 py-24">
                <header className="text-center space-y-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-bold uppercase tracking-widest"
                    >
                        <ShieldAlert className="w-4 h-4 text-orange-500" /> Professional Notice
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Disclaimer</h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
                        Clear boundaries for our content and your capital.
                    </p>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid gap-12"
                >
                    <section className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 space-y-6">
                        <div className="flex items-center gap-4 text-orange-500">
                            <Info className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">Informational Content Only</h2>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Welcome to **Global Finance News**. All content provided on this platform, including news reports,
                            market analysis, and editorial opinions, is intended for **informational and educational purposes only**.
                            It does not, under any circumstances, constitute financial, investment, legal, or professional advice.
                            We do not provide specific buy, sell, or hold recommendations for any security or asset class.
                        </p>
                    </section>

                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="p-8 rounded-[2rem] bg-orange-500/5 border border-orange-500/10 space-y-6">
                            <div className="flex items-center gap-4 text-orange-500">
                                <AlertTriangle className="w-6 h-6" />
                                <h2 className="text-xl font-bold">Market Risks</h2>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                                The financial markets are subject to high volatility and significant risks; past performance is never a guarantee of future results.
                                Prices can fluctuate wildly, and you may lose more than your initial investment.
                            </p>
                        </section>

                        <section className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10 space-y-6">
                            <div className="flex items-center gap-4 text-indigo-400">
                                <Scale className="w-6 h-6" />
                                <h2 className="text-xl font-bold">Reader Responsibility</h2>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                                Any decisions made based on the information provided here are the **sole responsibility of the reader**.
                                We strongly advise all users to consult with a certified financial advisor before making any commitments.
                            </p>
                        </section>
                    </div>

                    <section className="p-10 rounded-[2rem] bg-gradient-to-br from-[#1a1f2e] to-black border border-white/5 text-center">
                        <h3 className="text-2xl font-bold mb-6">Limitation of Liability</h3>
                        <p className="text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                            Global Finance News and its contributors shall not be held liable for any financial losses, damages, or unintended consequences arising from the use of this information.
                            By engaging with our platform, you acknowledge that you are acting autonomously and at your own risk.
                        </p>
                        <Button className="bg-white text-black hover:bg-slate-200 rounded-full px-8 py-6 h-auto font-bold">
                            I Understand & Proceed <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
