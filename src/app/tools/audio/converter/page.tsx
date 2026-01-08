"use client";

import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { ArrowLeft, Upload, FileAudio, Download, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AudioConverterPage() {
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [outputFormat, setOutputFormat] = useState("mp3");
    const [convertedFile, setConvertedFile] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const [logs, setLogs] = useState<string[]>([]);

    const ffmpegRef = useRef<FFmpeg | null>(null);

    const load = async () => {
        setIsLoading(true);
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

        if (!ffmpegRef.current) {
            ffmpegRef.current = new FFmpeg();
        }

        const ffmpeg = ffmpegRef.current;

        ffmpeg.on("log", ({ message }) => {
            setLogs((prev) => [...prev.slice(-4), message]);
        });

        ffmpeg.on("progress", ({ progress }) => {
            setProgress(Math.round(progress * 100));
        });

        try {
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
            });
            setLoaded(true);
        } catch (err: any) {
            setError("Failed to load FFmpeg. " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const convert = async () => {
        if (!file || !loaded || !ffmpegRef.current) return;
        setIsLoading(true);
        setError("");
        setConvertedFile(null);
        setProgress(0);

        const ffmpeg = ffmpegRef.current;
        const inputName = "input" + file.name.substring(file.name.lastIndexOf("."));
        const outputName = "output." + outputFormat;

        try {
            await ffmpeg.writeFile(inputName, await fetchFile(file));

            await ffmpeg.exec(["-i", inputName, outputName]);

            const data = await ffmpeg.readFile(outputName);
            const buffer = typeof data === 'string'
                ? new TextEncoder().encode(data).buffer
                : data.buffer;

            const blob = new Blob([buffer as any], { type: `audio/${outputFormat}` });
            const url = URL.createObjectURL(blob);
            setConvertedFile(url);
        } catch (err: any) {
            setError("Conversion failed: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/tools/audio" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Audio Converter</h1>
                    <p className="text-zinc-400">Convert audio files between formats locally.</p>
                </div>
            </div>

            {!loaded && !error && (
                <div className="glass-card p-12 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="animate-spin text-blue-500" size={48} />
                    <p className="text-zinc-400">Loading Audio Engine...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl flex items-center gap-3">
                    <AlertCircle size={24} />
                    <div>
                        <h3 className="font-semibold">Error</h3>
                        <p>{error}</p>
                    </div>
                </div>
            )}

            {loaded && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="glass-card p-6 space-y-6">
                            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-zinc-500 hover:bg-zinc-900/50 transition-all">
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                    id="audio-upload"
                                />
                                <label htmlFor="audio-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                    <div className="bg-zinc-800 p-4 rounded-full">
                                        <Upload className="text-zinc-400" size={32} />
                                    </div>
                                    {file ? (
                                        <div>
                                            <p className="font-medium text-zinc-200">{file.name}</p>
                                            <p className="text-sm text-zinc-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="font-medium text-zinc-200">Click to upload audio</p>
                                            <p className="text-sm text-zinc-500">Supports MP3, WAV, OGG, M4A, AAC</p>
                                        </div>
                                    )}
                                </label>
                            </div>

                            {file && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Output Format</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {["mp3", "wav", "ogg", "m4a", "aac"].map((fmt) => (
                                                <button
                                                    key={fmt}
                                                    onClick={() => setOutputFormat(fmt)}
                                                    className={cn(
                                                        "flex-1 min-w-[60px] py-2 rounded-lg text-sm font-medium uppercase transition-all border",
                                                        outputFormat === fmt
                                                            ? "bg-blue-600 border-blue-600 text-white"
                                                            : "bg-zinc-900/50 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                                    )}
                                                >
                                                    {fmt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={convert}
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : <FileAudio size={20} />}
                                        {isLoading ? `Converting ${progress}%` : "Convert Audio"}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Logs */}
                        <div className="glass-card p-4 bg-black/40 font-mono text-xs text-zinc-500 space-y-1 h-32 overflow-hidden">
                            {logs.map((log, i) => (
                                <div key={i}>{log}</div>
                            ))}
                            {logs.length === 0 && <div>Ready to process...</div>}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {convertedFile ? (
                            <div className="glass-card p-6 space-y-4 h-full flex flex-col">
                                <h3 className="text-xl font-semibold text-zinc-100">Result</h3>
                                <div className="flex-1 bg-zinc-950/50 rounded-xl border border-white/5 flex items-center justify-center p-4 overflow-hidden">
                                    <div className="text-center space-y-4">
                                        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                                            <FileAudio size={40} className="text-blue-400" />
                                        </div>
                                        <audio src={convertedFile} controls className="w-full" />
                                    </div>
                                </div>
                                <a
                                    href={convertedFile}
                                    download={`converted.${outputFormat}`}
                                    className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    <Download size={20} />
                                    Download Result
                                </a>
                            </div>
                        ) : (
                            <div className="h-full border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8">
                                <FileAudio size={48} className="mb-4 opacity-20" />
                                <p>Converted audio will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
