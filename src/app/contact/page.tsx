'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-lg text-slate-400">
                        We're here to help. Reach out to us for any inquiries or support.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="bg-[#1a1f2e] border-slate-700/50">
                            <CardContent className="p-6 flex items-start space-x-4">
                                <Mail className="w-6 h-6 text-indigo-400 mt-1" />
                                <div>
                                    <h3 className="text-white font-medium text-lg">Email Us</h3>
                                    <p className="text-slate-400 text-sm mt-1">
                                        For general inquiries:
                                        <br />
                                        <a href="mailto:info@globalfinancein.com" className="text-indigo-400 hover:text-indigo-300">info@globalfinancein.com</a>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#1a1f2e] border-slate-700/50">
                            <CardContent className="p-6 flex items-start space-x-4">
                                <Phone className="w-6 h-6 text-green-400 mt-1" />
                                <div>
                                    <h3 className="text-white font-medium text-lg">Call Us</h3>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Mon-Fri from 9am to 6pm
                                        <br />
                                        <span className="text-white">+1 (555) 123-4567</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-[#1a1f2e] border-slate-700/50">
                            <CardContent className="p-6 flex items-start space-x-4">
                                <MapPin className="w-6 h-6 text-orange-400 mt-1" />
                                <div>
                                    <h3 className="text-white font-medium text-lg">Visit Us</h3>
                                    <p className="text-slate-400 text-sm mt-1">
                                        123 Financial District,
                                        <br />
                                        New York, NY 10005
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#1a1f2e] border border-slate-700/50 rounded-xl p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>

                        {status === 'success' && (
                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-400">
                                <CheckCircle className="h-5 w-5" />
                                <p>Message sent successfully! We'll allow 24 hours for a response.</p>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
                                <AlertCircle className="h-5 w-5" />
                                <p>Failed to send message. Please try again later.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-slate-300">First Name</label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        required
                                        className="bg-[#0f1218] border-slate-700 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-slate-300">Last Name</label>
                                    <Input
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        required
                                        className="bg-[#0f1218] border-slate-700 text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    required
                                    className="bg-[#0f1218] border-slate-700 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                                <Input
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    required
                                    className="bg-[#0f1218] border-slate-700 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your message..."
                                    rows={4}
                                    required
                                    className="bg-[#0f1218] border-slate-700 text-white"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                                {!loading && <MessageSquare className="ml-2 h-4 w-4" />}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

