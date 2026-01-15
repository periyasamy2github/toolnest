"use client";

import { useState } from "react";
import { ArrowLeft, Upload, FileText, Download, Loader2, Trash2, AlertCircle, GripVertical } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PDFDocument } from "pdf-lib";
import { Reorder, m, AnimatePresence } from "framer-motion";


interface PDFPage {
    id: string;
    index: number;
    previewUrl?: string;
}

export default function ReorderPDFPage() {
    const [file, setFile] = useState<File | null>(null);
    const [pages, setPages] = useState<PDFPage[]>([]);
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (uploadedFiles: FileList | null) => {
        if (!uploadedFiles || uploadedFiles.length === 0) return;
        const selectedFile = uploadedFiles[0];
        if (selectedFile.type !== "application/pdf") return;

        setFile(selectedFile);
        setLoading(true);
        setError(null);

        try {
            const arrayBuffer = await selectedFile.arrayBuffer();

            // Try to load the PDF
            let pdfDoc;
            try {
                pdfDoc = await PDFDocument.load(arrayBuffer);
            } catch (err: any) {
                if (err.message.includes("encrypted")) {
                    throw new Error("This PDF is encrypted. Please unlock it first using our Unlock PDF tool.");
                }
                throw err;
            }

            const pageCount = pdfDoc.getPageCount();

            // Load for preview
            const pdfjs = await import("pdfjs-dist");
            pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            const newPages: PDFPage[] = [];
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            for (let i = 0; i < pageCount; i++) {
                const page = await pdf.getPage(i + 1);
                const viewport = page.getViewport({ scale: 0.3 });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                let previewUrl = "";
                if (ctx) {
                    await page.render({ canvasContext: ctx, viewport, canvas: canvas } as any).promise;
                    previewUrl = canvas.toDataURL("image/jpeg", 0.8);
                }

                newPages.push({
                    id: `page-${i}-${Math.random().toString(36).substr(2, 9)}`,
                    index: i,
                    previewUrl
                });
            }
            setPages(newPages);
        } catch (err: any) {
            console.error("Failed to load PDF:", err);
            setError(err.message || "Failed to load PDF. It might be corrupted.");
            setFile(null);
        } finally {
            setLoading(false);
        }
    };

    const reorderPDF = async () => {
        if (!file || pages.length === 0) return;
        setProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const srcDoc = await PDFDocument.load(arrayBuffer);
            const newPdf = await PDFDocument.create();

            const pageIndices = pages.map(p => p.index);
            const copiedPages = await newPdf.copyPages(srcDoc, pageIndices);
            copiedPages.forEach(page => newPdf.addPage(page));

            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes.buffer as any], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `reordered_${file.name}`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Reorder failed:", error);
            alert("Failed to reorder PDF. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    const removePage = (id: string) => {
        setPages(pages.filter(p => p.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-12 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/pdf" className="p-2 rounded-xl bg-zinc-900 border border-white/5 hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Reorder PDF Pages</h1>
                    <p className="text-zinc-400">Rearrange or remove pages from your PDF with premium drag and drop.</p>
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
                <div
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
                        dragOver ? "border-cyan-500 bg-cyan-500/10" : "border-white/10 bg-zinc-900/50 group-hover:border-white/20"
                    )}>
                        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                            <Upload size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-semibold">Click or drag a PDF here to upload</p>
                            <p className="text-zinc-500 text-sm">We'll extract the pages for you to reorder</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center justify-between bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                <FileText size={20} />
                            </div>
                            <div>
                                <p className="text-white font-medium">{file.name}</p>
                                <p className="text-zinc-500 text-xs">{pages.length} pages</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setFile(null); setPages([]); setError(null); }}
                            className="text-xs font-bold text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                        >
                            <Trash2 size={14} /> Change File
                        </button>
                    </div>

                    {loading ? (
                        <div className="h-64 flex flex-col items-center justify-center gap-3">
                            <Loader2 className="animate-spin text-cyan-500" size={32} />
                            <p className="text-zinc-400">Extracting pages...</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <Reorder.Group
                                axis="y"
                                values={pages}
                                onReorder={setPages}
                                className="flex flex-col gap-3"
                            >
                                <AnimatePresence mode="popLayout">
                                    {pages.map((page, i) => (
                                        <Reorder.Item
                                            key={page.id}
                                            value={page}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            whileDrag={{
                                                scale: 1.02,
                                                zIndex: 50,
                                                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)"
                                            }}
                                            className="relative group/page cursor-grab active:cursor-grabbing touch-none"
                                        >
                                            <div className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-2xl border border-white/5 group-hover/page:border-cyan-500/30 transition-all group-active/page:bg-zinc-900">
                                                {/* Drag Handle */}
                                                <div className="p-2 text-zinc-600 group-hover/page:text-zinc-400 transition-colors">
                                                    <GripVertical size={20} />
                                                </div>

                                                {/* Page Number Badge */}
                                                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center text-sm font-bold text-cyan-400 shadow-inner">
                                                    {i + 1}
                                                </div>

                                                {/* Preview Thumbnail */}
                                                <div className="w-16 h-20 bg-zinc-950 rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                                                    {page.previewUrl ? (
                                                        <img
                                                            src={page.previewUrl}
                                                            alt={`Page ${page.index + 1}`}
                                                            className="w-full h-full object-contain select-none"
                                                            draggable={false}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <FileText size={20} className="text-zinc-800" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Page Info */}
                                                <div className="flex-grow">
                                                    <p className="text-sm font-semibold text-white">Page {i + 1}</p>
                                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Original: Page {page.index + 1}</p>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2 pr-2">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); removePage(page.id); }}
                                                        className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                        title="Remove Page"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </Reorder.Item>
                                    ))}
                                </AnimatePresence>
                            </Reorder.Group>

                            <m.button
                                layout
                                onClick={reorderPDF}
                                disabled={processing || pages.length === 0}
                                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Download size={20} />
                                        Save & Download PDF
                                    </>
                                )}
                            </m.button>
                        </div>
                    )}
                </div>
            )}

            <div className="glass-card p-4 bg-cyan-500/5 border-cyan-500/10 rounded-xl">
                <p className="text-xs text-zinc-500 text-center">
                    Drag the items to reorder pages. The numbers on the left show the new sequence.
                </p>
            </div>
        </div>
    );
}
