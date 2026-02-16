"use client";

import { useState, useRef } from "react";
import { Upload, Download, Music, RefreshCw, Loader2, ArrowLeft } from "lucide-react";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export default function AudioConverter() {
    const [file, setFile] = useState<File | null>(null);
    const [format, setFormat] = useState("mp3");
    const [isConverting, setIsConverting] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const ffmpegRef = useRef<FFmpeg | null>(null);

    const load = async () => {
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";

        if (!ffmpegRef.current) {
            ffmpegRef.current = new FFmpeg();
        }

        const ffmpeg = ffmpegRef.current;

        // Load ffmpeg.wasm if not loaded
        if (!ffmpeg.loaded) {
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
            });
        }
    };

    const convert = async () => {
        if (!file) return;
        setIsConverting(true);
        setMessage("Loading FFmpeg...");
        setDownloadUrl(null);

        try {
            await load();
            const ffmpeg = ffmpegRef.current;
            if (!ffmpeg) return;

            setMessage("Writing file...");
            await ffmpeg.writeFile("input", await fetchFile(file));

            setMessage(`Converting to ${format.toUpperCase()}...`);
            await ffmpeg.exec(["-i", "input", `output.${format}`]);

            setMessage("Reading output...");
            const data = await ffmpeg.readFile(`output.${format}`);

            const url = URL.createObjectURL(
                new Blob([(data as any).buffer], { type: `audio/${format}` })
            );
            setDownloadUrl(url);
            setMessage("Conversion complete!");
        } catch (error) {
            console.error(error);
            setMessage("Error converting file. Please try again.");
        } finally {
            setIsConverting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-6">
                <BackButton />
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Audio <span className="text-blue-500">Converter</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Convert audio files between MP3, WAV, OGG, M4A, and AAC formats.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-80 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => {
                                setFile(e.target.files?.[0] || null);
                                setDownloadUrl(null);
                                setMessage("");
                            }}
                            accept="audio/*"
                            className="hidden"
                        />
                        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Music size={32} className="text-zinc-400 group-hover:text-blue-400" />
                        </div>
                        <p className="text-lg font-medium text-white">
                            {file ? file.name : "Upload Audio File"}
                        </p>
                    </div>
                </div>

                <div className="space-y-6 flex flex-col justify-center">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-zinc-400">Target Format</label>
                        <div className="grid grid-cols-3 gap-3">
                            {["mp3", "wav", "ogg", "m4a", "aac"].map((fmt) => (
                                <button
                                    key={fmt}
                                    onClick={() => setFormat(fmt)}
                                    className={`p-3 rounded-xl font-medium transition-all ${format === fmt
                                        ? "bg-blue-500 text-white"
                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                        }`}
                                >
                                    {fmt.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={convert}
                        disabled={!file || isConverting}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${!file || isConverting
                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                            }`}
                    >
                        {isConverting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Converting...
                            </>
                        ) : (
                            <>
                                <RefreshCw size={20} />
                                Convert Now
                            </>
                        )}
                    </button>

                    {message && <p className="text-center text-zinc-400 text-sm">{message}</p>}

                    {downloadUrl && (
                        <a
                            href={downloadUrl}
                            download={`converted.${format}`}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20"
                        >
                            <Download size={20} />
                            Download {format.toUpperCase()}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
