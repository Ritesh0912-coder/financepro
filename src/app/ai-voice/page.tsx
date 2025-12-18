'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Mic, X, MicOff, MoreHorizontal,
    Plus, Library, Compass, LayoutGrid, LineChart,
    MoreHorizontal as MoreIcon, Bell, Settings,
    Globe, Paperclip, MonitorPlay, AudioWaveform,
    Send, Sparkles, User, Bot
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// --- Voice Sphere Visualizer Component ---
const VoiceSphere = ({ state }: { state: 'idle' | 'listening' | 'processing' | 'speaking' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; size: number; angle: number; speed: number; orbit: number }[] = [];
        const particleCount = 200;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: 0,
                y: 0,
                size: Math.random() * 2 + 0.5,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.005,
                orbit: Math.random() * 80 + 40
            });
        }

        const render = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Transparent bg
            ctx.fillStyle = 'rgba(15, 18, 24, 0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // COLORS: Orange Theme - Refined palette
            const sphereColor = state === 'listening'
                ? '#f97316' // Orange-500
                : (state === 'speaking'
                    ? '#fb923c' // Orange-400
                    : (state === 'processing'
                        ? '#ea580c' // Orange-600
                        : '#52525b')); // Zinc-600

            ctx.fillStyle = sphereColor;

            particles.forEach((p, i) => {
                if (state === 'idle') {
                    p.angle += p.speed;
                } else if (state === 'listening') {
                    p.angle += p.speed * 3;
                    const pulse = Math.sin(time * 0.005) * 20;
                    p.orbit = 100 + (Math.random() * 20) + pulse;
                } else if (state === 'processing') {
                    p.angle += p.speed * 8;
                    p.orbit = 60 + Math.sin(time * 0.01 + i) * 10;
                } else if (state === 'speaking') {
                    p.angle += p.speed;
                    p.orbit = 80 + Math.sin(time * 0.01 + (i * 0.1)) * 30 * Math.sin(time * 0.002);
                }

                const x = centerX + Math.cos(p.angle) * p.orbit;
                const y = centerY + Math.sin(p.angle) * p.orbit;
                const scale = Math.cos(p.angle) * 0.5 + 1;

                ctx.globalAlpha = 0.6 * scale;
                ctx.beginPath();
                ctx.arc(x, y, p.size * scale, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render(0);

        return () => cancelAnimationFrame(animationFrameId);
    }, [state]);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
        />
    );
};

// --- Left Sidebar Component ---
const Sidebar = () => (
    <div className="hidden md:flex flex-col w-20 border-r border-white/5 bg-[#0f1218] items-center py-6 gap-8 z-20 sticky top-0 h-screen">
        {/* Logo/New */}
        <div className="bg-orange-600/20 p-2.5 rounded-xl text-orange-500 hover:text-white hover:bg-orange-600 cursor-pointer transition-all duration-300">
            <Sparkles className="h-6 w-6" />
        </div>

        {/* Nav Icons */}
        <div className="flex flex-col gap-8 w-full items-center mt-4">
            <div className="flex flex-col items-center gap-1 group cursor-pointer relative">
                <div className="absolute left-0 w-1 h-8 bg-orange-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <Library className="h-6 w-6 text-slate-400 group-hover:text-orange-400 transition-colors" />
                <span className="text-[10px] text-slate-500 font-medium group-hover:text-orange-400">Library</span>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <Compass className="h-6 w-6 text-slate-400 group-hover:text-orange-400 transition-colors" />
                <span className="text-[10px] text-slate-500 font-medium group-hover:text-orange-400">Discover</span>
            </div>
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <LayoutGrid className="h-6 w-6 text-slate-400 group-hover:text-orange-400 transition-colors" />
                <span className="text-[10px] text-slate-500 font-medium group-hover:text-orange-400">Spaces</span>
            </div>
        </div>

        <div className="mt-auto flex flex-col gap-6 items-center">
            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                <Bell className="h-6 w-6 text-slate-400 group-hover:text-orange-400 transition-colors" />
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-transparent hover:ring-orange-500/50 transition-all cursor-pointer shadow-lg shadow-orange-500/20">
                U
            </div>
        </div>
    </div>
);

// --- Main Page Component ---
export default function AiVoicePage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'search' | 'voice'>('search');

    // Voice Logic State
    const [state, setState] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');
    const [transcript, setTranscript] = useState('');
    const [inputQuery, setInputQuery] = useState(''); // Text Input State
    const [aiResponse, setAiResponse] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);

    // New State for Chat Mode
    const [hasInteraction, setHasInteraction] = useState(false);

    // Ref for Speech Recognition
    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, aiResponse]);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false; // Easier for turn-taking
                recognition.interimResults = false;
                recognition.lang = 'en-US';

                recognition.onstart = () => {
                    setState('listening');
                    setTranscript('');
                };

                recognition.onresult = (event: any) => {
                    const text = event.results[0][0].transcript;
                    setTranscript(text);
                    handleUserQuery(text, 'voice');
                };

                recognitionRef.current = recognition;
            }
        }
    }, []);

    // Effect to auto-start voice when switching to voice mode
    useEffect(() => {
        if (viewMode === 'voice' && state === 'idle' && recognitionRef.current) {
            // Small delay to allow transition
            const timer = setTimeout(() => {
                try { recognitionRef.current.start(); } catch (e) { console.log("Already started"); }
            }, 500);
            return () => clearTimeout(timer);
        } else if (viewMode === 'search') {
            if (state === 'speaking') window.speechSynthesis.cancel();
            if (state === 'listening') recognitionRef.current?.stop();
            setState('idle');
        }
    }, [viewMode]);

    const speak = useCallback((text: string) => {
        setState('speaking');
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
            setState('idle');
        };
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes("Google US English")) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }, []);

    const handleUserQuery = async (text: string, mode: 'text' | 'voice') => {
        if (!text.trim()) return;

        if (mode === 'voice') {
            setViewMode('voice');
            setState('processing');
        } else {
            setViewMode('search'); // Ensure we stay in search
            setHasInteraction(true);
            setAiResponse(''); // Clear previous response display if usage was mixed
        }

        const newMessages = [...messages, { role: 'user' as const, content: text }];
        setMessages(newMessages);
        setInputQuery(''); // Clear input

        try {
            const res = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            const data = await res.json();

            if (data.reply) {
                // Update messages with AI response
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

                if (mode === 'voice') {
                    setAiResponse(data.reply);
                    speak(data.reply);
                }
                // For text mode, we just updated 'messages', so it will appear in the list.
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error." }]);
            if (mode === 'voice') {
                setAiResponse("Network error.");
                setState('idle');
            }
        }
    };

    const toggleListening = () => {
        if (state === 'listening') {
            recognitionRef.current?.stop();
            setState('idle');
        } else if (state === 'speaking') {
            window.speechSynthesis.cancel();
            recognitionRef.current?.start();
        } else {
            recognitionRef.current?.start();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleUserQuery(inputQuery, 'text');
        }
    }

    return (
        <div className="fixed inset-0 bg-[#0f1218] z-[100] flex font-sans text-white overflow-hidden selection:bg-orange-500/30">

            {/* Sidebar (Always visible in Search Mode) */}
            {viewMode === 'search' && <Sidebar />}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">

                {/* --- Search / Chat Mode View --- */}
                <div
                    className={`flex-1 flex flex-col relative transition-opacity duration-500 ${viewMode === 'search' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none absolute inset-0'}`}
                >
                    {/* Header (Back button) */}
                    <div className="absolute top-6 right-6 z-10">
                        <Link href="/">
                            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white hover:bg-white/5 rounded-full">
                                <X className="h-6 w-6" />
                            </Button>
                        </Link>
                    </div>

                    {/* Chat History Area - Scrollable */}
                    <div className="flex-1 overflow-y-auto no-scrollbar w-full flex flex-col items-center pt-20 pb-40 px-4">
                        {!hasInteraction ? (
                            // Empty State / Intro
                            <div className="flex-1 flex flex-col items-center justify-center space-y-8 opacity-100 transition-opacity duration-500">
                                <h1 className="text-4xl font-medium text-white tracking-tight text-center">
                                    Where knowledge begins
                                </h1>
                            </div>
                        ) : (
                            // Message List
                            <div className="w-full max-w-3xl space-y-8 animate-in fade-in duration-500">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={cn("flex gap-4", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                        {msg.role === 'assistant' && (
                                            <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-1">
                                                <Bot className="h-5 w-5 text-orange-500" />
                                            </div>
                                        )}
                                        <div className={cn(
                                            "max-w-[80%] rounded-2xl p-4 text-lg leading-relaxed shadow-sm",
                                            msg.role === 'user'
                                                ? "bg-[#1a1f2e] text-slate-200 rounded-tr-sm"
                                                : "text-slate-100"
                                        )}>
                                            {msg.content}
                                        </div>
                                        {msg.role === 'user' && (
                                            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1">
                                                <User className="h-5 w-5 text-slate-400" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {/* Loading Indicator */}
                                {messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                                    <div className="flex gap-4 justify-start">
                                        <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <Bot className="h-5 w-5 text-orange-500" />
                                        </div>
                                        <div className="flex items-center gap-1 h-12">
                                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Bottom Input Area - Fixed */}
                    <div className="w-full flex justify-center pb-8 pt-4 px-4 bg-gradient-to-t from-[#0f1218] via-[#0f1218] to-transparent z-20">
                        <div className="w-full max-w-3xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
                            <div className="relative bg-[#1a1f2e] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col justify-between group-hover:border-orange-500/30 transition-colors">
                                <textarea
                                    placeholder="Ask anything..."
                                    className="bg-transparent border-none outline-none text-lg text-white w-full resize-none placeholder:text-slate-500 font-light max-h-[150px]"
                                    rows={1}
                                    style={{ minHeight: '60px' }}
                                    value={inputQuery}
                                    onChange={(e) => setInputQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />

                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 border border-white/5">
                                            <Globe className="h-4 w-4 text-orange-400" />
                                            <span className="text-xs font-medium">Focus</span>
                                        </Button>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Text Send Button */}
                                        <Button
                                            size="icon"
                                            className={cn("h-8 w-8 rounded-full transition-all", inputQuery.trim() ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-slate-700 text-slate-400")}
                                            onClick={() => handleUserQuery(inputQuery, 'text')}
                                            disabled={!inputQuery.trim()}
                                        >
                                            <Send className="h-4 w-4" />
                                        </Button>

                                        <div className="h-6 w-px bg-white/10 mx-1" />

                                        {/* THE VOICE TRIGGER BUTTON */}
                                        <Button
                                            size="icon"
                                            className="h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105 hover:shadow-orange-500/40"
                                            onClick={() => setViewMode('voice')}
                                        >
                                            <AudioWaveform className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Chips (Only show if no interaction yet for cleaner look) */}
                            {!hasInteraction && (
                                <div className="flex flex-wrap justify-center gap-3 mt-6">
                                    {[
                                        { icon: LayoutGrid, label: 'Plan' },
                                        { icon: Globe, label: 'Local' },
                                        { icon: LineChart, label: 'Compare' },
                                        { icon: MoreIcon, label: 'Latest News' },
                                    ].map((chip) => (
                                        <button
                                            key={chip.label}
                                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-[#1a1f2e] text-slate-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all text-sm font-medium"
                                        >
                                            <chip.icon className="h-4 w-4" />
                                            {chip.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                {/* --- Voice Mode Overlay (Conversation) --- */}
                <div
                    className={`absolute inset-0 z-50 bg-[#0f1218] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${viewMode === 'voice' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}
                >
                    {/* Close Voice Mode */}
                    <div className="absolute top-6 right-6 z-50">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-white rounded-full h-12 w-12 bg-white/5 hover:bg-white/10 backdrop-blur border border-white/5"
                            onClick={() => setViewMode('search')}
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Main Visualizer */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl px-6 animate-in fade-in duration-1000 delay-300">
                        <div className="relative group cursor-pointer" onClick={toggleListening}>
                            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
                            <VoiceSphere state={state} />
                        </div>

                        {/* Text Display */}
                        <div className="mt-12 text-center min-h-[140px] space-y-6 max-w-2xl">
                            {/* Only show text here if it's voice interaction */}
                            {state === 'listening' ? (
                                <div className="flex flex-col items-center gap-3">
                                    <span className="text-3xl font-light text-orange-400 animate-pulse">
                                        Listening...
                                    </span>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {transcript && (
                                        <p className="text-3xl font-light text-slate-200 tracking-wide leading-snug">"{transcript}"</p>
                                    )}
                                    {aiResponse && state !== 'listening' && (
                                        <div className="bg-[#1a1f2e]/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm max-h-[40vh] overflow-y-auto no-scrollbar shadow-2xl">
                                            <p className="text-lg text-slate-300 font-normal leading-relaxed text-left">
                                                {aiResponse}
                                            </p>
                                        </div>
                                    )}
                                    {!transcript && !aiResponse && (
                                        <p className="text-4xl font-light text-slate-600">Start talking...</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Voice Controls */}
                    <div className="absolute bottom-12 w-full flex items-center justify-center gap-8">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-14 w-14 rounded-full bg-[#1a1f2e] hover:bg-slate-800 text-slate-400 border border-white/10 backdrop-blur-md transition-colors"
                            onClick={() => { setMessages([]); setAiResponse(''); setTranscript(''); setInputQuery(''); setHasInteraction(false); }}
                        >
                            <MoreHorizontal className="h-6 w-6" />
                        </Button>

                        <Button
                            size="icon"
                            className={`h-24 w-24 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-105 border-4 ${state === 'listening'
                                    ? 'bg-red-500 hover:bg-red-600 border-red-400/30 shadow-red-500/40 animate-pulse'
                                    : 'bg-orange-500 hover:bg-orange-400 border-orange-400/30 shadow-orange-500/30 text-white'
                                }`}
                            onClick={toggleListening}
                        >
                            {state === 'listening' ? (
                                <MicOff className="h-10 w-10 text-white" />
                            ) : (
                                <Mic className="h-10 w-10 text-white" />
                            )}
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
