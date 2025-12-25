"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

interface NavbarMenuProps {
    items?: { name: string; link: string }[];
}

export const NavbarMenu = ({ items }: NavbarMenuProps) => {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(pathname);
    const { data: session } = useSession();
    const router = useRouter();

    const navItems = items || [
        { name: "Home", link: "/" },
        { name: "News", link: "/news" },
        { name: "LTP Calculator", link: "/ltp-calculator" },
    ];

    const handleNavClick = (e: React.MouseEvent, link: string) => {
        e.preventDefault();
        if (!session) {
            router.push('/auth/login');
        } else {
            setActiveTab(link);
            router.push(link);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-1">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.link}
                        onClick={(e) => handleNavClick(e, item.link)}
                        className={cn(
                            "relative cursor-pointer text-sm font-medium px-4 py-2 rounded-full transition-colors",
                            activeTab === item.link ? "text-white" : "text-slate-400 hover:text-slate-200"
                        )}
                        onMouseEnter={() => setActiveTab(item.link)}
                    >
                        {activeTab === item.link && (
                            <motion.div
                                layoutId="active-pill"
                                className="absolute inset-0 bg-orange-500 rounded-full mix-blend-screen"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{item.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
