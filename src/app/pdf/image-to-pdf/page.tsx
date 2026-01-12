"use client";

import { useState } from "react";
import { ArrowLeft, Upload, ImageIcon, Trash2, Download, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PDFDocument } from "pdf-lib";
import { m, AnimatePresence, Reorder } from "framer-motion";

interface ImageFile {
    id: string;
    name: string;
    url: string;
    file: File;
}

export default function ImageToPDFPage() {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [processing, setProcessing] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const handleFileUpload = (uploadedFiles: FileList | null) => {
        if (!uploadedFiles) return;

        const newImages: ImageFile[] = [];
        Array.from(uploadedFiles).forEach(file => {
            if (file.type.startsWith("image/")) {
                newImages.push({
                    id: Math.random().toString(36).substr(2, 9),
                    name: file.name,
                    url: URL.createObjectURL(file),
                    file
                });
            }
        });

        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (id: string) => {
        setImages(images.filter(img => img.id !== id));
    };

    const convertToPDF = async () => {
        if (images.length === 0) return;
        setProcessing(true);

        try {
            const pdfDoc = await PDFDocument.create();

            for (const imgFile of images) {
                const imgBytes = await imgFile.file.arrayBuffer();
                let image;

                if (imgFile.file.type === "image/jpeg" || imgFile.file.type === "image/jpg") {
                    image = await pdfDoc.embedJpg(imgBytes);
                } else if (imgFile.file.type === "image/png") {
                    image = await pdfDoc.embedPng(imgBytes);
                } else {
                    continue;
                }

                const page = pdfDoc.addPage([image.width, image.height]);
                page.drawImage(image, {
                    x: 0,
                    y: 0,
                    width: image.width,
                    height: image.height,
                });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes.buffer as any], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "images_to_pdf.pdf";
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Conversion failed:", error);
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
                    <h1 className="text-3xl font-bold text-white">Image to PDF</h1>
                    <p className="text-zinc-400">Convert your images to a single PDF document with premium drag and drop.</p>
                </div>
            </div>

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
                    "relative group cursor-pointer",
                    images.length > 0 ? "h-32" : "h-64"
                )}
            >
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div className={cn(
                    "absolute inset-0 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3",
                    dragOver ? "border-emerald-500 bg-emerald-500/10" : "border-white/10 bg-zinc-900/50 group-hover:border-white/20"
                )}>
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <Upload size={images.length > 0 ? 20 : 32} />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-semibold">
                            {images.length > 0 ? "Add more images" : "Click or drag images here to upload"}
                        </p>
                        {!images.length && <p className="text-zinc-500 text-sm">Supports JPG, PNG, BMP, GIF</p>}
                    </div>
                </div>
            </div>

            {images.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <ImageIcon size={18} className="text-emerald-400" />
                            Selected Images ({images.length})
                        </h3>
                        <button
                            onClick={() => setImages([])}
                            className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>

                    <Reorder.Group
                        axis="x"
                        values={images}
                        onReorder={setImages}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {images.map((img, i) => (
                                <Reorder.Item
                                    key={img.id}
                                    value={img}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    whileDrag={{
                                        scale: 1.05,
                                        zIndex: 50,
                                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)"
                                    }}
                                    className="relative group/img cursor-grab active:cursor-grabbing"
                                >
                                    <div className="relative aspect-square bg-zinc-900 rounded-xl overflow-hidden border border-white/5 group-hover/img:border-emerald-500/50 transition-all shadow-lg">
                                        <img
                                            src={img.url}
                                            alt={img.name}
                                            className="w-full h-full object-cover select-none opacity-60 group-hover/img:opacity-100 transition-opacity"
                                            draggable={false}
                                        />

                                        {/* Overlay info */}
                                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity pointer-events-none">
                                            <p className="text-[10px] font-bold text-white text-center truncate px-1">{img.name}</p>
                                        </div>

                                        {/* Selection/Number badge */}
                                        <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[10px] font-bold text-emerald-400 shadow-sm">
                                            {i + 1}
                                        </div>

                                        {/* Actions */}
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
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
                        onClick={convertToPDF}
                        disabled={processing || images.length === 0}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Converting...
                            </>
                        ) : (
                            <>
                                <FileText size={20} />
                                Convert to PDF & Download
                            </>
                        )}
                    </m.button>
                </div>
            )}

            <div className="glass-card p-4 bg-emerald-500/5 border-emerald-500/10 rounded-xl text-center">
                <p className="text-xs text-zinc-500">
                    Drag and drop images to reorder them in the final PDF.
                </p>
            </div>
        </div>
    );
}
