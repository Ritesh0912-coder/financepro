'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Github, Twitter, Linkedin } from 'lucide-react';
import { usePathname } from 'next/navigation';

const footerLinks = {
    markets: [
        { label: 'Stock Indices', href: '/news?category=markets' },
        { label: 'Foreign Exchange', href: '/news?category=forex' },
    ],
    news: [
        { label: 'Breaking', href: '/news?category=breaking' },
        { label: 'Stocks', href: '/news?category=stocks' },
    ],
    tools: [
        { label: 'LTP Calculator', href: '/ltp-calculator' },
    ],
    legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
    ],
    company: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ],
};

export function Footer() {
    const pathname = usePathname();

    // Hide footer on AI voice page for a cleaner minimalist look
    if (pathname === '/ai-voice') return null;

    return (
        <footer className="border-t border-white/5 bg-[#0f1218] pt-20 pb-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                                <img
                                    src="/logo.png"
                                    alt="Global Finance IN Logo"
                                    className="relative h-12 w-12 object-contain rounded-full border border-white/10 shadow-lg"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight text-white leading-tight">
                                    GLOBAL <span className="text-orange-500">FINANCE</span>
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-orange-400/80 font-medium">Intelligence Network</span>
                            </div>
                        </Link>
                        <p className="mt-4 text-sm text-slate-400">
                            Your premier destination for global financial intelligence and market insights.
                        </p>
                        <div className="mt-4 flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">Markets</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.markets.map((link) => (
                                <li key={`${link.label}-${link.href}`}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">News</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.news.map((link) => (
                                <li key={`${link.label}-${link.href}`}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">Tools</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.tools.map((link) => (
                                <li key={`${link.label}-${link.href}`}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">Company</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={`${link.label}-${link.href}`}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Global Finance IN. All rights reserved. By Ritesh shinde
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
                        <Link href="/cookies" className="hover:text-primary transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
