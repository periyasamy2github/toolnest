"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mic, Square, Play, Pause, Download, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function VoiceRecorderPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                setAudioBlob(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please allow permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const togglePlayback = () => {
        if (!audioRef.current && audioBlob) {
            const url = URL.createObjectURL(audioBlob);
            audioRef.current = new Audio(url);
            audioRef.current.onended = () => setIsPlaying(false);
        }

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const deleteRecording = () => {
        setAudioBlob(null);
        setRecordingTime(0);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        setIsPlaying(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (mediaRecorderRef.current && isRecording) {
                mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isRecording]);

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/tools/audio" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Voice Recorder</h1>
                    <p className="text-zinc-400">Record high-quality audio directly in your browser.</p>
                </div>
            </div>

            <div className="glass-card p-12 flex flex-col items-center justify-center space-y-8">
                {/* Visualizer / Timer */}
                <div className="relative w-64 h-64 rounded-full border-4 border-zinc-800 flex items-center justify-center bg-zinc-900/50 shadow-2xl">
                    {isRecording && (
                        <div className="absolute inset-0 rounded-full border-4 border-red-500/50 animate-ping" />
                    )}
                    <div className="text-5xl font-mono font-bold text-zinc-100 tabular-nums">
                        {formatTime(recordingTime)}
                    </div>
                </div>

                {/* Controls */}
                {!audioBlob ? (
                    <button
                        onClick={isRecording ? stopRecording : startRecording}
                        className={cn(
                            "w-20 h-20 rounded-full flex items-center justify-center transition-all transform hover:scale-105 shadow-lg",
                            isRecording
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-zinc-100 hover:bg-white text-red-500"
                        )}
                    >
                        {isRecording ? <Square size={32} fill="currentColor" /> : <Mic size={32} />}
                    </button>
                ) : (
                    <div className="flex items-center gap-6">
                        <button
                            onClick={deleteRecording}
                            className="p-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-red-400 transition-colors"
                        >
                            <Trash2 size={24} />
                        </button>

                        <button
                            onClick={togglePlayback}
                            className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-blue-500/20"
                        >
                            {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                        </button>

                        <a
                            href={URL.createObjectURL(audioBlob)}
                            download={`recording-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.wav`}
                            className="p-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-green-400 transition-colors"
                        >
                            <Download size={24} />
                        </a>
                    </div>
                )}

                <div className="text-zinc-500 text-sm">
                    {isRecording ? "Recording in progress..." : audioBlob ? "Recording ready" : "Click mic to start recording"}
                </div>
            </div>
        </div>
    );
}
