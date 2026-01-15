"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Type,
  ArrowRight,
  Lock,
  Globe,
  Music,
  Code,
  Activity,
  LayoutGrid,
  ShieldCheck,
  Database,
  Search,
  CheckCircle2,
  Zap,
  Timer,
  FileDown
} from "lucide-react";
import { m } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const toolCategories = [
  {
    title: "Developer Tools",
    description: "Professional-grade coding utilities. From JSON formatting and API testing to gradient generation and JWT decoding, we provide the essential tools for modern software engineering.",
    icon: Code,
    href: "/developer",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    tools: ["JSON Formatter", "API Tester", "Gradient Generator", "JWT Tool", "Regex Tester"]
  },
  {
    title: "Image Processing",
    description: "Privacy-focused image editing. Compress, convert, crop, and enhance images with professional tools. Create memes, collages, and watermarks locally.",
    icon: ImageIcon,
    href: "/image",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    tools: ["Compressor", "Converter", "Cropper", "Filters", "Watermark", "Collage Maker", "Meme Generator"]
  },
  {
    title: "Content & Text",
    description: "Advanced text utilities for creators. Analyze keyword density, check readability scores, or generate placeholder text. Optimized for SEO specialists.",
    icon: Type,
    href: "/text",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    tools: ["Word Counter", "Text Cleaner", "Keyword Density", "Readability Score", "Case Converter"]
  },
  {
    title: "Audio Utilities",
    description: "Simple yet powerful audio editing. Cut MP3 files for ringtones or merge multiple tracks into one. Fast, secure, and requires no installation.",
    icon: Music,
    href: "/audio",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    tools: ["MP3 Cutter", "Audio Merger", "Voice Recorder"]
  },
  {
    title: "Health & Wellness",
    description: "Track your health metrics with precision. Calculate BMI, body fat percentage, and daily calorie needs. Maintain a healthy lifestyle with ease.",
    icon: Activity,
    href: "/health",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    tools: ["BMI Calculator", "Sleep Calculator", "Calories Calculator", "Health Score"]
  },
  {
    title: "PDF Utilities",
    description: "Complete PDF management suite. Merge, split, compress, and rotate PDFs. Add watermarks, protect with passwords, or convert images to PDF—all locally in your browser.",
    icon: FileDown,
    href: "/pdf",
    color: "text-red-500",
    bg: "bg-red-500/10",
    tools: ["Merge PDF", "Split PDF", "Compress PDF", "Protect PDF", "Image to PDF"]
  },
  {
    title: "Productivity Suite",
    description: "Boost your daily efficiency. Create invoices, build resumes, track time, or calculate your salary and compensation. Designed for professionals.",
    icon: Timer,
    href: "/utils",
    color: "text-green-500",
    bg: "bg-green-500/10",
    tools: ["Invoice Generator", "Pomodoro Timer", "Salary Time Value", "QR Code", "Unit Converter"]
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030303] selection:bg-blue-500 selection:text-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20 pb-32 overflow-hidden">
        <div className="z-10 w-full">
          <m.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center space-y-8 w-full mx-auto"
          >
            <m.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400"
            >
              <LayoutGrid size={16} />
              <span>Professional Utility Suite</span>
            </m.div>

            <div className="space-y-6">
              <m.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight"
              >
                Professional Tools <br />
                <span className="text-blue-500">For Everyone</span>
              </m.h1>
              <m.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed"
              >
                A powerful suite of tools for developers, creators, and professionals.
                Fast, secure, and completely private—no data ever leaves your device.
              </m.p>
            </div>

            <m.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 pt-6"
            >
              <Link
                href="#explore"
                className="px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl shadow-white/10"
              >
                Explore Tools
                <ArrowRight size={18} />
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Explore Categories Section */}
      <section id="explore" className="py-24 border-t border-white/5">
        <div className="w-full mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-2">
              <Search size={18} />
              <span>Discover the Suite</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Explore Our <span className="text-blue-500">Tools</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Find the perfect tool for your needs. From image editing to developer utilities,
              we have everything you need in one secure place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolCategories.map((category, i) => (
              <m.div
                key={category.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="h-full"
              >
                <Link
                  href={category.href}
                  className="group flex flex-col h-full p-8 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                      category.bg,
                      category.color
                    )}>
                      <category.icon size={32} />
                    </div>
                    <div className="p-2 rounded-full bg-white/5 text-zinc-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                      <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {category.tools.map((tool) => (
                      <span key={tool} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider font-semibold text-zinc-400 group-hover:border-blue-500/20 group-hover:text-blue-300 transition-colors">
                        {tool}
                      </span>
                    ))}
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ToolNest Section */}
      <section className="py-24 border-t border-white/5 bg-zinc-950/20">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Why <span className="text-blue-500">ToolNest?</span>
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                We provide professional tools that empower users without compromising their digital safety.
                Our platform is built for speed, accessibility, and absolute privacy.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Zap, title: "Instant Results", desc: "Optimized for speed to deliver results instantly without any server lag.", color: "text-yellow-500" },
                { icon: Globe, title: "Universal Access", desc: "Access our entire suite from any device, anywhere in the world, for free.", color: "text-blue-500" },
                { icon: ShieldCheck, title: "Verified Security", desc: "Built with the latest security protocols to keep your environment safe.", color: "text-green-500" },
                { icon: Database, title: "Zero Footprint", desc: "We leave no trace of your data. Everything is purged after your session.", color: "text-purple-500" }
              ].map((item, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <item.icon className={item.color} size={20} />
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-24 border-t border-white/5">
        <div className="w-full mx-auto">
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium mb-2">
              <Zap size={18} />
              <span>Ecosystem</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Our <span className="text-blue-500">Products</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Explore other powerful tools built by our team to enhance your digital workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link
                href="https://uply-monitor.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-8 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-blue-500/30 transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-blue-500/10 text-blue-500">
                  <Zap size={24} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  Uply Monitor
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Next-generation uptime monitoring solution. Track your website's status in real-time with instant alerts and detailed analytics.
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-all">
                  Visit Website <ArrowRight size={16} />
                </div>
              </Link>
            </m.div>
          </div>
        </div>
      </section>

      {/* Privacy Commitment Section */}
      <section id="privacy" className="py-24 border-t border-white/5 bg-zinc-950/40">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium">
                <Lock size={18} />
                <span>Privacy Commitment</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Your Data <br />
                <span className="text-zinc-500">Stays Yours.</span>
              </h2>
              <div className="space-y-4 text-zinc-300 text-lg leading-relaxed">
                <p>
                  At ToolNest, we prioritize your digital safety. Our platform is built on a "No Logs" policy,
                  ensuring that your activity remains completely anonymous.
                </p>
                <p>
                  Every tool operates locally in your browser. This means your files, code, and sensitive
                  information never leave your device. When you're done, your data is instantly purged.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {[
                  "No Database Storage",
                  "No Activity Logs",
                  "No User Tracking",
                  "No Account Required",
                  "Local Processing",
                  "Instant Data Purge"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-zinc-300 font-medium text-sm">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    {item}
                  </div>
                ))}
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card p-10 flex flex-col justify-center items-center text-center space-y-6 border-white/10 rounded-2xl"
            >
              <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">100% Private</h3>
                <p className="text-zinc-400 text-sm">
                  Your data stays on your device. <br />
                  We have no access to your information.
                </p>
              </div>
              <div className="w-full h-px bg-white/5" />
              <div className="flex items-center gap-10">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">0</div>
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Logs</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">0</div>
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Storage</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-white">∞</div>
                  <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Privacy</div>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </div>
  );
}
