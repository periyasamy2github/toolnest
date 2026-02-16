"use client";

import { useState } from "react";
import { ArrowLeft, Upload, FileText, Scissors, Download, Loader2, Trash2, Info, AlertCircle } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { PDFDocument } from "pdf-lib";
import { m, AnimatePresence } from "framer-motion";

export default function SplitPDFPage() {
    const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState(0);
    const [splitPages, setSplitPages] = useState("");
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

            setPageCount(pdfDoc.getPageCount());
            setFile(selectedFile);
        } catch (err: any) {
            console.error("Failed to load PDF:", err);
            setError(err.message || "Failed to load PDF. It might be corrupted.");
        }
    };

    const splitPDF = async () => {
        if (!file || !splitPages.trim()) return;
        setProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const srcDoc = await PDFDocument.load(arrayBuffer);

            const pageRanges = splitPages.split(",").map(s => s.trim());

            for (const range of pageRanges) {
                const newPdf = await PDFDocument.create();

                if (range.includes("-")) {
                    const [start, end] = range.split("-").map(n => parseInt(n.trim()) - 1);
                    const indices = [];
                    for (let i = start; i <= Math.min(end, srcDoc.getPageCount() - 1); i++) {
                        if (i >= 0) indices.push(i);
                    }
                    if (indices.length > 0) {
                        const pages = await newPdf.copyPages(srcDoc, indices);
                        pages.forEach(page => newPdf.addPage(page));
                    }
                } else {
                    const pageIndex = parseInt(range) - 1;
                    if (pageIndex >= 0 && pageIndex < srcDoc.getPageCount()) {
                        const [page] = await newPdf.copyPages(srcDoc, [pageIndex]);
                        newPdf.addPage(page);
                    }
                }

                if (newPdf.getPageCount() > 0) {
                    const pdfBytes = await newPdf.save();
                    const blob = new Blob([pdfBytes.buffer as any], { type: "application/pdf" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `split_${range.replace("-", "_")}_${file.name}`;
                    a.click();
                    URL.revokeObjectURL(url);
                }
            }
        } catch (error) {
            console.error("Split failed:", error);
            alert("Failed to split PDF. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-12 space-y-8">
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-3xl font-bold text-white">Split PDF</h1>
                    <p className="text-zinc-400">Extract specific pages from your PDF file with precision.</p>
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
                        dragOver ? "border-green-500 bg-green-500/10" : "border-white/10 bg-zinc-900/50 group-hover:border-white/20"
                    )}>
                        <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
                            <Scissors size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-semibold">Click or drag a PDF here to upload</p>
                            <p className="text-zinc-500 text-sm">Extract ranges or individual pages</p>
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
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                                <FileText size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">{file.name}</p>
                                <p className="text-zinc-500 text-xs">{pageCount} pages</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setFile(null); setSplitPages(""); setError(null); }}
                            className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors"
                        >
                            Change File
                        </button>
                    </div>

                    <div className="glass-card p-8 space-y-6 rounded-2xl border-white/5 bg-zinc-900/30">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                                <Scissors size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Split Configuration</h3>
                                <p className="text-zinc-400 text-sm">Define the pages or ranges you want to extract.</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-zinc-400">Page Selection</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={splitPages}
                                    onChange={(e) => setSplitPages(e.target.value)}
                                    placeholder="e.g., 1, 3-5, 8"
                                    className="w-full px-4 py-4 bg-zinc-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-all"
                                />
                            </div>
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                                <Info size={14} className="text-blue-400 mt-0.5 shrink-0" />
                                <p className="text-[11px] text-zinc-500 leading-relaxed">
                                    Enter page numbers or ranges separated by commas. <br />
                                    <span className="text-zinc-400 font-medium">Example:</span> 1, 3-5, 8 (Extracts page 1, pages 3 through 5, and page 8)
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={splitPDF}
                        disabled={processing || !splitPages.trim()}
                        className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Splitting...
                            </>
                        ) : (
                            <>
                                <Download size={20} />
                                Split & Download PDF
                            </>
                        )}
                    </button>
                </m.div>
            )}

            <div className="glass-card p-4 bg-green-500/5 border-green-500/10 rounded-xl">
                <p className="text-xs text-zinc-500 text-center">
                    Each range or page will be downloaded as a separate PDF file.
                    Processing is done entirely in your browser.
                </p>
            </div>
        </div>
    );
}
