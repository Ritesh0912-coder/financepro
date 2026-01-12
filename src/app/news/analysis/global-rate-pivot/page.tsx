'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Zap, TrendingUp, Globe, BarChart3, AlertCircle, Landmark, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function FedPivotArticlePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#0f1218] text-white selection:bg-primary/30">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
            />

            <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-8 text-slate-400 hover:text-white hover:bg-white/5 -ml-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Analysis
                </Button>

                <article className="space-y-12">
                    <header className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                            <Badge className="bg-primary/10 text-primary border-primary/20">Premium Analysis</Badge>
                            <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">Macroeconomics</Badge>
                            <span className="text-slate-500 text-sm flex items-center gap-2">
                                <Globe className="h-3 w-3" /> Global Finance News • Jan 12, 2026
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            The Fed&apos;s Final Pivot: Navigating a Neutral Rate Environment
                        </h1>

                        <p className="text-xl text-slate-400 leading-relaxed font-light">
                            How the central bank’s structural realignment of capital costs is redefining the physics of global investment and the Indian carry trade.
                        </p>
                    </header>

                    <div className="aspect-video rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#1a1f2e] to-[#0f1218] relative group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-primary uppercase tracking-widest">Global Intelligence</p>
                                <p className="text-2xl font-bold">The Path to 3.0%</p>
                            </div>
                            <Landmark className="h-12 w-12 text-primary/50" />
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <Zap className="text-primary h-6 w-6" /> Summary
                            </h2>
                            <p className="text-slate-300">
                                In a move that marks the definitive end of the post-pandemic inflationary era, the Federal Reserve has signaled a decisive shift toward a &quot;Neutral Rate&quot; environment. The central bank&apos;s latest dot plot suggests a series of calibrated cuts aimed at stabilizing the federal funds rate between 3.0% and 3.5% by the end of 2026. This is a structural realignment that shifts the carrying trade logic from &quot;defensive hedging&quot; to &quot;resilient growth equity.&quot;
                            </p>
                        </section>

                        <div className="grid md:grid-cols-2 gap-8 my-12">
                            <div className="p-8 rounded-3xl bg-[#1a1f2e] border border-white/5 space-y-4">
                                <AlertCircle className="text-primary h-8 w-8" />
                                <h3 className="text-xl font-bold">Why This Matters</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    The pivot to neutrality changes the physics of investment. It shifts the primary focus from &quot;inflation protection&quot; to &quot;growth accumulation,&quot; providing the Reserve Bank of India (RBI) crucial policy space to support domestic credit growth.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-4">
                                <BarChart3 className="text-indigo-400 h-8 w-8" />
                                <h3 className="text-xl font-bold">The Goldilocks Logic</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    With the Fed easing its grip, the Indian rupee is less likely to face runaway dollar pressure, creating a stable environment for foreign institutional investors (FIIs) to return to the Indian mid-cap space.
                                </p>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold">Impact on Indian and Global Markets</h2>

                            <div className="space-y-4">
                                <h4 className="text-primary font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" /> Dalal Street (India)
                                </h4>
                                <p className="text-slate-300">
                                    The BFSI sector stands to gain as credit demand revives. Additionally, the IT sector will see improved corporate spending budgets from US clients. FII return is anticipated particularly in mid-cap segments that were ignored during the liquidity crunch.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-indigo-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <Globe className="h-4 w-4" /> Wall Street (Global)
                                </h4>
                                <p className="text-slate-300">
                                    We are witnessing a rotation from cash and short-term bonds to cyclical growth—specifically tech, industrials, and logistics. However, the Eurozone remains a wild card as the ECB balances stagnation against a weakening Dollar.
                                </p>
                            </div>
                        </section>

                        <section className="p-10 rounded-3xl bg-gradient-to-br from-[#1a1f2e] to-black border border-white/10 space-y-6 my-12">
                            <h2 className="text-2xl font-bold text-white">Expert-Style Analysis</h2>
                            <p className="text-slate-400 italic">
                                &quot;Refinancing traditional debt at 3.5% (the new neutral) is still vastly different from the era of nearly-zero interest rates. The primary risk remains &apos;inflationary persistence&apos;—the possibility that easing could reignite price pressures.&quot;
                            </p>
                            <p className="text-slate-300">
                                For India, the challenge is managing the &quot;liquidity surge.&quot; Overheated equity markets can detach valuations from fundamentals. The RBI must mop up excess liquidity through OMOs while ensuring borrowing costs for MSMEs continue to decline.
                            </p>
                        </section>

                        <section className="space-y-4 pt-12 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-orange-500">Conclusion</h2>
                            <p className="text-slate-300 italic text-lg decoration-primary/50 decoration-2 underline-offset-8">
                                The transition to a neutral environment signals that the inflation war is over, replaced by a quest for sustainable growth. India remains the standout performer, but only for those who can distinguish between a liquidity rally and structural earnings expansion.
                            </p>
                        </section>
                    </div>

                    <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <Globe className="text-primary h-6 w-6" />
                            </div>
                            <div>
                                <h5 className="font-bold">Ritesh Shinde</h5>
                                <p className="text-slate-500 text-sm">Lead Market Analyst • Editorial Team</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="border-white/10 hover:bg-white/5">
                                <Share2 className="mr-2 h-4 w-4" /> Share Insight
                            </Button>
                            <Button className="bg-primary hover:bg-primary-hover text-white">
                                Subscribe to Macro
                            </Button>
                        </div>
                    </footer>
                </article>
            </main>
        </div>
    );
}
