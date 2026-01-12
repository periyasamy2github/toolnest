"use client";

import { useState } from "react";
import { ArrowLeft, Upload, FileText, ImageIcon, Download, Loader2, Trash2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import * as pdfjs from "pdfjs-dist";
import JSZip from "jszip";
import { m, AnimatePresence } from "framer-motion";

// Set worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

export default function PDFToImagePage() {
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
                await pdfjs.getDocument({ data: arrayBuffer }).promise;
            } catch (err: any) {
                if (err.message.includes("Password") || err.name === "PasswordException") {
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

    const convertToImage = async () => {
        if (!file) return;
        setProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            const zip = new JSZip();
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2 }); // 2x scale for better quality
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                if (ctx) {
                    await page.render({ canvasContext: ctx, viewport }).promise;
                    const imageData = canvas.toDataURL("image/jpeg", 0.9);
                    const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, "");
                    zip.file(`page-${i}.jpg`, base64Data, { base64: true });
                }
            }

            const content = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(content);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${file.name.replace(".pdf", "")}_images.zip`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Conversion failed:", error);
            alert("Failed to convert PDF to images. Please try again.");
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
                    <h1 className="text-3xl font-bold text-white">PDF to Image</h1>
                    <p className="text-zinc-400">Convert each PDF page into a high-quality JPG image instantly.</p>
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
                        dragOver ? "border-orange-500 bg-orange-500/10" : "border-white/10 bg-zinc-900/50 group-hover:border-white/20"
                    )}>
                        <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
                            <ImageIcon size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-semibold">Click or drag a PDF here to upload</p>
                            <p className="text-zinc-500 text-sm">Extract all pages as high-quality images</p>
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
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
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
                        onClick={convertToImage}
                        disabled={processing}
                        className="w-full py-4 bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Converting...
                            </>
                        ) : (
                            <>
                                <Download size={20} />
                                Convert & Download ZIP
                            </>
                        )}
                    </button>
                </m.div>
            )}

            <div className="glass-card p-4 bg-orange-500/5 border-orange-500/10 rounded-xl">
                <p className="text-xs text-zinc-500 text-center">
                    Each page will be converted to a JPG image and bundled into a ZIP file.
                    Processing is done entirely in your browser.
                </p>
            </div>
        </div>
    );
}
