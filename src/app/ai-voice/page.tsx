'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Mic, X, Plus, Search, Send, Sparkles, User, Globe, ArrowUp, Volume2, MessageSquare, Menu, ChevronLeft, Trash2, Copy, RotateCcw, Check
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- Blue Energy Sphere Component ---
const EnergySphere = ({ state }: { state: string }) => {
    // Generate dense spherical particle cloud
    const particles = React.useMemo(() => {
        return Array.from({ length: 120 }).map((_, i) => {
            const phi = Math.acos(-1 + (2 * i) / 120);
            const theta = Math.sqrt(120 * Math.PI) * phi;
            const r = 90 + Math.random() * 20; // Radius variation for fuzziness
            return {
                x: r * Math.cos(theta) * Math.sin(phi),
                y: r * Math.sin(theta) * Math.sin(phi),
                z: r * Math.cos(phi),
                size: Math.random() * 2 + 1, // 1px to 3px
                color: Math.random() > 0.3 ? '#06b6d4' : '#ffffff' // Cyan or White
            };
        });
    }, []);

    return (
        <div className="relative w-64 h-64 flex items-center justify-center perspective-[800px]">
            {/* Horizontal Lens Flare / Glow Streaks */}
            <motion.div
                className="absolute w-[150%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0"
                animate={{
                    opacity: state === 'speaking' || state === 'listening' ? [0.2, 0.5, 0.2] : 0.1,
                    scaleX: state === 'speaking' ? [1, 1.2, 1] : 1
                }}
            />
            <motion.div
                className="absolute w-[120%] h-[2px] bg-blue-500/30 blur-[4px]"
                animate={{
                    opacity: state === 'processing' ? [0.2, 0.6, 0.2] : 0.2
                }}
            />

            {/* Central Bright Core */}
            <motion.div
                className="absolute w-16 h-16 bg-white rounded-full blur-[25px] z-0"
                animate={{
                    scale: state === 'speaking' ? [1, 1.5, 1] :
                        state === 'listening' ? [1, 1.2, 1] : [1, 1.1, 1],
                    opacity: state === 'speaking' ? 0.9 : 0.6
                }}
                transition={{
                    duration: state === 'speaking' ? 0.3 : 2,
                    repeat: Infinity
                }}
            />

            {/* Secondary Blue Glow */}
            <motion.div
                className="absolute w-32 h-32 bg-blue-600 rounded-full blur-[40px] z-0 opacity-40"
                animate={{
                    scale: state === 'processing' ? [1, 1.3, 1] : 1
                }}
            />

            {/* Rotating Particle Cloud */}
            <motion.div
                className="relative w-full h-full preserve-3d"
                animate={{
                    rotateY: 360,
                    rotateX: state === 'processing' ? 360 : 10
                }}
                transition={{
                    duration: state === 'processing' ? 5 : 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                            // Simple 3D projection approximation for static rendering in a rotating container
                            // The container rotates, so we just place them "in space"
                            transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px)`
                        }}
                        animate={{
                            opacity: [0.4, 0.9, 0.4],
                            scale: state === 'speaking' ? [1, 1.5, 1] : 1
                        }}
                        transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

const OrbVisualizer = ({ state }: { state: 'idle' | 'listening' | 'processing' | 'speaking' }) => {
    return (
        <div className="relative flex items-center justify-center w-64 h-64 overflow-visible scale-125">
            {/* Ambient Background for Depth */}
            <div className="absolute inset-[-50px] bg-blue-900/10 blur-[80px] rounded-full" />
            <EnergySphere state={state} />
        </div>
    );
};


interface ChatSession {
    _id: string;
    title: string;
}

export default function AiVoicePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [inputQuery, setInputQuery] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
    const [state, setState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
    const [hasInteraction, setHasInteraction] = useState(false);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    // Session Management
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMouseInSidebarZone, setIsMouseInSidebarZone] = useState(false);

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

    const copyToClipboard = async (text: string, idx: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(idx);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

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

            // Handle non-streaming JSON responses (e.g., balance errors)
            if (accumulatedReply.trim().startsWith('{"reply":')) {
                try {
                    const errorJson = JSON.parse(accumulatedReply);
                    accumulatedReply = errorJson.reply;
                    setMessages([...newMessages, { role: 'assistant', content: accumulatedReply }]);
                    isFirstChunk = false; // Prevent further processing
                } catch (parseErr) {
                    console.error("Failed to parse JSON error:", parseErr);
                }
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
        setInputQuery("");
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
        <div className="flex fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-[#060606] text-white overflow-hidden font-sans selection:bg-primary/30">
            {/* Cinematic Background Overlay (Blurred Room Effect) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-black to-black" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(30,30,50,0.4)_0%,transparent_70%)] blur-[100px]" />
            </div>

            {/* Sidebar Trigger Zone (Left Edge) */}
            <div
                className="fixed inset-y-0 left-0 w-4 z-[90]"
                onMouseEnter={() => {
                    setIsSidebarOpen(true);
                    setIsMouseInSidebarZone(true);
                }}
            />

            {/* Sidebar Overlay for Click-to-Close on Mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[95] md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{
                    x: isSidebarOpen ? 0 : -280,
                    opacity: isSidebarOpen ? 1 : 0
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                onMouseEnter={() => setIsMouseInSidebarZone(true)}
                onMouseLeave={() => {
                    setIsMouseInSidebarZone(false);
                    // Small delay to prevent flickering
                    setTimeout(() => {
                        setIsSidebarOpen(false);
                    }, 300);
                }}
                className="bg-[#0a0a0a] border-r border-white/5 w-[280px] fixed inset-y-0 left-0 z-[100] overflow-hidden pt-4 shadow-2xl"
            >
                <div className="p-4 flex flex-col h-full w-[280px]">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            startNewChat();
                        }}
                        className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl flex items-center justify-start px-4 gap-3 h-12 mb-6 transition-all group active:scale-95"
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
                                            ? "bg-primary/10 text-primary font-medium"
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
                <div className="absolute top-4 left-4 z-[110] flex items-center gap-4">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsSidebarOpen(!isSidebarOpen);
                        }}
                        className="p-2.5 rounded-xl bg-[#121212]/90 border border-white/10 text-slate-400 hover:text-white hover:border-primary/30 transition-all active:scale-90 flex items-center justify-center shadow-xl backdrop-blur-md"
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
                                <OrbVisualizer state={state} />
                                <div className="text-center space-y-4 px-6 max-w-lg">
                                    <h2 className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed tracking-tight">
                                        Welcome, <span className="text-primary font-medium">{session.user?.name || 'Explorer'}</span>.
                                        <br />Ask <span className="text-primary">FGA</span> for elite market intelligence.
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
                                            <OrbVisualizer state={state} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full space-y-6">
                                        {messages.map((msg, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                key={idx}
                                                className={cn(
                                                    "flex gap-4 p-4 rounded-2xl border transition-all relative group shadow-xl max-w-[85%]",
                                                    msg.role === 'user'
                                                        ? "bg-primary/[0.12] border-primary/30 self-end rounded-tr-none ml-auto flex-row-reverse"
                                                        : "bg-white/[0.05] border-white/10 self-start rounded-tl-none mr-auto"
                                                )}
                                            >
                                                <div className={cn(
                                                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-inner overflow-hidden ring-1",
                                                    msg.role === 'assistant'
                                                        ? "bg-primary text-white ring-primary/50 shadow-primary/40"
                                                        : "bg-slate-700 ring-white/20"
                                                )}>
                                                    {msg.role === 'assistant' ? (
                                                        <Sparkles className="h-4 w-4" />
                                                    ) : (
                                                        session?.user?.image ? (
                                                            <img
                                                                src={session.user.image}
                                                                alt={session.user.name || 'User'}
                                                                className="h-full w-full object-cover"
                                                                onError={(e) => {
                                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                                }}
                                                            />
                                                        ) : (
                                                            <User className="h-4 w-4 text-white/80" />
                                                        )
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={cn(
                                                        "text-slate-200 text-sm md:text-base leading-relaxed font-normal whitespace-pre-wrap",
                                                        msg.role === 'user' ? "text-right" : "text-left",
                                                        msg.content === 'Thinking...' && "animate-pulse italic opacity-60"
                                                    )}>
                                                        {msg.content}
                                                    </div>

                                                    <div className={cn(
                                                        "flex items-center gap-3 mt-3",
                                                        msg.role === 'user' ? "justify-end" : "justify-start"
                                                    )}>
                                                        {msg.role === 'assistant' && msg.content !== 'Thinking...' && (
                                                            <button
                                                                onClick={() => speak(msg.content)}
                                                                className="flex items-center gap-1.5 text-[10px] text-primary/50 hover:text-primary transition-colors tracking-widest font-semibold uppercase"
                                                            >
                                                                <Volume2 className="h-3.5 w-3.5" />
                                                                Replay
                                                            </button>
                                                        )}

                                                        <button
                                                            onClick={() => copyToClipboard(msg.content, idx)}
                                                            className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-300 transition-colors tracking-widest font-semibold uppercase"
                                                        >
                                                            {copiedId === idx ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                                                            {copiedId === idx ? 'Copied' : 'Copy'}
                                                        </button>

                                                        {msg.role === 'user' && (
                                                            <button
                                                                onClick={() => setInputQuery(msg.content)}
                                                                className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-slate-300 transition-colors tracking-widest font-semibold uppercase"
                                                            >
                                                                <RotateCcw className="h-3.5 w-3.5" />
                                                                Revert
                                                            </button>
                                                        )}
                                                    </div>
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
                            <div className="bg-[#121212]/95 border border-white/10 rounded-full p-2 pl-6 backdrop-blur-3xl flex items-center gap-3 shadow-2xl hover:border-primary/30 transition-all ring-1 ring-white/5">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startNewChat();
                                    }}
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
                                            inputQuery.trim() ? "bg-primary text-white" : "bg-white/5 text-slate-600"
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
