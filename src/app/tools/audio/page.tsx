import Link from "next/link";
import { Mic, Scissors, ArrowLeft, Merge } from "lucide-react";

const tools = [
    {
        title: "Voice Recorder",
        description: "Record audio directly from your microphone.",
        icon: Mic,
        href: "/tools/audio/recorder",
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
    {
        title: "MP3 Cutter",
        description: "Trim and cut audio files.",
        icon: Scissors,
        href: "/tools/audio/cutter",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Audio Merger",
        description: "Combine multiple audio files into one.",
        icon: Merge,
        href: "/tools/audio/merger",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
];

export default function AudioToolsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/tools/media" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Audio Tools</h1>
                    <p className="text-zinc-400">Record, edit, and process audio files.</p>
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
