import Link from "next/link";
import { Type, AlignLeft, CaseSensitive, ArrowLeft, GitDiff } from "lucide-react";

const tools = [
    {
        title: "Word Counter",
        description: "Count words, characters, and sentences.",
        icon: AlignLeft,
        href: "/tools/word-counter",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Case Converter",
        description: "Convert text to UPPERCASE, lowercase, Title Case, etc.",
        icon: CaseSensitive,
        href: "/tools/case-converter",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Lorem Ipsum Generator",
        description: "Generate placeholder text for your designs.",
        icon: Type,
        href: "/tools/lorem-ipsum",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Text Diff Checker",
        description: "Compare two texts and highlight differences.",
        icon: GitDiff,
        href: "/tools/text/diff-checker",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
];

export default function TextToolsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Text Tools</h1>
                    <p className="text-zinc-400">Manipulate and generate text content.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
