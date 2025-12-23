import React from 'react';

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Cookie Policy</h1>

                <div className="space-y-8 text-slate-300">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">1. What Are Cookies</h2>
                        <p>
                            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                            Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
                            as well as to provide reporting information.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">2. How We Use Cookies</h2>
                        <p>
                            We use cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate,
                            and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests
                            of our users to enhance the experience on our Online Properties.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">3. Types of Cookies We Use</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Essential website cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website.</li>
                            <li><strong>Performance and functionality cookies:</strong> These cookies are used to enhance the performance and functionality of our Website.</li>
                            <li><strong>Analytics and customization cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">4. Controlling Cookies</h2>
                        <p>
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager.
                            Because these cookies are strictly necessary to deliver the Website to you, you cannot refuse them.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
