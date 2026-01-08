import Link from "next/link";
import { Image as ImageIcon, Crop, Scissors, Wand2, ArrowLeft, Smile } from "lucide-react";

const tools = [
    {
        title: "Image Compressor",
        description: "Compress JPG, PNG, WebP images locally.",
        icon: ImageIcon,
        href: "/image/compressor",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Resizer & Cropper",
        description: "Resize and crop images to exact dimensions.",
        icon: Crop,
        href: "/image/resizer",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Background Remover",
        description: "Remove image backgrounds automatically.",
        icon: Scissors,
        href: "/image/remove-bg",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Meme Generator",
        description: "Create viral memes with custom text.",
        icon: Smile,
        href: "/image/meme-generator",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
];

export default function ImageToolsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Image Tools</h1>
                    <p className="text-zinc-400">Edit and optimize images in your browser.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.title}
                        href={tool.href}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:bg-zinc-900/80 transition-all duration-300 hover:border-white/20 hover:shadow-xl"
                    >
                        <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} w-fit mb-4`}>
                            <tool.icon size={24} />
                        </div>

                        <h2 className="text-xl font-semibold mb-2 text-zinc-100 group-hover:text-white">
                            {tool.title}
                        </h2>
                        <p className="text-sm text-zinc-400 group-hover:text-zinc-300">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
