"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Download, Image as ImageIcon, Sliders, Wand2, RefreshCcw } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface FilterSettings {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
    hueRotate: number;
    sepia: number;
    grayscale: number;
}

const DEFAULT_SETTINGS: FilterSettings = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    hueRotate: 0,
    sepia: 0,
    grayscale: 0,
};

const PRESETS = [
    { name: "Normal", settings: DEFAULT_SETTINGS },
    { name: "Vintage", settings: { ...DEFAULT_SETTINGS, sepia: 50, contrast: 120, brightness: 90, saturation: 80 } },
    { name: "Noir", settings: { ...DEFAULT_SETTINGS, grayscale: 100, contrast: 140, brightness: 110 } },
    { name: "Vivid", settings: { ...DEFAULT_SETTINGS, saturation: 150, contrast: 110 } },
    { name: "Cold", settings: { ...DEFAULT_SETTINGS, hueRotate: 180, saturation: 80, brightness: 110 } },
    { name: "Warm", settings: { ...DEFAULT_SETTINGS, sepia: 30, saturation: 120, brightness: 105 } },
    { name: "Soft", settings: { ...DEFAULT_SETTINGS, brightness: 110, contrast: 90, blur: 1 } },
];

export default function ImageFiltersPage() {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [settings, setSettings] = useState<FilterSettings>(DEFAULT_SETTINGS);
    const [activePreset, setActivePreset] = useState("Normal");

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImgSrc(event.target?.result as string);
                setSettings(DEFAULT_SETTINGS);
                setActivePreset("Normal");
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const getFilterString = (s: FilterSettings) => {
        return `brightness(${s.brightness}%) contrast(${s.contrast}%) saturate(${s.saturation}%) blur(${s.blur}px) hue-rotate(${s.hueRotate}deg) sepia(${s.sepia}%) grayscale(${s.grayscale}%)`;
    };

    useEffect(() => {
        if (!imgSrc || !canvasRef.current || !imgRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = imgRef.current;

        if (!ctx) return;

        // Set canvas size to match image
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Apply filters
        ctx.filter = getFilterString(settings);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    }, [imgSrc, settings]);

    const handleDownload = () => {
        if (!canvasRef.current) return;
        const link = document.createElement("a");
        link.download = "filtered-image.png";
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
    };

    const applyPreset = (preset: typeof PRESETS[0]) => {
        setSettings(preset.settings);
        setActivePreset(preset.name);
    };

    const updateSetting = (key: keyof FilterSettings, value: number) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setActivePreset("Custom");
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <div>
                        <h1 className="text-4xl font-black text-gradient">Image Filters</h1>
                        <p className="text-zinc-400 text-lg">Apply professional filters and adjustments.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => document.getElementById('filter-upload')?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                        <Upload size={18} />
                        New Image
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!imgSrc}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        Download
                    </button>
                </div>
                <input type="file" id="filter-upload" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Canvas Area */}
                <div className="lg:col-span-8">
                    <div className="glass-card p-4 flex items-center justify-center bg-zinc-950/50 min-h-[600px] overflow-hidden rounded-xl border border-white/10 relative">
                        {!imgSrc && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 pointer-events-none">
                                <ImageIcon size={64} className="mb-4 opacity-20" />
                                <p>Upload an image to start editing</p>
                            </div>
                        )}
                        {/* Hidden Source Image */}
                        <img ref={imgRef} src={imgSrc || ""} alt="source" className="hidden" />

                        {/* Canvas Display */}
                        <canvas
                            ref={canvasRef}
                            className="max-w-full h-auto shadow-2xl"
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Presets */}
                    <div className="glass-card p-6 space-y-4">
                        <h3 className="font-semibold text-sm text-zinc-400 uppercase flex items-center gap-2">
                            <Wand2 size={16} /> Presets
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            {PRESETS.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => applyPreset(preset)}
                                    className={cn(
                                        "px-3 py-2 rounded-lg text-sm font-medium transition-all border",
                                        activePreset === preset.name
                                            ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                            : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                    )}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Adjustments */}
                    <div className="glass-card p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm text-zinc-400 uppercase flex items-center gap-2">
                                <Sliders size={16} /> Adjustments
                            </h3>
                            <button
                                onClick={() => {
                                    setSettings(DEFAULT_SETTINGS);
                                    setActivePreset("Normal");
                                }}
                                className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                            >
                                <RefreshCcw size={12} /> Reset
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-300">Brightness</span>
                                    <span className="text-zinc-500">{settings.brightness}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={settings.brightness}
                                    onChange={(e) => updateSetting("brightness", Number(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-300">Contrast</span>
                                    <span className="text-zinc-500">{settings.contrast}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={settings.contrast}
                                    onChange={(e) => updateSetting("contrast", Number(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-300">Saturation</span>
                                    <span className="text-zinc-500">{settings.saturation}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={settings.saturation}
                                    onChange={(e) => updateSetting("saturation", Number(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-300">Blur</span>
                                    <span className="text-zinc-500">{settings.blur}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="20"
                                    value={settings.blur}
                                    onChange={(e) => updateSetting("blur", Number(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-300">Sepia</span>
                                    <span className="text-zinc-500">{settings.sepia}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={settings.sepia}
                                    onChange={(e) => updateSetting("sepia", Number(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-zinc-300">Grayscale</span>
                                    <span className="text-zinc-500">{settings.grayscale}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={settings.grayscale}
                                    onChange={(e) => updateSetting("grayscale", Number(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
