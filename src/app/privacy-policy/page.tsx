import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="h-8 w-8 text-green-400" />
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
                    </div>
                    <p className="text-slate-400">Last updated: December 16, 2025</p>
                </div>

                <div className="space-y-8 text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                        <p className="mb-4">
                            Welcome to Global Finance IN ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                            If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at privacy@globalfinancein.com.
                        </p>
                        <p>
                            When you visit our website, we appreciate that you are trusting us with your personal information. We take your privacy very seriously.
                            In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                        <p className="mb-4">
                            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services,
                            when you participate in activities on the website or otherwise when you contact us.
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Name and Contact Data (Email address, phone number, etc.)</li>
                            <li>Credentials (Passwords, hint questions, etc.)</li>
                            <li>Payment Data (Credit card numbers, etc. if applicable)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                        <p>
                            We use personal information collected via our website for a variety of business purposes described below.
                            We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you,
                            with your consent, and/or for compliance with our legal obligations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Sharing Your Information</h2>
                        <p>
                            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
                        <p>
                            If you have questions or comments about this policy, you may email us at privacy@globalfinancein.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
