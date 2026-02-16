"use client";

import { useState, useRef } from "react";
import { Upload, Download, Image as ImageIcon, RefreshCw, Check } from "lucide-react";
import BackButton from "@/components/BackButton";

const PRESETS = [
    { name: "Instagram Post", width: 1080, height: 1080, ratio: "1:1" },
    { name: "Instagram Story", width: 1080, height: 1920, ratio: "9:16" },
    { name: "Instagram Portrait", width: 1080, height: 1350, ratio: "4:5" },
    { name: "Twitter Post", width: 1200, height: 675, ratio: "16:9" },
    { name: "Facebook Post", width: 1200, height: 630, ratio: "1.91:1" },
    { name: "LinkedIn Post", width: 1200, height: 627, ratio: "1.91:1" },
    { name: "YouTube Thumbnail", width: 1280, height: 720, ratio: "16:9" },
    { name: "Pinterest Pin", width: 1000, height: 1500, ratio: "2:3" },
];

export default function SocialMediaImageResizer() {
    const [image, setImage] = useState<string | null>(null);
    const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            reader.readAsDataURL(file);
            setProcessedImage(null);
        }
    };

    const processImage = () => {
        if (!image || !canvasRef.current) return;
        setIsProcessing(true);

        const img = new Image();
        img.src = image;
        img.onload = () => {
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            canvas.width = selectedPreset.width;
            canvas.height = selectedPreset.height;

            // Calculate scaling to cover
            const scale = Math.max(
                canvas.width / img.width,
                canvas.height / img.height
            );

            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

            setProcessedImage(canvas.toDataURL("image/jpeg", 0.9));
            setIsProcessing(false);
        };
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Social Media <span className="text-indigo-500">Resizer</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Resize your images perfectly for every social media platform.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {/* Upload */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <ImageIcon size={20} className="text-indigo-500" />
                            Source Image
                        </h3>
                        {!image ? (
                            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors relative group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="text-indigo-500" size={24} />
                                </div>
                                <p className="text-zinc-400">Upload Image</p>
                            </div>
                        ) : (
                            <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                                <img src={image} alt="Source" className="w-full h-64 object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setImage(null)} className="bg-white text-black px-4 py-2 rounded-lg font-medium">
                                        Change Image
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Settings */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 space-y-6">
                        <h3 className="text-xl font-semibold text-white">Select Format</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {PRESETS.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => {
                                        setSelectedPreset(preset);
                                        setProcessedImage(null);
                                    }}
                                    className={`p-4 rounded-xl border text-left transition-all ${selectedPreset.name === preset.name
                                            ? "bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                            : "bg-zinc-950 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                                        }`}
                                >
                                    <div className="font-medium">{preset.name}</div>
                                    <div className="text-xs opacity-60 mt-1">
                                        {preset.width} x {preset.height} ({preset.ratio})
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={processImage}
                            disabled={!image || isProcessing}
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isProcessing ? <RefreshCw className="animate-spin" /> : <Check size={20} />}
                            {isProcessing ? "Processing..." : "Resize Image"}
                        </button>
                    </div>
                </div>

                {/* Preview */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white mb-4">Preview & Download</h3>

                    <div className="flex-1 bg-zinc-950 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center p-4 relative">
                        <canvas ref={canvasRef} className="hidden" />
                        {processedImage ? (
                            <img
                                src={processedImage}
                                alt="Processed"
                                className="max-w-full max-h-[500px] object-contain shadow-2xl"
                            />
                        ) : (
                            <div className="text-zinc-600 text-center">
                                <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
                                <p>Processed image will appear here</p>
                            </div>
                        )}
                    </div>

                    {processedImage && (
                        <a
                            href={processedImage}
                            download={`resized-${selectedPreset.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 transition-all"
                        >
                            <Download size={20} />
                            Download Image
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
