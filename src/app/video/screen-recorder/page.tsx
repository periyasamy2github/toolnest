"use client";

import { useState, useRef, useEffect } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    MonitorPlay,
    Mic,
    MicOff,
    Square,
    Download,
    Video,
    AlertCircle
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function ScreenRecorderPage() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [audioEnabled, setAudioEnabled] = useState(true);

    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = async () => {
        try {
            setError("");
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: audioEnabled
            });

            if (audioEnabled) {
                try {
                    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    const tracks = [...displayStream.getTracks(), ...audioStream.getAudioTracks()];
                    streamRef.current = new MediaStream(tracks);
                } catch (err) {
                    console.warn("Microphone access denied or unavailable", err);
                    streamRef.current = displayStream;
                }
            } else {
                streamRef.current = displayStream;
            }

            if (videoRef.current) {
                videoRef.current.srcObject = streamRef.current;
            }

            const recorder = new MediaRecorder(streamRef.current);
            setMediaRecorder(recorder);

            const chunks: Blob[] = [];
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "video/webm" });
                setRecordedChunks(chunks);
                setVideoUrl(URL.createObjectURL(blob));

                // Stop all tracks
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                }
            };

            recorder.start();
            setIsRecording(true);

            // Handle user stopping sharing via browser UI
            displayStream.getVideoTracks()[0].onended = () => {
                stopRecording();
            };

        } catch (err) {
            console.error("Error starting recording:", err);
            setError("Failed to start recording. Please ensure permissions are granted.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    const downloadRecording = () => {
        if (!videoUrl) return;
        const a = document.createElement("a");
        a.href = videoUrl;
        a.download = `screen-recording-${new Date().toISOString()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="min-h-screen pb-24 space-y-12">
            {/* Header */}
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <BackButton />
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Screen Recorder</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Capture your screen and audio instantly.</m.p>
                    </div>
                </div>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-10 lg:col-start-2 space-y-6"
                >
                    <div className="glass-card p-8 space-y-8">
                        {/* Preview Area */}
                        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl border border-white/10">
                            {videoUrl ? (
                                <video src={videoUrl} controls className="w-full h-full object-contain" />
                            ) : (
                                <video ref={videoRef} autoPlay muted className="w-full h-full object-contain" />
                            )}

                            {!isRecording && !videoUrl && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="p-6 rounded-full bg-white/5 backdrop-blur-sm">
                                        <MonitorPlay size={48} className="text-zinc-500" />
                                    </div>
                                </div>
                            )}

                            {isRecording && (
                                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-sm font-bold animate-pulse">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    Recording
                                </div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setAudioEnabled(!audioEnabled)}
                                    className={cn(
                                        "p-3 rounded-xl transition-all flex items-center gap-2 font-medium",
                                        audioEnabled ? "bg-white/10 text-white" : "bg-red-500/10 text-red-400"
                                    )}
                                    disabled={isRecording}
                                >
                                    {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
                                    {audioEnabled ? "Microphone On" : "Microphone Off"}
                                </button>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                {!isRecording ? (
                                    videoUrl ? (
                                        <div className="flex gap-4 w-full">
                                            <button
                                                onClick={() => {
                                                    setVideoUrl(null);
                                                    setRecordedChunks([]);
                                                }}
                                                className="flex-1 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
                                            >
                                                New Recording
                                            </button>
                                            <button
                                                onClick={downloadRecording}
                                                className="flex-1 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2"
                                            >
                                                <Download size={20} />
                                                Download
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={startRecording}
                                            className="w-full md:w-auto px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-lg shadow-lg shadow-red-600/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <div className="w-3 h-3 rounded-full bg-white" />
                                            Start Recording
                                        </button>
                                    )
                                ) : (
                                    <button
                                        onClick={stopRecording}
                                        className="w-full md:w-auto px-8 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-lg border border-white/10 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <Square size={20} fill="currentColor" />
                                        Stop Recording
                                    </button>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400">
                                <AlertCircle size={20} />
                                {error}
                            </div>
                        )}
                    </div>
                </m.div>
            </div>
        </div>
    );
}
