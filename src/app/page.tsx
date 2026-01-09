"use client";

import Link from "next/link";
import {
  Video,
  Image as ImageIcon,
  Wrench,
  Type,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Music,
  Code,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
  {
    title: "Developer Tools",
    description: "JSON to TS, SQL Formatter, YAML/JSON, Markdown Preview, and more.",
    icon: Code,
    href: "/developer",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Audio Tools",
    description: "Cut and merge audio files directly in your browser.",
    icon: Music,
    href: "/audio",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Image Tools",
    description: "Compress, resize, remove background, and extract color palettes.",
    icon: ImageIcon,
    href: "/image",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    title: "Health Tools",
    description: "BMI, Body Fat, Breathing exercises, and Calorie tracking.",
    icon: Activity,
    href: "/health",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    title: "Productivity",
    description: "Pomodoro, Stopwatch, World Clock, and Random Picker.",
    icon: Wrench,
    href: "/utils",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    title: "Content Tools",
    description: "Headline analysis, Readability, Keyword density, and TTS.",
    icon: Type,
    href: "/text",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
];

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="relative text-center space-y-8 max-w-5xl mx-auto px-4"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-blue-400 font-medium mb-4"
          >
            <Zap size={16} />
            <span>All-in-one productivity suite</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            Your Ultimate <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Digital Toolbox
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            A unified suite of powerful, private, and browser-based tools for media,
            developers, and everyday tasks. No uploads, no limits.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <Link
              href="#tools"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              Explore Tools
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-2xl border border-white/10 transition-all hover:border-white/20"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Product Section */}
      <section className="relative px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto rounded-[2.5rem] p-[1px] bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-[length:200%_auto] animate-gradient-x shadow-xl shadow-blue-500/5"
        >
          <div className="bg-zinc-950 rounded-[2.4rem] p-6 md:p-10 flex flex-col lg:flex-row items-center gap-8 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />

            <div className="flex-1 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                <Zap size={12} className="animate-pulse" />
                Featured
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Uply Monitor <br />
                  <span className="text-zinc-500 font-medium text-xl md:text-2xl">Uptime Monitoring Made Simple</span>
                </h2>
                <p className="text-zinc-400 text-base leading-relaxed max-w-xl">
                  Get instant alerts via Telegram and Email when your website goes offline. Professional monitoring for everyone.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="https://uply-monitor.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>

                <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Shield size={14} className="text-green-500" />
                    Secure
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Activity size={14} className="text-blue-500" />
                    Real-time
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-72 aspect-square relative group">
              <div className="absolute inset-0 bg-blue-500/10 blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700" />
              <div className="relative h-full w-full rounded-[2rem] border border-white/10 bg-zinc-900/40 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 overflow-hidden">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/30 group-hover:scale-110 transition-transform duration-700">
                  <Activity size={48} className="text-white" />
                </div>

                <div className="space-y-1 relative">
                  <div className="text-xl font-bold text-white">Uply Monitor</div>
                  <div className="text-green-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Operational
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="tools" className="space-y-12 px-4">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">All Tools</h2>
          <p className="text-zinc-400">Everything you need, organized and ready to use.</p>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto"
        >
          {tools.map((tool) => (
            <motion.div key={tool.title} variants={fadeInUp} className="h-full">
              <Link
                href={tool.href}
                className="group relative flex flex-col h-full p-8 rounded-3xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className={`p-4 rounded-2xl ${tool.bg} ${tool.color} w-fit mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <tool.icon size={32} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6 flex-grow">
                  {tool.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                  Open Tool <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">100% Private</h3>
            <p className="text-zinc-400">All processing happens in your browser. Your data never leaves your device.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">Lightning Fast</h3>
            <p className="text-zinc-400">Optimized for speed with local execution and modern web technologies.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-green-500/10 text-green-400">
              <Globe size={32} />
            </div>
            <h3 className="text-xl font-bold text-white">No Limits</h3>
            <p className="text-zinc-400">Free to use with no hidden costs, subscriptions, or file size restrictions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
