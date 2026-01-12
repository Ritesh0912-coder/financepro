
import React from 'react';
import { Newspaper, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { fetchFinanceNews } from '@/lib/news-api';
import NewsFeedList from '@/components/news-feed-list';



import { Hero } from '@/components/home/Hero';
import { BrandMission } from '@/components/home/BrandMission';
import { AIMarketInsight } from '@/components/home/AIMarketInsight';

import { Suspense } from 'react';

async function NewsFeedSection() {
  const { articles: newsArticles } = await fetchFinanceNews(1, 15, 'finance');
  return <NewsFeedList news={newsArticles as any[]} />;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f1218] pb-12">
      <Hero />
      <BrandMission />

      <main className="max-w-7xl mx-auto px-4 py-2">
        <AIMarketInsight />
        <div className="space-y-12">

          {/* Featured Analysis Section */}
          <section className="py-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <Zap className="h-5 w-5 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Featured Analysis</h2>
            </div>

            <Link href="/news/analysis/semiconductor-leap">
              <div className="group relative bg-[#1a1f2e] border border-white/5 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-64 md:h-auto relative overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070"
                      alt="Semiconductor"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f2e] via-transparent to-transparent hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-transparent md:hidden" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                    <Badge className="w-fit bg-primary/10 text-primary border-primary/20">Market Insight</Badge>
                    <h3 className="text-3xl font-bold text-white group-hover:text-primary transition-colors">
                      The Great Decoupling: India&apos;s Semiconductor Ambitions
                    </h3>
                    <p className="text-slate-400 text-lg line-clamp-3">
                      The US Justice Department’s initiation of a criminal investigation into Federal Reserve Chair Jerome Powell has introduced an unprecedented "Autonomy Crisis" to global financial markets. This systemic shift threatens the perceived neutrality of the world’s reserve currency, sparking a record-breaking flight to precious metals. For India, the probe presents a complex dual-impact scenario of relative currency stability amidst broader global institutional fragility.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      Read Depth Analysis <ArrowLeft className="h-4 w-4 rotate-180" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>

          {/* News Feed (Centered) */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Newspaper className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white">Latest Market Intelligence</h2>
            </div>

            <Suspense fallback={<div className="text-white/20">Loading news...</div>}>
              <NewsFeedSection />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

