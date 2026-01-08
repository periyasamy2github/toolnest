"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// All available dot styles from qr-code-styling
const dotStyles = [
    { id: "square", label: "Square" },
    { id: "dots", label: "Dots" },
    { id: "rounded", label: "Rounded" },
    { id: "extra-rounded", label: "Extra Rounded" },
    { id: "classy", label: "Classy" },
    { id: "classy-rounded", label: "Classy Rounded" },
];

// Corner square styles
const cornerSquareStyles = [
    { id: "square", label: "Square" },
    { id: "dot", label: "Dot" },
    { id: "extra-rounded", label: "Extra Rounded" },
];

// Corner dot styles
const cornerDotStyles = [
    { id: "square", label: "Square" },
    { id: "dot", label: "Dot" },
];

export default function QrCodePage() {
    const [value, setValue] = useState("https://example.com");
    const [size, setSize] = useState(256);
    const [fgColor, setFgColor] = useState("#000000");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [dotStyle, setDotStyle] = useState("square");
    const [cornerSquareStyle, setCornerSquareStyle] = useState("square");
    const [cornerDotStyle, setCornerDotStyle] = useState("square");
    const [logoImage, setLogoImage] = useState<string | undefined>(undefined);
    const qrRef = useRef<HTMLDivElement>(null);
    const qrCode = useRef<any>(null);

    useEffect(() => {
        // Dynamic import for qr-code-styling (client-side only)
        const loadQRCode = async () => {
            const QRCodeStyling = (await import("qr-code-styling")).default;

            if (qrCode.current) {
                qrCode.current.update({
                    data: value,
                    width: size,
                    height: size,
                    dotsOptions: {
                        color: fgColor,
                        type: dotStyle as any,
                    },
                    backgroundOptions: {
                        color: bgColor,
                    },
                    cornersSquareOptions: {
                        color: fgColor,
                        type: cornerSquareStyle as any,
                    },
                    cornersDotOptions: {
                        color: fgColor,
                        type: cornerDotStyle as any,
                    },
                    image: logoImage,
                    imageOptions: {
                        crossOrigin: "anonymous",
                        margin: 10,
                    },
                });
            } else {
                qrCode.current = new QRCodeStyling({
                    data: value,
                    width: size,
                    height: size,
                    type: "canvas",
                    dotsOptions: {
                        color: fgColor,
                        type: dotStyle as any,
                    },
                    backgroundOptions: {
                        color: bgColor,
                    },
                    cornersSquareOptions: {
                        color: fgColor,
                        type: cornerSquareStyle as any,
                    },
                    cornersDotOptions: {
                        color: fgColor,
                        type: cornerDotStyle as any,
                    },
                    image: logoImage,
                    imageOptions: {
                        crossOrigin: "anonymous",
                        margin: 10,
                    },
                });

                if (qrRef.current) {
                    qrRef.current.innerHTML = "";
                    qrCode.current.append(qrRef.current);
                }
            }
        };

        loadQRCode();
    }, [value, size, fgColor, bgColor, dotStyle, cornerSquareStyle, cornerDotStyle, logoImage]);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setLogoImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const downloadQR = () => {
        if (qrCode.current) {
            qrCode.current.download({ name: "qrcode", extension: "png" });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/tools/utils" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">QR Code Generator</h1>
                    <p className="text-zinc-400">Create custom QR codes with advanced styling.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6 space-y-5">
                    {/* Content */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Content</label>
                        <textarea
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full bg-zinc-950/50 border border-white/10 rounded-lg px-4 py-3 text-zinc-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all h-20 resize-none"
                            placeholder="Enter text or URL..."
                        />
                    </div>

                    {/* Dot Style */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Dot Style</label>
                        <div className="grid grid-cols-3 gap-2">
                            {dotStyles.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setDotStyle(style.id)}
                                    className={cn(
                                        "py-2 px-3 rounded-lg border text-xs font-medium transition-all",
                                        dotStyle === style.id
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                    )}
                                >
                                    {style.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Corner Square Style */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Corner Square Style</label>
                        <div className="grid grid-cols-3 gap-2">
                            {cornerSquareStyles.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setCornerSquareStyle(style.id)}
                                    className={cn(
                                        "py-2 px-3 rounded-lg border text-xs font-medium transition-all",
                                        cornerSquareStyle === style.id
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                    )}
                                >
                                    {style.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Corner Dot Style */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Corner Dot Style</label>
                        <div className="grid grid-cols-2 gap-2">
                            {cornerDotStyles.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setCornerDotStyle(style.id)}
                                    className={cn(
                                        "py-2 px-3 rounded-lg border text-xs font-medium transition-all",
                                        cornerDotStyle === style.id
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                    )}
                                >
                                    {style.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Foreground</label>
                            <input
                                type="color"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                                className="h-10 w-full rounded cursor-pointer bg-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Background</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="h-10 w-full rounded cursor-pointer bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Size */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Size: {size}px</label>
                        <input
                            type="range"
                            min="128"
                            max="512"
                            step="32"
                            value={size}
                            onChange={(e) => setSize(parseInt(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Logo (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer"
                        />
                        {logoImage && (
                            <button
                                onClick={() => setLogoImage(undefined)}
                                className="text-xs text-red-400 hover:text-red-300"
                            >
                                Remove Logo
                            </button>
                        )}
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col items-center justify-center space-y-6 bg-white/5">
                    <div ref={qrRef} className="bg-white p-4 rounded-xl shadow-xl min-h-[280px] flex items-center justify-center">
                        {/* QR code will be rendered here */}
                    </div>

                    <button
                        onClick={downloadQR}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        <Download size={20} />
                        Download PNG
                    </button>
                </div>
            </div>
        </div>
    );
}
