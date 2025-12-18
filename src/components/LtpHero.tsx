'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, TrendingUp, Users, ArrowRight } from 'lucide-react';

export function LtpHero() {
    return (
        <div className="relative overflow-hidden py-20 lg:py-28">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge variant="outline" className="mb-6 border-orange-500/50 text-orange-400 px-4 py-1 text-sm">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Revolutionizing Option Trading
                        </Badge>
                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                            Master the Markets <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                                with LTP Calculator
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-lg">
                            Join Dr. Vinay Prakash Tiwari and 50,000+ traders using the most advanced tool to decode option chain data and predict market movements with precision.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 shadow-lg shadow-orange-500/25 h-14 px-8 text-lg rounded-full"
                                onClick={() => window.open('https://nseoptionchain.ltpcalculator.com/', '_blank')}
                            >
                                Start Calculating Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-slate-700 hover:bg-slate-800 text-white h-14 px-8 text-lg rounded-full">
                                <PlayCircle className="mr-2 w-5 h-5 text-orange-400" /> Watch Demo
                            </Button>
                        </div>

                        <div className="mt-12 flex items-center gap-6 text-slate-400">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-orange-400" />
                                <span className="font-semibold text-white">50k+</span> Community
                            </div>
                            <div className="w-px h-6 bg-slate-700" />
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-400" />
                                <span className="font-semibold text-white">94%</span> Accuracy
                            </div>
                        </div>
                    </motion.div>

                    {/* Image / Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Increased height and optimized contain/cover for the person image */}
                        <div className="relative z-10 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-orange-900/20 glass min-h-[600px] flex items-end justify-center group">
                            {/* Dr. Vinay Image - Using local asset */}
                            <img
                                src="/images/dr-vinay-nobg.png"
                                alt="Dr. Vinay Prakash Tiwari"
                                className="w-auto h-full max-h-[750px] object-cover transform hover:scale-105 transition-transform duration-700 absolute bottom-0"
                            />

                            {/* Floating Card Effect - Made wider/longer */}
                            <div className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl transform transition-transform group-hover:translate-y-[-5px]">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-orange-500/30">
                                        VT
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Dr. Vinay Prakash Tiwari</h3>
                                        <p className="text-orange-400 text-sm font-medium">Founder, LTP Calculator</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decor elements - Animated */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full mix-blend-multiply filter blur-[64px] opacity-60 animate-blob" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-[64px] opacity-60 animate-blob animation-delay-2000" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
