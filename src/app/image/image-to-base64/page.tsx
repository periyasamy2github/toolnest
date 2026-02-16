"use client";

import { useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    Image as ImageIcon,
    Upload,
    Copy,
    Check,
    X,
    FileCode2
} from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function ImageToBase64() {
    const [image, setImage] = useState<string | null>(null);
    const [base64, setBase64] = useState("");
    const [fileName, setFileName] = useState("");
    const [copied, setCopied] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setImage(result);
            setBase64(result);
        };
        reader.readAsDataURL(file);
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(base64);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clear = () => {
        setImage(null);
        setBase64("");
        setFileName("");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Image to <span className="text-blue-500">Base64</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert images to Base64 string for embedding in HTML/CSS.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-4">
                    <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "relative aspect-video rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group",
                            isDragging
                                ? "border-blue-500 bg-blue-500/10"
                                : "border-white/10 bg-zinc-900/50 hover:border-blue-500/50 hover:bg-zinc-900"
                        )}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                        />

                        <AnimatePresence mode="wait">
                            {image ? (
                                <m.div
                                    key="preview"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="relative w-full h-full"
                                >
                                    <img
                                        src={image}
                                        alt="Preview"
                                        className="w-full h-full object-contain p-4"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white font-medium flex items-center gap-2">
                                            <Upload size={20} />
                                            Change Image
                                        </p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            clear();
                                        }}
                                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full backdrop-blur-sm transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </m.div>
                            ) : (
                                <m.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center space-y-4 p-6"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <ImageIcon size={32} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-white">
                                            Drop image here or click to upload
                                        </p>
                                        <p className="text-sm text-zinc-500 mt-2">
                                            Supports JPG, PNG, WEBP, GIF
                                        </p>
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <FileCode2 size={20} className="text-blue-400" />
                                <span className="font-medium text-white">Base64 Output</span>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                disabled={!base64}
                                className="p-2 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                            </button>
                        </div>

                        <div className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-4 relative overflow-hidden">
                            {base64 ? (
                                <textarea
                                    readOnly
                                    value={base64}
                                    className="w-full h-full bg-transparent border-none resize-none text-zinc-300 font-mono text-xs focus:ring-0 p-0"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm italic">
                                    Base64 string will appear here...
                                </div>
                            )}
                        </div>

                        {base64 && (
                            <div className="mt-4 text-xs text-zinc-500 flex justify-between">
                                <span>{fileName}</span>
                                <span>{base64.length.toLocaleString()} chars</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
