import {
    FileJson,
    Terminal,
    Palette,
    Clock,
    FileType,
    Code2,
    FileCode2,
    Code,
    Binary,
    Link as LinkIcon,
    ShieldCheck,
    Fingerprint,
    Lock,
    Crop,
    Sliders,
    Smile,
    Stamp,
    LayoutGrid,
    Merge,
    Mic,
    Hash,
    Eraser,
    CaseSensitive,
    Type,
    FileDiff,
    Instagram,
    Newspaper,
    BookOpen,
    BarChart3,
    Volume2,
    Calculator,
    Activity,
    Wind,
    Droplets,
    Flame,
    Dumbbell,
    HeartPulse,
    Brain,
    Coins,
    Hourglass,
    Moon,
    FileText,
    FileDown,
    Timer,
    Globe,
    Dices,
    QrCode,
    Ruler,
    PenTool,
    RotateCw,
    GripVertical,
    Trash2,
    Database,
    Wallet,
    TrendingUp,
    Receipt,
    Percent,
    FileSpreadsheet,
    ArrowRightLeft,
    Minimize2,
    Scissors,
    RefreshCw,
    Film,
    Image as ImageIcon,
    Banknote,
    PieChart,
    Music,
    MonitorPlay,
    Twitter,
    UserCircle2,
    MessageSquare,
    Youtube,
    GraduationCap,
    Key,
    FileLock2,
    Upload,
    Download,
    Sun,
    Contrast,
    Coffee,
    Search,
    Cpu,
    Monitor,
    Smartphone,
    Keyboard,
    Shield,
    Users,
    User,
    Divide,
    Calendar,
    Cake,
    Quote,
    BrainCircuit,
    FlaskConical,
    Circle,
    Grid,
    LineChart,
    Briefcase,
    PiggyBank,
    Landmark,
    Home,
    Tag,
    Scale,
    CreditCard,
    Target,
    Image,
    Info,
    Linkedin,
    Facebook,
    Network,
    EyeOff,
    FastForward,
    Rewind
} from "lucide-react";

export interface Tool {
    title: string;
    description: string;
    icon: any;
    href: string;
    category: string;
    color: string;
    bg: string;
    tags?: string[];
}

export const tools: Tool[] = [
    // Developer Tools
    {
        title: "JSON Formatter",
        description: "Beautify, validate, and minify JSON data.",
        icon: FileJson,
        href: "/developer/json-formatter",
        category: "dev-tools",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["json", "format", "minify"]
    },
    {
        title: "API Tester",
        description: "Test REST APIs with a simple interface.",
        icon: Terminal,
        href: "/developer/api-tester",
        category: "dev-tools",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["api", "rest", "test"]
    },
    {
        title: "Gradient Generator",
        description: "Create beautiful CSS gradients.",
        icon: Palette,
        href: "/developer/gradient-generator",
        category: "dev-tools",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["css", "gradient", "design"]
    },
    {
        title: "Cron Generator",
        description: "Convert cron expressions to human readable text.",
        icon: Clock,
        href: "/developer/cron-generator",
        category: "dev-tools",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["cron", "schedule", "time"]
    },
    {
        title: "JSON to TypeScript",
        description: "Generate TypeScript interfaces from JSON.",
        icon: FileJson,
        href: "/developer/json-to-ts",
        category: "dev-tools",
        color: "text-blue-300",
        bg: "bg-blue-300/10",
        tags: ["json", "typescript", "types"]
    },
    {
        title: "SQL Formatter",
        description: "Format SQL queries for better readability.",
        icon: Database,
        href: "/developer/sql-formatter",
        category: "dev-tools",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["sql", "database", "format"]
    },
    {
        title: "YAML to JSON",
        description: "Convert between YAML and JSON formats.",
        icon: FileType,
        href: "/developer/yaml-to-json",
        category: "dev-tools",
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        tags: ["yaml", "json", "convert"]
    },
    {
        title: "HTML to JSX",
        description: "Convert HTML code to React JSX.",
        icon: Code2,
        href: "/developer/html-to-jsx",
        category: "dev-tools",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["html", "jsx", "react"]
    },
    {
        title: "CSS Tools",
        description: "Minify, beautify, and format CSS.",
        icon: Scissors,
        href: "/developer/css-tools",
        category: "dev-tools",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["css", "minify", "format"]
    },
    {
        title: "Markdown Preview",
        description: "Preview Markdown content in real-time.",
        icon: FileCode2,
        href: "/developer/markdown-preview",
        category: "dev-tools",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["markdown", "preview", "edit"]
    },
    {
        title: "HTML Entities",
        description: "Encode and decode HTML entities.",
        icon: Code,
        href: "/developer/html-entities",
        category: "dev-tools",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        tags: ["html", "entities", "encode"]
    },
    {
        title: "Regex Tester",
        description: "Test and debug regular expressions.",
        icon: FileCode2,
        href: "/developer/regex-tester",
        category: "dev-tools",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["regex", "test", "debug"]
    },
    {
        title: "Base64 Encoder",
        description: "Encode and decode Base64 strings and files.",
        icon: Binary,
        href: "/developer/base64",
        category: "dev-tools",
        color: "text-slate-400",
        bg: "bg-slate-400/10",
        tags: ["base64", "encode", "decode"]
    },
    {
        title: "URL Encoder",
        description: "Encode and decode URLs and parameters.",
        icon: LinkIcon,
        href: "/developer/url-encoder",
        category: "dev-tools",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["url", "encode", "decode"]
    },
    {
        title: "JWT Tool",
        description: "Decode and analyze JSON Web Tokens.",
        icon: ShieldCheck,
        href: "/developer/jwt",
        category: "dev-tools",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["jwt", "auth", "decode"]
    },
    {
        title: "UUID Generator",
        description: "Generate random v4 UUIDs instantly.",
        icon: Fingerprint,
        href: "/developer/uuid-generator",
        category: "dev-tools",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["uuid", "guid", "generate"]
    },
    {
        title: "Password Generator",
        description: "Generate secure, random passwords.",
        icon: Lock,
        href: "/developer/password-generator",
        category: "dev-tools",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["password", "security", "generate"]
    },

    // Image Tools
    {
        title: "Compressor",
        description: "Compress images without quality loss.",
        icon: ImageIcon,
        href: "/image/compressor",
        category: "media",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["image", "compress", "optimize"]
    },
    {
        title: "Resizer",
        description: "Resize images to exact dimensions.",
        icon: Crop,
        href: "/image/resizer",
        category: "media",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["image", "resize", "dimensions"]
    },
    {
        title: "Cropper",
        description: "Crop, rotate, and flip images.",
        icon: Crop,
        href: "/image/cropper",
        category: "media",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["image", "crop", "rotate"]
    },
    {
        title: "Converter",
        description: "Convert between JPG, PNG, WEBP, BMP, GIF.",
        icon: RefreshCw,
        href: "/image/converter",
        category: "media",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["image", "convert", "format"]
    },
    {
        title: "Filters & Effects",
        description: "Apply professional filters and adjustments.",
        icon: Sliders,
        href: "/image/filters",
        category: "media",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["image", "filters", "edit"]
    },
    {
        title: "Background Remover",
        description: "Remove image backgrounds automatically.",
        icon: Scissors,
        href: "/image/remove-bg",
        category: "media",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["image", "background", "remove"]
    },
    {
        title: "Meme Generator",
        description: "Create viral memes with multi-layer editing.",
        icon: Smile,
        href: "/image/meme-generator",
        category: "media",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["image", "meme", "create"]
    },
    {
        title: "Watermark",
        description: "Protect your images with custom watermarks.",
        icon: Stamp,
        href: "/image/watermark",
        category: "media",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["image", "watermark", "protect"]
    },
    {
        title: "Collage Maker",
        description: "Combine photos into beautiful layouts.",
        icon: LayoutGrid,
        href: "/image/collage",
        category: "media",
        color: "text-rose-400",
        bg: "bg-rose-400/10",
        tags: ["image", "collage", "layout"]
    },
    {
        title: "Color Palette",
        description: "Extract color palettes from any image.",
        icon: Palette,
        href: "/image/color-palette",
        category: "media",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["image", "colors", "palette"]
    },

    {
        title: "Image to Text (OCR)",
        description: "Extract text from images using advanced OCR technology.",
        icon: FileText,
        href: "/image/ocr",
        category: "media",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["image", "ocr", "text", "extract"]
    },
    {
        title: "Favicon Generator",
        description: "Create professional favicons from any image.",
        icon: ImageIcon,
        href: "/image/favicon-generator",
        category: "media",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["image", "favicon", "icon", "generate"]
    },
    {
        title: "Blur Image",
        description: "Blur images or specific areas for privacy.",
        icon: EyeOff,
        href: "/image/blur",
        category: "media",
        color: "text-zinc-400",
        bg: "bg-zinc-400/10",
        tags: ["image", "blur", "privacy", "edit"]
    },

    // Audio Tools
    {
        title: "MP3 Cutter",
        description: "Trim and cut audio files with precision.",
        icon: Scissors,
        href: "/audio/cutter",
        category: "media",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["audio", "cut", "mp3"]
    },
    {
        title: "Audio Merger",
        description: "Combine multiple audio files into one.",
        icon: Merge,
        href: "/audio/merger",
        category: "media",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["audio", "merge", "combine"]
    },
    {
        title: "Voice Recorder",
        description: "Record high-quality audio with visualizer.",
        icon: Mic,
        href: "/audio/voice-recorder",
        category: "media",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["audio", "record", "voice"]
    },
    {
        title: "Audio Converter",
        description: "Convert audio files between MP3, WAV, OGG, and more.",
        icon: RefreshCw,
        href: "/audio/converter",
        category: "media",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["audio", "convert", "format"]
    },
    {
        title: "Volume Booster",
        description: "Increase the volume of your audio files.",
        icon: Volume2,
        href: "/audio/volume-booster",
        category: "media",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["audio", "volume", "boost"]
    },
    {
        title: "Speed Changer",
        description: "Speed up or slow down your audio files.",
        icon: FastForward,
        href: "/audio/speed-changer",
        category: "media",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        tags: ["audio", "speed", "tempo"]
    },
    {
        title: "Reverse Audio",
        description: "Play your audio files backwards.",
        icon: Rewind,
        href: "/audio/reverse",
        category: "media",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["audio", "reverse", "backwards"]
    },
    {
        title: "Pitch Shifter",
        description: "Change the pitch of your audio files.",
        icon: Music,
        href: "/audio/pitch-shifter",
        category: "media",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        tags: ["audio", "pitch", "shift"]
    },

    // Text Tools
    {
        title: "Word Counter",
        description: "Count words, characters, and paragraphs in real-time.",
        icon: Hash,
        href: "/text/word-counter",
        category: "writing-social",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["text", "count", "words"]
    },
    {
        title: "Text Cleaner",
        description: "Remove extra spaces, lines, and HTML tags.",
        icon: Eraser,
        href: "/text/text-cleaner",
        category: "writing-social",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["text", "clean", "format"]
    },
    {
        title: "Case Converter",
        description: "Convert text to UPPERCASE, lowercase, Title Case, etc.",
        icon: CaseSensitive,
        href: "/text/case-converter",
        category: "writing-social",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["text", "case", "convert"]
    },
    {
        title: "Lorem Ipsum",
        description: "Generate placeholder text for your designs.",
        icon: Type,
        href: "/text/lorem-ipsum",
        category: "writing-social",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["text", "lorem", "placeholder"]
    },
    {
        title: "Diff Checker",
        description: "Compare two texts and highlight differences.",
        icon: FileDiff,
        href: "/text/diff-checker",
        category: "writing-social",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["text", "diff", "compare"]
    },
    {
        title: "Instagram Hashtags",
        description: "Generate trending hashtags for your posts.",
        icon: Instagram,
        href: "/text/instagram-hashtags",
        category: "writing-social",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["text", "hashtags", "social"]
    },
    {
        title: "Headline Analyzer",
        description: "Score and optimize headlines for engagement.",
        icon: Newspaper,
        href: "/text/headline-analyzer",
        category: "writing-social",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["text", "headline", "seo"]
    },
    {
        title: "Readability Score",
        description: "Analyze the readability of your content.",
        icon: BookOpen,
        href: "/text/readability",
        category: "writing-social",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["text", "readability", "score"]
    },
    {
        title: "Keyword Density",
        description: "Analyze keyword frequency in your content.",
        icon: BarChart3,
        href: "/text/keyword-density",
        category: "writing-social",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["text", "keywords", "seo"]
    },
    {
        title: "Text to Speech",
        description: "Convert text into natural-sounding speech.",
        icon: Volume2,
        href: "/text/text-to-speech",
        category: "writing-social",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["text", "speech", "audio"]
    },

    // Health Tools
    {
        title: "BMI Calculator",
        description: "Calculate your Body Mass Index (BMI).",
        icon: Calculator,
        href: "/health/bmi-calculator",
        category: "life-learning",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["health", "bmi", "weight"]
    },
    {
        title: "Sleep Calculator",
        description: "Calculate sleep cycles and wake up times.",
        icon: Moon,
        href: "/health/sleep-calculator",
        category: "life-learning",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["health", "sleep", "cycles"]
    },
    {
        title: "Body Fat",
        description: "Estimate your body fat percentage using the US Navy method.",
        icon: Activity,
        href: "/health/body-fat-calculator",
        category: "life-learning",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["health", "fat", "fitness"]
    },
    {
        title: "Breathing",
        description: "Relax with guided breathing techniques including Pranayama.",
        icon: Wind,
        href: "/health/breathing-exercise",
        category: "life-learning",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["health", "breathing", "relax"]
    },
    {
        title: "Water Intake",
        description: "Calculate your daily water needs based on weight and activity.",
        icon: Droplets,
        href: "/health/water-intake-calculator",
        category: "life-learning",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["health", "water", "hydration"]
    },
    {
        title: "Calories",
        description: "Calculate daily calorie needs and track food intake.",
        icon: Flame,
        href: "/health/calories-calculator",
        category: "life-learning",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["health", "calories", "diet"]
    },
    {
        title: "Fitness Age",
        description: "Discover your fitness age based on lifestyle and health metrics.",
        icon: Dumbbell,
        href: "/health/fitness-age",
        category: "life-learning",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["health", "fitness", "age"]
    },
    {
        title: "Health Score",
        description: "Track your daily wellness with a comprehensive health score.",
        icon: HeartPulse,
        href: "/health/health-score",
        category: "life-learning",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["health", "score", "wellness"]
    },
    {
        title: "Burnout Risk",
        description: "Assess your risk of burnout based on work and lifestyle factors.",
        icon: Brain,
        href: "/health/burnout-risk",
        category: "life-learning",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["health", "burnout", "mental"]
    },
    {
        title: "Smoking Cost",
        description: "Calculate how much money you spend on smoking.",
        icon: Coins,
        href: "/health/smoking-cost",
        category: "life-learning",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["health", "smoking", "cost"]
    },
    {
        title: "Life Expectancy",
        description: "Estimate your life expectancy based on lifestyle and health factors.",
        icon: Hourglass,
        href: "/health/life-expectancy",
        category: "life-learning",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["health", "life", "expectancy"]
    },

    // PDF Tools
    {
        title: "Merge PDF",
        description: "Combine multiple PDF files into one document.",
        icon: Merge,
        href: "/pdf/merge",
        category: "pdf",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["pdf", "merge", "combine"]
    },
    {
        title: "Split PDF",
        description: "Extract pages from your PDF or convert each page to a separate PDF.",
        icon: Scissors,
        href: "/pdf/split",
        category: "pdf",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["pdf", "split", "extract"]
    },
    {
        title: "Compress PDF",
        description: "Reduce the file size of your PDF.",
        icon: FileDown,
        href: "/pdf/compress",
        category: "pdf",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["pdf", "compress", "size"]
    },
    {
        title: "Rotate PDF",
        description: "Rotate your PDF pages.",
        icon: RotateCw,
        href: "/pdf/rotate",
        category: "pdf",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["pdf", "rotate", "pages"]
    },
    {
        title: "Reorder PDF",
        description: "Rearrange the pages of your PDF document.",
        icon: GripVertical,
        href: "/pdf/reorder",
        category: "pdf",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["pdf", "reorder", "pages"]
    },
    {
        title: "Watermark PDF",
        description: "Add an image or text watermark over your PDF.",
        icon: Type,
        href: "/pdf/watermark",
        category: "pdf",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["pdf", "watermark", "protect"]
    },
    {
        title: "Image to PDF",
        description: "Convert images to PDF in seconds.",
        icon: ImageIcon,
        href: "/pdf/image-to-pdf",
        category: "pdf",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["pdf", "image", "convert"]
    },
    {
        title: "PDF to Image",
        description: "Extract images from a PDF or convert pages to JPG.",
        icon: ImageIcon,
        href: "/pdf/pdf-to-image",
        category: "pdf",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        tags: ["pdf", "image", "extract"]
    },
    {
        title: "Protect PDF",
        description: "Encrypt your PDF with a password.",
        icon: Lock,
        href: "/pdf/protect",
        category: "pdf",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["pdf", "protect", "password"]
    },
    {
        title: "Unlock PDF",
        description: "Remove password security from your PDF.",
        icon: ShieldCheck,
        href: "/pdf/unlock",
        category: "pdf",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["pdf", "unlock", "security"]
    },
    {
        title: "Page Numbers",
        description: "Add page numbers to your PDF document.",
        icon: Hash,
        href: "/pdf/page-numbers",
        category: "pdf",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["pdf", "pages", "numbers"]
    },
    {
        title: "Remove Pages",
        description: "Delete pages from your PDF document.",
        icon: Trash2,
        href: "/pdf/remove-pages",
        category: "pdf",
        color: "text-rose-400",
        bg: "bg-rose-400/10",
        tags: ["pdf", "remove", "pages"]
    },

    // Utility Tools
    {
        title: "Invoice Generator",
        description: "Create professional invoices with logo upload.",
        icon: FileText,
        href: "/utils/invoice-generator",
        category: "business-finance",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["utils", "invoice", "business"]
    },
    {
        title: "Pomodoro Timer",
        description: "Boost productivity with the Pomodoro technique.",
        icon: Clock,
        href: "/utils/pomodoro",
        category: "business-finance",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["utils", "pomodoro", "timer"]
    },
    {
        title: "Signature Generator",
        description: "Create and download digital signatures.",
        icon: PenTool,
        href: "/utils/signature-generator",
        category: "business-finance",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["utils", "signature", "digital"]
    },
    {
        title: "Stopwatch",
        description: "Precise stopwatch with lap timing.",
        icon: Timer,
        href: "/utils/stopwatch",
        category: "business-finance",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["utils", "stopwatch", "time"]
    },
    {
        title: "Timer",
        description: "Simple countdown timer.",
        icon: Timer,
        href: "/utils/timer",
        category: "business-finance",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["utils", "timer", "countdown"]
    },
    {
        title: "World Clock",
        description: "Track current time across global cities.",
        icon: Globe,
        href: "/utils/world-clock",
        category: "business-finance",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["utils", "clock", "world"]
    },
    {
        title: "Random Picker",
        description: "Randomly select options from a list.",
        icon: Dices,
        href: "/utils/random-picker",
        category: "business-finance",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["utils", "random", "picker"]
    },
    {
        title: "QR Code Generator",
        description: "Create custom QR codes.",
        icon: QrCode,
        href: "/utils/qr-code",
        category: "business-finance",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["utils", "qr", "code"]
    },
    {
        title: "Unit Converter",
        description: "Convert length, weight, temperature, and more.",
        icon: Ruler,
        href: "/utils/unit-converter",
        category: "business-finance",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["utils", "convert", "units"]
    },
    // Employee Pay Tools
    {
        title: "Salary Time Value Calculator",
        description: "Calculate the real value of your salary over time, adjusted for inflation and investment potential.",
        icon: Coins,
        href: "/utils/salary-time-value",
        category: "business-finance",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["salary", "investment", "inflation", "planning", "productivity"]
    },

    // Converters
    {
        title: "JSON <> CSV",
        description: "Convert JSON data to CSV format and vice versa.",
        icon: FileSpreadsheet,
        href: "/converters/json-csv",
        category: "dev-tools",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["Data", "Developer", "Conversion"]
    },
    {
        title: "YAML <> JSON",
        description: "Convert YAML configuration files to JSON and vice versa.",
        icon: Database,
        href: "/converters/yaml-json",
        category: "dev-tools",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["DevOps", "Config", "YAML"]
    },
    {
        title: "JSON <> XML",
        description: "Convert JSON data to XML and vice versa.",
        icon: FileCode2,
        href: "/converters/json-xml",
        category: "dev-tools",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        tags: ["Data", "API", "XML"]
    },
    {
        title: "Number Base",
        description: "Convert between Binary, Octal, Decimal, and Hexadecimal.",
        icon: Binary,
        href: "/converters/number-base",
        category: "dev-tools",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["Math", "Computer Science", "Binary"]
    },
    {
        title: "Text Case",
        description: "Convert text to Uppercase, Lowercase, Title Case, and more.",
        icon: CaseSensitive,
        href: "/converters/text-case",
        category: "dev-tools",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        tags: ["Text", "Writing", "Format"]
    },
    // Finance Tools
    {
        title: "Loan EMI Calculator",
        description: "Calculate monthly EMIs for home, car, or personal loans.",
        icon: Calculator,
        href: "/finance/loan-emi",
        category: "business-finance",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["finance", "loan", "emi", "calculator"]
    },
    {
        title: "SIP Calculator",
        description: "Calculate returns on your Systematic Investment Plans.",
        icon: TrendingUp,
        href: "/finance/sip-calculator",
        category: "business-finance",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["finance", "sip", "investment", "mutual fund"]
    },
    {
        title: "Compound Interest",
        description: "Visualize the power of compounding on your investments.",
        icon: TrendingUp,
        href: "/finance/compound-interest",
        category: "business-finance",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        tags: ["finance", "compound", "interest", "growth"]
    },
    {
        title: "FD Calculator",
        description: "Calculate maturity amount for Fixed Deposits.",
        icon: Wallet,
        href: "/finance/fd-calculator",
        category: "business-finance",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["finance", "fd", "fixed deposit", "bank"]
    },
    {
        title: "PPF Calculator",
        description: "Calculate returns for Public Provident Fund scheme.",
        icon: Wallet,
        href: "/finance/ppf-calculator",
        category: "business-finance",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["finance", "ppf", "provident fund", "saving"]
    },
    {
        title: "Income Tax Calculator",
        description: "Estimate income tax liability under Old vs New regime.",
        icon: Receipt,
        href: "/finance/income-tax",
        category: "business-finance",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["finance", "tax", "income tax", "calculator"]
    },
    {
        title: "Net Worth Tracker",
        description: "Track your total assets and liabilities.",
        icon: PieChart, // Note: Need to ensure PieChart is imported if not already
        href: "/finance/net-worth",
        category: "business-finance",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["finance", "net worth", "wealth", "tracker"]
    },
    {
        title: "Retirement Planner",
        description: "Plan your retirement corpus.",
        icon: Wallet,
        href: "/finance/retirement-planner",
        category: "business-finance",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["finance", "retirement", "planning", "pension"]
    },
    {
        title: "GST Calculator",
        description: "Calculate GST inclusive and exclusive amounts.",
        icon: Percent,
        href: "/finance/gst-calculator",
        category: "business-finance",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["finance", "gst", "tax", "business"]
    },
    {
        title: "Currency Converter",
        description: "Real-time currency exchange rates.",
        icon: Banknote,
        href: "/finance/currency-converter",
        category: "business-finance",
        color: "text-teal-400",
        bg: "bg-teal-400/10",
        tags: ["finance", "currency", "converter", "exchange"]
    },
    {
        title: "Home Loan Affordability",
        description: "Estimate home loan eligibility.",
        icon: Calculator,
        href: "/finance/home-loan-affordability",
        category: "business-finance",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["finance", "home loan", "affordability", "housing"]
    },
    {
        title: "Gratuity Calculator",
        description: "Calculate gratuity amount.",
        icon: Coins,
        href: "/finance/gratuity",
        category: "business-finance",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["finance", "gratuity", "salary", "employment"]
    },

    // Video Tools
    {
        title: "Video Compressor",
        description: "Reduce video file size online.",
        icon: Minimize2,
        href: "/video/compressor",
        category: "media",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["video", "compress", "reduce", "size"]
    },
    {
        title: "Video Trimmer",
        description: "Cut and trim video clips.",
        icon: Scissors,
        href: "/video/trimmer",
        category: "media",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["video", "trim", "cut", "edit"]
    },
    {
        title: "Video Converter",
        description: "Convert videos to MP4, AVI, WEBM.",
        icon: RefreshCw,
        href: "/video/converter",
        category: "media",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["video", "convert", "format", "mp4"]
    },
    {
        title: "Video to GIF",
        description: "Create animated GIFs from video.",
        icon: Film,
        href: "/video/video-to-gif",
        category: "media",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["video", "gif", "animation", "maker"]
    },
    {
        title: "Thumbnail Downloader",
        description: "Download YouTube thumbnails.",
        icon: ImageIcon,
        href: "/video/thumbnail-downloader",
        category: "media",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["youtube", "thumbnail", "download", "image"]
    },
    {
        title: "Screen Recorder",
        description: "Record screen and camera.",
        icon: MonitorPlay,
        href: "/video/screen-recorder",
        category: "media",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["screen", "record", "capture", "video"]
    },
    {
        title: "Extract Audio",
        description: "Extract MP3 from video.",
        icon: Music,
        href: "/video/extract-audio",
        category: "media",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["audio", "extract", "mp3", "sound"]
    },
    {
        title: "Video Cropper",
        description: "Crop video dimensions.",
        icon: Crop,
        href: "/video/cropper",
        category: "media",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["video", "crop", "resize", "aspect ratio"]
    },

    // Social Media Tools
    {
        title: "YouTube Tag Generator",
        description: "Generate SEO-optimized tags.",
        icon: Youtube,
        href: "/social/youtube-tag-generator",
        category: "writing-social",
        color: "text-red-500",
        bg: "bg-red-500/10",
        tags: ["youtube", "tags", "seo", "video"]
    },
    {
        title: "Instagram Hashtag Generator",
        description: "Find trending hashtags.",
        icon: Instagram,
        href: "/social/instagram-hashtag-generator",
        category: "writing-social",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        tags: ["instagram", "hashtags", "growth", "social"]
    },
    {
        title: "Tweet Generator",
        description: "Create viral tweets.",
        icon: Twitter, // Note: Need to ensure Twitter is imported
        href: "/social/tweet-generator",
        category: "writing-social",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["twitter", "tweet", "viral", "content"]
    },
    {
        title: "Social Bio Generator",
        description: "Craft perfect bios.",
        icon: UserCircle2, // Note: Need to ensure UserCircle2 is imported
        href: "/social/social-bio-generator",
        category: "writing-social",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["bio", "profile", "social", "generator"]
    },
    {
        title: "Caption Generator",
        description: "Write engaging captions.",
        icon: MessageSquare, // Note: Need to ensure MessageSquare is imported
        href: "/social/caption-generator",
        category: "writing-social",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["caption", "instagram", "post", "writing"]
    },

    // Education Tools
    {
        title: "GPA Calculator",
        description: "Calculate your Grade Point Average.",
        icon: GraduationCap,
        href: "/education/gpa-calculator",
        category: "life-learning",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["gpa", "grade", "school", "calculator"]
    },
    {
        title: "Grade Calculator",
        description: "Calculate weighted grades and targets.",
        icon: Calculator,
        href: "/education/grade-calculator",
        category: "life-learning",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["grade", "school", "calculator", "weight"]
    },

    // Security Tools
    {
        title: "Password Strength",
        description: "Analyze password complexity.",
        icon: ShieldCheck,
        href: "/security/password-strength",
        category: "dev-tools",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["password", "security", "check", "strength"]
    },
    {
        title: "Hash Generator",
        description: "Generate secure hashes (SHA).",
        icon: Hash,
        href: "/security/hash-generator",
        category: "dev-tools",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["hash", "sha", "security", "crypto"]
    },
    {
        title: "Token Generator",
        description: "Generate secure random tokens.",
        icon: Key,
        href: "/security/token-generator",
        category: "dev-tools",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["token", "random", "key", "api"]
    },
    {
        title: "Text Encryptor",
        description: "Encrypt text with AES-GCM.",
        icon: FileLock2,
        href: "/security/text-encryptor",
        category: "dev-tools",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["encrypt", "decrypt", "aes", "security"]
    },

    // New Image Tools (Phase 1)
    {
        title: "Image to Base64",
        description: "Convert images to Base64 string.",
        icon: FileCode2,
        href: "/image/image-to-base64",
        category: "media",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["image", "base64", "convert", "code"]
    },
    {
        title: "SVG Blob Generator",
        description: "Generate organic SVG blob shapes.",
        icon: RefreshCw,
        href: "/image/svg-blob",
        category: "media",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["svg", "blob", "shape", "design"]
    },
    {
        title: "Brightness & Contrast",
        description: "Adjust image lighting and contrast.",
        icon: Sun,
        href: "/image/brightness-contrast",
        category: "media",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["image", "brightness", "contrast", "edit"]
    },
    {
        title: "Hue & Saturation",
        description: "Adjust image colors and intensity.",
        icon: Palette,
        href: "/image/hue-saturation",
        category: "media",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["image", "hue", "saturation", "color"]
    },
    {
        title: "Invert Colors",
        description: "Invert image colors instantly.",
        icon: ArrowRightLeft,
        href: "/image/invert",
        category: "media",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["image", "invert", "negative", "filter"]
    },
    {
        title: "Sepia Filter",
        description: "Apply vintage sepia effect.",
        icon: Coffee,
        href: "/image/sepia",
        category: "media",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        tags: ["image", "sepia", "vintage", "filter"]
    },

    // New Developer Tools (Phase 1)
    {
        title: "Slug Generator",
        description: "Convert text to URL slugs.",
        icon: LinkIcon,
        href: "/developer/slug-generator",
        category: "dev-tools",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["slug", "url", "seo", "text"]
    },
    {
        title: "URL Parser",
        description: "Parse URLs into components.",
        icon: Globe,
        href: "/developer/url-parser",
        category: "dev-tools",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["url", "parser", "query", "params"]
    },
    {
        title: "User Agent Parser",
        description: "Identify browser and OS details.",
        icon: Monitor,
        href: "/developer/user-agent",
        category: "dev-tools",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["user agent", "browser", "os", "device"]
    },
    {
        title: "Keycode Event",
        description: "Get JavaScript keycodes.",
        icon: Keyboard,
        href: "/developer/keycode-event",
        category: "dev-tools",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        tags: ["keycode", "event", "javascript", "keyboard"]
    },
    {
        title: "Meta Tag Generator",
        description: "Generate SEO meta tags.",
        icon: Code2,
        href: "/developer/meta-tag-generator",
        category: "dev-tools",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["meta", "seo", "tags", "html"]
    },
    {
        title: "Chmod Calculator",
        description: "Calculate Linux permissions.",
        icon: Shield,
        href: "/developer/chmod-calculator",
        category: "dev-tools",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["chmod", "linux", "permissions", "calculator"]
    },

    // New Education Tools (Phase 2)
    {
        title: "Percentage Calculator",
        description: "Calculate percentages, percentage changes, and reverse percentages.",
        icon: Percent,
        href: "/education/percentage-calculator",
        category: "life-learning",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        tags: ["math", "finance", "calc"]
    },
    {
        title: "Scientific Calculator",
        description: "Advanced calculator with trigonometric and logarithmic functions.",
        icon: Calculator,
        href: "/education/scientific-calculator",
        category: "life-learning",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        tags: ["math", "science", "calc"]
    },
    {
        title: "Fraction Calculator",
        description: "Add, subtract, multiply, and divide fractions with steps.",
        icon: Divide,
        href: "/education/fraction-calculator",
        category: "life-learning",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        tags: ["math", "fractions", "calc"]
    },
    {
        title: "Time Calculator",
        description: "Calculate time duration and add/subtract time intervals.",
        icon: Clock,
        href: "/education/time-calculator",
        category: "life-learning",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["time", "duration", "calc"]
    },
    {
        title: "Date Calculator",
        description: "Calculate days between dates and add/subtract days.",
        icon: Calendar,
        href: "/education/date-calculator",
        category: "life-learning",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["date", "calendar", "calc"]
    },
    {
        title: "Age Calculator",
        description: "Calculate exact age and next birthday countdown.",
        icon: Cake,
        href: "/education/age-calculator",
        category: "life-learning",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        tags: ["age", "birthday", "calc"]
    },
    {
        title: "Roman Numeral Converter",
        description: "Convert between Decimal numbers and Roman numerals.",
        icon: Type,
        href: "/education/roman-numeral",
        category: "life-learning",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        tags: ["roman", "history", "converter"]
    },
    {
        title: "Binary Calculator",
        description: "Perform arithmetic on binary numbers.",
        icon: Binary,
        href: "/education/binary-calculator",
        category: "life-learning",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["binary", "computer", "calc"]
    },
    {
        title: "Hex Calculator",
        description: "Perform arithmetic on hexadecimal numbers.",
        icon: Hash,
        href: "/education/hex-calculator",
        category: "life-learning",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["hex", "computer", "calc"]
    },
    {
        title: "ASCII Converter",
        description: "Convert text to ASCII codes and vice versa.",
        icon: FileText,
        href: "/education/ascii-converter",
        category: "life-learning",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["ascii", "text", "converter"]
    },
    {
        title: "Citation Generator",
        description: "Generate APA, MLA, and Chicago citations.",
        icon: Quote,
        href: "/education/citation-generator",
        category: "life-learning",
        color: "text-teal-500",
        bg: "bg-teal-500/10",
        tags: ["citation", "writing", "research"]
    },
    {
        title: "Flashcard Maker",
        description: "Create and study digital flashcards.",
        icon: BookOpen,
        href: "/education/flashcard-maker",
        category: "life-learning",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        tags: ["study", "learning", "cards"]
    },
    {
        title: "Quiz Maker",
        description: "Create custom quizzes to test your knowledge.",
        icon: BrainCircuit,
        href: "/education/quiz-maker",
        category: "life-learning",
        color: "text-red-500",
        bg: "bg-red-500/10",
        tags: ["quiz", "test", "learning"]
    },
    {
        title: "Periodic Table",
        description: "Interactive periodic table of elements.",
        icon: FlaskConical,
        href: "/education/periodic-table",
        category: "life-learning",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        tags: ["chemistry", "science", "elements"]
    },
    {
        title: "Unit Circle",
        description: "Interactive unit circle for trigonometry.",
        icon: Circle,
        href: "/education/unit-circle",
        category: "life-learning",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        tags: ["math", "trigonometry", "geometry"]
    },
    {
        title: "Statistics Calculator",
        description: "Calculate mean, median, mode, and standard deviation.",
        icon: BarChart3,
        href: "/education/statistics-calculator",
        category: "life-learning",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["math", "statistics", "data"]
    },
    {
        title: "Matrix Calculator",
        description: "Perform matrix addition, subtraction, and multiplication.",
        icon: Grid,
        href: "/education/matrix-calculator",
        category: "life-learning",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        tags: ["math", "algebra", "matrix"]
    },
    {
        title: "Equation Solver",
        description: "Solve linear and quadratic equations step-by-step.",
        icon: Calculator,
        href: "/education/equation-solver",
        category: "life-learning",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        tags: ["math", "algebra", "solver"]
    },
    {
        title: "ROI Calculator",
        description: "Calculate Return on Investment and annualized returns.",
        icon: TrendingUp,
        href: "/finance/roi-calculator",
        category: "business-finance",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        tags: ["finance", "investment", "profit"]
    },
    {
        title: "CAGR Calculator",
        description: "Calculate Compound Annual Growth Rate for investments.",
        icon: BarChart3,
        href: "/finance/cagr-calculator",
        category: "business-finance",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["finance", "growth", "investment"]
    },
    {
        title: "Inflation Calculator",
        description: "Calculate future value of money based on inflation.",
        icon: LineChart,
        href: "/finance/inflation-calculator",
        category: "business-finance",
        color: "text-red-500",
        bg: "bg-red-500/10",
        tags: ["finance", "economy", "value"]
    },
    {
        title: "Salary Hike Calculator",
        description: "Calculate new salary after percentage hike.",
        icon: Briefcase,
        href: "/finance/salary-hike-calculator",
        category: "business-finance",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["finance", "salary", "income"]
    },
    {
        title: "Mutual Fund Returns",
        description: "Calculate returns on SIP and Lumpsum investments.",
        icon: PieChart,
        href: "/finance/mutual-fund-returns",
        category: "business-finance",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        tags: ["finance", "investment", "sip"]
    },
    {
        title: "Lumpsum Calculator",
        description: "Calculate returns on one-time investments.",
        icon: Coins,
        href: "/finance/lumpsum-calculator",
        category: "business-finance",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        tags: ["finance", "investment", "wealth"]
    },
    {
        title: "SWP Calculator",
        description: "Calculate Systematic Withdrawal Plan details.",
        icon: Wallet,
        href: "/finance/swp-calculator",
        category: "business-finance",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        tags: ["finance", "investment", "withdrawal"]
    },
    {
        title: "RD Calculator",
        description: "Calculate maturity amount for Recurring Deposits.",
        icon: PiggyBank,
        href: "/finance/rd-calculator",
        category: "business-finance",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        tags: ["finance", "banking", "savings"]
    },
    {
        title: "NPS Calculator",
        description: "Calculate National Pension System corpus and annuity.",
        icon: Landmark,
        href: "/finance/nps-calculator",
        category: "business-finance",
        color: "text-teal-500",
        bg: "bg-teal-500/10",
        tags: ["finance", "retirement", "pension"]
    },
    {
        title: "HRA Calculator",
        description: "Calculate House Rent Allowance tax exemption.",
        icon: Home,
        href: "/finance/hra-calculator",
        category: "business-finance",
        color: "text-lime-500",
        bg: "bg-lime-500/10",
        tags: ["finance", "tax", "salary"]
    },
    {
        title: "Simple Interest",
        description: "Calculate simple interest on principal amount.",
        icon: Percent,
        href: "/finance/simple-interest-calculator",
        category: "business-finance",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        tags: ["finance", "banking", "interest"]
    },
    {
        title: "Discount Calculator",
        description: "Calculate final price after discount percentage.",
        icon: Tag,
        href: "/finance/discount-calculator",
        category: "business-finance",
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        tags: ["finance", "shopping", "savings"]
    },
    {
        title: "Margin Calculator",
        description: "Calculate profit margin and markup percentage.",
        icon: TrendingUp,
        href: "/finance/margin-calculator",
        category: "business-finance",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        tags: ["finance", "business", "profit"]
    },
    {
        title: "VAT Calculator",
        description: "Calculate Value Added Tax (inclusive/exclusive).",
        icon: Receipt,
        href: "/finance/vat-calculator",
        category: "business-finance",
        color: "text-fuchsia-500",
        bg: "bg-fuchsia-500/10",
        tags: ["finance", "tax", "business"]
    },
    {
        title: "Sales Tax Calculator",
        description: "Calculate sales tax and total amount.",
        icon: Receipt,
        href: "/finance/sales-tax-calculator",
        category: "business-finance",
        color: "text-violet-500",
        bg: "bg-violet-500/10",
        tags: ["finance", "tax", "shopping"]
    },
    {
        title: "Break Even Point",
        description: "Calculate break-even units and revenue.",
        icon: Scale,
        href: "/finance/break-even-point",
        category: "business-finance",
        color: "text-sky-500",
        bg: "bg-sky-500/10",
        tags: ["finance", "business", "analysis"]
    },
    {
        title: "Debt Payoff",
        description: "Calculate time to pay off debt with monthly payments.",
        icon: CreditCard,
        href: "/finance/debt-payoff-calculator",
        category: "business-finance",
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        tags: ["finance", "debt", "planning"]
    },
    {
        title: "Savings Goal",
        description: "Calculate monthly savings needed to reach a goal.",
        icon: Target,
        href: "/finance/savings-goal-calculator",
        category: "business-finance",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        tags: ["finance", "savings", "planning"]
    },
    {
        title: "Video Watermark",
        description: "Add image or text watermark to videos.",
        icon: Image,
        href: "/video/watermark",
        category: "media",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        tags: ["video", "watermark", "branding", "edit"]
    },
    {
        title: "Video Metadata",
        description: "View detailed video technical metadata.",
        icon: Info,
        href: "/video/metadata-viewer",
        category: "media",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["video", "metadata", "info", "tech"]
    },
    {
        title: "LinkedIn Post Generator",
        description: "Generate professional LinkedIn posts.",
        icon: Linkedin,
        href: "/social/linkedin-post-generator",
        category: "writing-social",
        color: "text-blue-600",
        bg: "bg-blue-600/10",
        tags: ["social", "linkedin", "post", "generator"]
    },
    {
        title: "Facebook Post Generator",
        description: "Create engaging Facebook posts.",
        icon: Facebook,
        href: "/social/facebook-post-generator",
        category: "writing-social",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["social", "facebook", "post", "generator"]
    },
    {
        title: "TikTok Caption Generator",
        description: "Generate viral TikTok captions.",
        icon: Music,
        href: "/social/tiktok-caption-generator",
        category: "writing-social",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        tags: ["social", "tiktok", "caption", "generator"]
    },
    {
        title: "YouTube Title Generator",
        description: "Generate catchy YouTube titles.",
        icon: Youtube,
        href: "/social/youtube-title-generator",
        category: "writing-social",
        color: "text-red-600",
        bg: "bg-red-600/10",
        tags: ["social", "youtube", "title", "generator"]
    },
    {
        title: "YouTube Description Generator",
        description: "Create SEO-friendly video descriptions.",
        icon: Youtube,
        href: "/social/youtube-description-generator",
        category: "writing-social",
        color: "text-red-500",
        bg: "bg-red-500/10",
        tags: ["social", "youtube", "description", "generator"]
    },
    {
        title: "Emoji Picker",
        description: "Find and copy emojis easily.",
        icon: Smile,
        href: "/social/emoji-picker",
        category: "writing-social",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        tags: ["social", "emoji", "picker", "copy"]
    },
    {
        title: "Hashtag Counter",
        description: "Count and extract hashtags from text.",
        icon: Hash,
        href: "/social/hashtag-counter",
        category: "writing-social",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["social", "hashtag", "counter", "tool"]
    },
    {
        title: "Character Counter",
        description: "Count characters for social platforms.",
        icon: Type,
        href: "/social/character-counter",
        category: "writing-social",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["social", "character", "counter", "tool"]
    },
    {
        title: "Engagement Calculator",
        description: "Calculate social media engagement rates.",
        icon: Activity,
        href: "/social/engagement-rate-calculator",
        category: "writing-social",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        tags: ["social", "engagement", "calculator", "analytics"]
    },
    {
        title: "Social Image Resizer",
        description: "Resize images for social media.",
        icon: Image,
        href: "/social/social-media-image-resizer",
        category: "writing-social",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        tags: ["social", "image", "resizer", "tool"]
    },
    {
        title: "RSA Key Generator",
        description: "Generate secure RSA key pairs.",
        icon: Key,
        href: "/security/rsa-key-generator",
        category: "dev-tools",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["security", "rsa", "crypto", "keys"]
    },
    {
        title: "SSH Key Generator",
        description: "Generate SSH keys for authentication.",
        icon: Terminal,
        href: "/security/ssh-key-generator",
        category: "dev-tools",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        tags: ["security", "ssh", "keys", "auth"]
    },
    {
        title: "HMAC Generator",
        description: "Compute Hash-based Message Authentication Codes.",
        icon: Hash,
        href: "/security/hmac-generator",
        category: "dev-tools",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["security", "hmac", "hash", "crypto"]
    },
    {
        title: "Bcrypt Generator",
        description: "Hash and verify passwords with Bcrypt.",
        icon: Lock,
        href: "/security/bcrypt-generator",
        category: "dev-tools",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["security", "bcrypt", "hash", "password"]
    },
    {
        title: "Credit Card Validator",
        description: "Validate credit card numbers (Luhn).",
        icon: CreditCard,
        href: "/security/credit-card-validator",
        category: "dev-tools",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        tags: ["security", "credit", "card", "validator"]
    },
    {
        title: "IBAN Validator",
        description: "Validate International Bank Account Numbers.",
        icon: Globe,
        href: "/security/iban-validator",
        category: "dev-tools",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        tags: ["security", "iban", "bank", "validator"]
    },
    {
        title: "Subnet Calculator",
        description: "Calculate IPv4 subnet parameters.",
        icon: Network,
        href: "/security/subnet-calculator",
        category: "dev-tools",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["security", "subnet", "network", "ip"]
    },
    {
        title: "CIDR Calculator",
        description: "Convert IP ranges to CIDR blocks.",
        icon: Network,
        href: "/security/cidr-calculator",
        category: "dev-tools",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        tags: ["security", "cidr", "network", "ip"]
    },
    {
        title: "MAC Address Generator",
        description: "Generate random MAC addresses.",
        icon: Fingerprint,
        href: "/security/mac-address-generator",
        category: "dev-tools",
        color: "text-teal-500",
        bg: "bg-teal-500/10",
        tags: ["security", "mac", "network", "generator"]
    },
    {
        title: "Random User Generator",
        description: "Generate mock user profiles.",
        icon: User,
        href: "/security/random-user-generator",
        category: "dev-tools",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        tags: ["security", "user", "mock", "data"]
    },
    {
        title: "File Checksum",
        description: "Calculate file hashes (MD5, SHA).",
        icon: FileText,
        href: "/security/file-checksum",
        category: "dev-tools",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        tags: ["security", "file", "hash", "checksum"]
    },
    {
        title: "CSV to JSON",
        description: "Convert CSV data to JSON format.",
        icon: FileJson,
        href: "/converter/csv-to-json",
        category: "dev-tools",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["converter", "csv", "json", "data"]
    },
    {
        title: "CSV to XML",
        description: "Convert CSV data to XML format.",
        icon: FileCode2,
        href: "/converter/csv-to-xml",
        category: "dev-tools",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        tags: ["converter", "csv", "xml", "data"]
    },
    {
        title: "XML to JSON",
        description: "Convert XML data to JSON format.",
        icon: FileJson,
        href: "/converter/xml-to-json",
        category: "dev-tools",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["converter", "xml", "json", "data"]
    },
    {
        title: "XML to CSV",
        description: "Convert XML data to CSV format.",
        icon: FileSpreadsheet,
        href: "/converter/xml-to-csv",
        category: "dev-tools",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        tags: ["converter", "xml", "csv", "data"]
    },
    {
        title: "YAML to XML",
        description: "Convert YAML data to XML format.",
        icon: FileCode2,
        href: "/converter/yaml-to-xml",
        category: "dev-tools",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["converter", "yaml", "xml", "data"]
    },
    {
        title: "XML to YAML",
        description: "Convert XML data to YAML format.",
        icon: FileCode2,
        href: "/converter/xml-to-yaml",
        category: "dev-tools",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        tags: ["converter", "xml", "yaml", "data"]
    },
    {
        title: "Markdown to HTML",
        description: "Convert Markdown to raw HTML.",
        icon: FileCode2,
        href: "/converter/markdown-to-html",
        category: "dev-tools",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        tags: ["converter", "markdown", "html", "text"]
    },
    {
        title: "HTML to Markdown",
        description: "Convert HTML to Markdown text.",
        icon: FileCode2,
        href: "/converter/html-to-markdown",
        category: "dev-tools",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        tags: ["converter", "html", "markdown", "text"]
    },
    {
        title: "RGB to HEX",
        description: "Convert RGB values to HEX codes.",
        icon: Palette,
        href: "/converter/rgb-to-hex",
        category: "dev-tools",
        color: "text-red-500",
        bg: "bg-red-500/10",
        tags: ["converter", "rgb", "hex", "color"]
    },
    {
        title: "HEX to RGB",
        description: "Convert HEX codes to RGB values.",
        icon: Palette,
        href: "/converter/hex-to-rgb",
        category: "dev-tools",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["converter", "hex", "rgb", "color"]
    },
    {
        title: "HSL to RGB",
        description: "Convert HSL values to RGB format.",
        icon: Palette,
        href: "/converter/hsl-to-rgb",
        category: "dev-tools",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["converter", "hsl", "rgb", "color"]
    },
    {
        title: "RGB to HSL",
        description: "Convert RGB values to HSL format.",
        icon: Palette,
        href: "/converter/rgb-to-hsl",
        category: "dev-tools",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        tags: ["converter", "rgb", "hsl", "color"]
    },
    {
        title: "CMYK to RGB",
        description: "Convert CMYK values to RGB format.",
        icon: Palette,
        href: "/converter/cmyk-to-rgb",
        category: "dev-tools",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        tags: ["converter", "cmyk", "rgb", "color"]
    },
    {
        title: "RGB to CMYK",
        description: "Convert RGB values to CMYK format.",
        icon: Palette,
        href: "/converter/rgb-to-cmyk",
        category: "dev-tools",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        tags: ["converter", "rgb", "cmyk", "color"]
    },
    {
        title: "Unix Timestamp",
        description: "Convert timestamps to dates.",
        icon: Clock,
        href: "/converter/unix-timestamp",
        category: "dev-tools",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        tags: ["converter", "unix", "timestamp", "date"]
    },
    {
        title: "Text to Binary",
        description: "Convert text to binary code.",
        icon: Binary,
        href: "/converter/text-to-binary",
        category: "dev-tools",
        color: "text-green-500",
        bg: "bg-green-500/10",
        tags: ["converter", "text", "binary", "code"]
    },
    {
        title: "Binary to Text",
        description: "Convert binary code to text.",
        icon: Binary,
        href: "/converter/binary-to-text",
        category: "dev-tools",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["converter", "binary", "text", "code"]
    },
    {
        title: "Morse Code",
        description: "Translate text to Morse code.",
        icon: ArrowRightLeft,
        href: "/converter/morse-code",
        category: "dev-tools",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        tags: ["converter", "morse", "code", "text"]
    },
    {
        title: "Pixel to REM",
        description: "Convert pixels to REM units.",
        icon: ArrowRightLeft,
        href: "/converter/pixel-to-rem",
        category: "dev-tools",
        color: "text-teal-500",
        bg: "bg-teal-500/10",
        tags: ["converter", "pixel", "rem", "css"]
    },
    {
        title: "Aspect Ratio",
        description: "Calculate aspect ratios and dimensions.",
        icon: ArrowRightLeft,
        href: "/converter/aspect-ratio",
        category: "dev-tools",
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        tags: ["converter", "aspect", "ratio", "image"]
    }
];
