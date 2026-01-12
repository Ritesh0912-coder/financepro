'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, Activity, BarChart3, AlertCircle, ArrowLeft, Landmark, Cpu, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function WeeklyOutlookPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#0f1218] text-white selection:bg-primary/30">
            <main className="max-w-5xl mx-auto px-4 py-20">
                <header className="space-y-8 mb-16">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">Market Strategy</Badge>
                        <span className="text-slate-500 text-sm">Week of Jan 12 – Jan 18, 2026</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Weekly Global <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Market Outlook</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl font-light leading-relaxed">
                        Navigating the convergence of institutional autonomy crises in the West and structural growth accelerations in the East.
                    </p>
                </header>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="p-8 rounded-3xl bg-[#1a1f2e] border border-white/5 space-y-4">
                        <TrendingUp className="text-green-500 h-8 w-8" />
                        <h3 className="text-xl font-bold">Resilient India</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            UN projects 6.6% GDP growth for 2026. India snaps 5-day slide on trade hopes.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-[#1a1f2e] border border-white/5 space-y-4">
                        <AlertCircle className="text-red-500 h-8 w-8" />
                        <h3 className="text-xl font-bold">Fed Autonomy</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            DOJ investigation into Jerome Powell introduces domestic political risk to US monetary policy.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-[#1a1f2e] border border-white/5 space-y-4">
                        <Activity className="text-indigo-400 h-8 w-8" />
                        <h3 className="text-xl font-bold">Commodity Shift</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Gold and Silver hitting records as investors hedge against dollar-centric institutional fragility.
                        </p>
                    </div>
                </div>

                <div className="space-y-16 prose prose-invert prose-lg max-w-none">
                    <section>
                        <h2 className="text-3xl font-bold border-b border-white/5 pb-4">1. Equity Markets: The Flight to Quality</h2>
                        <p className="text-slate-300">
                            Equities are entering a phase of extreme bifurcation. While major US indices grapple with the &apos;Powell Probe&apos;
                            and a slowdown in job creation (50,000 added in Dec), Asian markets are focused on fundamental growth.
                        </p>
                        <ul className="text-slate-400 space-y-4">
                            <li><strong>The India Story:</strong> Nifty 50 has shown remarkable resilience. We expect banking and infra sectors to lead as we head toward the 2026 Budget.</li>
                            <li><strong>China Stimulus:</strong> Shanghai Composite bounce suggests massive liquidity injections are imminent, aiding global miners.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold border-b border-white/5 pb-4">2. Economic Indicators: The Growth Seesaw</h2>
                        <p className="text-slate-300">
                            India&apos;s retail inflation at 1.33% is a masterclass in management compared to Western volatility. The RBI is expected
                            to prioritize the 7.3% GDP target despite food price pressures.
                        </p>
                        <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/10 my-8">
                            <h4 className="text-primary font-bold mb-4">India Outlook Checklist</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex gap-2 items-center text-sm text-slate-400"><Landmark className="w-4 h-4" /> RBI Rate Trajectory: Steady</div>
                                <div className="flex gap-2 items-center text-sm text-slate-400"><Cpu className="w-4 h-4" /> IT Sector Spend: Increasing</div>
                                <div className="flex gap-2 items-center text-sm text-slate-400"><LineChart className="w-4 h-4" /> FPI Flows: Monitoring Risk-Off</div>
                                <div className="flex gap-2 items-center text-sm text-slate-400"><Globe className="w-4 h-4" /> Trade Deal Status: Highly Bullish</div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold border-b border-white/5 pb-4">3. Global Risks: The Autonomy Crisis</h2>
                        <p className="text-slate-300 underline decoration-red-500/30 underline-offset-8">
                            The single largest risk for the week is the &apos;Autonomy Crisis&apos; at the Fed. If market trust in the dollar&apos;s
                            neutrality erodes, sovereign debt risk premiums will spike globally.
                        </p>
                    </section>
                </div>

                <div className="mt-24 p-12 rounded-[3rem] bg-gradient-to-r from-orange-600 to-red-600">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <h2 className="text-3xl font-bold">Join the Exclusive Strategy Desk</h2>
                            <p className="text-white/80">Get the full 25-page PDF report including detailed sector breakdowns and technical charts.</p>
                        </div>
                        <Button className="bg-black text-white px-12 py-8 h-auto rounded-full text-lg font-bold hover:bg-black/80 transition-all">
                            Download Strategy PDF
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
