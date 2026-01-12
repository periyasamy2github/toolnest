"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, Download, Image as ImageIcon, RotateCw, FlipHorizontal, FlipVertical, Crop as CropIcon } from "lucide-react";
import Link from "next/link";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { cn } from "@/lib/utils";

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export default function ImageCropperPage() {
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [aspect, setAspect] = useState<number | undefined>(16 / 9);
    const [rotate, setRotate] = useState(0);
    const [scale, setScale] = useState(1);
    const [flip, setFlip] = useState({ horizontal: false, vertical: false });

    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update between images
            const reader = new FileReader();
            reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    };

    const handleDownload = () => {
        if (!previewCanvasRef.current) return;

        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) return;
            const previewUrl = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.download = 'cropped-image.png';
            anchor.href = previewUrl;
            anchor.click();
        });
    };

    // Canvas Preview Logic
    useEffect(() => {
        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        if (image && canvas && crop) {
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            const ctx = canvas.getContext('2d');

            if (!ctx) return;

            const pixelRatio = window.devicePixelRatio;
            canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
            canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

            ctx.scale(pixelRatio, pixelRatio);
            ctx.imageSmoothingQuality = 'high';

            const cropX = crop.x * scaleX;
            const cropY = crop.y * scaleY;

            const rotateRads = rotate * Math.PI / 180;
            const centerX = image.naturalWidth / 2;
            const centerY = image.naturalHeight / 2;

            ctx.save();

            // 5) Move the crop origin to the canvas origin (0,0)
            ctx.translate(-cropX, -cropY);
            // 4) Move the origin to the center of the original position
            ctx.translate(centerX, centerY);
            // 3) Rotate around the origin
            ctx.rotate(rotateRads);
            // 2) Scale the image
            ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
            // 1) Move the center of the image to the origin (0,0)
            ctx.translate(-centerX, -centerY);

            ctx.drawImage(
                image,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
                0,
                0,
                image.naturalWidth,
                image.naturalHeight,
            );

            ctx.restore();
        }
    }, [completedCrop, rotate, scale, flip]);

    const ASPECT_RATIOS = [
        { label: "Free", value: undefined },
        { label: "1:1", value: 1 },
        { label: "16:9", value: 16 / 9 },
        { label: "4:3", value: 4 / 3 },
        { label: "9:16", value: 9 / 16 },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/image" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ArrowLeft className="text-zinc-400" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-gradient">Image Cropper</h1>
                        <p className="text-zinc-400 text-lg">Crop, rotate, and flip images with precision.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => document.getElementById('crop-upload')?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                        <Upload size={18} />
                        New Image
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!completedCrop}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} />
                        Download
                    </button>
                </div>
                <input type="file" id="crop-upload" accept="image/*" onChange={onSelectFile} className="hidden" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-zinc-300">Aspect Ratio</label>
                            <div className="grid grid-cols-3 gap-2">
                                {ASPECT_RATIOS.map((ratio) => (
                                    <button
                                        key={ratio.label}
                                        onClick={() => {
                                            setAspect(ratio.value);
                                            if (imgRef.current) {
                                                const { width, height } = imgRef.current;
                                                setCrop(ratio.value ? centerAspectCrop(width, height, ratio.value) : undefined);
                                            }
                                        }}
                                        className={cn(
                                            "px-3 py-2 rounded-lg text-sm font-medium transition-all border",
                                            aspect === ratio.value
                                                ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                                : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                        )}
                                    >
                                        {ratio.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                                    <RotateCw size={16} /> Rotation ({rotate}°)
                                </label>
                                <input
                                    type="range"
                                    min="-180"
                                    max="180"
                                    value={rotate}
                                    onChange={(e) => setRotate(Number(e.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setFlip(f => ({ ...f, horizontal: !f.horizontal }))}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                                        flip.horizontal ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                    )}
                                >
                                    <FlipHorizontal size={18} /> Flip H
                                </button>
                                <button
                                    onClick={() => setFlip(f => ({ ...f, vertical: !f.vertical }))}
                                    className={cn(
                                        "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                                        flip.vertical ? "bg-blue-500/20 border-blue-500 text-blue-400" : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-zinc-800"
                                    )}
                                >
                                    <FlipVertical size={18} /> Flip V
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="lg:col-span-2">
                    <div className="glass-card p-4 flex items-center justify-center bg-zinc-950/50 min-h-[500px] overflow-hidden rounded-xl border border-white/10 relative">
                        {imgSrc ? (
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspect}
                                className="max-h-[600px]"
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={imgSrc}
                                    style={{ transform: `scale(${scale}) rotate(${rotate}deg) scaleX(${flip.horizontal ? -1 : 1}) scaleY(${flip.vertical ? -1 : 1})` }}
                                    onLoad={onImageLoad}
                                    className="max-w-full max-h-[600px]"
                                />
                            </ReactCrop>
                        ) : (
                            <div className="text-center text-zinc-500 space-y-4">
                                <CropIcon size={64} className="mx-auto opacity-20" />
                                <p>Upload an image to start cropping</p>
                            </div>
                        )}
                    </div>
                    {/* Hidden Canvas for Processing */}
                    <canvas
                        ref={previewCanvasRef}
                        className="hidden"
                    />
                </div>
            </div>
        </div>
    );
}
