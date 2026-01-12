'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Globe, BarChart3, ShieldCheck } from 'lucide-react';

export function BrandMission() {
    return (
        <section className="relative py-24 bg-[#0f1218] overflow-hidden border-t border-white/5">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Our Mission</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                Bridging Global Markets with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Local Precision.</span>
                            </h3>
                        </div>

                        <p className="text-slate-400 text-lg leading-relaxed">
                            In an era of fragmented reporting and superficial headlines, Global Finance News stands as a beacon of clarity
                            for the serious explorer of wealth. We are not just another news aggregator; we are a high-precision intelligence
                            platform designed to bridge the gap between global macroeconomic shifts and local market opportunities.
                            By prioritizing data-driven insights over trending narratives, we empower investors and professionals
                            with the analytical tools they need to navigate the complexities of modern economics.
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                    <Globe className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">Global Focus</h4>
                                    <p className="text-slate-500 text-sm">Wall Street to Dalal Street</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                    <BarChart3 className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">Data-Driven</h4>
                                    <p className="text-slate-500 text-sm">Rigorous market analysis</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="bg-[#1a1f2e] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="space-y-6 relative z-10">
                                <p className="text-slate-300 italic text-lg leading-relaxed">
                                    &quot;We aren’t just a news source; we are your trusted partner in navigating the complexities of
                                    modern finance. Join our community of informed investors who demand precision, clarity, and depth in every report.&quot;
                                </p>

                                <div className="flex items-center gap-4 pt-4">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary to-orange-500 p-[1px]">
                                        <div className="h-full w-full rounded-full bg-[#1a1f2e] flex items-center justify-center">
                                            <ShieldCheck className="w-6 h-6 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold">Standard of Excellence</h4>
                                        <p className="text-slate-500 text-sm">Verified & Neutral Reporting</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative card peak */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
