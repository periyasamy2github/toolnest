"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Type,
  ArrowRight,
  Music,
  Code,
  LayoutGrid,
  ShieldCheck,
  Wallet,
  FileDown,
  Timer,
  Search,
  CheckCircle2,
  Zap,
  Database,
  Lock,
  Globe,
  Film,
  ArrowRightLeft,
  Share2,
  GraduationCap,
  MonitorPlay,
  FileText,
  Activity
} from "lucide-react";
import { m } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/components/Animations";

import { tools } from "@/data/tools";

const toolCategories = [
  {
    title: "Image Tools",
    description: "Professional image manipulation. Compress, resize, crop, and convert images locally without quality loss.",
    icon: ImageIcon,
    href: "/media",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    tools: ["Compressor", "Resizer", "Social Resizer", "Cropper", "Converter", "Filters", "Remove BG", "Meme Gen", "Watermark", "Collage", "Palette", "OCR", "Favicon", "Blur", "Img2Base64", "SVG Blob", "Brightness", "Hue/Sat", "Invert", "Sepia"]
  },
  {
    title: "Video Tools",
    description: "Complete video toolkit. Trim, compress, convert, and extract audio from videos with ease.",
    icon: Film,
    href: "/media",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    tools: ["Compressor", "Trimmer", "Converter", "GIF Maker", "Thumbnail", "Screen Rec", "Extract Audio", "Cropper", "Watermark", "Metadata"]
  },
  {
    title: "Audio Tools",
    description: "Simple audio editing. Cut, merge, and record audio directly in your browser.",
    icon: Music,
    href: "/media",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    tools: ["MP3 Cutter", "Merger", "Recorder", "Converter", "Vol Booster", "Speed Changer", "Reverse", "Pitch Shifter"]
  },
  {
    title: "PDF Utilities",
    description: "Secure PDF management. Merge, split, compress, protect, and unlock PDF documents.",
    icon: FileDown,
    href: "/pdf",
    color: "text-red-500",
    bg: "bg-red-500/10",
    tools: ["Merge", "Split", "Compress", "Rotate", "Reorder", "Watermark", "Img to PDF", "PDF to Img", "Protect", "Unlock", "Page Numbers", "Remove Pages"]
  },
  {
    title: "Content Tools",
    description: "Enhance your writing. Analyze text, count words, and clean up formatting instantly.",
    icon: FileText,
    href: "/writing-social",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    tools: ["Word Counter", "Text Cleaner", "Case Conv", "Lorem Ipsum", "Diff Checker", "Headline Analyzer", "Readability", "Keyword Density", "Text to Speech"]
  },
  {
    title: "Social Media",
    description: "Boost engagement. Generate hashtags, tweets, bios, and captions for social platforms.",
    icon: Share2,
    href: "/writing-social",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    tools: ["Hashtags", "Tweet Gen", "Bio Gen", "Caption Gen", "LinkedIn Post", "FB Post", "TikTok Caption", "YT Tags", "YT Title", "YT Desc", "Emoji Picker", "Hashtag Count", "Char Count", "Engagement Rate"]
  },
  {
    title: "Developer Tools",
    description: "Essential utilities for devs. Formatters, validators, generators, and testers in one place.",
    icon: Code,
    href: "/developer",
    color: "text-green-500",
    bg: "bg-green-500/10",
    tools: ["JSON Fmt", "API Tester", "Gradient", "Cron", "JSON2TS", "SQL Fmt", "HTML2JSX", "CSS Tools", "Markdown", "Entities", "Regex", "Base64", "URL Encode", "JWT", "UUID", "Pass Gen", "Pass Strength", "Hash Gen", "Token Gen", "Encryptor", "HMAC", "Bcrypt", "RSA Key", "SSH Key", "Slug Gen", "URL Parser", "User Agent", "Keycode", "Meta Tags", "Chmod", "Credit Card", "IBAN", "Subnet", "CIDR", "MAC Gen", "User Gen", "Checksum"]
  },
  {
    title: "Converters",
    description: "Universal data conversion. Transform between JSON, XML, CSV, YAML, and number bases.",
    icon: ArrowRightLeft,
    href: "/developer",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    tools: ["YAML2JSON", "JSON<>CSV", "JSON<>XML", "YAML<>JSON", "Number Base", "Text Case", "CSV2JSON", "CSV2XML", "XML2JSON", "XML2CSV", "YAML2XML", "XML2YAML", "MD2HTML", "HTML2MD", "RGB2HEX", "HEX2RGB", "HSL2RGB", "RGB2HSL", "CMYK2RGB", "RGB2CMYK", "Unix Time", "Text2Bin", "Bin2Text", "Morse", "Px2Rem", "Aspect Ratio"]
  },
  {
    title: "Finance Tools",
    description: "Smart financial planning. Calculators for loans, investments, taxes, and retirement.",
    icon: Wallet,
    href: "/finance",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    tools: ["Loan EMI", "SIP", "Compound Int", "FD", "PPF", "Income Tax", "Net Worth", "Retirement", "GST", "Currency", "Home Loan", "Gratuity", "ROI", "CAGR", "Inflation", "Salary Hike", "Mutual Fund", "Lumpsum", "SWP", "RD", "NPS", "HRA", "Simple Int", "Discount", "Margin", "VAT", "Sales Tax", "Break Even", "Debt Payoff", "Savings Goal"]
  },
  {
    title: "Productivity",
    description: "Boost efficiency. Invoicing, time management, QR codes, and unit conversion tools.",
    icon: Timer,
    href: "/finance",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    tools: ["Invoice", "Pomodoro", "Signature", "Stopwatch", "Timer", "World Clock", "Random Picker", "QR Code", "Unit Converter", "Salary Value"]
  },
  {
    title: "Health & Wellness",
    description: "Track your well-being. BMI, calories, sleep, and hydration calculators for a healthier you.",
    icon: Activity,
    href: "/health",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    tools: ["BMI", "Sleep", "Body Fat", "Breathing", "Water", "Calories", "Fitness Age", "Health Score", "Burnout", "Smoking Cost", "Life Expectancy"]
  },
  {
    title: "Education",
    description: "Academic helpers. Calculate GPA, grades, and track academic progress.",
    icon: GraduationCap,
    href: "/health",
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    tools: ["GPA", "Grade", "Percentage", "Scientific", "Fraction", "Time", "Date", "Age", "Roman", "Binary", "Hex", "ASCII", "Citation", "Flashcard", "Quiz", "Periodic Table", "Unit Circle", "Statistics", "Matrix", "Equation"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030303] selection:bg-blue-500 selection:text-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32 overflow-hidden w-screen -ml-[calc((100vw-100%)/2)]">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950/0 to-zinc-950/0 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="z-10 w-full max-w-5xl mx-auto px-4">
          <m.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center space-y-10 w-full mx-auto"
          >
            <m.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-400 backdrop-blur-md"
            >
              <LayoutGrid size={16} />
              <span>Professional Utility Suite</span>
            </m.div>

            <div className="space-y-6">
              <m.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]"
              >
                {tools.length}+ Tools <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                  One Workspace.
                </span>
              </m.h1>
              <m.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed"
              >
                A powerful suite of privacy-focused tools for developers and creators.
                <br className="hidden md:block" />
                Fast, secure, and completely local.
              </m.p>
            </div>

            {/* Central Search Bar */}
            <m.div variants={fadeInUp} className="max-w-2xl mx-auto w-full relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
                className="relative w-full flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/90 border border-white/10 text-left hover:bg-zinc-900 transition-all duration-300 shadow-2xl"
              >
                <Search size={24} className="text-zinc-400 group-hover:text-blue-400 transition-colors" />
                <div className="flex-1">
                  <div className="text-zinc-400 text-lg font-medium group-hover:text-zinc-200 transition-colors">Search for tools...</div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span className="opacity-70">Ctrl</span>
                  <span>K</span>
                </div>
              </button>
            </m.div>

            <m.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <div className="flex items-center gap-8 text-zinc-500 text-sm font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-500" /> No Signup
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-500" /> 100% Free
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-blue-500" /> Private
                </span>
              </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCategories.map((category, i) => (
              <m.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "group relative h-full",
                  i === 0 || i === 3 ? "lg:col-span-2" : "" // Bento grid effect
                )}
              >
                <Link
                  href={category.href}
                  className="relative flex flex-col h-full p-8 rounded-3xl bg-transparent border border-white/10 overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:bg-white/[0.02] hover:shadow-2xl hover:shadow-blue-500/10 group-hover:-translate-y-1"
                >
                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Header */}
                  <div className="relative z-10 flex items-start justify-between mb-8">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                      category.bg,
                      category.color
                    )}>
                      <category.icon size={28} />
                    </div>
                    <div className="p-2 rounded-full bg-white/5 text-zinc-500 group-hover:text-white group-hover:bg-blue-500 transition-all duration-300">
                      <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mb-8 flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Tool Tags */}
                  <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                    {category.tools.slice(0, 5).map((tool) => (
                      <span key={tool} className="px-3 py-1 rounded-full bg-zinc-950/50 border border-white/5 text-[10px] uppercase tracking-wider font-bold text-zinc-500 group-hover:text-zinc-300 group-hover:border-white/10 transition-colors">
                        {tool}
                      </span>
                    ))}
                    {category.tools.length > 5 && (
                      <span className="px-3 py-1 rounded-full bg-zinc-950/50 border border-white/5 text-[10px] font-bold text-zinc-500">
                        +{category.tools.length - 5}
                      </span>
                    )}
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ToolNest Section */}
      <section className="py-32 border-t border-white/5 relative overflow-hidden w-screen -ml-[calc((100vw-100%)/2)]">
        <div className="absolute inset-0 bg-zinc-950/50" />
        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Built for <span className="text-blue-500">Performance</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Experience the power of local-first computing. No server latency, no data transfer, just instant results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "Instant Results", desc: "Zero latency. Tools run directly in your browser's engine.", color: "text-amber-400", bg: "bg-amber-400/10" },
              { icon: ShieldCheck, title: "Bank-Grade Privacy", desc: "Your data never leaves your device. 100% local processing.", color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { icon: Globe, title: "Offline Capable", desc: "Most tools work perfectly even without an internet connection.", color: "text-blue-400", bg: "bg-blue-400/10" },
              { icon: Database, title: "No Limits", desc: "Process files of any size. Your hardware is the only limit.", color: "text-purple-400", bg: "bg-purple-400/10" }
            ].map((item, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-transparent border border-white/10 hover:bg-white/[0.02] hover:border-blue-500/50 transition-all duration-500"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", item.bg, item.color)}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="py-32 border-t border-white/5 w-screen -ml-[calc((100vw-100%)/2)]">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                <Zap size={14} />
                <span>Featured Product</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Monitor Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Digital Presence
                </span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                Meet <strong>Uply Monitor</strong>. The next-generation uptime monitoring solution that keeps watch while you sleep. Get instant alerts, detailed analytics, and beautiful status pages.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://uply-monitor.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  Try Uply Monitor <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 w-full">
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition duration-500" />
                <Link
                  href="https://uply-monitor.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block p-1 rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden"
                >
                  <div className="aspect-video rounded-2xl bg-zinc-900/50 flex items-center justify-center overflow-hidden relative">
                    {/* Abstract UI representation */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent)]" />
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-500 flex items-center justify-center shadow-2xl shadow-blue-500/20">
                        <Zap size={40} className="text-white" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-24 bg-zinc-800 rounded-full mx-auto" />
                        <div className="h-2 w-16 bg-zinc-800 rounded-full mx-auto" />
                      </div>
                    </div>
                  </div>
                </Link>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Commitment Section */}
      <section id="privacy" className="py-32 border-t border-white/5 bg-transparent relative overflow-hidden w-screen -ml-[calc((100vw-100%)/2)] -mb-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-4xl mx-auto px-4 relative z-10 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
              <Lock size={14} />
              <span>Privacy First Architecture</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
              Your Data. <br />
              <span className="text-zinc-600">Period.</span>
            </h2>

            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We don't just promise privacy; we architected our entire platform around it.
              Everything happens on your device. Nothing is ever sent to our servers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              {[
                { label: "Logs Kept", value: "0", sub: "Forever" },
                { label: "Trackers", value: "0", sub: "Blocked" },
                { label: "Encryption", value: "100%", sub: "Client-Side" }
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-transparent border border-white/10 hover:border-white/20 transition-colors">
                  <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-xs text-zinc-600 font-medium mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </section>
    </div>
  );
}
