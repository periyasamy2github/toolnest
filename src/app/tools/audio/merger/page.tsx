"use client";

import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { ArrowLeft, Upload, Merge, Download, Loader2, AlertCircle, Music, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AudioMergerPage() {
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [mergedFile, setMergedFile] = useState<string | null>(null);
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

    const mergeAudio = async () => {
        if (files.length < 2 || !loaded || !ffmpegRef.current) return;
        setIsLoading(true);
        setError("");
        setMergedFile(null);

        const ffmpeg = ffmpegRef.current;
        const outputName = "merged.mp3";

        try {
            let fileList = "";

            for (let i = 0; i < files.length; i++) {
                const fileName = `input${i}${files[i].name.substring(files[i].name.lastIndexOf("."))}`;
                await ffmpeg.writeFile(fileName, await fetchFile(files[i]));
                fileList += `file '${fileName}'\n`;
            }

            await ffmpeg.writeFile("list.txt", fileList);

            // ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp3
            await ffmpeg.exec([
                "-f", "concat",
                "-safe", "0",
                "-i", "list.txt",
                "-c", "copy",
                outputName
            ]);

            const data = await ffmpeg.readFile(outputName);
            const buffer = typeof data === 'string'
                ? new TextEncoder().encode(data).buffer
                : data.buffer;

            const blob = new Blob([buffer as any], { type: "audio/mpeg" });
            const url = URL.createObjectURL(blob);
            setMergedFile(url);
        } catch (err: any) {
            setError("Merging failed: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
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
                    <h1 className="text-3xl font-bold text-zinc-100">Audio Merger</h1>
                    <p className="text-zinc-400">Combine multiple audio files into a single track.</p>
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
                                    multiple
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                                        }
                                    }}
                                    className="hidden"
                                    id="audio-upload"
                                />
                                <label htmlFor="audio-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                    <div className="bg-zinc-800 p-4 rounded-full">
                                        <Upload className="text-zinc-400" size={32} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-zinc-200">Click to upload audio files</p>
                                        <p className="text-sm text-zinc-500">Select multiple files</p>
                                    </div>
                                </label>
                            </div>

                            {files.length > 0 && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-300">Selected Files ({files.length})</label>
                                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                            {files.map((f, i) => (
                                                <div key={i} className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-lg border border-white/5">
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        <Music size={16} className="text-zinc-500 flex-shrink-0" />
                                                        <span className="text-sm text-zinc-300 truncate">{f.name}</span>
                                                    </div>
                                                    <button onClick={() => removeFile(i)} className="text-zinc-500 hover:text-red-400 transition-colors">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={mergeAudio}
                                        disabled={isLoading || files.length < 2}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : <Merge size={20} />}
                                        {isLoading ? "Merging..." : "Merge Files"}
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
                        {mergedFile ? (
                            <div className="glass-card p-6 space-y-4 h-full flex flex-col">
                                <h3 className="text-xl font-semibold text-zinc-100">Result</h3>
                                <div className="flex-1 bg-zinc-950/50 rounded-xl border border-white/5 flex items-center justify-center p-4 overflow-hidden">
                                    <div className="text-center space-y-4">
                                        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                                            <Music size={40} className="text-purple-400" />
                                        </div>
                                        <audio src={mergedFile} controls className="w-full" />
                                    </div>
                                </div>
                                <a
                                    href={mergedFile}
                                    download={`merged-${new Date().getTime()}.mp3`}
                                    className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    <Download size={20} />
                                    Download Result
                                </a>
                            </div>
                        ) : (
                            <div className="h-full border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8">
                                <Merge size={48} className="mb-4 opacity-20" />
                                <p>Merged audio will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
