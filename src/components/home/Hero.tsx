'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Zap } from 'lucide-react';
import ShinyText from '@/components/ui/shiny-text';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import LiquidEther from '@/components/ui/LiquidEther';
// import FluidGlass from '@/components/ui/FluidGlass';
import Hyperspeed, { hyperspeedPresets } from '@/components/ui/Hyperspeed';
// import InfiniteMenu from '@/components/ui/InfiniteMenu';

export function Hero() {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    return (
        <div
            ref={divRef}
            className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-white/5 bg-[#0f1218]"
        >
            {/* Hyperspeed Background */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <Hyperspeed
                    effectOptions={hyperspeedPresets.five}
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-10 py-32 pointer-events-none">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 rounded-full border border-orange-500/10 bg-black/20 px-4 py-1.5 text-sm text-orange-400 backdrop-blur-md pointer-events-auto"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    Live Market Updates & Analysis
                </motion.div>

                {/* Main Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4 pointer-events-auto"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">
                        Global Finance <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">IN</span>
                    </h1>
                    <ShinyText
                        text="Master the Markets with Precision"
                        className="text-2xl md:text-4xl font-light block tracking-wide text-slate-200"
                        speed={4}
                    />
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md pointer-events-auto"
                >
                    Stay ahead with real-time global insights, advanced LTP tools, and a community of disciplined investors.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 py-6 pointer-events-auto"
                >
                    <Link href="/news">
                        <Button size="lg" className="h-14 px-10 text-lg bg-white text-black hover:bg-slate-200 transition-all duration-300 font-medium rounded-full shadow-lg shadow-white/5">
                            <Newspaper className="mr-2 h-5 w-5" />
                            Latest News
                        </Button>
                    </Link>
                    <Link href="/ltp-calculator">
                        <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/10 hover:bg-white/5 text-white backdrop-blur-md rounded-full transition-all duration-300">
                            <Zap className="mr-2 h-5 w-5 text-orange-400" />
                            LTP Tools
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
