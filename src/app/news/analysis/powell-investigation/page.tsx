'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Zap, TrendingDown, Globe, ShieldAlert, Landmark, Scale, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function PowellProbeArticlePage() {
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
                            <Badge className="bg-red-500/10 text-red-500 border-red-500/20 px-3">Breaking Analysis</Badge>
                            <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 px-3">US Federal Reserve</Badge>
                            <span className="text-slate-500 text-sm flex items-center gap-2">
                                <Globe className="h-3 w-3" /> Global Finance News • Jan 12, 2026
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            The Powell Probe: Why Federal Reserve Independence Is the Market’s Newest Tail Risk
                        </h1>

                        <p className="text-xl text-slate-400 leading-relaxed font-light italic">
                            The initiation of a DOJ criminal investigation into Jerome Powell triggers a flight to safety, testing the structural endurance of central bank autonomy.
                        </p>
                    </header>

                    <div className="aspect-video rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#1a1f2e] to-[#0f1218] relative group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-transparent to-transparent" />
                        <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Systemic Risk Report</p>
                                <p className="text-3xl font-bold">Autonomy Under Fire</p>
                            </div>
                            <ShieldAlert className="h-16 w-16 text-red-500/50" />
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <Zap className="text-primary h-6 w-6" /> Summary
                            </h2>
                            <p className="text-slate-300">
                                The US Justice Department has initiated an unprecedented criminal investigation into Fed Chair Jerome Powell concerning his testimony about building renovations. This unexpected collision between the executive branch and the central bank has triggered a massive flight to safety, with gold and silver futures hitting all-time records. Markets are now pricing in a potential loss of central bank neutrality, a fundamental pillar of global monetary stability.
                            </p>
                        </section>

                        <div className="grid md:grid-cols-2 gap-8 my-12">
                            <div className="p-8 rounded-3xl bg-[#1a1f2e] border border-white/5 space-y-4">
                                <Landmark className="text-primary h-8 w-8" />
                                <h3 className="text-xl font-bold">The Autonomy Factor</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Central bank independence ensures monetary policy is insulated from political cycles. A probe into leadership breaches this protection, risking higher premiums on sovereign debt and USD volatility.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-4">
                                <TrendingDown className="text-indigo-400 h-8 w-8" />
                                <h3 className="text-xl font-bold">Market Sensitivity</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Interest rate swaps have already priced in an additional 15bps of &quot;stability risk.&quot; Institutional capital is rotating into hard assets as the perceived neutrality of the USD is tested.
                                </p>
                            </div>
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold">Global and Indian Implications</h2>

                            <div className="space-y-4">
                                <h4 className="text-indigo-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <Globe className="h-4 w-4" /> Global Markets
                                </h4>
                                <p className="text-slate-300">
                                    A &quot;risk-off&quot; rotation is visible across Wall Street, with institutional investors pulling back from long-duration bonds. The transition into a &quot;neutral rate&quot; era is now complicated by a potential leadership vacuum at the Fed.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-primary font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" /> The India Story
                                </h4>
                                <p className="text-slate-300">
                                    A weaker USD could provide the RBI with policy breathing room. While global VIX spikes often trigger outflows, India&apos;s 6.6% UN growth projection positions it as a resilient &quot;high-growth haven&quot; amidst Western institutional turmoil.
                                </p>
                            </div>
                        </section>

                        <section className="p-10 rounded-3xl bg-gradient-to-br from-[#1a1f2e] to-black border border-white/10 space-y-6 my-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Scale className="h-6 w-6 text-primary" /> Expert Analysis
                            </h2>
                            <p className="text-slate-400 italic">
                                &quot;In finance, perception is reality. Even if the Fed Chair is fully exonerated, the renovation probe may be interpreted as a tool for executive leverage over monetary policy. Legal risk is now a standard macro factor.&quot;
                            </p>
                            <p className="text-slate-300">
                                The timing is disruptive, occurring just as the Fed was navigating a delicate pivot. Analysts warn of a long-term &quot;devising&quot; of the US Dollar&apos;s hegemony if institutional norms continue to erode.
                            </p>
                        </section>

                        <section className="space-y-4 pt-12 border-t border-white/5">
                            <h2 className="text-2xl font-bold">Risks and Outlook</h2>
                            <p className="text-slate-300">
                                The primary risk remains &quot;policy paralysis.&quot; If the investigation is prolonged, decision-making could be hindered during a critical economic transition. For investors, the directive is clear: prioritize structural resilience over reactive liquidity plays.
                            </p>
                        </section>
                    </div>

                    <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                                <Landmark className="text-slate-400 h-6 w-6" />
                            </div>
                            <div>
                                <h5 className="font-bold">Editorial Analysis Team</h5>
                                <p className="text-slate-500 text-sm">Global Finance News • Investigative Desk</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="border-white/10 hover:bg-white/5">
                                <Share2 className="mr-2 h-4 w-4" /> Share Insight
                            </Button>
                            <Button className="bg-primary hover:bg-primary-hover text-white">
                                Monitor Updates
                            </Button>
                        </div>
                    </footer>
                </article>
            </main>
        </div>
    );
}
