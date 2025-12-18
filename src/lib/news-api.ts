import { INews } from '@/models/News';

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: Array<{
        source: { id: string | null; name: string };
        author: string | null;
        title: string;
        description: string;
        url: string;
        urlToImage: string | null;
        publishedAt: string;
        content: string | null;
    }>;
}

// Simple in-memory cache to prevent hitting rate limits during dev
// key: query-string, value: { timestamp, data }
const cache: Record<string, { timestamp: number; data: { articles: Partial<INews>[]; total: number } }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchFinanceNews(page = 1, pageSize = 20, query = ''): Promise<{ articles: Partial<INews>[], total: number }> {
    if (!NEWS_API_KEY) {
        console.warn('NewsAPI Key is missing');
        return { articles: [], total: 0 };
    }

    const cacheKey = `${page}-${pageSize}-${query}`;
    if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
        console.log('Serving news from cache');
        return cache[cacheKey].data;
    }

    try {
        const endpoint = query ? 'everything' : 'top-headlines';
        const params = new URLSearchParams({
            apiKey: NEWS_API_KEY,
            page: page.toString(),
            pageSize: pageSize.toString(),
        });

        if (query) {
            params.append('q', query);
            params.append('language', 'en');
            params.append('sortBy', 'publishedAt');
        } else {
            params.append('category', 'business');
            params.append('country', 'us');
        }

        const response = await fetch(`${BASE_URL}/${endpoint}?${params.toString()}`, { 
            next: { revalidate: 300 } 
        });

        if (!response.ok) {
            console.error(`NewsAPI Error: ${response.status} ${response.statusText}`);
            return { articles: [], total: 0 };
        }

        const data: NewsAPIResponse = await response.json();

        if (data.status !== 'ok') {
            console.error('NewsAPI returned status:', data.status);
            return { articles: [], total: 0 };
        }

        const articles = data.articles
            .filter(article => article.title !== '[Removed]') // Filter removed articles
            .map(article => {
                // Determine mock impact for display if not analyzed yet
                // Real analysis happens via Groq on the detailed page
                const isPositive = /surge|rise|high|gain|profit|bull/i.test(article.title);
                const isNegative = /drop|fall|low|loss|bear|crash/i.test(article.title);
                const impact = isPositive ? 'Positive' : (isNegative ? 'Negative' : 'Neutral');

                return {
                    title: article.title,
                    slug: article.url, 
                    content: article.content || article.description || '',
                    summary: article.description || '',
                    source: article.source.name,
                    sourceUrl: article.url,
                    imageUrl: article.urlToImage || undefined,
                    category: 'Finance',
                    tags: ['finance', 'business'],
                    author: article.author || undefined,
                    publishedAt: new Date(article.publishedAt),
                    isBreaking: false,
                    isFeatured: false,
                    marketImpact: impact,
                    aiSummary: 'Click for AI Analysis' 
                };
            });

        const result = {
            articles: articles as unknown as Partial<INews>[],
            total: data.totalResults
        };

        cache[cacheKey] = { timestamp: Date.now(), data: result };
        return result;

    } catch (error) {
        console.error('Error fetching NewsAPI:', error);
        return { articles: [], total: 0 };
    }
}
