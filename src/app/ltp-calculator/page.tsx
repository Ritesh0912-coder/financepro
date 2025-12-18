'use client';

import React from 'react';
import { LtpHero } from '@/components/LtpHero';
import { LtpBlogSection } from '@/components/LtpBlogSection';
import { LtpFaq } from '@/components/LtpFaq';

export default function LTPCalculatorPage() {
    return (
        <div className="min-h-screen bg-[#0f1218]">
            {/* Hero Section with Dr. Vinay Image */}
            <LtpHero />

            {/* Blogs Section (only blogs with image) */}
            <div className="container mx-auto px-4 pb-20">
                <LtpBlogSection />

                {/* FAQ Section */}
                <LtpFaq />
            </div>
        </div>
    );
}
