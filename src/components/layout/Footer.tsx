import React from 'react';
import Link from 'next/link';
import { Globe, Github, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
    markets: [
        { label: 'Stock Indices', href: '/markets' },
        { label: 'Foreign Exchange', href: '/markets?type=forex' },
        // Removed Commodities/Crypto
    ],
    news: [

        { label: 'Breaking', href: '/news?category=breaking' },
        { label: 'Stocks', href: '/news?category=stocks' },

    ],
    tools: [
        { label: 'LTP Calculator', href: '/ltp-calculator' },
        // Removed Global Tracker/Alerts
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
    return (
        <footer className="border-t border-white/5 bg-[#0f1218] pt-20 pb-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <Globe className="h-8 w-8 text-orange-400" />
                            <span className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                                GLOBAL FINANCE IN
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-slate-400">
                            Your premier destination for global financial intelligence and market insights.
                        </p>
                        <div className="mt-4 flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">Markets</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.markets.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                                    >
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
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                                    >
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
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                                    >
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
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} Global Finance IN. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link href="/privacy" className="hover:text-orange-400 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-orange-400 transition-colors">Terms</Link>
                        <Link href="/cookies" className="hover:text-orange-400 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
