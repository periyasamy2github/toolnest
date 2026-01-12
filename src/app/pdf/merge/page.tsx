"use client";

import { useState } from "react";
import { ArrowLeft, Upload, FileText, Merge, Trash2, Download, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PDFDocument } from "pdf-lib";
import { m, AnimatePresence, Reorder } from "framer-motion";
import * as pdfjs from "pdfjs-dist";

// Set worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

interface PDFFile {
    id: string;
    name: string;
    file: File;
    pageCount: number;
    size: number;
    previewUrl?: string;
}

export default function MergePDFPage() {
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [processing, setProcessing] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (uploadedFiles: FileList | null) => {
        if (!uploadedFiles) return;
        setError(null);

        const newFiles: PDFFile[] = [];
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        for (const file of Array.from(uploadedFiles)) {
            if (file.type === "application/pdf") {
                try {
                    const arrayBuffer = await file.arrayBuffer();

                    let pdfDoc;
                    try {
                        pdfDoc = await PDFDocument.load(arrayBuffer);
                    } catch (err: any) {
                        if (err.message.includes("encrypted")) {
                            throw new Error(`"${file.name}" is encrypted. Please unlock it first.`);
                        }
                        throw err;
                    }

                    // Load for preview (first page only)
                    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
                    const page = await pdf.getPage(1);
                    const viewport = page.getViewport({ scale: 0.3 });
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    let previewUrl = "";
                    if (ctx) {
                        await page.render({ canvasContext: ctx, viewport, canvas: canvas }).promise;
                        previewUrl = canvas.toDataURL("image/jpeg", 0.8);
                    }

                    newFiles.push({
                        id: Math.random().toString(36).substr(2, 9),
                        name: file.name,
                        file,
                        pageCount: pdfDoc.getPageCount(),
                        size: file.size,
                        previewUrl
                    });
                } catch (err: any) {
                    console.error("Failed to load PDF:", err);
                    setError(err.message || `Failed to load "${file.name}"`);
                }
            }
        }
        setFiles([...files, ...newFiles]);
    };

    const mergePDFs = async () => {
        if (files.length < 2) return;
        setProcessing(true);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const fileObj of files) {
                const arrayBuffer = await fileObj.file.arrayBuffer();
                const pdfDoc = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes.buffer as any], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "merged_document.pdf";
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Merge failed:", error);
            alert("Failed to merge PDFs. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    const removeFile = (id: string) => {
        setFiles(files.filter(f => f.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-12 space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/pdf" className="p-2 rounded-xl bg-zinc-900 border border-white/5 hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Merge PDF</h1>
                    <p className="text-zinc-400">Combine multiple PDF files into one document with premium reordering.</p>
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
                    "relative h-48 group cursor-pointer",
                )}
            >
                <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div className={cn(
                    "absolute inset-0 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3",
                    dragOver ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-zinc-900/50 group-hover:border-white/20"
                )}>
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                        <Upload size={32} />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-semibold">Click or drag PDFs here to upload</p>
                        <p className="text-zinc-500 text-sm">Add multiple files to merge them together</p>
                    </div>
                </div>
            </div>

            {files.length > 0 && (
                <div className="space-y-8">
                    <Reorder.Group
                        axis="x"
                        values={files}
                        onReorder={setFiles}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {files.map((file) => (
                                <Reorder.Item
                                    key={file.id}
                                    value={file}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    whileDrag={{
                                        scale: 1.05,
                                        zIndex: 50,
                                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)"
                                    }}
                                    className="relative group/file cursor-grab active:cursor-grabbing"
                                >
                                    <div className="relative aspect-[3/4] bg-zinc-900 rounded-xl overflow-hidden border border-white/5 group-hover/file:border-blue-500/50 transition-all shadow-lg">
                                        {file.previewUrl ? (
                                            <img
                                                src={file.previewUrl}
                                                alt={file.name}
                                                className="w-full h-full object-contain select-none"
                                                draggable={false}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FileText size={32} className="text-zinc-800" />
                                            </div>
                                        )}

                                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-[10px] font-bold text-white truncate">{file.name}</p>
                                            <p className="text-[8px] text-zinc-400">{file.pageCount} pages • {(file.size / 1024 / 1024).toFixed(1)}MB</p>
                                        </div>

                                        <div className="absolute top-2 right-2 opacity-0 group-hover/file:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                                                className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </AnimatePresence>
                    </Reorder.Group>

                    <m.button
                        layout
                        onClick={mergePDFs}
                        disabled={processing || files.length < 2}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Merging...
                            </>
                        ) : (
                            <>
                                <Merge size={20} />
                                Merge & Download PDF
                            </>
                        )}
                    </m.button>
                </div>
            )}

            <div className="glass-card p-4 bg-blue-500/5 border-blue-500/10 rounded-xl">
                <p className="text-xs text-zinc-500 text-center">
                    Drag the files to change their order in the merged document.
                    All processing happens locally in your browser.
                </p>
            </div>
        </div>
    );
}
