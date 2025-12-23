import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Terms of Service</h1>

                <div className="space-y-8 text-slate-300">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">1. Agreement to Terms</h2>
                        <p>
                            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you")
                            and Global Finance ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form,
                            media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">2. Intellectual Property Rights</h2>
                        <p>
                            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software,
                            website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks,
                            service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us,
                            and are protected by copyright and trademark laws and various other intellectual property rights.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">3. User Representations</h2>
                        <p>
                            By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete;
                            (2) you will maintain the accuracy of such information and promptly update such registration information as necessary;
                            (3) you have the legal capacity and you agree to comply with these Terms of Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">4. Disclaimer</h2>
                        <p>
                            The site and financial data provided is for informational purposes only. We are not financial advisors and information on the site
                            should not be taken as financial advice. All investment decisions are your own responsibility.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
