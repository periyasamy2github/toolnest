"use client";

import { useState, useRef } from "react";
import { ArrowLeft, PenTool, Download, Trash2, Undo, Palette, Type } from "lucide-react";
import Link from "next/link";
import SignatureCanvas from "react-signature-canvas";
import { cn } from "@/lib/utils";

export default function SignatureGeneratorPage() {
    const [color, setColor] = useState("#000000");
    const [penWidth, setPenWidth] = useState(2);
    const [backgroundColor, setBackgroundColor] = useState("transparent");

    const sigCanvas = useRef<SignatureCanvas>(null);

    const clear = () => sigCanvas.current?.clear();

    const download = (format: "png" | "jpg" | "svg") => {
        if (!sigCanvas.current) return;

        let dataUrl;
        if (format === "svg") {
            // Basic SVG export logic or use library feature if available
            // react-signature-canvas doesn't export SVG directly easily without plugin
            // Fallback to PNG for now or implement custom SVG logic
            // For simplicity in this demo, we'll stick to PNG/JPG
            dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
        } else {
            dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL(`image/${format}`);
        }

        const link = document.createElement("a");
        link.download = `signature.${format}`;
        link.href = dataUrl;
        link.click();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/utils" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Signature Generator</h1>
                    <p className="text-zinc-400 text-lg">Create and download your digital signature.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Canvas Area */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="glass-card p-1 bg-white rounded-xl overflow-hidden relative shadow-2xl">
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor={color}
                            minWidth={penWidth}
                            maxWidth={penWidth + 1.5}
                            backgroundColor={backgroundColor === "transparent" ? "rgba(0,0,0,0)" : backgroundColor}
                            canvasProps={{
                                className: "w-full h-[400px] cursor-crosshair",
                                style: {
                                    background: backgroundColor === "transparent"
                                        ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==')"
                                        : backgroundColor
                                }
                            }}
                        />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={clear}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors shadow-sm"
                                title="Clear"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => download("png")}
                            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                        >
                            <Download size={18} /> Download PNG
                        </button>
                        <button
                            onClick={() => download("jpg")}
                            className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <Download size={18} /> Download JPG
                        </button>
                    </div>
                </div>

                {/* Controls */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <Palette size={16} /> Pen Color
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {["#000000", "#0000FF", "#FF0000", "#008000", "#800080", "#FFD700", "#FF1493", "#00FFFF", "#FFFFFF", "#808080"].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={cn(
                                            "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110",
                                            color === c ? "border-white scale-110 shadow-lg" : "border-transparent"
                                        )}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-0 p-0"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <PenTool size={16} /> Pen Width ({penWidth}px)
                            </label>
                            <input
                                type="range"
                                min="0.5"
                                max="10"
                                step="0.5"
                                value={penWidth}
                                onChange={(e) => setPenWidth(Number(e.target.value))}
                                className="w-full accent-blue-500"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                <Type size={16} /> Background
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setBackgroundColor("transparent")}
                                    className={cn(
                                        "py-2 rounded-lg text-xs font-medium border transition-colors",
                                        backgroundColor === "transparent"
                                            ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                            : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                    )}
                                >
                                    Transparent
                                </button>
                                <button
                                    onClick={() => setBackgroundColor("#ffffff")}
                                    className={cn(
                                        "py-2 rounded-lg text-xs font-medium border transition-colors",
                                        backgroundColor === "#ffffff"
                                            ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                            : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                    )}
                                >
                                    White
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-4 bg-blue-500/10 border-blue-500/20">
                        <p className="text-xs text-blue-200 text-center">
                            Signatures are generated locally in your browser. No data is sent to any server.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
