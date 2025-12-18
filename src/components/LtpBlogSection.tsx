'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const BLOG_POSTS = [
    {
        title: "Options vs Futures: Best Choice for Risk Mitigation",
        imageUrl: "/images/blog-1.png",
        description: "Compare options and futures trading to see which offers better risk mitigation strategies for investors and traders. Learn key differences and benefits.",
        link: "https://www.ltpcalculator.com/blogs/derivatives-and-risk-management/options-vs-future"
    },
    {
        title: "Black-Scholes Model Explained for Option Pricing",
        imageUrl: "/images/blog-2.png",
        description: "Understand the Black-Scholes Model for pricing options. Learn key formulas, assumptions, and how it's used in modern financial markets.",
        link: "https://www.ltpcalculator.com/blogs/derivatives-and-risk-management/understanding-black-scholes-model-for-option-pricing"
    },
    {
        title: "How Companies Use Derivatives to Hedge Risk Effectively",
        imageUrl: "/images/blog-3.png",
        description: "Discover how companies use derivatives like futures, options, and swaps to manage financial risks and protect against market volatility.",
        link: "https://www.ltpcalculator.com/blogs/derivatives-and-risk-management/how-companies-use-derivatives-to-hedge-risk"
    },
    {
        title: "Online Trading Academy: Meaning, Benefits & Alternatives",
        imageUrl: "/images/blog-4.png",
        description: "Discover what Online Trading Academy offers, its pros and cons, and the best alternatives for traders looking to enhance their skills and knowledge.",
        link: "https://www.ltpcalculator.com/blogs/online-trading-academy-meaning-benefits-alternatives"
    }
];

export function LtpBlogSection() {
    return (
        <div className="py-16 space-y-8">
            <div className="text-center">
                <Badge variant="outline" className="mb-4 border-orange-500/30 text-orange-400">
                    <BookOpen className="mr-1 h-3 w-3" />
                    Knowledge Hub
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Latest Insights & Strategies
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Master options trading with expert insights, technical analysis, and deep dives into market derivatives.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {BLOG_POSTS.map((post, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="h-full bg-[#1a1f2e] border-slate-700/50 overflow-hidden hover:border-orange-500/50 transition-colors group flex flex-col">
                            <div className="aspect-video w-full overflow-hidden relative bg-black/40 flex items-center justify-center">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] to-transparent opacity-60" />
                            </div>
                            <CardContent className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                                    {post.description}
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full border-slate-700 hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/50"
                                    onClick={() => window.open(post.link, '_blank')}
                                >
                                    Read Article <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-8">
                <Button
                    variant="ghost"
                    className="text-orange-400 hover:text-orange-300"
                    onClick={() => window.open('https://www.ltpcalculator.com/blogs', '_blank')}
                >
                    View All Articles <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
