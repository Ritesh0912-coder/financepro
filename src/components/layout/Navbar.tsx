'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Globe,
    Newspaper,
    Calculator,
    TrendingUp,
    AlertTriangle,
    Menu,
    X,
    Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NavbarMenu } from "@/components/ui/navbar-menu";

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/news', label: 'News', icon: Newspaper },
    { href: '/ltp-calculator', label: 'LTP Calculator', icon: Calculator },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className={cn(
            "sticky top-4 z-50 mx-4 md:mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#1a1f2e]/70 backdrop-blur-xl shadow-lg shadow-black/20 transition-all duration-300",
            isOpen && "rounded-b-none"
        )}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-orange-500 blur-lg opacity-50" />
                            <Globe className="relative h-8 w-8 text-orange-400" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                            GLOBAL FINANCE IN
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <NavbarMenu items={navItems.map(item => ({ name: item.label, link: item.href }))} />
                    </div>

                    {/* Admin Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/admin/login">
                            <Button variant="outline" size="sm">
                                Admin
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden border-t border-white/10 bg-[#1a1f2e]/95 backdrop-blur-xl rounded-b-2xl overflow-hidden"
                >
                    <div className="px-4 py-4 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div
                                        className={cn(
                                            'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                                            isActive
                                                ? 'bg-orange-500/20 text-orange-400'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </div>
                                </Link>
                            );
                        })}
                        <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800">
                                Admin Panel
                            </div>
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
