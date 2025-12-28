'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Mic, X, Plus, Search, Send, Sparkles, User, Globe, ArrowUp, Volume2, MessageSquare, Menu, ChevronLeft, Trash2
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
        <div className="relative flex items-center justify-center w-56 h-56">
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
                <motion.div
                    animate={{
                        x: ['-50%', '50%', '-50%'],
                        y: ['-50%', '50%', '-50%']
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-[-100%] bg-gradient-to-tr from-yellow-400/20 via-transparent to-white/10 blur-2xl"
                />
            </motion.div>

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

interface ChatSession {
    _id: string;
    title: string;
    updatedAt: string;
}

export default function AiVoicePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [inputQuery, setInputQuery] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [state, setState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
    const [hasInteraction, setHasInteraction] = useState(false);

    // Session Management
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fetch Sessions Helper
    const fetchSessions = useCallback(async () => {
        try {
            const res = await fetch('/api/ai-chat?mode=list');
            if (res.ok) {
                const data = await res.json();
                setSessions(data.sessions || []);
            }
        } catch (error) {
            console.error("Failed to fetch sessions:", error);
        }
    }, []);

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

    const speak = useCallback(async (text: string) => {
        window.speechSynthesis.cancel();
        setState('speaking');
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Google US English'));
        if (preferredVoice) utterance.voice = preferredVoice;

        await new Promise<void>(resolve => {
            utterance.onend = () => {
                setState('idle');
                resolve();
            };
            utterance.onerror = () => {
                setState('idle');
                resolve();
            };
            window.speechSynthesis.speak(utterance);
        });
    }, []);

    // Load History & Start Fresh
    useEffect(() => {
        if (status === 'authenticated') {
            fetchSessions();
            startNewChat();
        }
    }, [status, fetchSessions]);

    const handleUserQuery = async (text: string, mode: 'text' | 'voice') => {
        if (!text.trim()) return;

        const userMsg = { role: 'user' as const, content: text };
        const newMessages = [...messages, userMsg];

        // UI Updates
        setMessages([...newMessages, { role: 'assistant', content: 'Thinking...' }]);
        setInputQuery("");
        setHasInteraction(true);
        setState('processing');

        let accumulatedReply = "";

        try {
            const res = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages, sessionId: currentSessionId })
            });

            if (!res.ok) throw new Error(`API Error: ${res.status}`);

            const newSessionId = res.headers.get('X-Session-Id');
            if (newSessionId && newSessionId !== currentSessionId) {
                setCurrentSessionId(newSessionId);
                fetchSessions();
            }

            const reader = res.body?.getReader();
            if (!reader) return;

            const decoder = new TextDecoder();
            setState('speaking');

            // Clear "Thinking..." indicator on first chunk
            let isFirstChunk = true;

            while (true) {
                try {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    accumulatedReply += chunk;

                    if (isFirstChunk) {
                        isFirstChunk = false;
                        setMessages(prev => {
                            const updated = [...prev];
                            const lastMsg = updated[updated.length - 1];
                            if (lastMsg && lastMsg.role === 'assistant') lastMsg.content = "";
                            return updated;
                        });
                    }

                    setMessages(prev => {
                        const updated = [...prev];
                        const lastMsg = updated[updated.length - 1];
                        if (lastMsg && lastMsg.role === 'assistant') {
                            lastMsg.content = accumulatedReply;
                        }
                        return updated;
                    });
                    scrollToBottom();
                } catch (readError) {
                    console.error("Stream interrupted:", readError);
                    break; // Keep what we have
                }
            }

            // Check if the server returned a JSON error message instead of a stream
            if (!isFirstChunk && accumulatedReply.startsWith('{"reply":')) {
                const errorJson = JSON.parse(accumulatedReply);
                accumulatedReply = errorJson.reply;
                setMessages(prev => [...newMessages, { role: 'assistant', content: accumulatedReply }]);
            }

            if (accumulatedReply.trim() && accumulatedReply !== 'Thinking...') {
                await speak(accumulatedReply);
            }

        } catch (error) {
            console.error("Chat Error:", error);
            setState('idle');
            // If we have some content, keep it, otherwise remove the empty bubble
            if (!accumulatedReply.trim()) {
                setMessages(newMessages);
            }
        } finally {
            setState('idle');
            setTimeout(fetchSessions, 1000);
        }
    };

    const toggleListening = () => {
        if (state === 'listening') {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    const loadSession = async (sessionId: string) => {
        setCurrentSessionId(sessionId);
        setHasInteraction(true);
        setMessages([]);

        try {
            const res = await fetch(`/api/ai-chat?sessionId=${sessionId}`);
            const data = await res.json();
            if (data.messages) {
                setMessages(data.messages);
            }
        } catch (error) {
            console.error("Failed to load session:", error);
        }

        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    const startNewChat = () => {
        setCurrentSessionId(null);
        setMessages([]);
        setHasInteraction(false);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    const deleteSession = async (sessionId: string) => {
        try {
            const res = await fetch(`/api/ai-chat?sessionId=${sessionId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setSessions(prev => prev.filter(s => s._id !== sessionId));
                if (currentSessionId === sessionId) {
                    startNewChat();
                }
            }
        } catch (error) {
            console.error("Failed to delete session:", error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
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
        <div className="flex fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-[#060606] text-white overflow-hidden font-sans selection:bg-orange-500/30">
            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 0, opacity: isSidebarOpen ? 1 : 0 }}
                className="bg-[#0a0a0a] border-r border-white/5 flex-shrink-0 relative z-[100] overflow-hidden h-full pt-4 shadow-2xl"
            >
                <div className="p-4 flex flex-col h-full w-[280px]">
                    <button
                        onClick={startNewChat}
                        className="w-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 rounded-xl flex items-center justify-start px-4 gap-3 h-12 mb-6 transition-all group active:scale-95"
                    >
                        <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
                        <span className="text-sm font-semibold">New Chat</span>
                    </button>

                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">History</h3>
                        {sessions.map((sess) => (
                            <div key={sess._id} className="group flex items-center gap-1 pr-2">
                                <button
                                    onClick={() => loadSession(sess._id)}
                                    className={cn(
                                        "flex-1 text-left px-3 py-2.5 rounded-lg text-sm transition-all truncate flex items-center gap-2",
                                        currentSessionId === sess._id
                                            ? "bg-orange-500/10 text-orange-400 font-medium"
                                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                    )}
                                >
                                    <MessageSquare className="h-4 w-4 shrink-0 opacity-50" />
                                    <span className="truncate">{sess.title}</span>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm('Delete this chat?')) deleteSession(sess._id);
                                    }}
                                    className="p-1.5 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all rounded"
                                    title="Delete chat"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Main Chat Area */}
            <div className="flex-1 relative flex flex-col h-full overflow-hidden">
                <div className="absolute top-4 left-4 z-[110]">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors active:scale-90"
                    >
                        {isSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                <div className="flex-1 flex flex-col relative h-full">
                    <AnimatePresence mode="wait">
                        {!hasInteraction ? (
                            <motion.div
                                key="landing"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="flex flex-col items-center justify-center gap-8 h-full pb-32"
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
                            <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth relative">
                                <motion.div
                                    key="chat"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-full max-w-4xl mx-auto flex flex-col gap-6 px-4 pt-32 pb-64"
                                >
                                    <div className="flex justify-center py-4">
                                        <div className="scale-75 opacity-70 transition-transform hover:scale-80 cursor-pointer">
                                            <GlowingOrb state={state} />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {messages.map((msg, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                key={idx}
                                                className={cn(
                                                    "flex gap-4 p-4 rounded-2xl border transition-all relative group shadow-xl max-w-[85%] w-fit",
                                                    msg.role === 'user'
                                                        ? "bg-orange-500/[0.08] border-orange-500/30 self-end rounded-tr-none"
                                                        : "bg-white/[0.05] border-white/10 self-start rounded-tl-none"
                                                )}
                                            >
                                                <div className={cn(
                                                    "h-7 w-7 rounded-full flex items-center justify-center shrink-0 shadow-inner",
                                                    msg.role === 'assistant' ? "bg-orange-500 text-white shadow-orange-500/40" : "bg-slate-800 text-slate-400"
                                                )}>
                                                    {msg.role === 'assistant' ? <Sparkles className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={cn(
                                                        "text-slate-200 text-sm md:text-base leading-relaxed font-normal whitespace-pre-wrap",
                                                        msg.content === 'Thinking...' && "animate-pulse italic opacity-60"
                                                    )}>
                                                        {msg.content}
                                                    </div>
                                                    {msg.role === 'assistant' && msg.content !== 'Thinking...' && (
                                                        <button
                                                            onClick={() => speak(msg.content)}
                                                            className="flex items-center gap-1.5 text-[10px] text-orange-400/50 hover:text-orange-400 transition-colors mt-3 tracking-widest font-semibold uppercase"
                                                        >
                                                            <Volume2 className="h-3 w-3" />
                                                            Replay
                                                        </button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div ref={messagesEndRef} className="h-4" />
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Input Bar */}
                    <div className="absolute bottom-0 w-full z-50 p-8 bg-gradient-to-t from-[#060606] via-[#060606]/95 to-transparent">
                        <div className="w-full max-w-3xl mx-auto">
                            <div className="bg-[#121212]/95 border border-white/10 rounded-full p-2 pl-6 backdrop-blur-3xl flex items-center gap-3 shadow-2xl hover:border-orange-500/30 transition-all ring-1 ring-white/5">
                                <button
                                    onClick={startNewChat}
                                    className="h-10 w-10 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                                    title="New Chat"
                                >
                                    <Plus className="h-5 w-5" />
                                </button>

                                <input
                                    className="flex-1 bg-transparent border-none outline-none py-3 text-base placeholder:text-slate-600 text-white font-light"
                                    placeholder="Ask FGA Expert..."
                                    value={inputQuery}
                                    onChange={(e) => setInputQuery(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleUserQuery(inputQuery, 'text'); }}
                                />

                                <div className="flex items-center gap-2 pr-1">
                                    <button
                                        onClick={toggleListening}
                                        className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                                            state === 'listening' ? "bg-red-500 text-white animate-pulse" : "text-slate-500 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <Mic className="h-5 w-5" />
                                    </button>

                                    <button
                                        className={cn(
                                            "h-10 w-10 rounded-full flex items-center justify-center transition-all",
                                            inputQuery.trim() ? "bg-orange-500 text-white" : "bg-white/5 text-slate-600"
                                        )}
                                        onClick={() => handleUserQuery(inputQuery, 'text')}
                                        disabled={!inputQuery.trim()}
                                    >
                                        <ArrowUp className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
