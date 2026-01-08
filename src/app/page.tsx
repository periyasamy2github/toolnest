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
    href: "/developer",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  /* {
    title: "Downloader",
    description: "Download videos from YouTube, Instagram, Facebook, and TikTok.",
    icon: Download,
    href: "/downloader",
    color: "text-red-400",
    bg: "bg-red-400/10",
  }, */
  {
    title: "Audio Tools",
    description: "Cut and merge audio files directly in your browser.",
    icon: Video, // Using Video icon as per previous pattern or Music if available
    href: "/audio",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Image Tools",
    description: "Compress, resize, and edit images in your browser.",
    icon: ImageIcon,
    href: "/image",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    title: "Health Tools",
    description: "Calories calculator, BMR, and food tracking.",
    icon: Activity,
    href: "/health",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    title: "Utilities",
    description: "QR codes, converters, calculators, and more.",
    icon: Wrench,
    href: "/utils",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    title: "Text Tools",
    description: "Word count, case conversion, and text generation.",
    icon: Type,
    href: "/text",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* SEO Content Section */}
      <div className="mt-20 pt-12 border-t border-white/5 space-y-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-zinc-100">Privacy First</h3>
            <p className="text-zinc-400 leading-relaxed">
              All processing happens directly in your browser. Your files and data never leave your device, ensuring maximum security and privacy.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-zinc-100">Fast & Free</h3>
            <p className="text-zinc-400 leading-relaxed">
              No registration, no subscriptions. Access a wide range of powerful web tools instantly without any hidden costs or limitations.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-zinc-100">Modern Suite</h3>
            <p className="text-zinc-400 leading-relaxed">
              From developer utilities like JSON formatters and JWT tools to media tools like MP3 cutters and image editors, we have it all.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/30 rounded-3xl p-8 md:p-12 border border-white/5">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-3xl font-bold text-zinc-100">Why Choose ToolNest?</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              ToolNest is a unified platform designed to simplify your daily digital tasks. Whether you're a developer needing to encode Base64, a content creator looking for a meme generator, or someone just needing to calculate their BMI, ToolNest provides a sleek, high-performance interface for all your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {["Developer", "Audio", "Image", "Health", "Utilities", "Text"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-sm">
                  {tag} Tools
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
