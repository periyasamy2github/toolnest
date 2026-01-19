"use client";

import { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ArrowLeft, Upload, Crop as CropIcon, Download, Image as ImageIcon, RefreshCw } from "lucide-react";
import Link from "next/link";
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

export default function ImageResizerPage() {
    const [imgSrc, setImgSrc] = useState('');
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [aspect, setAspect] = useState<number | undefined>(undefined);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [processedImage, setProcessedImage] = useState<string | null>(null);

    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
        setWidth(e.currentTarget.naturalWidth);
        setHeight(e.currentTarget.naturalHeight);
    }

    async function processImage() {
        try {
            const image = imgRef.current;
            const canvas = previewCanvasRef.current;
            const pixelCrop = completedCrop;

            if (image && canvas && pixelCrop) {
                const scaleX = image.naturalWidth / image.width;
                const scaleY = image.naturalHeight / image.height;
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    throw new Error("No 2d context");
                }

                const pixelRatio = window.devicePixelRatio;

                canvas.width = Math.floor(pixelCrop.width * scaleX * pixelRatio);
                canvas.height = Math.floor(pixelCrop.height * scaleY * pixelRatio);

                ctx.scale(pixelRatio, pixelRatio);
                ctx.imageSmoothingQuality = 'high';

                const cropX = pixelCrop.x * scaleX;
                const cropY = pixelCrop.y * scaleY;

                ctx.save();

                // Draw the cropped image using source coordinates
                ctx.drawImage(
                    image,
                    cropX,
                    cropY,
                    pixelCrop.width * scaleX,
                    pixelCrop.height * scaleY,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                ctx.restore();

                // Resize if needed (create a new canvas for resizing)
                const resizeCanvas = document.createElement('canvas');
                resizeCanvas.width = width || canvas.width;
                resizeCanvas.height = height || canvas.height;
                const resizeCtx = resizeCanvas.getContext('2d');

                if (resizeCtx) {
                    resizeCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, resizeCanvas.width, resizeCanvas.height);
                    const dataUrl = resizeCanvas.toDataURL('image/png');
                    setProcessedImage(dataUrl);
                }
            } else if (image && !pixelCrop) {
                // Just resize without crop
                const resizeCanvas = document.createElement('canvas');
                resizeCanvas.width = width || image.naturalWidth;
                resizeCanvas.height = height || image.naturalHeight;
                const resizeCtx = resizeCanvas.getContext('2d');
                if (resizeCtx) {
                    resizeCtx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, resizeCanvas.width, resizeCanvas.height);
                    setProcessedImage(resizeCanvas.toDataURL('image/png'));
                }
            }
        } catch (error) {
            console.error("Error processing image:", error);
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/media" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Image Resizer & Cropper</h1>
                    <p className="text-zinc-400">Crop and resize images directly in your browser.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-6 min-h-[400px] flex items-center justify-center bg-zinc-900/50">
                        {!imgSrc ? (
                            <div className="text-center space-y-4">
                                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 hover:border-zinc-500 transition-all cursor-pointer">
                                    <input type="file" accept="image/*" onChange={onSelectFile} className="hidden" id="img-upload" />
                                    <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center gap-4">
                                        <div className="bg-zinc-800 p-4 rounded-full">
                                            <Upload className="text-zinc-400" size={32} />
                                        </div>
                                        <p className="text-zinc-400">Click to upload image</p>
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div className="relative max-w-full max-h-[600px] overflow-auto">
                                <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                    onComplete={(c) => setCompletedCrop(c)}
                                    aspect={aspect}
                                    className="max-w-full"
                                >
                                    <img
                                        ref={imgRef}
                                        alt="Crop me"
                                        src={imgSrc}
                                        onLoad={onImageLoad}
                                        className="max-w-full"
                                    />
                                </ReactCrop>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    {imgSrc && (
                        <div className="glass-card p-6 space-y-6">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
                                    <CropIcon size={20} />
                                    Crop Settings
                                </h3>
                                <div className="flex gap-2 flex-wrap">
                                    {[undefined, 1, 16 / 9, 4 / 3].map((r) => (
                                        <button
                                            key={r || 'free'}
                                            onClick={() => {
                                                setAspect(r);
                                                if (imgRef.current) {
                                                    setCrop(r ? centerAspectCrop(imgRef.current.width, imgRef.current.height, r) : undefined);
                                                }
                                            }}
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-sm border transition-colors",
                                                aspect === r
                                                    ? "bg-blue-600 border-blue-600 text-white"
                                                    : "bg-zinc-800 border-white/10 text-zinc-400 hover:bg-zinc-700"
                                            )}
                                        >
                                            {r === undefined ? 'Free' : r === 1 ? 'Square' : r === 16 / 9 ? '16:9' : '4:3'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-zinc-200 flex items-center gap-2">
                                    <RefreshCw size={20} />
                                    Resize Output
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500">Width (px)</label>
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={(e) => setWidth(Number(e.target.value))}
                                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-zinc-500">Height (px)</label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(Number(e.target.value))}
                                            className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-zinc-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={processImage}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                <Download size={20} />
                                Process Image
                            </button>
                        </div>
                    )}

                    {processedImage && (
                        <div className="glass-card p-6 space-y-4">
                            <h3 className="font-semibold text-zinc-200">Result</h3>
                            <div className="bg-zinc-950/50 rounded-lg p-2 border border-white/5">
                                <img src={processedImage} alt="Processed" className="w-full h-auto rounded" />
                            </div>
                            <a
                                href={processedImage}
                                download="processed-image.png"
                                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-medium transition-colors"
                            >
                                <Download size={20} />
                                Download
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Hidden canvas for processing */}
            <canvas
                ref={previewCanvasRef}
                className="hidden"
            />
        </div>
    );
}
