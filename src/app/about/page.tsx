import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">About Global Finance IN</h1>
                    <p className="text-lg text-slate-400">
                        Your premier destination for global financial news, market data, and investment intelligence.
                    </p>
                </div>

                <div className="space-y-6 text-slate-300">
                    <section className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
                        <p>
                            We provide real-time financial intelligence, market analysis, and institutional activity tracking 
                            to help investors make informed decisions in the dynamic world of finance.
                        </p>
                    </section>

                    <section className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-3">What We Offer</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Real-time Market Mood Index (MMI) tracking</li>
                            <li>FII & DII activity monitoring</li>
                            <li>Comprehensive financial news coverage</li>
                            <li>AI-powered market analysis</li>
                            <li>Live market data and indices</li>
                        </ul>
                    </section>

                    <section className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-3">Contact Us</h2>
                        <p>
                            For inquiries, partnerships, or feedback, please reach out to us at{' '}
                            <a href="mailto:contact@globalfinancein.com" className="text-indigo-400 hover:text-indigo-300">
                                contact@globalfinancein.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
