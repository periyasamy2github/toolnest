"use client";

import { useState } from "react";
import { ArrowLeft, Upload, FileText, Type, Download, Loader2, Settings2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PDFDocument, rgb, degrees } from "pdf-lib";
import { m, AnimatePresence } from "framer-motion";

export default function WatermarkPDFPage() {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [opacity, setOpacity] = useState(0.3);
    const [processing, setProcessing] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (uploadedFiles: FileList | null) => {
        if (!uploadedFiles || uploadedFiles.length === 0) return;
        const selectedFile = uploadedFiles[0];
        if (selectedFile.type !== "application/pdf") return;

        setError(null);
        try {
            const arrayBuffer = await selectedFile.arrayBuffer();

            let pdfDoc;
            try {
                pdfDoc = await PDFDocument.load(arrayBuffer);
            } catch (err: any) {
                if (err.message.includes("encrypted")) {
                    throw new Error("This PDF is encrypted. Please unlock it first.");
                }
                throw err;
            }

            setFile(selectedFile);
        } catch (err: any) {
            console.error("Failed to load PDF:", err);
            setError(err.message || "Failed to load PDF. It might be corrupted.");
        }
    };

    const addWatermark = async () => {
        if (!file || !text.trim()) return;
        setProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();

            pages.forEach(page => {
                const { width, height } = page.getSize();
                page.drawText(text, {
                    x: width / 2 - (text.length * 10),
                    y: height / 2,
                    size: 50,
                    color: rgb(0.7, 0.7, 0.7),
                    opacity: opacity,
                    rotate: degrees(-45),
                });
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes.buffer as any], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `watermarked_${file.name}`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Watermark failed:", error);
            alert("Failed to add watermark. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-12 space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/pdf" className="p-2 rounded-xl bg-zinc-900 border border-white/5 hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Watermark PDF</h1>
                    <p className="text-zinc-400">Add a text watermark to your PDF document with premium UI.</p>
                </div>
            </div>

            {error && (
                <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
                >
                    <AlertCircle size={20} />
                    <p className="text-sm font-medium">{error}</p>
                </m.div>
            )}

            {!file ? (
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        handleFileUpload(e.dataTransfer.files);
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    className={cn(
                        "relative h-64 group cursor-pointer",
                    )}
                >
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                    />
                    <div className={cn(
                        "absolute inset-0 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3",
                        dragOver ? "border-pink-500 bg-pink-500/10" : "border-white/10 bg-zinc-900/50 group-hover:border-white/20"
                    )}>
                        <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400">
                            <Type size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-semibold">Click or drag a PDF here to upload</p>
                            <p className="text-zinc-500 text-sm">Protect your work with a watermark</p>
                        </div>
                    </div>
                </m.div>
            ) : (
                <m.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                >
                    <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                                <FileText size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">{file.name}</p>
                                <p className="text-zinc-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setFile(null); setText(""); setError(null); }}
                            className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors"
                        >
                            Change File
                        </button>
                    </div>

                    <div className="glass-card p-8 space-y-8 rounded-2xl border-white/5 bg-zinc-900/30">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                                <Settings2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Watermark Settings</h3>
                                <p className="text-zinc-400 text-sm">Customize the appearance of your watermark.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-zinc-400">Watermark Text</label>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="e.g., CONFIDENTIAL"
                                    className="w-full px-4 py-4 bg-zinc-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500 transition-all"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-zinc-400">Opacity</label>
                                    <span className="px-2 py-1 rounded-md bg-zinc-950 border border-white/5 text-xs font-bold text-pink-400">
                                        {Math.round(opacity * 100)}%
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={opacity}
                                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                />
                                <div className="flex justify-between text-[10px] text-zinc-600 font-medium">
                                    <span>Subtle</span>
                                    <span>Strong</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={addWatermark}
                        disabled={processing || !text.trim()}
                        className="w-full py-4 bg-pink-600 hover:bg-pink-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/20"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Download size={20} />
                                Add Watermark & Download
                            </>
                        )}
                    </button>
                </m.div>
            )}

            <div className="glass-card p-4 bg-pink-500/5 border-pink-500/10 rounded-xl">
                <p className="text-xs text-zinc-500 text-center">
                    The watermark will be placed diagonally in the center of every page.
                    Processing is done entirely in your browser.
                </p>
            </div>
        </div>
    );
}
