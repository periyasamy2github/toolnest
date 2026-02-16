"use client";

import { useState, useRef } from "react";
import { m } from "framer-motion";
import { Upload, FileVideo, Info, X, Film, Clock, HardDrive, Monitor, ArrowLeft } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

export default function VideoMetadataViewer() {
    const [file, setFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState<{
        name: string;
        size: string;
        type: string;
        duration: string;
        resolution: string;
        lastModified: string;
    } | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Reset metadata until video loads
            setMetadata(null);
        }
    };

    const handleVideoLoaded = () => {
        if (!file || !videoRef.current) return;

        const video = videoRef.current;
        const duration = formatDuration(video.duration);
        const resolution = `${video.videoWidth} x ${video.videoHeight}`;

        setMetadata({
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type,
            duration,
            resolution,
            lastModified: new Date(file.lastModified).toLocaleString()
        });
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const formatDuration = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "Unknown";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        const parts = [];
        if (h > 0) parts.push(`${h}h`);
        if (m > 0) parts.push(`${m}m`);
        parts.push(`${s}s`);

        return parts.join(" ");
    };

    const clearFile = () => {
        setFile(null);
        setMetadata(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-6">
                <BackButton />
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Video Metadata <span className="text-blue-500">Viewer</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        View detailed technical information about your video files.
                    </p>
                </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                {!file ? (
                    <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-12 text-center hover:border-blue-500 transition-colors relative group">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="text-blue-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Upload Video</h3>
                        <p className="text-zinc-400">Drag & drop or click to select a video file</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between bg-zinc-950 border border-white/10 rounded-xl p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                    <FileVideo className="text-blue-500" size={24} />
                                </div>
                                <div>
                                    <div className="font-medium text-white">{file.name}</div>
                                    <div className="text-sm text-zinc-400">{formatFileSize(file.size)}</div>
                                </div>
                            </div>
                            <button
                                onClick={clearFile}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Hidden video element to extract metadata */}
                        <video
                            ref={videoRef}
                            src={URL.createObjectURL(file)}
                            className="hidden"
                            onLoadedMetadata={handleVideoLoaded}
                        />

                        {metadata ? (
                            <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom duration-500">
                                <MetadataCard
                                    icon={<Film className="text-purple-400" size={20} />}
                                    label="Format"
                                    value={metadata.type}
                                    color="purple"
                                />
                                <MetadataCard
                                    icon={<HardDrive className="text-emerald-400" size={20} />}
                                    label="File Size"
                                    value={metadata.size}
                                    color="emerald"
                                />
                                <MetadataCard
                                    icon={<Monitor className="text-orange-400" size={20} />}
                                    label="Resolution"
                                    value={metadata.resolution}
                                    color="orange"
                                />
                                <MetadataCard
                                    icon={<Clock className="text-pink-400" size={20} />}
                                    label="Duration"
                                    value={metadata.duration}
                                    color="pink"
                                />
                                <MetadataCard
                                    icon={<Info className="text-cyan-400" size={20} />}
                                    label="Last Modified"
                                    value={metadata.lastModified}
                                    color="cyan"
                                    className="md:col-span-2"
                                />
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
                                <p className="text-zinc-400">Extracting metadata...</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function MetadataCard({ icon, label, value, color, className }: any) {
    const colors: any = {
        purple: "bg-purple-500/10 border-purple-500/20",
        emerald: "bg-emerald-500/10 border-emerald-500/20",
        orange: "bg-orange-500/10 border-orange-500/20",
        pink: "bg-pink-500/10 border-pink-500/20",
        cyan: "bg-cyan-500/10 border-cyan-500/20",
    };

    return (
        <div className={cn("p-4 rounded-xl border flex items-center gap-4", colors[color], className)}>
            <div className="p-2 bg-black/20 rounded-lg">{icon}</div>
            <div>
                <div className="text-sm font-medium text-zinc-400">{label}</div>
                <div className="text-lg font-bold text-white">{value}</div>
            </div>
        </div>
    );
}
