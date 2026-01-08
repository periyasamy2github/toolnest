"use client";

import Link from "next/link";
import {
  Video,
  Image as ImageIcon,
  Wrench,
  Type,
  ArrowRight,
  Download,
  Activity,
  Code
} from "lucide-react";

const tools = [
  {
    title: "Developer Tools",
    description: "JSON formatter, Base64, JWT, Regex, and more.",
    icon: Code,
    href: "/tools/developer",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Downloader",
    description: "Download videos from YouTube, Instagram, Facebook, and TikTok.",
    icon: Download,
    href: "/tools/downloader",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    title: "Media Tools",
    description: "Convert, cut, merge, and record audio & video files.",
    icon: Video,
    href: "/tools/media",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Image Tools",
    description: "Compress, resize, and edit images in your browser.",
    icon: ImageIcon,
    href: "/tools/image",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    title: "Health Tools",
    description: "Calories calculator, BMR, and food tracking.",
    icon: Activity,
    href: "/tools/health",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    title: "Utilities",
    description: "QR codes, converters, calculators, and more.",
    icon: Wrench,
    href: "/tools/utils",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    title: "Text Tools",
    description: "Word count, case conversion, and text generation.",
    icon: Type,
    href: "/tools/text",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          ToolNest
        </h1>
        <p className="text-zinc-400 text-lg">
          All Your Everyday Tools in One Place. A unified suite of powerful web tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:bg-zinc-900/80 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} mb-4`}>
                <tool.icon size={32} />
              </div>
              <ArrowRight className="text-zinc-600 group-hover:text-white transition-colors" />
            </div>

            <h2 className="text-2xl font-semibold mb-2 text-zinc-100 group-hover:text-white">
              {tool.title}
            </h2>
            <p className="text-zinc-400 group-hover:text-zinc-300">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
