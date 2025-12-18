import React from 'react';
import { Mail, MessageSquare, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
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
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-slate-300">First Name</label>
                                    <Input id="firstName" placeholder="John" className="bg-[#0f1218] border-slate-700 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-slate-300">Last Name</label>
                                    <Input id="lastName" placeholder="Doe" className="bg-[#0f1218] border-slate-700 text-white" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                                <Input id="email" type="email" placeholder="john@example.com" className="bg-[#0f1218] border-slate-700 text-white" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                                <Input id="subject" placeholder="How can we help?" className="bg-[#0f1218] border-slate-700 text-white" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                                <Textarea id="message" placeholder="Your message..." rows={4} className="bg-[#0f1218] border-slate-700 text-white" />
                            </div>

                            <Button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                Send Message <MessageSquare className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
