import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Privacy Policy</h1>

                <div className="space-y-8 text-slate-300">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
                        <p>
                            Welcome to Global Finance. We are committed to protecting your personal information and your right to privacy.
                            If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information,
                            please contact us.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">2. Information We Collect</h2>
                        <p>
                            We collect personal information that you voluntarily provide to us when you register on the website,
                            express an interest in obtaining information about us or our products and services, when you participate in activities on the website
                            or otherwise when you contact us.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
                        <p>
                            We use personal information collected via our website for a variety of business purposes described below.
                            We process your personal information for these purposes in reliance on our legitimate business interests,
                            in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>To facilitate account creation and logon process.</li>
                            <li>To send you marketing and promotional communications.</li>
                            <li>To send administrative information to you.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">4. Contact Us</h2>
                        <p>
                            If you have questions or comments about this policy, you may email us at support@globalfinance.in
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
