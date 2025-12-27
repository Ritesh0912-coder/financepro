'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { getContactMessages } from '@/actions/admin';
import Link from 'next/link';

interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    read: boolean;
}

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        setLoading(true);
        const res = await getContactMessages();
        if (res.success && res.data) {
            setMessages(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="min-h-screen bg-[#0f1218] pt-32 pb-20 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <Link href="/admin/dashboard" className="flex items-center text-slate-400 hover:text-white mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
                    </div>
                    <Button onClick={fetchMessages} variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Refresh
                    </Button>
                </div>

                <div className="grid gap-4">
                    {loading ? (
                        <div className="text-center py-20 text-slate-500">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 bg-[#1a1f2e] rounded-xl border border-slate-700/50">
                            <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No messages found.</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <Card key={msg.id} className="bg-[#1a1f2e] border-slate-700/50 hover:border-indigo-500/30 transition-all">
                                <CardHeader className="flex flex-row items-start justify-between pb-2">
                                    <div>
                                        <CardTitle className="text-lg font-medium text-white">{msg.subject}</CardTitle>
                                        <p className="text-sm text-slate-400 mt-1">
                                            From: <span className="text-indigo-400">{msg.name}</span> ({msg.email})
                                        </p>
                                    </div>
                                    <span className="text-xs text-slate-500 whitespace-nowrap">
                                        {new Date(msg.date).toLocaleDateString()} {new Date(msg.date).toLocaleTimeString()}
                                    </span>
                                </CardHeader>
                                <CardContent>
                                    <div className="mt-2 p-4 bg-[#0f1218] rounded-lg border border-slate-800 text-slate-300 text-sm whitespace-pre-wrap">
                                        {msg.message}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
