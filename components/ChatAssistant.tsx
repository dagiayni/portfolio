"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: number;
    text: string;
    isBot: boolean;
    timestamp: Date;
}

// Extend window type for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "👋 Hello! I'm Dagim's assistant. How can I help you today?",
            isBot: true,
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Voice states
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [speechSupported, setSpeechSupported] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);
    const transcriptRef = useRef<string>(""); // tracks latest spoken text for auto-send

    // Check browser support & setup on mount
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setSpeechSupported(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join("");
                setInputValue(transcript);
                transcriptRef.current = transcript; // keep ref in sync for auto-send
            };

            recognition.onend = () => {
                setIsListening(false);
                // Auto-send if there's a spoken transcript
                const spoken = transcriptRef.current.trim();
                if (spoken) {
                    transcriptRef.current = ""; // clear ref before sending
                    handleSendMessageRef.current(spoken);
                }
            };

            recognition.onerror = () => {
                setIsListening(false);
                transcriptRef.current = "";
            };

            recognitionRef.current = recognition;
        }

        if (typeof window !== "undefined" && window.speechSynthesis) {
            synthRef.current = window.speechSynthesis;
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

    // Stop speaking when chat closes
    useEffect(() => {
        if (!isOpen && synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    }, [isOpen]);

    // ─── VOICE INPUT ─────────────────────────────────────────────────────────
    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            setInputValue("");
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    // Keep a stable ref to handleSendMessage so recognition.onend can call it
    // without closing over a stale version
    const handleSendMessageRef = useRef<(text: string) => void>(() => { });

    // ─── VOICE OUTPUT ─────────────────────────────────────────────────────────
    const speakText = useCallback((text: string) => {
        if (!synthRef.current || !voiceEnabled) return;

        // Convert markdown into natural spoken language
        const lines = text.split("\n");
        const spokenParts: string[] = [];
        const bulletBuffer: string[] = [];

        const flushBullets = () => {
            if (bulletBuffer.length === 0) return;
            // Join bullets with commas so it sounds like a list, not a wall of text
            spokenParts.push(bulletBuffer.join(", ") + ".");
            bulletBuffer.length = 0;
        };

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) {
                // Empty line = natural breath/pause
                flushBullets();
                continue;
            }

            // Bold header/label line e.g. "**Services Offered**" or "**Email:** dagim@..."
            if (/^\*\*/.test(trimmed)) {
                flushBullets();
                // Strip bold markers, then add a period so TTS pauses after each label
                const header = trimmed.replace(/\*\*([^*]+)\*\*/g, "$1").trim();
                spokenParts.push(header.endsWith(".") ? header : header + ".");
                continue;
            }

            // Bullet point line — collect into buffer for comma-joined reading
            if (trimmed.startsWith("•") || trimmed.startsWith("-")) {
                const item = trimmed.replace(/^[•\-]\s*/, "").trim();
                bulletBuffer.push(item);
                continue;
            }

            // Regular sentence
            flushBullets();
            spokenParts.push(trimmed);
        }

        flushBullets();
        // Join parts, then strip any leftover * characters the AI may have output
        const cleanText = spokenParts
            .join(" ")
            .replace(/\*/g, "")       // remove stray asterisks
            .replace(/\s+/g, " ")     // collapse multiple spaces
            .trim();

        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;

        // Pick a good English voice if available
        const voices = synthRef.current.getVoices();
        const preferred = voices.find(
            (v) => v.lang.startsWith("en") && (v.name.includes("Google") || v.name.includes("Natural"))
        ) || voices.find((v) => v.lang.startsWith("en"));
        if (preferred) utterance.voice = preferred;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    }, [voiceEnabled]);

    const stopSpeaking = () => {
        synthRef.current?.cancel();
        setIsSpeaking(false);
    };

    // ─── RENDER MARKDOWN ──────────────────────────────────────────────────────
    const renderMessage = (text: string) => {
        return text.split("\n").map((line, i) => {
            const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
                if (/^\*\*[^*]+\*\*$/.test(part)) {
                    return <strong key={j}>{part.slice(2, -2)}</strong>;
                }
                return <span key={j}>{part}</span>;
            });

            const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
            return (
                <div
                    key={i}
                    className={isBullet ? "flex items-start gap-1 mt-1" : (line.trim() === "" ? "h-2" : "mt-0.5")}
                >
                    {parts}
                </div>
            );
        });
    };

    // ─── SEND MESSAGE ─────────────────────────────────────────────────────────
    const handleSendMessage = useCallback(async (overrideText?: string) => {
        const textToSend = (overrideText ?? inputValue).trim();
        if (!textToSend || isLoading) return;

        // Stop recognition if still active
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        }

        const newUserMessage: Message = {
            id: Date.now(),
            text: textToSend,
            isBot: false,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: textToSend }),
            });

            const data = await response.json();

            if (data.status === "success") {
                const botResponse: Message = {
                    id: Date.now() + 1,
                    text: data.response,
                    isBot: true,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, botResponse]);
                // Speak the response if voice is enabled
                speakText(data.response);
            } else {
                const errorMessage: Message = {
                    id: Date.now() + 1,
                    text: `Error: ${data.message || "Something went wrong."}`,
                    isBot: true,
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            }
        } catch (error: any) {
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "I'm having trouble connecting. Please try again.",
                isBot: true,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speakText]);

    // Keep ref pointing to latest handleSendMessage
    useEffect(() => {
        handleSendMessageRef.current = handleSendMessage;
    }, [handleSendMessage]);

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9998] w-14 h-14 bg-[#111111] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-black transition-colors duration-200"
                aria-label="Open assistant"
            >
                {isOpen ? <X size={28} /> : <Bot size={28} />}
            </motion.button>

            {/* Chat Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[9997] flex items-center justify-center pointer-events-none md:pointer-events-auto">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                        />

                        {/* Chat Window */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className={cn(
                                "relative pointer-events-auto flex flex-col bg-white overflow-hidden shadow-2xl",
                                "w-[90vw] h-[70vh] max-w-[400px] max-h-[620px] rounded-2xl md:rounded-3xl"
                            )}
                        >
                            {/* Header */}
                            <div className="bg-[#111111] p-5 flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                                        <Bot className="text-white" size={24} />
                                    </div>
                                    {/* Speaking pulse ring */}
                                    {isSpeaking && (
                                        <motion.div
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                                            transition={{ repeat: Infinity, duration: 1.2 }}
                                            className="absolute inset-0 rounded-full border-2 border-green-400"
                                        />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-bold text-lg tracking-tight">Assistant</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className={cn("w-2 h-2 rounded-full", isListening ? "bg-red-400" : "bg-green-400")} />
                                        <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">
                                            {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Online"}
                                        </span>
                                    </div>
                                </div>

                                {/* Voice toggle (mute/unmute bot speech) */}
                                <button
                                    onClick={() => {
                                        if (isSpeaking) stopSpeaking();
                                        setVoiceEnabled((v) => !v);
                                    }}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                    title={voiceEnabled ? "Mute voice" : "Enable voice"}
                                >
                                    {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                                </button>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[#F9F9F9]">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex items-end gap-2",
                                            msg.isBot ? "justify-start" : "justify-end"
                                        )}
                                    >
                                        {msg.isBot && (
                                            <div className="w-8 h-8 rounded-full bg-white border border-[#EEEEEE] flex items-center justify-center shrink-0">
                                                <Bot size={16} className="text-[#111111]" />
                                            </div>
                                        )}
                                        <div
                                            className={cn(
                                                "max-w-[85%] p-4 text-sm font-medium leading-relaxed shadow-sm",
                                                msg.isBot
                                                    ? "bg-white text-[#111111] rounded-2xl rounded-bl-none border border-[#EEEEEE]"
                                                    : "bg-[#111111] text-white rounded-2xl rounded-br-none"
                                            )}
                                        >
                                            <div className="space-y-0.5">{renderMessage(msg.text)}</div>
                                        </div>
                                    </div>
                                ))}

                                {/* Typing indicator */}
                                {isLoading && (
                                    <div className="flex items-end gap-2 justify-start">
                                        <div className="w-8 h-8 rounded-full bg-white border border-[#EEEEEE] flex items-center justify-center shrink-0">
                                            <Bot size={16} className="text-[#111111]" />
                                        </div>
                                        <div className="bg-white text-[#111111] rounded-2xl rounded-bl-none border border-[#EEEEEE] p-4 shadow-sm">
                                            <div className="flex gap-1">
                                                {[0, 0.2, 0.4].map((delay, i) => (
                                                    <motion.span
                                                        key={i}
                                                        animate={{ opacity: [0, 1, 0] }}
                                                        transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.5, 1], delay }}
                                                        className="w-1.5 h-1.5 bg-[#111111] rounded-full"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-[#EEEEEE] bg-white">
                                {/* Listening indicator */}
                                <AnimatePresence>
                                    {isListening && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mb-2 flex items-center gap-2 px-3"
                                        >
                                            <div className="flex gap-0.5">
                                                {[0, 0.1, 0.2, 0.1, 0].map((delay, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ scaleY: [0.4, 1, 0.4] }}
                                                        transition={{ repeat: Infinity, duration: 0.8, delay }}
                                                        className="w-1 h-4 bg-red-500 rounded-full"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-red-500 font-semibold">Listening… speak now</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }}
                                    className="flex items-center gap-2 bg-[#F9F9F9] p-2 rounded-2xl border border-[#EEEEEE] focus-within:border-[#111111] transition-all"
                                >
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={isListening ? "Listening..." : "Type or speak..."}
                                        className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 text-[#111111] outline-none"
                                    />

                                    {/* Mic button — only shown if browser supports it */}
                                    {speechSupported && (
                                        <motion.button
                                            type="button"
                                            onClick={toggleListening}
                                            whileTap={{ scale: 0.9 }}
                                            className={cn(
                                                "p-2.5 rounded-xl transition-all",
                                                isListening
                                                    ? "bg-red-500 text-white shadow-md shadow-red-200"
                                                    : "bg-[#F0F0F0] text-[#111111] hover:bg-[#E5E5E5]"
                                            )}
                                            title={isListening ? "Stop listening" : "Speak"}
                                        >
                                            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                                        </motion.button>
                                    )}

                                    {/* Send button */}
                                    <button
                                        type="submit"
                                        disabled={!inputValue.trim() || isLoading}
                                        className="p-2.5 bg-[#111111] text-white rounded-xl hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                                <div className="mt-2 text-[9px] text-center text-[#999999] font-bold uppercase tracking-widest opacity-50">
                                    Powered by Groq AI
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
