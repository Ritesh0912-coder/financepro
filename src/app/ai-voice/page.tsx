'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Mic, X, Plus, Search, Send, Sparkles, User, Globe, ArrowUp, Volume2
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- Particle Component ---
const Particle = ({ delay }: { delay: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            x: [0, (Math.random() - 0.5) * 150],
            y: [0, (Math.random() - 0.5) * 150],
        }}
        transition={{
            duration: 2,
            repeat: Infinity,
            delay: delay,
            ease: "easeOut"
        }}
        className="absolute w-1 h-1 bg-orange-400 rounded-full blur-[1px]"
    />
);

// --- Minimalist Orb Component with Particles ---
const GlowingOrb = ({ state }: { state: 'idle' | 'listening' | 'processing' | 'speaking' }) => {
    const particleCount = 24;

    return (
        <div className="relative flex items-center justify-center w-56 h-56"> {/* Shrinked Orb Container */}
            {/* Listening Particles */}
            <AnimatePresence>
                {state === 'listening' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {[...Array(particleCount)].map((_, i) => (
                            <Particle key={i} delay={i * 0.1} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Base Glow */}
            <motion.div
                animate={{
                    scale: state === 'listening' ? [1, 1.3, 1] : state === 'speaking' ? [1, 1.1, 1] : [1, 1.05, 1],
                    opacity: state === 'listening' ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: state === 'listening' ? 1 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 bg-orange-500 rounded-full blur-[50px]"
            />

            {/* Core Orb */}
            <motion.div
                animate={{
                    scale: state === 'processing' ? [1, 0.9, 1.1, 1] : 1,
                    rotate: state === 'processing' ? 360 : 0,
                    boxShadow: state === 'speaking'
                        ? "0 0 60px rgba(249,115,22,0.6)"
                        : "0 0 40px rgba(249,115,22,0.4)"
                }}
                transition={{
                    duration: 2,
                    repeat: state === 'processing' ? Infinity : 0,
                    ease: "linear"
                }}
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 via-red-500 to-orange-600 border border-white/20 overflow-hidden z-10"
            >
                {/* Internal Moving Gradients */}
                <motion.div
                    animate={{
                        x: ['-50%', '50%', '-50%'],
                        y: ['-50%', '50%', '-50%']
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-[-100%] bg-gradient-to-tr from-yellow-400/20 via-transparent to-white/10 blur-2xl"
                />
            </motion.div>

            {/* Visualizer Rings for Speaking */}
            {state === 'speaking' && (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute w-32 h-32 border-2 border-orange-500/30 rounded-full"
                />
            )}
        </div>
    );
};

export default function AiVoicePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [inputQuery, setInputQuery] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [state, setState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
    const [hasInteraction, setHasInteraction] = useState(false);

    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load Chat History
    useEffect(() => {
        const fetchHistory = async () => {
            if (status === 'authenticated') {
                try {
                    const res = await fetch('/api/ai-chat');
                    const data = await res.json();
                    if (data.messages && data.messages.length > 0) {
                        setMessages(data.messages);
                        setHasInteraction(true); // Jump to chat view if history exists
                    }
                } catch (error) {
                    console.error("Failed to fetch history:", error);
                }
            }
        };
        fetchHistory();
    }, [status]);

    // Auth Protection
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login');
        }
    }, [status, router]);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = 'en-US';
                recognition.onstart = () => { setState('listening'); };
                recognition.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    handleUserQuery(text, 'voice');
                };
                recognition.onend = () => { if (state === 'listening') setState('idle'); };
                recognitionRef.current = recognition;
            }
        }
    }, [state]);

    const speak = useCallback((text: string) => {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        setState('speaking');
        const utterance = new SpeechSynthesisUtterance(text);

        // Pick a premium sounding voice if available
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English'));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => setState('idle');
        utterance.onerror = () => setState('idle');
        window.speechSynthesis.speak(utterance);
    }, []);

    const handleUserQuery = async (text: string, mode: 'text' | 'voice') => {
        if (!text.trim()) return;
        setHasInteraction(true);
        const newMessages = [...messages, { role: 'user' as const, content: text }];
        setMessages(newMessages);
        setInputQuery('');
        setState('processing');

        try {
            const res = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });
            const data = await res.json();

            if (data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
                // Always speak the response
                speak(data.reply);
            } else {
                setState('idle');
            }
        } catch (error) {
            console.error(error);
            setState('idle');
        }
    };

    const toggleListening = () => {
        if (state === 'listening') {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-[#060606] flex items-center justify-center">
                <div className="h-8 w-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-[#060606] text-white flex flex-col items-center justify-center p-4 selection:bg-orange-500/30 overflow-hidden">

            {/* Initial View */}
            <AnimatePresence mode="wait">
                {!hasInteraction ? (
                    <motion.div
                        key="landing"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="flex flex-col items-center gap-8 mt-[-10vh]"
                    >
                        <GlowingOrb state={state} />

                        <div className="text-center space-y-4 px-6 max-w-lg">
                            <h2 className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed tracking-tight">
                                Welcome, <span className="text-orange-400 font-medium">{session.user?.name || 'Explorer'}</span>.
                                <br />Ask <span className="text-orange-400">FGA</span> for elite market intelligence.
                            </h2>
                        </div>
                    </motion.div>
                ) : (
                    /* Interaction View */
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-3xl flex flex-col gap-6 py-6 pb-32 min-h-[85vh] overflow-y-auto no-scrollbar"
                    >
                        <div className="flex justify-center mb-4 sticky top-0 z-10 py-4 bg-gradient-to-b from-[#060606] via-[#060606]/95 to-transparent">
                            <div className="scale-50 opacity-50 transform transition-transform hover:scale-55 cursor-pointer" onClick={() => setHasInteraction(false)}>
                                <GlowingOrb state={state} />
                            </div>
                        </div>

                        <div className="space-y-4 px-4 md:px-10">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={cn(
                                        "flex gap-4 p-4 md:p-5 rounded-[1.5rem] border transition-all relative group",
                                        msg.role === 'user'
                                            ? "bg-orange-500/[0.03] border-orange-500/10 self-end max-w-[80%]"
                                            : "bg-white/[0.02] border-white/5 self-start max-w-[85%]"
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-inner",
                                        msg.role === 'assistant' ? "bg-orange-500 text-white shadow-orange-500/20" : "bg-slate-800 text-slate-400"
                                    )}>
                                        {msg.role === 'assistant' ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-slate-200 text-sm md:text-base leading-relaxed font-normal">
                                            {msg.content}
                                        </div>
                                        {msg.role === 'assistant' && (
                                            <button
                                                onClick={() => speak(msg.content)}
                                                className="flex items-center gap-1.5 text-[10px] text-orange-400/50 hover:text-orange-400 transition-colors mt-2 tracking-widest font-semibold uppercase"
                                            >
                                                <Volume2 className="h-3 w-3" />
                                                Replay
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div ref={messagesEndRef} className="h-10" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input Bar (Premium Refined) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
                <div className="bg-[#121212]/90 border border-white/10 rounded-full p-1.5 px-5 backdrop-blur-2xl flex items-center gap-3 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-orange-500/20 transition-all">
                    <button className="h-9 w-9 flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                        <Plus className="h-4 w-4" />
                    </button>

                    <input
                        className="flex-1 bg-transparent border-none outline-none px-2 py-2 text-sm placeholder:text-slate-600 text-white font-light"
                        placeholder="Intelligence request..."
                        value={inputQuery}
                        onChange={(e) => setInputQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleUserQuery(inputQuery, 'text'); }}
                    />

                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={toggleListening}
                            className={cn(
                                "h-9 w-9 rounded-full flex items-center justify-center transition-all",
                                state === 'listening' ? "bg-red-500 text-white shadow-lg shadow-red-500/40 animate-pulse" : "text-slate-500 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Mic className="h-4 w-4" />
                        </button>

                        <button
                            className={cn(
                                "h-9 w-9 rounded-full flex items-center justify-center transition-all",
                                inputQuery.trim() ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-white/5 text-slate-600"
                            )}
                            onClick={() => handleUserQuery(inputQuery, 'text')}
                            disabled={!inputQuery.trim()}
                        >
                            <ArrowUp className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
