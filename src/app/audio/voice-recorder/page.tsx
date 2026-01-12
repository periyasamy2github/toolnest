"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Mic, Square, Play, Pause, Download, Trash2, Volume2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function VoiceRecorderPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (audioContextRef.current) audioContextRef.current.close();
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                setAudioBlob(blob);
                setAudioURL(URL.createObjectURL(blob));
                stopVisualizer();
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setIsPaused(false);
            setRecordingTime(0);
            setAudioURL(null);
            setAudioBlob(null);

            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);

            startVisualizer(stream);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please ensure permission is granted.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
            setIsPaused(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const togglePause = () => {
        if (mediaRecorderRef.current && isRecording) {
            if (isPaused) {
                mediaRecorderRef.current.resume();
                timerRef.current = setInterval(() => {
                    setRecordingTime((prev) => prev + 1);
                }, 1000);
            } else {
                mediaRecorderRef.current.pause();
                if (timerRef.current) clearInterval(timerRef.current);
            }
            setIsPaused(!isPaused);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startVisualizer = (stream: MediaStream) => {
        if (!canvasRef.current) return;

        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        source.connect(analyserRef.current);

        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        const draw = () => {
            if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const width = canvas.width;
            const height = canvas.height;

            animationFrameRef.current = requestAnimationFrame(draw);

            const dataArray = dataArrayRef.current!;
            analyserRef.current.getByteFrequencyData(dataArray);

            ctx.fillStyle = "rgb(20, 20, 20)"; // Match card bg roughly
            ctx.clearRect(0, 0, width, height);

            const barWidth = (width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArrayRef.current[i] / 2;

                const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
                gradient.addColorStop(0, "#3b82f6"); // Blue-500
                gradient.addColorStop(1, "#60a5fa"); // Blue-400

                ctx.fillStyle = gradient;
                ctx.fillRect(x, height - barHeight, barWidth, barHeight);

                x += barWidth + 1;
            }
        };

        draw();
    };

    const stopVisualizer = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (audioContextRef.current) audioContextRef.current.close();
    };

    const downloadAudio = () => {
        if (audioURL) {
            const a = document.createElement("a");
            a.href = audioURL;
            a.download = `recording-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.webm`;
            a.click();
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/audio" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Voice Recorder</h1>
                    <p className="text-zinc-400 text-lg">Record high-quality audio directly in your browser.</p>
                </div>
            </div>

            {/* Main Recorder Area */}
            <div className="glass-card p-8 md:p-12 flex flex-col items-center justify-center space-y-8 min-h-[400px]">

                {/* Visualizer / Status */}
                <div className="w-full h-48 bg-zinc-950/50 rounded-2xl border border-white/5 overflow-hidden relative flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        width={600}
                        height={192}
                        className={cn("w-full h-full", !isRecording && "opacity-20")}
                    />
                    {!isRecording && !audioURL && (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-500 gap-2">
                            <Volume2 size={24} />
                            <span>Ready to Record</span>
                        </div>
                    )}
                    {audioURL && !isRecording && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <audio controls src={audioURL} className="w-3/4" />
                        </div>
                    )}
                </div>

                {/* Timer */}
                <div className="text-6xl font-mono font-bold text-white tracking-wider tabular-nums">
                    {formatTime(recordingTime)}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    {!isRecording ? (
                        <button
                            onClick={startRecording}
                            className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95"
                        >
                            <Mic size={32} />
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={togglePause}
                                className="w-14 h-14 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-all"
                            >
                                {isPaused ? <Play size={24} /> : <Pause size={24} />}
                            </button>
                            <button
                                onClick={stopRecording}
                                className="w-20 h-20 rounded-full bg-zinc-100 hover:bg-white text-red-500 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
                            >
                                <Square size={32} fill="currentColor" />
                            </button>
                        </>
                    )}
                </div>

                {/* Actions */}
                {audioURL && (
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={downloadAudio}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/20"
                        >
                            <Download size={20} />
                            Download Recording
                        </button>
                        <button
                            onClick={() => {
                                setAudioURL(null);
                                setAudioBlob(null);
                                setRecordingTime(0);
                            }}
                            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl font-medium transition-colors"
                        >
                            <Trash2 size={20} />
                            Discard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
