"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Copy, Check, RefreshCw, Loader2 } from "lucide-react";


export default function ImageToText() {
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            reader.readAsDataURL(file);
            setText("");
            setProgress(0);
        }
    };

    const extractText = async () => {
        if (!image) return;

        setIsProcessing(true);
        setProgress(0);

        try {
            const Tesseract = (await import("tesseract.js")).default;
            const result = await Tesseract.recognize(image, "eng", {
                logger: (m) => {
                    if (m.status === "recognizing text") {
                        setProgress(Math.round(m.progress * 100));
                    }
                },
            });
            setText(result.data.text);
        } catch (error) {
            console.error("OCR Error:", error);
            setText("Error extracting text. Please try another image.");
        } finally {
            setIsProcessing(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Image to <span className="text-blue-500">Text</span> (OCR)
                </h1>
                <p className="text-zinc-400 text-lg">
                    Extract text from images instantly using advanced OCR technology.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-96 border-2 border-dashed border-zinc-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group overflow-hidden relative"
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        {image ? (
                            <img
                                src={image}
                                alt="Preview"
                                className="w-full h-full object-contain p-4"
                            />
                        ) : (
                            <div className="text-center space-y-4 p-6">
                                <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <Upload size={32} className="text-zinc-400 group-hover:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-white">Click to upload image</p>
                                    <p className="text-sm text-zinc-500">Supports JPG, PNG, BMP, WEBP</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={extractText}
                        disabled={!image || isProcessing}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${!image || isProcessing
                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                            }`}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Processing {progress}%
                            </>
                        ) : (
                            <>
                                <FileText size={20} />
                                Extract Text
                            </>
                        )}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">Extracted Text</label>
                        {text && (
                            <button
                                onClick={copyToClipboard}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    <div className="relative h-96">
                        <textarea
                            readOnly
                            value={text}
                            placeholder="Extracted text will appear here..."
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-6 text-zinc-300 font-mono text-sm resize-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
