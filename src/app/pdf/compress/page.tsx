"use client";

import { useState } from "react";
import { ArrowLeft, Upload, FileText, Download, Loader2, Zap, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PDFDocument } from "pdf-lib";
import { m, AnimatePresence } from "framer-motion";

export default function CompressPDFPage() {
    const [file, setFile] = useState<File | null>(null);
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
            try {
                await PDFDocument.load(arrayBuffer);
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

    const compressPDF = async () => {
        if (!file) return;
        setProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            // Basic compression using object streams
            const compressedBytes = await pdfDoc.save({
                useObjectStreams: true,
            });

            const blob = new Blob([compressedBytes.buffer as any], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `compressed_${file.name}`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Compression failed:", error);
            alert("Failed to compress PDF. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-12 space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/pdf" className="p-2 rounded-xl bg-zinc-900 border border-white/5 hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Compress PDF</h1>
                    <p className="text-zinc-400">Reduce your PDF file size while maintaining the best possible quality.</p>
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
                        dragOver ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-zinc-900/50 group-hover:border-white/20"
                    )}>
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                            <Zap size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-semibold">Click or drag a PDF here to upload</p>
                            <p className="text-zinc-500 text-sm">Optimize your file for web and email</p>
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
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <FileText size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">{file.name}</p>
                                <p className="text-zinc-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setFile(null); setError(null); }}
                            className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors"
                        >
                            Change File
                        </button>
                    </div>

                    <button
                        onClick={compressPDF}
                        disabled={processing}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Compressing...
                            </>
                        ) : (
                            <>
                                <Download size={20} />
                                Compress & Download PDF
                            </>
                        )}
                    </button>
                </m.div>
            )}

            <div className="glass-card p-4 bg-blue-500/5 border-blue-500/10 rounded-xl">
                <p className="text-xs text-zinc-500 text-center">
                    We use object stream compression to reduce file size without losing quality.
                    All processing happens locally in your browser.
                </p>
            </div>
        </div>
    );
}
