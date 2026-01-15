import {
    FileJson,
    Terminal,
    Palette,
    Clock,
    FileType,
    Code2,
    Scissors,
    FileCode2,
    Code,
    Binary,
    Link as LinkIcon,
    ShieldCheck,
    Fingerprint,
    Lock,
    ImageIcon,
    Crop,
    RefreshCw,
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
    Trash2
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
        category: "developer",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["json", "format", "minify"]
    },
    {
        title: "API Tester",
        description: "Test REST APIs with a simple interface.",
        icon: Terminal,
        href: "/developer/api-tester",
        category: "developer",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["api", "rest", "test"]
    },
    {
        title: "Gradient Generator",
        description: "Create beautiful CSS gradients.",
        icon: Palette,
        href: "/developer/gradient-generator",
        category: "developer",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["css", "gradient", "design"]
    },
    {
        title: "Cron Generator",
        description: "Convert cron expressions to human readable text.",
        icon: Clock,
        href: "/developer/cron-generator",
        category: "developer",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["cron", "schedule", "time"]
    },
    {
        title: "JSON to TypeScript",
        description: "Generate TypeScript interfaces from JSON.",
        icon: FileJson,
        href: "/developer/json-to-ts",
        category: "developer",
        color: "text-blue-300",
        bg: "bg-blue-300/10",
        tags: ["json", "typescript", "types"]
    },
    {
        title: "SQL Formatter",
        description: "Format SQL queries for better readability.",
        icon: Database,
        href: "/developer/sql-formatter",
        category: "developer",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["sql", "database", "format"]
    },
    {
        title: "YAML to JSON",
        description: "Convert between YAML and JSON formats.",
        icon: FileType,
        href: "/developer/yaml-to-json",
        category: "developer",
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        tags: ["yaml", "json", "convert"]
    },
    {
        title: "HTML to JSX",
        description: "Convert HTML code to React JSX.",
        icon: Code2,
        href: "/developer/html-to-jsx",
        category: "developer",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["html", "jsx", "react"]
    },
    {
        title: "CSS Tools",
        description: "Minify, beautify, and format CSS.",
        icon: Scissors,
        href: "/developer/css-tools",
        category: "developer",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["css", "minify", "format"]
    },
    {
        title: "Markdown Preview",
        description: "Preview Markdown content in real-time.",
        icon: FileCode2,
        href: "/developer/markdown-preview",
        category: "developer",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["markdown", "preview", "edit"]
    },
    {
        title: "HTML Entities",
        description: "Encode and decode HTML entities.",
        icon: Code,
        href: "/developer/html-entities",
        category: "developer",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        tags: ["html", "entities", "encode"]
    },
    {
        title: "Regex Tester",
        description: "Test and debug regular expressions.",
        icon: FileCode,
        href: "/developer/regex-tester",
        category: "developer",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["regex", "test", "debug"]
    },
    {
        title: "Base64 Encoder",
        description: "Encode and decode Base64 strings and files.",
        icon: Binary,
        href: "/developer/base64",
        category: "developer",
        color: "text-slate-400",
        bg: "bg-slate-400/10",
        tags: ["base64", "encode", "decode"]
    },
    {
        title: "URL Encoder",
        description: "Encode and decode URLs and parameters.",
        icon: LinkIcon,
        href: "/developer/url-encoder",
        category: "developer",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["url", "encode", "decode"]
    },
    {
        title: "JWT Tool",
        description: "Decode and analyze JSON Web Tokens.",
        icon: ShieldCheck,
        href: "/developer/jwt",
        category: "developer",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["jwt", "auth", "decode"]
    },
    {
        title: "UUID Generator",
        description: "Generate random v4 UUIDs instantly.",
        icon: Fingerprint,
        href: "/developer/uuid-generator",
        category: "developer",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["uuid", "guid", "generate"]
    },
    {
        title: "Password Generator",
        description: "Generate secure, random passwords.",
        icon: Lock,
        href: "/developer/password-generator",
        category: "developer",
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
        category: "image",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["image", "compress", "optimize"]
    },
    {
        title: "Resizer",
        description: "Resize images to exact dimensions.",
        icon: Crop,
        href: "/image/resizer",
        category: "image",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["image", "resize", "dimensions"]
    },
    {
        title: "Cropper",
        description: "Crop, rotate, and flip images.",
        icon: Crop,
        href: "/image/cropper",
        category: "image",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["image", "crop", "rotate"]
    },
    {
        title: "Converter",
        description: "Convert between JPG, PNG, WEBP, BMP, GIF.",
        icon: RefreshCw,
        href: "/image/converter",
        category: "image",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["image", "convert", "format"]
    },
    {
        title: "Filters & Effects",
        description: "Apply professional filters and adjustments.",
        icon: Sliders,
        href: "/image/filters",
        category: "image",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["image", "filters", "edit"]
    },
    {
        title: "Background Remover",
        description: "Remove image backgrounds automatically.",
        icon: Scissors,
        href: "/image/remove-bg",
        category: "image",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["image", "background", "remove"]
    },
    {
        title: "Meme Generator",
        description: "Create viral memes with multi-layer editing.",
        icon: Smile,
        href: "/image/meme-generator",
        category: "image",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["image", "meme", "create"]
    },
    {
        title: "Watermark",
        description: "Protect your images with custom watermarks.",
        icon: Stamp,
        href: "/image/watermark",
        category: "image",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["image", "watermark", "protect"]
    },
    {
        title: "Collage Maker",
        description: "Combine photos into beautiful layouts.",
        icon: LayoutGrid,
        href: "/image/collage",
        category: "image",
        color: "text-rose-400",
        bg: "bg-rose-400/10",
        tags: ["image", "collage", "layout"]
    },
    {
        title: "Color Palette",
        description: "Extract color palettes from any image.",
        icon: Palette,
        href: "/image/color-palette",
        category: "image",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["image", "colors", "palette"]
    },

    // Audio Tools
    {
        title: "MP3 Cutter",
        description: "Trim and cut audio files with precision.",
        icon: Scissors,
        href: "/audio/cutter",
        category: "audio",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["audio", "cut", "mp3"]
    },
    {
        title: "Audio Merger",
        description: "Combine multiple audio files into one.",
        icon: Merge,
        href: "/audio/merger",
        category: "audio",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["audio", "merge", "combine"]
    },
    {
        title: "Voice Recorder",
        description: "Record high-quality audio with visualizer.",
        icon: Mic,
        href: "/audio/voice-recorder",
        category: "audio",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["audio", "record", "voice"]
    },

    // Text Tools
    {
        title: "Word Counter",
        description: "Count words, characters, and paragraphs in real-time.",
        icon: Hash,
        href: "/text/word-counter",
        category: "text",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["text", "count", "words"]
    },
    {
        title: "Text Cleaner",
        description: "Remove extra spaces, lines, and HTML tags.",
        icon: Eraser,
        href: "/text/text-cleaner",
        category: "text",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["text", "clean", "format"]
    },
    {
        title: "Case Converter",
        description: "Convert text to UPPERCASE, lowercase, Title Case, etc.",
        icon: CaseSensitive,
        href: "/text/case-converter",
        category: "text",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["text", "case", "convert"]
    },
    {
        title: "Lorem Ipsum",
        description: "Generate placeholder text for your designs.",
        icon: Type,
        href: "/text/lorem-ipsum",
        category: "text",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["text", "lorem", "placeholder"]
    },
    {
        title: "Diff Checker",
        description: "Compare two texts and highlight differences.",
        icon: FileDiff,
        href: "/text/diff-checker",
        category: "text",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["text", "diff", "compare"]
    },
    {
        title: "Instagram Hashtags",
        description: "Generate trending hashtags for your posts.",
        icon: Instagram,
        href: "/text/instagram-hashtags",
        category: "text",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["text", "hashtags", "social"]
    },
    {
        title: "Headline Analyzer",
        description: "Score and optimize headlines for engagement.",
        icon: Newspaper,
        href: "/text/headline-analyzer",
        category: "text",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["text", "headline", "seo"]
    },
    {
        title: "Readability Score",
        description: "Analyze the readability of your content.",
        icon: BookOpen,
        href: "/text/readability",
        category: "text",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["text", "readability", "score"]
    },
    {
        title: "Keyword Density",
        description: "Analyze keyword frequency in your content.",
        icon: BarChart3,
        href: "/text/keyword-density",
        category: "text",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["text", "keywords", "seo"]
    },
    {
        title: "Text to Speech",
        description: "Convert text into natural-sounding speech.",
        icon: Volume2,
        href: "/text/text-to-speech",
        category: "text",
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
        category: "health",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["health", "bmi", "weight"]
    },
    {
        title: "Sleep Calculator",
        description: "Calculate sleep cycles and wake up times.",
        icon: Moon,
        href: "/health/sleep-calculator",
        category: "health",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["health", "sleep", "cycles"]
    },
    {
        title: "Body Fat",
        description: "Estimate your body fat percentage using the US Navy method.",
        icon: Activity,
        href: "/health/body-fat-calculator",
        category: "health",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["health", "fat", "fitness"]
    },
    {
        title: "Breathing",
        description: "Relax with guided breathing techniques including Pranayama.",
        icon: Wind,
        href: "/health/breathing-exercise",
        category: "health",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["health", "breathing", "relax"]
    },
    {
        title: "Water Intake",
        description: "Calculate your daily water needs based on weight and activity.",
        icon: Droplets,
        href: "/health/water-intake-calculator",
        category: "health",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        tags: ["health", "water", "hydration"]
    },
    {
        title: "Calories",
        description: "Calculate daily calorie needs and track food intake.",
        icon: Flame,
        href: "/health/calories-calculator",
        category: "health",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["health", "calories", "diet"]
    },
    {
        title: "Fitness Age",
        description: "Discover your fitness age based on lifestyle and health metrics.",
        icon: Dumbbell,
        href: "/health/fitness-age",
        category: "health",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
        tags: ["health", "fitness", "age"]
    },
    {
        title: "Health Score",
        description: "Track your daily wellness with a comprehensive health score.",
        icon: HeartPulse,
        href: "/health/health-score",
        category: "health",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["health", "score", "wellness"]
    },
    {
        title: "Burnout Risk",
        description: "Assess your risk of burnout based on work and lifestyle factors.",
        icon: Brain,
        href: "/health/burnout-risk",
        category: "health",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["health", "burnout", "mental"]
    },
    {
        title: "Smoking Cost",
        description: "Calculate how much money you spend on smoking.",
        icon: Coins,
        href: "/health/smoking-cost",
        category: "health",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["health", "smoking", "cost"]
    },
    {
        title: "Life Expectancy",
        description: "Estimate your life expectancy based on lifestyle and health factors.",
        icon: Hourglass,
        href: "/health/life-expectancy",
        category: "health",
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
        category: "utils",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        tags: ["utils", "invoice", "business"]
    },
    {
        title: "Pomodoro Timer",
        description: "Boost productivity with the Pomodoro technique.",
        icon: Clock,
        href: "/utils/pomodoro",
        category: "utils",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        tags: ["utils", "pomodoro", "timer"]
    },
    {
        title: "Signature Generator",
        description: "Create and download digital signatures.",
        icon: PenTool,
        href: "/utils/signature-generator",
        category: "utils",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
        tags: ["utils", "signature", "digital"]
    },
    {
        title: "Stopwatch",
        description: "Precise stopwatch with lap timing.",
        icon: Timer,
        href: "/utils/stopwatch",
        category: "utils",
        color: "text-green-400",
        bg: "bg-green-400/10",
        tags: ["utils", "stopwatch", "time"]
    },
    {
        title: "Timer",
        description: "Simple countdown timer.",
        icon: Timer,
        href: "/utils/timer",
        category: "utils",
        color: "text-red-400",
        bg: "bg-red-400/10",
        tags: ["utils", "timer", "countdown"]
    },
    {
        title: "World Clock",
        description: "Track current time across global cities.",
        icon: Globe,
        href: "/utils/world-clock",
        category: "utils",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
        tags: ["utils", "clock", "world"]
    },
    {
        title: "Random Picker",
        description: "Randomly select options from a list.",
        icon: Dices,
        href: "/utils/random-picker",
        category: "utils",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        tags: ["utils", "random", "picker"]
    },
    {
        title: "QR Code Generator",
        description: "Create custom QR codes.",
        icon: QrCode,
        href: "/utils/qr-code",
        category: "utils",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        tags: ["utils", "qr", "code"]
    },
    {
        title: "Unit Converter",
        description: "Convert length, weight, temperature, and more.",
        icon: Ruler,
        href: "/utils/unit-converter",
        category: "utils",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
        tags: ["utils", "convert", "units"]
    },
];
