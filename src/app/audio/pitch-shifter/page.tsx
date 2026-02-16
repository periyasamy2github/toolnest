"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Music, Play, Pause, Loader2, ArrowLeft } from "lucide-react";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function PitchShifter() {
    const [file, setFile] = useState<File | null>(null);
    const [pitch, setPitch] = useState(1); // 1 = normal, 0.5 = octave down, 2 = octave up
    const [isPlaying, setIsPlaying] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setDownloadUrl(null);
            setIsPlaying(false);

            const arrayBuffer = await file.arrayBuffer();
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioContextRef.current = audioContext;

            try {
                const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer);
                audioBufferRef.current = decodedBuffer;
            } catch (error) {
                console.error("Error decoding audio", error);
            }
        }
    };

    const togglePlay = () => {
        if (!audioBufferRef.current || !audioContextRef.current) return;

        if (isPlaying) {
            sourceNodeRef.current?.stop();
            setIsPlaying(false);
        } else {
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBufferRef.current;
            // Simple pitch shift using playbackRate (affects speed too - simple implementation)
            // For true pitch shifting without speed change, we'd need a complex FFT algorithm or library like Tone.js
            // Given constraints, we'll label this as "Pitch & Speed" or clarify behavior
            source.playbackRate.value = pitch;

            source.connect(audioContextRef.current.destination);

            source.start();
            sourceNodeRef.current = source;
            setIsPlaying(true);

            source.onended = () => setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (sourceNodeRef.current && isPlaying) {
            sourceNodeRef.current.playbackRate.value = pitch;
        }
    }, [pitch, isPlaying]);

    const processAudio = async () => {
        if (!audioBufferRef.current) return;
        setIsProcessing(true);

        const newDuration = audioBufferRef.current.duration / pitch;
        const offlineCtx = new OfflineAudioContext(
            audioBufferRef.current.numberOfChannels,
            newDuration * audioBufferRef.current.sampleRate,
            audioBufferRef.current.sampleRate
        );

        const source = offlineCtx.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.playbackRate.value = pitch;

        source.connect(offlineCtx.destination);
        source.start();

        const renderedBuffer = await offlineCtx.startRendering();

        const wavBlob = bufferToWave(renderedBuffer, renderedBuffer.length);
        const url = URL.createObjectURL(wavBlob);
        setDownloadUrl(url);
        setIsProcessing(false);
    };

    // Reuse bufferToWave helper
    const bufferToWave = (abuffer: AudioBuffer, len: number) => {
        let numOfChan = abuffer.numberOfChannels,
            length = len * numOfChan * 2 + 44,
            buffer = new ArrayBuffer(length),
            view = new DataView(buffer),
            channels = [], i, sample,
            offset = 0,
            pos = 0;

        setUint32(0x46464952);
        setUint32(length - 8);
        setUint32(0x45564157);

        setUint32(0x20746d66);
        setUint32(16);
        setUint16(1);
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan);
        setUint16(numOfChan * 2);
        setUint16(16);

        setUint32(0x61746164);
        setUint32(length - pos - 4);

        for (i = 0; i < abuffer.numberOfChannels; i++)
            channels.push(abuffer.getChannelData(i));

        while (pos < length) {
            for (i = 0; i < numOfChan; i++) {
                sample = Math.max(-1, Math.min(1, channels[i][offset]));
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
                view.setInt16(pos, sample, true);
                pos += 2;
            }
            offset++
        }

        return new Blob([buffer], { type: "audio/wav" });

        function setUint16(data: number) {
            view.setUint16(pos, data, true);
            pos += 2;
        }

        function setUint32(data: number) {
            view.setUint32(pos, data, true);
            pos += 4;
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-6">
                <BackButton />
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Pitch <span className="text-pink-500">Shifter</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Change the pitch of your audio files (Note: Also affects speed).
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-80 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-pink-500/50 hover:bg-pink-500/5 transition-all group"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="audio/*"
                            className="hidden"
                        />
                        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Music size={32} className="text-zinc-400 group-hover:text-pink-400" />
                        </div>
                        <p className="text-lg font-medium text-white">
                            {file ? file.name : "Upload Audio File"}
                        </p>
                    </div>
                </div>

                <div className="space-y-8 flex flex-col justify-center">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-zinc-400">Pitch Shift</label>
                            <span className="text-pink-400 font-bold">{pitch}x</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={pitch}
                            onChange={(e) => setPitch(parseFloat(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                        />
                        <div className="flex justify-between text-xs text-zinc-500">
                            <span>Low (0.5x)</span>
                            <span>Normal (1.0x)</span>
                            <span>High (2.0x)</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={togglePlay}
                            disabled={!file}
                            className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                        >
                            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            {isPlaying ? "Pause Preview" : "Preview"}
                        </button>
                        <button
                            onClick={processAudio}
                            disabled={!file || isProcessing}
                            className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20"
                        >
                            {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                            Process
                        </button>
                    </div>

                    {downloadUrl && (
                        <a
                            href={downloadUrl}
                            download={`pitch-${pitch}x-${file?.name || "audio"}.wav`}
                            className="block w-full bg-zinc-800 hover:bg-zinc-700 text-center text-white py-4 rounded-xl font-bold transition-all border border-pink-500/20"
                        >
                            Download Modified Audio
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
