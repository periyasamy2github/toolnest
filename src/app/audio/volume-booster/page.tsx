"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Volume2, VolumeX, Play, Pause, Loader2, ArrowLeft } from "lucide-react";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function VolumeBooster() {
    const [file, setFile] = useState<File | null>(null);
    const [gain, setGain] = useState(1); // 1 = 100%, 2 = 200%
    const [isPlaying, setIsPlaying] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);
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

            const gainNode = audioContextRef.current.createGain();
            gainNode.gain.value = gain;

            source.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            source.start();
            sourceNodeRef.current = source;
            gainNodeRef.current = gainNode;
            setIsPlaying(true);

            source.onended = () => setIsPlaying(false);
        }
    };

    useEffect(() => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.value = gain;
        }
    }, [gain]);

    const processAudio = async () => {
        if (!audioBufferRef.current) return;
        setIsProcessing(true);

        // Offline rendering to create new file
        const offlineCtx = new OfflineAudioContext(
            audioBufferRef.current.numberOfChannels,
            audioBufferRef.current.length,
            audioBufferRef.current.sampleRate
        );

        const source = offlineCtx.createBufferSource();
        source.buffer = audioBufferRef.current;

        const gainNode = offlineCtx.createGain();
        gainNode.gain.value = gain;

        source.connect(gainNode);
        gainNode.connect(offlineCtx.destination);
        source.start();

        const renderedBuffer = await offlineCtx.startRendering();

        // Convert AudioBuffer to WAV Blob (simplified WAV encoder)
        const wavBlob = bufferToWave(renderedBuffer, renderedBuffer.length);
        const url = URL.createObjectURL(wavBlob);
        setDownloadUrl(url);
        setIsProcessing(false);
    };

    // Helper to convert AudioBuffer to WAV
    const bufferToWave = (abuffer: AudioBuffer, len: number) => {
        let numOfChan = abuffer.numberOfChannels,
            length = len * numOfChan * 2 + 44,
            buffer = new ArrayBuffer(length),
            view = new DataView(buffer),
            channels = [], i, sample,
            offset = 0,
            pos = 0;

        // write WAVE header
        setUint32(0x46464952);                         // "RIFF"
        setUint32(length - 8);                         // file length - 8
        setUint32(0x45564157);                         // "WAVE"

        setUint32(0x20746d66);                         // "fmt " chunk
        setUint32(16);                                 // length = 16
        setUint16(1);                                  // PCM (uncompressed)
        setUint16(numOfChan);
        setUint32(abuffer.sampleRate);
        setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
        setUint16(numOfChan * 2);                      // block-align
        setUint16(16);                                 // 16-bit (hardcoded in this example)

        setUint32(0x61746164);                         // "data" - chunk
        setUint32(length - pos - 4);                   // chunk length

        // write interleaved data
        for (i = 0; i < abuffer.numberOfChannels; i++)
            channels.push(abuffer.getChannelData(i));

        while (pos < length) {
            for (i = 0; i < numOfChan; i++) {             // interleave channels
                sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
                sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
                view.setInt16(pos, sample, true);          // write 16-bit sample
                pos += 2;
            }
            offset++                                     // next source sample
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
                        Volume <span className="text-green-500">Booster</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Increase the volume of your audio files up to 300%.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-80 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-green-500/50 hover:bg-green-500/5 transition-all group"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="audio/*"
                            className="hidden"
                        />
                        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Volume2 size={32} className="text-zinc-400 group-hover:text-green-400" />
                        </div>
                        <p className="text-lg font-medium text-white">
                            {file ? file.name : "Upload Audio File"}
                        </p>
                    </div>
                </div>

                <div className="space-y-8 flex flex-col justify-center">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-zinc-400">Volume Gain</label>
                            <span className="text-green-400 font-bold">{Math.round(gain * 100)}%</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={gain}
                            onChange={(e) => setGain(parseFloat(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-green-500"
                        />
                        <div className="flex justify-between text-xs text-zinc-500">
                            <span>50%</span>
                            <span>100%</span>
                            <span>200%</span>
                            <span>300%</span>
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
                            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20"
                        >
                            {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                            Process
                        </button>
                    </div>

                    {downloadUrl && (
                        <a
                            href={downloadUrl}
                            download={`boosted-${file?.name || "audio"}.wav`}
                            className="block w-full bg-zinc-800 hover:bg-zinc-700 text-center text-white py-4 rounded-xl font-bold transition-all border border-green-500/20"
                        >
                            Download Boosted Audio
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
