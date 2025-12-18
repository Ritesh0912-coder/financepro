'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, Sparkles } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatDate, truncate } from '@/lib/utils';

interface NewsCardProps {
    id: string;
    title: string;
    summary?: string;
    category: string;
    source: string;
    imageUrl?: string;
    publishedAt: Date | string;
    isBreaking?: boolean;
    isFeatured?: boolean;
}

export function NewsCard({
    id,
    title,
    summary,
    category,
    source,
    imageUrl,
    publishedAt,
    isBreaking,
    isFeatured,
}: NewsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            <Link href={`/news/${id}`}>
                <Card
                    className={cn(
                        'card-hover h-full overflow-hidden group cursor-pointer',
                        isBreaking && 'border-red-500/50',
                        isFeatured && 'border-orange-500/50'
                    )}
                >
                    {/* Image */}
                    {imageUrl && (
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={imageUrl}
                                alt={title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                            {isBreaking && (
                                <div className="absolute top-3 left-3">
                                    <Badge variant="danger" className="breaking-pulse">
                                        🔴 BREAKING
                                    </Badge>
                                </div>
                            )}
                        </div>
                    )}

                    <CardHeader className={cn(!imageUrl && 'pt-6')}>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="info">{category}</Badge>
                            {isFeatured && (
                                <Badge variant="warning">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    Featured
                                </Badge>
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-orange-400 transition-colors">
                            {title}
                        </h3>
                    </CardHeader>

                    <CardContent>
                        {summary && (
                            <p className="text-sm text-slate-400 line-clamp-3">
                                {truncate(summary, 150)}
                            </p>
                        )}
                    </CardContent>

                    <CardFooter className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                            <span>{source}</span>
                            <ExternalLink className="h-3 w-3" />
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </motion.div>
    );
}

export function NewsCardSkeleton() {
    return (
        <Card className="h-full overflow-hidden">
            <div className="h-48 skeleton" />
            <CardHeader>
                <div className="h-4 w-20 skeleton rounded" />
                <div className="h-6 w-full skeleton rounded mt-2" />
                <div className="h-6 w-3/4 skeleton rounded mt-1" />
            </CardHeader>
            <CardContent>
                <div className="h-4 w-full skeleton rounded" />
                <div className="h-4 w-5/6 skeleton rounded mt-1" />
            </CardContent>
            <CardFooter>
                <div className="h-3 w-24 skeleton rounded" />
            </CardFooter>
        </Card>
    );
}
