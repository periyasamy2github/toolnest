"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, Upload, FileText, Merge, Scissors, Download, Trash2, GripVertical, FileDown, Loader2, RotateCw, ArrowUp, ArrowDown, Type } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PDFDocument, rgb, degrees } from "pdf-lib";

interface PDFFile {
    id: string;
    name: string;
    file: File;
    pageCount: number;
}

type Tool = "merge" | "split" | "compress" | "rotate" | "reorder" | "watermark";

export default function PDFToolsPage() {
    const [activeTool, setActiveTool] = useState<Tool>("merge");
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [splitPages, setSplitPages] = useState("");
    const [processing, setProcessing] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(90);
    const [watermarkText, setWatermarkText] = useState("");

    const handleFileUpload = async (uploadedFiles: FileList | null) => {
        if (!uploadedFiles) return;

        const newFiles: PDFFile[] = [];

        for (const file of Array.from(uploadedFiles)) {
            if (file.type === "application/pdf") {
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdfDoc = await PDFDocument.load(arrayBuffer);
                    newFiles.push({
                        id: Date.now().toString() + Math.random(),
                        name: file.name,
                        file,
                        pageCount: pdfDoc.getPageCount()
                    });
                } catch (error) {
                    console.error("Failed to load PDF:", error);
                }
            }
        }

        setFiles(prev => [...prev, ...newFiles]);
    };

    const removeFile = (id: string) => {
        setFiles(files.filter(f => f.id !== id));
    };

    const clearFiles = () => {
        setFiles([]);
    };

    const moveFileUp = (index: number) => {
        if (index === 0) return;
        const newFiles = [...files];
        [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
        setFiles(newFiles);
    };

    const moveFileDown = (index: number) => {
        if (index === files.length - 1) return;
        const newFiles = [...files];
        [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
        setFiles(newFiles);
    };

    const downloadPDF = (pdfBytes: Uint8Array, filename: string) => {
        const blob = new Blob([pdfBytes.slice()], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const mergePDFs = async () => {
        if (files.length < 2) return;
        setProcessing(true);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of files) {
                const arrayBuffer = await pdfFile.file.arrayBuffer();
                const pdfDoc = await PDFDocument.load(arrayBuffer);
                const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                pages.forEach(page => mergedPdf.addPage(page));
            }

            const mergedBytes = await mergedPdf.save();
            downloadPDF(mergedBytes, "merged.pdf");
        } catch (error) {
            console.error("Merge failed:", error);
        } finally {
            setProcessing(false);
        }
    };

    const splitPDF = async () => {
        if (files.length !== 1 || !splitPages.trim()) return;
        setProcessing(true);

        try {
            const arrayBuffer = await files[0].file.arrayBuffer();
            const srcDoc = await PDFDocument.load(arrayBuffer);

            const pageRanges = splitPages.split(",").map(s => s.trim());

            for (const range of pageRanges) {
                const newPdf = await PDFDocument.create();

                if (range.includes("-")) {
                    const [start, end] = range.split("-").map(n => parseInt(n.trim()) - 1);
                    const indices = [];
                    for (let i = start; i <= Math.min(end, srcDoc.getPageCount() - 1); i++) {
                        indices.push(i);
                    }
                    const pages = await newPdf.copyPages(srcDoc, indices);
                    pages.forEach(page => newPdf.addPage(page));
                } else {
                    const pageIndex = parseInt(range) - 1;
                    if (pageIndex >= 0 && pageIndex < srcDoc.getPageCount()) {
                        const [page] = await newPdf.copyPages(srcDoc, [pageIndex]);
                        newPdf.addPage(page);
                    }
                }

                if (newPdf.getPageCount() > 0) {
                    const pdfBytes = await newPdf.save();
                    downloadPDF(pdfBytes, `split-${range.replace("-", "_")}.pdf`);
                }
            }
        } catch (error) {
            console.error("Split failed:", error);
        } finally {
            setProcessing(false);
        }
    };

    const compressPDF = async () => {
        if (files.length !== 1) return;
        setProcessing(true);

        try {
            const arrayBuffer = await files[0].file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            const compressedBytes = await pdfDoc.save({
                useObjectStreams: true,
            });

            downloadPDF(compressedBytes, `compressed-${files[0].name}`);
        } catch (error) {
            console.error("Compression failed:", error);
        } finally {
            setProcessing(false);
        }
    };

    const rotatePDF = async () => {
        if (files.length !== 1) return;
        setProcessing(true);

        try {
            const arrayBuffer = await files[0].file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();

            pages.forEach(page => {
                page.setRotation(degrees(rotationAngle));
            });

            const rotatedBytes = await pdfDoc.save();
            downloadPDF(rotatedBytes, `rotated-${files[0].name}`);
        } catch (error) {
            console.error("Rotation failed:", error);
        } finally {
            setProcessing(false);
        }
    };

    const reorderPDFs = async () => {
        if (files.length < 2) return;
        setProcessing(true);

        try {
            const reorderedPdf = await PDFDocument.create();

            for (const pdfFile of files) {
                const arrayBuffer = await pdfFile.file.arrayBuffer();
                const pdfDoc = await PDFDocument.load(arrayBuffer);
                const pages = await reorderedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
                pages.forEach(page => reorderedPdf.addPage(page));
            }

            const reorderedBytes = await reorderedPdf.save();
            downloadPDF(reorderedBytes, "reordered.pdf");
        } catch (error) {
            console.error("Reorder failed:", error);
        } finally {
            setProcessing(false);
        }
    };

    const addWatermark = async () => {
        if (files.length !== 1 || !watermarkText.trim()) return;
        setProcessing(true);

        try {
            const arrayBuffer = await files[0].file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pages = pdfDoc.getPages();

            pages.forEach(page => {
                const { width, height } = page.getSize();
                page.drawText(watermarkText, {
                    x: width / 2 - (watermarkText.length * 10),
                    y: height / 2,
                    size: 50,
                    color: rgb(0.7, 0.7, 0.7),
                    opacity: 0.3,
                    rotate: degrees(-45),
                });
            });

            const watermarkedBytes = await pdfDoc.save();
            downloadPDF(watermarkedBytes, `watermarked-${files[0].name}`);
        } catch (error) {
            console.error("Watermark failed:", error);
        } finally {
            setProcessing(false);
        }
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        handleFileUpload(e.dataTransfer.files);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragOver(false);
    }, []);

    const tools = [
        { id: "merge" as Tool, name: "Merge", icon: Merge, color: "text-blue-400", desc: "Combine multiple PDFs into one" },
        { id: "split" as Tool, name: "Split", icon: Scissors, color: "text-green-400", desc: "Extract specific pages from a PDF" },
        { id: "compress" as Tool, name: "Compress", icon: FileDown, color: "text-purple-400", desc: "Reduce PDF file size" },
        { id: "rotate" as Tool, name: "Rotate", icon: RotateCw, color: "text-orange-400", desc: "Rotate all pages in a PDF" },
        { id: "reorder" as Tool, name: "Reorder", icon: GripVertical, color: "text-cyan-400", desc: "Rearrange PDFs in custom order" },
        { id: "watermark" as Tool, name: "Watermark", icon: Type, color: "text-pink-400", desc: "Add text watermark to PDF" },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/utils" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">PDF Tools</h1>
                    <p className="text-zinc-400 text-lg">Merge, split, rotate, reorder, compress, and watermark PDFs in your browser.</p>
                </div>
            </div>

            {/* Tool Selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => { setActiveTool(tool.id); clearFiles(); }}
                        className={cn(
                            "glass-card p-6 text-left transition-all hover:scale-[1.02]",
                            activeTool === tool.id ? "ring-2 ring-blue-500 bg-blue-500/10" : ""
                        )}
                    >
                        <tool.icon className={cn("w-8 h-8 mb-3", tool.color)} />
                        <h3 className="text-white font-bold text-lg">{tool.name}</h3>
                        <p className="text-zinc-400 text-sm">{tool.desc}</p>
                    </button>
                ))}
            </div>

            {/* Upload Area */}
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={cn(
                    "glass-card p-8 border-2 border-dashed transition-all",
                    dragOver ? "border-blue-500 bg-blue-500/10" : "border-white/10"
                )}
            >
                <div className="flex flex-col items-center justify-center py-8">
                    <Upload className="w-12 h-12 text-zinc-500 mb-4" />
                    <p className="text-zinc-300 font-medium mb-2">Drop PDFs here or click to upload</p>
                    <p className="text-zinc-500 text-sm mb-4">
                        {activeTool === "merge" || activeTool === "reorder" ? "Upload 2 or more PDFs" : "Upload a PDF file"}
                    </p>
                    <label className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl cursor-pointer transition-colors">
                        <input
                            type="file"
                            accept=".pdf"
                            multiple={activeTool === "merge" || activeTool === "reorder"}
                            onChange={(e) => handleFileUpload(e.target.files)}
                            className="hidden"
                        />
                        Select Files
                    </label>
                </div>
            </div>

            {/* Files List */}
            {files.length > 0 && (
                <div className="glass-card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <FileText size={18} className="text-blue-400" /> Selected Files
                        </h3>
                        <button
                            onClick={clearFiles}
                            className="text-xs font-bold text-zinc-500 hover:text-red-400 flex items-center gap-1"
                        >
                            <Trash2 size={14} /> Clear All
                        </button>
                    </div>
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div key={file.id} className="flex items-center gap-3 p-3 bg-zinc-900 rounded-lg">
                                {activeTool === "reorder" && (
                                    <div className="flex flex-col gap-1">
                                        <button
                                            onClick={() => moveFileUp(index)}
                                            disabled={index === 0}
                                            className="p-1 text-zinc-500 hover:text-blue-400 disabled:opacity-30"
                                        >
                                            <ArrowUp size={14} />
                                        </button>
                                        <button
                                            onClick={() => moveFileDown(index)}
                                            disabled={index === files.length - 1}
                                            className="p-1 text-zinc-500 hover:text-blue-400 disabled:opacity-30"
                                        >
                                            <ArrowDown size={14} />
                                        </button>
                                    </div>
                                )}
                                <GripVertical className="text-zinc-600" size={16} />
                                <FileText className="text-blue-400" size={20} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-zinc-500 text-xs">{file.pageCount} pages</p>
                                </div>
                                <button
                                    onClick={() => removeFile(file.id)}
                                    className="p-2 text-zinc-500 hover:text-red-400"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Split Options */}
            {activeTool === "split" && files.length === 1 && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">Page Selection</h3>
                    <input
                        type="text"
                        value={splitPages}
                        onChange={(e) => setSplitPages(e.target.value)}
                        placeholder="e.g., 1, 3-5, 8"
                        className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-zinc-500 text-sm">
                        Enter page numbers or ranges separated by commas. Example: 1, 3-5, 8
                    </p>
                </div>
            )}

            {/* Rotate Options */}
            {activeTool === "rotate" && files.length === 1 && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">Rotation Angle</h3>
                    <select
                        value={rotationAngle}
                        onChange={(e) => setRotationAngle(parseInt(e.target.value))}
                        className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                        <option value={90}>90° Clockwise</option>
                        <option value={180}>180°</option>
                        <option value={270}>270° Clockwise (90° Counter-clockwise)</option>
                    </select>
                </div>
            )}

            {/* Watermark Options */}
            {activeTool === "watermark" && files.length === 1 && (
                <div className="glass-card p-6 space-y-4">
                    <h3 className="text-lg font-bold text-white">Watermark Text</h3>
                    <input
                        type="text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="Enter watermark text"
                        className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-zinc-500 text-sm">
                        The watermark will be added diagonally across all pages
                    </p>
                </div>
            )}

            {/* Action Button */}
            {files.length > 0 && (
                <button
                    onClick={() => {
                        if (activeTool === "merge") mergePDFs();
                        else if (activeTool === "split") splitPDF();
                        else if (activeTool === "compress") compressPDF();
                        else if (activeTool === "rotate") rotatePDF();
                        else if (activeTool === "reorder") reorderPDFs();
                        else if (activeTool === "watermark") addWatermark();
                    }}
                    disabled={processing ||
                        (activeTool === "merge" && files.length < 2) ||
                        (activeTool === "split" && !splitPages.trim()) ||
                        (activeTool === "reorder" && files.length < 2) ||
                        (activeTool === "watermark" && !watermarkText.trim())}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Download size={20} />
                            {activeTool === "merge" ? "Merge & Download" :
                                activeTool === "split" ? "Split & Download" :
                                    activeTool === "compress" ? "Compress & Download" :
                                        activeTool === "rotate" ? "Rotate & Download" :
                                            activeTool === "reorder" ? "Reorder & Download" :
                                                "Add Watermark & Download"}
                        </>
                    )}
                </button>
            )}

            <div className="glass-card p-4 bg-blue-500/10 border-blue-500/20">
                <p className="text-xs text-blue-200 text-center">
                    All PDF processing happens locally in your browser. Your files are never uploaded to any server.
                </p>
            </div>
        </div>
    );
}
