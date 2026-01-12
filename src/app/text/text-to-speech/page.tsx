"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Volume2, Play, Pause, Square, RefreshCw, Settings2 } from "lucide-react";
import Link from "next/link";

export default function TextToSpeechPage() {
    const [text, setText] = useState("");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<string>("");
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const synth = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        synth.current = window.speechSynthesis;
        const loadVoices = () => {
            const availableVoices = synth.current?.getVoices() || [];
            setVoices(availableVoices);
            if (availableVoices.length > 0) {
                setSelectedVoice(availableVoices[0].name);
            }
        };

        loadVoices();
        if (synth.current?.onvoiceschanged !== undefined) {
            synth.current.onvoiceschanged = loadVoices;
        }

        return () => {
            synth.current?.cancel();
        };
    }, []);

    const speak = () => {
        if (!text.trim() || !synth.current) return;

        if (isPaused) {
            synth.current.resume();
            setIsPaused(false);
            setIsSpeaking(true);
            return;
        }

        synth.current.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) utterance.voice = voice;
        utterance.rate = rate;
        utterance.pitch = pitch;

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };

        synth.current.speak(utterance);
        setIsSpeaking(true);
    };

    const pause = () => {
        if (synth.current?.speaking) {
            synth.current.pause();
            setIsPaused(true);
            setIsSpeaking(false);
        }
    };

    const stop = () => {
        synth.current?.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/text" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Text to Speech</h1>
                    <p className="text-zinc-400">Convert your text into natural-sounding speech using browser voices.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                            <Volume2 size={16} />
                            Your Text
                        </label>
                        <div className="flex gap-2">
                            {!isSpeaking || isPaused ? (
                                <button
                                    onClick={speak}
                                    className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
                                    title="Play"
                                >
                                    <Play size={20} fill="currentColor" />
                                </button>
                            ) : (
                                <button
                                    onClick={pause}
                                    className="p-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg transition-all"
                                    title="Pause"
                                >
                                    <Pause size={20} fill="currentColor" />
                                </button>
                            )}
                            <button
                                onClick={stop}
                                className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-all"
                                title="Stop"
                            >
                                <Square size={20} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                    <div className="glass-card p-4 h-[400px]">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-full bg-transparent border-none focus:outline-none text-zinc-200 text-sm resize-none placeholder:text-zinc-600 leading-relaxed"
                            placeholder="Type or paste text here to hear it read aloud..."
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                            <Settings2 size={16} className="text-blue-400" />
                            Voice Settings
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs text-zinc-500 uppercase tracking-wider">Select Voice</label>
                                <select
                                    value={selectedVoice}
                                    onChange={(e) => setSelectedVoice(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-zinc-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    {voices.map((voice) => (
                                        <option key={voice.name} value={voice.name}>
                                            {voice.name} ({voice.lang})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-xs text-zinc-500 uppercase tracking-wider">Speed (Rate)</label>
                                    <span className="text-xs text-blue-400 font-mono">{rate}x</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.1"
                                    value={rate}
                                    onChange={(e) => setRate(parseFloat(e.target.value))}
                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-xs text-zinc-500 uppercase tracking-wider">Pitch</label>
                                    <span className="text-xs text-blue-400 font-mono">{pitch}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="2"
                                    step="0.1"
                                    value={pitch}
                                    onChange={(e) => setPitch(parseFloat(e.target.value))}
                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setRate(1);
                                setPitch(1);
                            }}
                            className="w-full py-2 text-xs text-zinc-500 hover:text-zinc-300 flex items-center justify-center gap-2 transition-colors"
                        >
                            <RefreshCw size={12} />
                            Reset to Default
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
