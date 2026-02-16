"use client";

import { useState } from "react";
import { ArrowLeft, Upload, FileText, ShieldCheck, Download, Loader2, Eye, EyeOff, Lock, Unlock, AlertCircle } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

export default function UnlockPDFPage() {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);

    const handleFileUpload = (uploadedFiles: FileList | null) => {
        if (!uploadedFiles || uploadedFiles.length === 0) return;
        const selectedFile = uploadedFiles[0];
        if (selectedFile.type !== "application/pdf") return;
        setFile(selectedFile);
        setInfoMessage(null);
    };

    const unlockPDF = async () => {
        if (!file || !password) return;
        setProcessing(true);

        // Simulate processing and show the "coming soon" message as requested
        setTimeout(() => {
            setInfoMessage("Unlocking encrypted PDFs requires specialized WASM modules. This feature is coming soon!");
            setProcessing(false);
        }, 1500);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 pt-6 pb-12 space-y-8">
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-3xl font-bold text-white">Unlock PDF</h1>
                    <p className="text-zinc-400">Remove password protection from your PDF securely.</p>
                </div>
            </div>

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
                            <ShieldCheck size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-white font-semibold">Click or drag a PDF here to upload</p>
                            <p className="text-zinc-500 text-sm">Unlock your document for editing</p>
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
                                <p className="text-zinc-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setFile(null); setPassword(""); setInfoMessage(null); }}
                            className="text-xs font-bold text-zinc-500 hover:text-red-400 transition-colors"
                        >
                            Change File
                        </button>
                    </div>

                    <div className="glass-card p-8 space-y-6 rounded-2xl border-white/5 bg-zinc-900/30">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
                                <Unlock size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Authentication Required</h3>
                                <p className="text-zinc-400 text-sm">This PDF is password protected. Please enter the password to unlock it.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-400">Enter PDF Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setInfoMessage(null); }}
                                    placeholder="Enter the document password"
                                    className="w-full px-4 py-4 bg-zinc-950 border border-white/10 rounded-xl text-white focus:outline-none focus:border-green-500 transition-all"
                                />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <AnimatePresence>
                                {infoMessage && (
                                    <m.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-start gap-2 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mt-4"
                                    >
                                        <AlertCircle size={18} className="text-blue-400 shrink-0 mt-0.5" />
                                        <p className="text-blue-100 text-sm leading-relaxed">
                                            {infoMessage}
                                        </p>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <button
                        onClick={unlockPDF}
                        disabled={processing || !password}
                        className="w-full py-4 bg-green-600 hover:bg-green-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Unlocking...
                            </>
                        ) : (
                            <>
                                <Lock size={20} />
                                Unlock & Download PDF
                            </>
                        )}
                    </button>
                </m.div>
            )}

            <div className="glass-card p-4 bg-green-500/5 border-green-500/10 rounded-xl">
                <p className="text-xs text-zinc-500 text-center">
                    You must know the password to unlock the PDF. This tool does not "crack" passwords.
                    All processing happens locally in your browser.
                </p>
            </div>
        </div>
    );
}
