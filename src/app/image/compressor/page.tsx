"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowLeft, Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ImageCompressorPage() {
    const [file, setFile] = useState<File | null>(null);
    const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
    const [quality, setQuality] = useState(0.8);
    const [isCompressing, setIsCompressing] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.[0]) {
            setFile(acceptedFiles[0]);
            setCompressedFile(null);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxFiles: 1
    });

    const compressImage = async () => {
        if (!file) return;
        setIsCompressing(true);

        try {
            const imageBitmap = await createImageBitmap(file);
            const canvas = document.createElement('canvas');
            canvas.width = imageBitmap.width;
            canvas.height = imageBitmap.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(imageBitmap, 0, 0);

            canvas.toBlob(
                (blob) => {
                    setCompressedFile(blob);
                    setIsCompressing(false);
                },
                file.type,
                quality
            );
        } catch (error) {
            console.error("Compression failed", error);
            setIsCompressing(false);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/image" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Image Compressor</h1>
                    <p className="text-zinc-400">Reduce image file size without significant quality loss.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-6">
                    <div
                        {...getRootProps()}
                        className={cn(
                            "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 h-64 flex flex-col items-center justify-center",
                            isDragActive ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900/50"
                        )}
                    >
                        <input {...getInputProps()} />
                        <div className="bg-zinc-800 p-4 rounded-full mb-4">
                            <Upload className="text-zinc-400" size={32} />
                        </div>
                        {file ? (
                            <div className="space-y-1">
                                <p className="font-medium text-zinc-200">{file.name}</p>
                                <p className="text-sm text-zinc-500">{formatSize(file.size)}</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <p className="font-medium text-zinc-200">Drop image here or click to upload</p>
                                <p className="text-sm text-zinc-500">Supports JPG, PNG, WebP</p>
                            </div>
                        )}
                    </div>

                    {file && (
                        <div className="glass-card p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Quality</span>
                                    <span className="text-zinc-200">{Math.round(quality * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={quality}
                                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </div>

                            <button
                                onClick={compressImage}
                                disabled={isCompressing}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                {isCompressing ? <Loader2 className="animate-spin" /> : "Compress Image"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                    {compressedFile ? (
                        <div className="glass-card p-6 space-y-6 h-full flex flex-col">
                            <h3 className="text-xl font-semibold text-zinc-100">Result</h3>

                            <div className="flex-1 bg-zinc-950/50 rounded-xl border border-white/5 flex items-center justify-center p-4 overflow-hidden">
                                <img
                                    src={URL.createObjectURL(compressedFile)}
                                    alt="Compressed"
                                    className="max-w-full max-h-[300px] object-contain"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-lg border border-white/5">
                                    <div className="text-sm text-zinc-400">Original Size</div>
                                    <div className="font-mono text-zinc-200">{file ? formatSize(file.size) : '-'}</div>
                                </div>
                                <div className="flex justify-between items-center bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                                    <div className="text-sm text-green-400">Compressed Size</div>
                                    <div className="font-mono text-green-300">{formatSize(compressedFile.size)}</div>
                                </div>
                                <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-lg border border-white/5">
                                    <div className="text-sm text-zinc-400">Reduction</div>
                                    <div className="font-mono text-blue-400">
                                        {file ? Math.round((1 - compressedFile.size / file.size) * 100) : 0}%
                                    </div>
                                </div>

                                <a
                                    href={URL.createObjectURL(compressedFile)}
                                    download={`compressed-${file?.name}`}
                                    className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    <Download size={20} />
                                    Download Compressed Image
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 p-8">
                            <ImageIcon size={48} className="mb-4 opacity-20" />
                            <p>Compressed image will appear here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
