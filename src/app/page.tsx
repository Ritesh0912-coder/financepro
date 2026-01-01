
import React from 'react';
import { Newspaper, Zap } from 'lucide-react';
import { fetchFinanceNews } from '@/lib/news-api';
import NewsFeedList from '@/components/news-feed-list';



import { Hero } from '@/components/home/Hero';



import { Suspense } from 'react';

async function NewsFeedSection() {
  const { articles: newsArticles } = await fetchFinanceNews(1, 15, 'finance');
  return <NewsFeedList news={newsArticles as any[]} />;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0f1218] pb-12">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-2">
        <div className="space-y-12">



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

