'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    useEffect(() => {
        const themeColor = (session?.user as any)?.themeColor || '#f97316';

        // Inject CSS variables into the root (html/body)
        const root = document.documentElement;
        root.style.setProperty('--primary-theme', themeColor);

        // Create a set of derived shades/opacity if needed
        // For now we just set the main one.
    }, [session]);

    return <>{children}</>;
}
