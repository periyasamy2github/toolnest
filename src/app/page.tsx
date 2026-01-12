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
import { fadeInUp, staggerContainer, float, glow } from "@/components/Animations";

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
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="relative text-center space-y-10 max-w-5xl mx-auto px-4"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-blue-400 font-medium mb-4 glass"
          >
            <Zap size={16} className="animate-pulse" />
            <span>The Ultimate Productivity Suite</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-bold tracking-tight text-white leading-tight"
          >
            Your All-in-One <br />
            <span className="text-gradient animate-glow">
              Digital Toolbox
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Powerful, private, and browser-based tools for media,
            developers, and everyday tasks. <span className="text-zinc-200">No uploads, no limits, 100% private.</span>
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-6 pt-6"
          >
            <Link
              href="#tools"
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-2xl shadow-blue-600/40"
            >
              Explore Tools
              <ArrowRight size={22} />
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 glass hover:bg-white/10 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95"
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
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto rounded-[3rem] p-[1px] bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 bg-[length:200%_auto] animate-gradient-x shadow-2xl shadow-blue-500/10"
        >
          <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[2.9rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full" />

            <div className="flex-1 space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest glass">
                <Zap size={14} className="animate-pulse" />
                Featured Tool
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  Uply Monitor <br />
                  <span className="text-zinc-500 font-medium text-2xl md:text-3xl">Professional Uptime Monitoring</span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                  Get instant alerts via Telegram and Email when your website goes offline. High-frequency monitoring with detailed performance insights.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4">
                <Link
                  href="https://uply-monitor.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white text-zinc-950 font-black rounded-2xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-2xl"
                >
                  Get Started Free
                  <ArrowRight size={20} />
                </Link>

                <div className="flex items-center gap-6 text-sm text-zinc-500 font-bold">
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-green-500" />
                    Secure
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={18} className="text-blue-500" />
                    Real-time
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              variants={float}
              animate="animate"
              className="w-full lg:w-80 aspect-square relative group"
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] group-hover:bg-blue-500/30 transition-all duration-1000" />
              <div className="relative h-full w-full rounded-[2.5rem] border border-white/10 bg-zinc-900/40 backdrop-blur-2xl flex flex-col items-center justify-center p-8 text-center space-y-6 overflow-hidden glass">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:scale-110 transition-transform duration-1000">
                  <Activity size={56} className="text-white" />
                </div>

                <div className="space-y-2 relative">
                  <div className="text-2xl font-black text-white">Uply Monitor</div>
                  <div className="text-green-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Operational
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="tools" className="space-y-16 px-4">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Explore Our Tools</h2>
          <p className="text-zinc-400 text-lg">Everything you need, organized and ready to use directly in your browser.</p>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto"
        >
          {tools.map((tool) => (
            <motion.div key={tool.title} variants={fadeInUp} className="h-full">
              <Link
                href={tool.href}
                className="group relative flex flex-col h-full p-10 rounded-[2rem] glass-card overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`p-5 rounded-2xl ${tool.bg} ${tool.color} w-fit mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  <tool.icon size={36} />
                </div>

                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-500">
                  {tool.title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mb-8 flex-grow">
                  {tool.description}
                </p>

                <div className="flex items-center gap-2 text-base font-bold text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                  Open Tool <ArrowRight size={20} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-5 rounded-3xl bg-blue-500/10 text-blue-400 glass">
              <Shield size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white">100% Private</h3>
            <p className="text-zinc-400 text-lg">All processing happens in your browser. Your data never leaves your device, ensuring total privacy.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-5 rounded-3xl bg-purple-500/10 text-purple-400 glass">
              <Zap size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white">Lightning Fast</h3>
            <p className="text-zinc-400 text-lg">Optimized for speed with local execution and modern web technologies. No server delays.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-5 rounded-3xl bg-green-500/10 text-green-400 glass">
              <Globe size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white">No Limits</h3>
            <p className="text-zinc-400 text-lg">Free to use with no hidden costs, subscriptions, or file size restrictions. Unlimited access.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
