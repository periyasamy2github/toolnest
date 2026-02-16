"use client";

import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { Upload, Download, Loader2, AlertCircle, Video, Image as ImageIcon, Type, Play, ArrowLeft } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

export default function VideoWatermarkPage() {
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [watermarkType, setWatermarkType] = useState<"image" | "text">("image");
    const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
    const [watermarkText, setWatermarkText] = useState("Watermark");
    const [position, setPosition] = useState("bottom-right");
    const [opacity, setOpacity] = useState(0.8);
    const [outputFile, setOutputFile] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [logs, setLogs] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);

    const ffmpegRef = useRef<FFmpeg | null>(null);
    const messageRef = useRef<HTMLDivElement>(null);

    const load = async () => {
        setIsLoading(true);
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

        try {
            const ffmpeg = new FFmpeg();
            ffmpegRef.current = ffmpeg;

            ffmpeg.on("log", ({ message }) => {
                setLogs((prev) => [...prev.slice(-4), message]);
                if (messageRef.current) messageRef.current.scrollTop = messageRef.current.scrollHeight;
            });

            ffmpeg.on("progress", ({ progress }) => {
                setProgress(Math.round(progress * 100));
            });

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

    useEffect(() => {
        load();
    }, []);

    const generateWatermarkFromText = async (text: string): Promise<Blob> => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context not supported");

        // Set canvas size based on text length (approximate)
        const fontSize = 48;
        ctx.font = `bold ${fontSize}px Arial`;
        const textMetrics = ctx.measureText(text);
        canvas.width = textMetrics.width + 40;
        canvas.height = fontSize + 40;

        // Draw text
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillText(text, 20, fontSize);

        // Add shadow/outline for visibility
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.strokeText(text, 20, fontSize);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else throw new Error("Failed to create text watermark");
            }, "image/png");
        });
    };

    const processVideo = async () => {
        if (!videoFile || !loaded || !ffmpegRef.current) return;
        if (watermarkType === "image" && !watermarkImage) return;

        setIsLoading(true);
        setError("");
        setOutputFile(null);
        setProgress(0);

        const ffmpeg = ffmpegRef.current;
        const inputName = "input.mp4";
        const watermarkName = "watermark.png";
        const outputName = "output.mp4";

        try {
            // Write video file
            await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

            // Write watermark file
            let watermarkData;
            if (watermarkType === "image" && watermarkImage) {
                watermarkData = await fetchFile(watermarkImage);
            } else {
                const blob = await generateWatermarkFromText(watermarkText);
                watermarkData = await fetchFile(blob);
            }
            await ffmpeg.writeFile(watermarkName, watermarkData);

            // Determine overlay position
            let overlayFilter = "";
            const padding = 20;
            switch (position) {
                case "top-left": overlayFilter = `overlay=${padding}:${padding}`; break;
                case "top-right": overlayFilter = `overlay=main_w-overlay_w-${padding}:${padding}`; break;
                case "bottom-left": overlayFilter = `overlay=${padding}:main_h-overlay_h-${padding}`; break;
                case "bottom-right": overlayFilter = `overlay=main_w-overlay_w-${padding}:main_h-overlay_h-${padding}`; break;
                case "center": overlayFilter = `overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2`; break;
                default: overlayFilter = `overlay=main_w-overlay_w-${padding}:main_h-overlay_h-${padding}`;
            }

            // Apply opacity if image (text opacity handled in canvas)
            // For image, we can use format=rgba,colorchannelmixer=aa=0.5
            // But let's keep it simple for now, standard overlay handles transparency well.
            // If we want to force opacity on an image, we need a complex filter chain.
            // Let's stick to standard overlay for now.

            await ffmpeg.exec([
                "-i", inputName,
                "-i", watermarkName,
                "-filter_complex", overlayFilter,
                "-codec:a", "copy", // Copy audio without re-encoding
                outputName
            ]);

            const data = await ffmpeg.readFile(outputName);
            const buffer = typeof data === 'string'
                ? new TextEncoder().encode(data).buffer
                : data.buffer;

            const blob = new Blob([buffer as any], { type: "video/mp4" });
            const url = URL.createObjectURL(blob);
            setOutputFile(url);

        } catch (err: any) {
            setError("Processing failed: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-6">
                <BackButton />
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Video <span className="text-cyan-500">Watermark</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Add image or text watermarks to your videos securely in your browser.
                    </p>
                </div>
            </div>

            {!loaded && !error && (
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center space-y-4 backdrop-blur-xl">
                    <Loader2 className="animate-spin text-cyan-500" size={48} />
                    <p className="text-zinc-400">Loading Video Engine...</p>
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
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        {/* Video Upload */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-4">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Video size={20} className="text-cyan-500" />
                                Source Video
                            </h3>
                            {!videoFile ? (
                                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors relative group">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="text-cyan-500" size={24} />
                                    </div>
                                    <p className="text-zinc-400">Upload Video</p>
                                </div>
                            ) : (
                                <div className="bg-zinc-950 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <Video size={20} className="text-zinc-500 flex-shrink-0" />
                                        <span className="text-sm text-zinc-300 truncate">{videoFile.name}</span>
                                    </div>
                                    <button onClick={() => setVideoFile(null)} className="text-zinc-500 hover:text-white">Change</button>
                                </div>
                            )}
                        </div>

                        {/* Watermark Settings */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                <ImageIcon size={20} className="text-cyan-500" />
                                Watermark Settings
                            </h3>

                            <div className="flex gap-2 p-1 bg-zinc-950 rounded-lg border border-white/5">
                                <button
                                    onClick={() => setWatermarkType("image")}
                                    className={cn(
                                        "flex-1 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2",
                                        watermarkType === "image" ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-400 hover:text-white"
                                    )}
                                >
                                    <ImageIcon size={16} /> Image
                                </button>
                                <button
                                    onClick={() => setWatermarkType("text")}
                                    className={cn(
                                        "flex-1 py-2 rounded-md text-sm font-medium transition-all flex items-center justify-center gap-2",
                                        watermarkType === "text" ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-400 hover:text-white"
                                    )}
                                >
                                    <Type size={16} /> Text
                                </button>
                            </div>

                            {watermarkType === "image" ? (
                                !watermarkImage ? (
                                    <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-cyan-500 transition-colors relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setWatermarkImage(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="text-cyan-500" size={24} />
                                        </div>
                                        <p className="text-zinc-400">Upload Image</p>
                                    </div>
                                ) : (
                                    <div className="bg-zinc-950 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <ImageIcon size={20} className="text-zinc-500 flex-shrink-0" />
                                            <span className="text-sm text-zinc-300 truncate">{watermarkImage.name}</span>
                                        </div>
                                        <button onClick={() => setWatermarkImage(null)} className="text-zinc-500 hover:text-white">Change</button>
                                    </div>
                                )
                            ) : (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Watermark Text</label>
                                    <input
                                        type="text"
                                        value={watermarkText}
                                        onChange={(e) => setWatermarkText(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                        placeholder="Enter text..."
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-400">Position</label>
                                    <select
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none appearance-none"
                                    >
                                        <option value="top-left">Top Left</option>
                                        <option value="top-right">Top Right</option>
                                        <option value="bottom-left">Bottom Left</option>
                                        <option value="bottom-right">Bottom Right</option>
                                        <option value="center">Center</option>
                                    </select>
                                </div>
                                {watermarkType === "text" && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400">Opacity</label>
                                        <input
                                            type="number"
                                            min="0.1"
                                            max="1"
                                            step="0.1"
                                            value={opacity}
                                            onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={processVideo}
                                disabled={isLoading || !videoFile || (watermarkType === "image" && !watermarkImage)}
                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Play size={20} fill="currentColor" />}
                                {isLoading ? `Processing ${progress}%` : "Add Watermark"}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 h-full flex flex-col">
                            <h3 className="text-xl font-semibold text-white mb-4">Preview & Download</h3>

                            {outputFile ? (
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="flex-1 bg-black rounded-xl overflow-hidden flex items-center justify-center border border-white/10">
                                        <video src={outputFile} controls className="max-h-[400px] w-full" />
                                    </div>
                                    <a
                                        href={outputFile}
                                        download="watermarked-video.mp4"
                                        className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 transition-all"
                                    >
                                        <Download size={20} />
                                        Download Video
                                    </a>
                                </div>
                            ) : (
                                <div className="flex-1 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 p-12">
                                    <Video size={48} className="mb-4 opacity-20" />
                                    <p>Processed video will appear here</p>
                                </div>
                            )}

                            {/* Logs */}
                            <div ref={messageRef} className="mt-6 bg-black/40 rounded-xl p-4 h-32 overflow-y-auto font-mono text-xs text-zinc-500 border border-white/5">
                                {logs.length === 0 ? (
                                    <div className="text-center pt-10 opacity-50">Ready to process...</div>
                                ) : (
                                    logs.map((log, i) => <div key={i} className="whitespace-pre-wrap">{log}</div>)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
