"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Download, Image as ImageIcon, Type } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function MemeGeneratorPage() {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [fontSize, setFontSize] = useState(40);
    const [textColor, setTextColor] = useState("#ffffff");
    const [generatedMeme, setGeneratedMeme] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImgSrc(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const generateMeme = () => {
        if (!imgSrc || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imgSrc;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw image
            ctx.drawImage(img, 0, 0);

            // Configure text styles
            ctx.fillStyle = textColor;
            ctx.strokeStyle = "black";
            ctx.lineWidth = Math.floor(fontSize / 8);
            ctx.textAlign = "center";
            ctx.font = `900 ${fontSize}px sans-serif`;
            ctx.lineJoin = "round";

            // Draw Top Text
            if (topText) {
                ctx.textBaseline = "top";
                ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 20);
                ctx.fillText(topText.toUpperCase(), canvas.width / 2, 20);
            }

            // Draw Bottom Text
            if (bottomText) {
                ctx.textBaseline = "bottom";
                ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
                ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 20);
            }

            setGeneratedMeme(canvas.toDataURL("image/png"));
        };
    };

    useEffect(() => {
        if (imgSrc) {
            generateMeme();
        }
    }, [imgSrc, topText, bottomText, fontSize, textColor]);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/image" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Meme Generator</h1>
                    <p className="text-zinc-400">Create viral memes in seconds.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-300">Upload Image</label>
                            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-zinc-500 hover:bg-zinc-900/50 transition-all cursor-pointer">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="meme-upload" />
                                <label htmlFor="meme-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                    <div className="bg-zinc-800 p-4 rounded-full">
                                        <Upload className="text-zinc-400" size={32} />
                                    </div>
                                    <p className="text-zinc-400">Click to upload template</p>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Top Text</label>
                                <input
                                    type="text"
                                    value={topText}
                                    onChange={(e) => setTopText(e.target.value)}
                                    placeholder="TOP TEXT"
                                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-zinc-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Bottom Text</label>
                                <input
                                    type="text"
                                    value={bottomText}
                                    onChange={(e) => setBottomText(e.target.value)}
                                    placeholder="BOTTOM TEXT"
                                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-zinc-200"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Font Size</label>
                                <input
                                    type="number"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                    className="w-full bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-zinc-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Text Color</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={textColor}
                                        onChange={(e) => setTextColor(e.target.value)}
                                        className="h-10 w-full bg-zinc-900 border border-white/10 rounded-lg cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[500px] bg-zinc-950/50">
                        {imgSrc ? (
                            <div className="space-y-4 w-full flex flex-col items-center">
                                <img src={generatedMeme || imgSrc} alt="Meme Preview" className="max-w-full max-h-[600px] object-contain border border-white/10 rounded-lg shadow-2xl" />
                                <a
                                    href={generatedMeme || "#"}
                                    download="meme.png"
                                    className="flex items-center justify-center gap-2 px-8 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    <Download size={20} />
                                    Download Meme
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-zinc-500 space-y-4">
                                <ImageIcon size={64} className="mx-auto opacity-20" />
                                <p>Upload an image to start creating</p>
                            </div>
                        )}
                        {/* Hidden Canvas */}
                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                </div>
            </div>
        </div>
    );
}
