'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Zap, TrendingUp, Cpu, Globe, BarChart3, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

export default function SemiconductorArticlePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#0f1218] text-white selection:bg-primary/30">
            {/* ProgressBar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
            />

            <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="mb-8 text-slate-400 hover:text-white hover:bg-white/5 -ml-4"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Analysis
                </Button>

                <article className="space-y-12">
                    {/* Header */}
                    <header className="space-y-6">
                        <div className="flex flex-wrap gap-3">
                            <Badge className="bg-primary/10 text-primary border-primary/20">Featured Analysis</Badge>
                            <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">Semiconductors</Badge>
                            <span className="text-slate-500 text-sm flex items-center gap-2">
                                <Globe className="h-3 w-3" /> Global Finance News • Jan 12, 2026
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            The Great Decoupling: India’s Semiconductor Ambitions and the Future of Global Tech Value Chains
                        </h1>

                        <p className="text-xl text-slate-400 leading-relaxed font-light">
                            In a landmark shift for the global technology sector, India has officially crossed a critical threshold in its semiconductor journey.
                        </p>
                    </header>

                    {/* Featured Image placeholder/decoration */}
                    <div className="aspect-video rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-[#1a1f2e] to-[#0f1218] relative group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070')] bg-cover bg-center mix-blend-overlay opacity-40 group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-primary uppercase tracking-widest">Market Intelligence</p>
                                <p className="text-2xl font-bold">Reshaping the Silicon Map</p>
                            </div>
                            <Cpu className="h-12 w-12 text-primary/50" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <Zap className="text-primary h-6 w-6" /> Summary
                            </h2>
                            <p className="text-slate-300">
                                Following the recent signing of three major Memorandums of Understanding (MoUs) with leading silicon foundries from Taiwan and the United States, the subcontinent is moving from a design-heavy role to a full-scale manufacturing hub. This transition is backed by a renewed $10 billion incentive package under the &quot;India Semiconductor Mission&quot; (ISM), aimed at establishing at least two mega-fabs within the next three fiscal years.
                            </p>
                        </section>

                        <div className="grid md:grid-cols-2 gap-8 my-12">
                            <div className="p-8 rounded-3xl bg-[#1a1f2e] border border-white/5 space-y-4">
                                <AlertCircle className="text-primary h-8 w-8" />
                                <h3 className="text-xl font-bold">Why This Matters</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Semiconductors are the &quot;new oil&quot; of the 21st century. Historically, manufacturing has been concentrated in East Asia, creating a vulnerability exposed during recent shortages. India introduces a high-capacity, democratic alternative to the status quo.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-4">
                                <BarChart3 className="text-indigo-400 h-8 w-8" />
                                <h3 className="text-xl font-bold">Market Outlook</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    For global corporations, India offers a &quot;China Plus One&quot; strategy. For the tech industry, a successful Indian ecosystem means lower logistics costs and a more resilient global distribution network.
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
                                    The immediate impact is most visible in the &quot;BSE Teck&quot; index. Companies involved in chemical logistics, industrial water treatment, and specialized construction have seen a 15-20% uptick in trading volumes. Furthermore, the localized chip production may reduce the massive import bill, improving India&apos;s Current Account Deficit (CAD).
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-indigo-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                                    <Globe className="h-4 w-4" /> Wall Street (Global)
                                </h4>
                                <p className="text-slate-300">
                                    Global hardware indices, including the Philadelphia Semiconductor Index (SOX), are pricing in the potential of reduced production bottlenecks. Venture capital previously targeted at software services is now pivoting toward deep-tech hardware startups within the Indian corridor.
                                </p>
                            </div>
                        </section>

                        <section className="p-10 rounded-3xl bg-gradient-to-br from-[#1a1f2e] to-black border border-white/10 space-y-6 my-12">
                            <h2 className="text-2xl font-bold text-white">Expert-Style Analysis</h2>
                            <p className="text-slate-400 italic">
                                &quot;India&apos;s semiconductor ambition is a high-stakes gamble with significant structural hurdles. On one hand, India possesses nearly 20% of the world’s semiconductor design engineers. On the other, the path to becoming a &apos;Silicon Superpower&apos; requires 100% uninterrupted power and ultra-pure water supplies.&quot;
                            </p>
                            <p className="text-slate-300">
                                India’s success will depend on its ability to build &quot;ancillary clusters&quot;—the hundreds of smaller companies that provide the gases, chemicals, and specialized machinery required by the mega-fabs. Without this local ecosystem, India risks becoming a &quot;kit assembly&quot; point rather than a true manufacturing powerhouse.
                            </p>
                        </section>

                        <section className="space-y-4 pt-12 border-t border-white/5">
                            <h2 className="text-2xl font-bold">Conclusion</h2>
                            <p className="text-slate-300 underline decoration-primary/50 underline-offset-8">
                                As we look toward 2030, India’s semiconductor mission represents more than just industrial policy; it is a play for digital sovereignty. For investors, this marks the beginning of a &quot;Hardware Decade&quot; for the Indian economy.
                            </p>
                        </section>
                    </div>

                    {/* Footer / Share */}
                    <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <Globe className="text-primary h-6 w-6" />
                            </div>
                            <div>
                                <h5 className="font-bold">Global Finance Editorial</h5>
                                <p className="text-slate-500 text-sm">Insight & Analysis Team</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="border-white/10 hover:bg-white/5">
                                <Share2 className="mr-2 h-4 w-4" /> Share Insight
                            </Button>
                            <Button className="bg-primary hover:bg-primary-hover text-white">
                                Follow Sector
                            </Button>
                        </div>
                    </footer>
                </article>
            </main>
        </div>
    );
}
