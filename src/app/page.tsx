
import React from 'react';
import { Newspaper, Zap } from 'lucide-react';
import { fetchFinanceNews } from '@/lib/news-api';
import NewsFeedList from '@/components/news-feed-list';



import { Hero } from '@/components/home/Hero';

import { MarketMoodIndexCompact } from '@/components/market/MarketMoodIndexCompact';
import { FiiDiiActivityCompact } from '@/components/market/FiiDiiActivityCompact';

import CinematicIntro from '@/components/CinematicIntro';

export default async function HomePage() {
  // Fetch more articles for a dense feed
  const { articles: newsArticles } = await fetchFinanceNews(1, 15, 'finance'); // Broad finance search

  return (
    <div className="min-h-screen bg-[#0f1218] pb-12">
      <CinematicIntro />
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-2">
        <div className="space-y-12">

          {/* Market Insights Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <Zap className="h-5 w-5 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Market Insights</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MarketMoodIndexCompact />
              <FiiDiiActivityCompact />
            </div>
          </section>

          {/* News Feed (Centered) */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <Newspaper className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Latest Market Intelligence</h2>
            </div>

            <NewsFeedList news={newsArticles as any[]} />
          </div>
        </div>
      </main>
    </div>
  );
}

