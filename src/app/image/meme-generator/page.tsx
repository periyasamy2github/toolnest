"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Upload, Download, Image as ImageIcon, Type, Plus, Trash2, Move, RotateCw, Palette, Layers, Smile } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { m, AnimatePresence } from "framer-motion";

// Types
type LayerType = "text" | "image" | "emoji";

interface BaseLayer {
    id: string;
    type: LayerType;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

interface TextLayer extends BaseLayer {
    type: "text";
    text: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    strokeColor: string;
    strokeWidth: number;
    shadowColor: string;
    shadowBlur: number;
    isUppercase: boolean;
}

interface ImageLayer extends BaseLayer {
    type: "image";
    src: string;
    width: number;
    height: number;
}

interface EmojiLayer extends BaseLayer {
    type: "emoji";
    emoji: string;
    fontSize: number;
}

type Layer = TextLayer | ImageLayer | EmojiLayer;

const FONTS = [
    { name: "Impact", value: "Impact" },
    { name: "Arial", value: "Arial" },
    { name: "Comic Sans MS", value: "Comic Sans MS" },
    { name: "Helvetica", value: "Helvetica" },
    { name: "Times New Roman", value: "Times New Roman" },
    { name: "Courier New", value: "Courier New" },
    { name: "Verdana", value: "Verdana" },
    { name: "Georgia", value: "Georgia" },
];

const EMOJIS = ["😂", "🔥", "💯", "😎", "🤔", "🤡", "💩", "👀", "🚀", "💀", "😭", "🎉", "❤️", "✨"];

export default function MemeGeneratorPage() {
    // State
    const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);
    const [layers, setLayers] = useState<Layer[]>([]);
    const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial Setup
    useEffect(() => {
        // Load default image or placeholder if needed
    }, []);

    // Handle Image Upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setBaseImage(img);
                    // Fit canvas to image but max out at container width
                    const maxWidth = 800;
                    const scale = Math.min(1, maxWidth / img.width);
                    setCanvasSize({
                        width: img.width * scale,
                        height: img.height * scale
                    });
                    setLayers([]); // Reset layers on new image
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // Add Layers
    const addTextLayer = () => {
        const newLayer: TextLayer = {
            id: crypto.randomUUID(),
            type: "text",
            text: "DOUBLE TAP TO EDIT",
            x: canvasSize.width / 2,
            y: canvasSize.height / 2,
            rotation: 0,
            scale: 1,
            fontSize: 40,
            fontFamily: "Impact",
            color: "#ffffff",
            strokeColor: "#000000",
            strokeWidth: 2,
            shadowColor: "rgba(0,0,0,0.5)",
            shadowBlur: 0,
            isUppercase: true,
        };
        setLayers([...layers, newLayer]);
        setSelectedLayerId(newLayer.id);
    };

    const addEmojiLayer = (emoji: string) => {
        const newLayer: EmojiLayer = {
            id: crypto.randomUUID(),
            type: "emoji",
            emoji: emoji,
            x: canvasSize.width / 2,
            y: canvasSize.height / 2,
            rotation: 0,
            scale: 1,
            fontSize: 60,
        };
        setLayers([...layers, newLayer]);
        setSelectedLayerId(newLayer.id);
    };

    // Canvas Drawing
    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Base Image
        if (baseImage) {
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
        } else {
            // Placeholder background
            ctx.fillStyle = "#18181b"; // zinc-900
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#27272a"; // zinc-800
            ctx.font = "bold 20px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Upload an image to start", canvas.width / 2, canvas.height / 2);
        }

        // Draw Layers
        layers.forEach((layer) => {
            ctx.save();
            ctx.translate(layer.x, layer.y);
            ctx.rotate((layer.rotation * Math.PI) / 180);
            ctx.scale(layer.scale, layer.scale);

            if (layer.type === "text") {
                const textLayer = layer as TextLayer;
                ctx.font = `900 ${textLayer.fontSize}px "${textLayer.fontFamily}"`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // Shadow
                if (textLayer.shadowBlur > 0) {
                    ctx.shadowColor = textLayer.shadowColor;
                    ctx.shadowBlur = textLayer.shadowBlur;
                }

                // Stroke
                if (textLayer.strokeWidth > 0) {
                    ctx.strokeStyle = textLayer.strokeColor;
                    ctx.lineWidth = textLayer.strokeWidth;
                    ctx.lineJoin = "round";
                    ctx.strokeText(textLayer.isUppercase ? textLayer.text.toUpperCase() : textLayer.text, 0, 0);
                }

                // Fill
                ctx.fillStyle = textLayer.color;
                ctx.fillText(textLayer.isUppercase ? textLayer.text.toUpperCase() : textLayer.text, 0, 0);
            } else if (layer.type === "emoji") {
                const emojiLayer = layer as EmojiLayer;
                ctx.font = `${emojiLayer.fontSize}px sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(emojiLayer.emoji, 0, 0);
            }

            // Draw selection box if selected
            if (layer.id === selectedLayerId) {
                ctx.restore(); // Restore to draw selection box without rotation/scale of the layer itself? 
                // Actually we want the box to rotate with it.
                // Re-apply transform for the box
                ctx.save();
                ctx.translate(layer.x, layer.y);
                ctx.rotate((layer.rotation * Math.PI) / 180);
                ctx.scale(layer.scale, layer.scale);

                // Simple selection indicator (just a dot for now or a box around estimated size)
                // Measuring text size is tricky without re-measuring. 
                // For now, let's just draw a small crosshair at the center
                ctx.strokeStyle = "#3b82f6"; // blue-500
                ctx.lineWidth = 2 / layer.scale;
                ctx.beginPath();
                ctx.moveTo(-10, 0);
                ctx.lineTo(10, 0);
                ctx.moveTo(0, -10);
                ctx.lineTo(0, 10);
                ctx.stroke();
            }

            ctx.restore();
        });
    }, [baseImage, layers, selectedLayerId]);

    useEffect(() => {
        drawCanvas();
    }, [drawCanvas]);

    // Interaction Handlers
    const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        // Simple hit detection (reverse order to pick top layer)
        // This is very basic distance-based detection.
        const clickedLayer = [...layers].reverse().find(layer => {
            const dx = layer.x - x;
            const dy = layer.y - y;
            return Math.sqrt(dx * dx + dy * dy) < 50; // 50px hit radius
        });

        if (clickedLayer) {
            setSelectedLayerId(clickedLayer.id);
            setIsDragging(true);
            setDragStart({ x, y });
        } else {
            setSelectedLayerId(null);
        }
    };

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDragging || !selectedLayerId) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (canvas.height / rect.height);

        const dx = x - dragStart.x;
        const dy = y - dragStart.y;

        setLayers(layers.map(layer => {
            if (layer.id === selectedLayerId) {
                return { ...layer, x: layer.x + dx, y: layer.y + dy };
            }
            return layer;
        }));

        setDragStart({ x, y });
    };

    const handleCanvasMouseUp = () => {
        setIsDragging(false);
    };

    const updateSelectedLayer = (updates: Partial<Layer>) => {
        if (!selectedLayerId) return;
        setLayers(layers.map(layer =>
            layer.id === selectedLayerId ? { ...layer, ...updates } as Layer : layer
        ));
    };

    const deleteSelectedLayer = () => {
        if (!selectedLayerId) return;
        setLayers(layers.filter(l => l.id !== selectedLayerId));
        setSelectedLayerId(null);
    };

    const downloadMeme = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Deselect to remove selection indicators
        const currentSelection = selectedLayerId;
        setSelectedLayerId(null);

        // Wait for re-render then download
        setTimeout(() => {
            const link = document.createElement("a");
            link.download = "meme-toolnest.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
            setSelectedLayerId(currentSelection);
        }, 50);
    };

    const selectedLayer = layers.find(l => l.id === selectedLayerId);

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/image" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft className="text-zinc-400" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-gradient">Meme Generator</h1>
                        <p className="text-zinc-400 text-lg">Multi-layer editing, custom styles, and more.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                        <Upload size={18} />
                        New Image
                    </button>
                    <button
                        onClick={downloadMeme}
                        disabled={!baseImage}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        Download
                    </button>
                </div>
                <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Canvas Area */}
                <div className="lg:col-span-8">
                    <div className="glass-card p-4 flex items-center justify-center bg-zinc-950/50 min-h-[600px] overflow-hidden rounded-xl border border-white/10 relative">
                        {!baseImage && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 pointer-events-none">
                                <ImageIcon size={64} className="mb-4 opacity-20" />
                                <p>Upload an image to start editing</p>
                            </div>
                        )}
                        <canvas
                            ref={canvasRef}
                            width={canvasSize.width}
                            height={canvasSize.height}
                            onMouseDown={handleCanvasMouseDown}
                            onMouseMove={handleCanvasMouseMove}
                            onMouseUp={handleCanvasMouseUp}
                            onMouseLeave={handleCanvasMouseUp}
                            className={cn(
                                "max-w-full h-auto shadow-2xl cursor-crosshair",
                                isDragging ? "cursor-grabbing" : "cursor-grab"
                            )}
                        />
                    </div>

                    {/* Quick Toolbar */}
                    <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                        <button onClick={addTextLayer} className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-white/10 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap">
                            <Type size={18} className="text-blue-400" />
                            Add Text
                        </button>
                        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-white/10 rounded-lg overflow-x-auto">
                            <Smile size={18} className="text-yellow-400 shrink-0" />
                            <div className="flex gap-2">
                                {EMOJIS.map(emoji => (
                                    <button
                                        key={emoji}
                                        onClick={() => addEmojiLayer(emoji)}
                                        className="hover:scale-125 transition-transform text-xl"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Properties Panel */}
                <div className="lg:col-span-4 space-y-6">
                    {selectedLayer ? (
                        <div className="glass-card p-6 space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Palette size={18} className="text-blue-400" />
                                    Layer Properties
                                </h3>
                                <button
                                    onClick={deleteSelectedLayer}
                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            {selectedLayer.type === "text" && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-zinc-400 uppercase">Content</label>
                                        <textarea
                                            value={(selectedLayer as TextLayer).text}
                                            onChange={(e) => updateSelectedLayer({ text: e.target.value })}
                                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-blue-500"
                                            rows={2}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-400 uppercase">Font</label>
                                            <select
                                                value={(selectedLayer as TextLayer).fontFamily}
                                                onChange={(e) => updateSelectedLayer({ fontFamily: e.target.value })}
                                                className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-200"
                                            >
                                                {FONTS.map(f => (
                                                    <option key={f.value} value={f.value}>{f.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-400 uppercase">Size</label>
                                            <input
                                                type="number"
                                                value={(selectedLayer as TextLayer).fontSize}
                                                onChange={(e) => updateSelectedLayer({ fontSize: Number(e.target.value) })}
                                                className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-zinc-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-400 uppercase">Color</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={(selectedLayer as TextLayer).color}
                                                    onChange={(e) => updateSelectedLayer({ color: e.target.value })}
                                                    className="h-8 w-8 rounded cursor-pointer bg-transparent border-0"
                                                />
                                                <span className="text-xs text-zinc-500 font-mono">{(selectedLayer as TextLayer).color}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-zinc-400 uppercase">Stroke</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={(selectedLayer as TextLayer).strokeColor}
                                                    onChange={(e) => updateSelectedLayer({ strokeColor: e.target.value })}
                                                    className="h-8 w-8 rounded cursor-pointer bg-transparent border-0"
                                                />
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="20"
                                                    value={(selectedLayer as TextLayer).strokeWidth}
                                                    onChange={(e) => updateSelectedLayer({ strokeWidth: Number(e.target.value) })}
                                                    className="w-16 bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-zinc-200 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="uppercase"
                                            checked={(selectedLayer as TextLayer).isUppercase}
                                            onChange={(e) => updateSelectedLayer({ isUppercase: e.target.checked })}
                                            className="rounded border-white/10 bg-zinc-900 text-blue-500 focus:ring-blue-500"
                                        />
                                        <label htmlFor="uppercase" className="text-sm text-zinc-300">Uppercase</label>
                                    </div>
                                </>
                            )}

                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-400 uppercase flex items-center gap-2">
                                        <RotateCw size={12} /> Rotation
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={selectedLayer.rotation}
                                        onChange={(e) => updateSelectedLayer({ rotation: Number(e.target.value) })}
                                        className="w-full accent-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-400 uppercase flex items-center gap-2">
                                        <Move size={12} /> Scale
                                    </label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="3"
                                        step="0.1"
                                        value={selectedLayer.scale}
                                        onChange={(e) => updateSelectedLayer({ scale: Number(e.target.value) })}
                                        className="w-full accent-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card p-8 flex flex-col items-center justify-center text-center space-y-4 text-zinc-500 min-h-[300px]">
                            <Layers size={48} className="opacity-20" />
                            <p>Select a layer to edit its properties</p>
                        </div>
                    )}

                    {/* Layers List */}
                    <div className="glass-card p-4">
                        <h3 className="font-semibold text-sm text-zinc-400 uppercase mb-4">Layers</h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                            {[...layers].reverse().map((layer, index) => (
                                <div
                                    key={layer.id}
                                    onClick={() => setSelectedLayerId(layer.id)}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border",
                                        selectedLayerId === layer.id
                                            ? "bg-blue-500/10 border-blue-500/50"
                                            : "bg-zinc-900/50 border-transparent hover:bg-zinc-900"
                                    )}
                                >
                                    {layer.type === "text" ? <Type size={16} className="text-zinc-400" /> : <Smile size={16} className="text-yellow-400" />}
                                    <span className="text-sm text-zinc-200 truncate flex-1">
                                        {layer.type === "text" ? (layer as TextLayer).text : (layer as EmojiLayer).emoji}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLayers(layers.filter(l => l.id !== layer.id));
                                            if (selectedLayerId === layer.id) setSelectedLayerId(null);
                                        }}
                                        className="text-zinc-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            {layers.length === 0 && (
                                <p className="text-xs text-zinc-600 text-center py-4">No layers added</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
