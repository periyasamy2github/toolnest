# ToolNest - Professor 🧰

**All Your Everyday Tools in One Place**

A modern, feature-rich collection of web tools built with Next.js 16, TypeScript, and Tailwind CSS. All tools work directly in your browser with a focus on privacy and performance.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

## ✨ Features

### 📥 Downloader Tools
- **YouTube Downloader** - Download videos from YouTube in MP4 format
- **Social Downloader** - Download from Instagram and Facebook

### 🎬 Media Tools
- **Video Converter** - Convert video formats
- **Audio Tools** - Voice Recorder, MP3 Cutter, Audio Merger

### 🖼️ Image Tools
- **Image Compressor** - Compress images without quality loss
- **Resizer & Cropper** - Resize and crop images
- **Background Remover** - Remove image backgrounds using AI
- **Meme Generator** - Create custom memes

### 💪 Health Tools
- **Calories Calculator** - BMR calculator and food calorie search

### 📝 Text Tools
- **Word Counter** - Count words, characters, sentences
- **Case Converter** - Transform text case
- **Lorem Ipsum Generator** - Generate placeholder text

### 🔧 Utilities
- **QR Code Generator** - Create styled QR codes with logos
- **Password Generator** - Generate secure passwords
- **Unit Converter** - Convert length, weight, temperature
- **Timer & Stopwatch** - Countdown timer and stopwatch

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/periyasamy2github/toolnest.git
   cd toolnest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your API keys if needed.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🛠️ Development

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Project Structure

```
src/
├── app/
│   ├── api/                 # API routes
│   │   ├── video-downloader/
│   │   └── social-downloader/
│   ├── tools/               # Tool pages
│   │   ├── audio/
│   │   ├── image/
│   │   ├── health/
│   │   ├── text/
│   │   └── utils/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   └── Navbar.tsx           # Navigation component
└── lib/
    └── utils.ts             # Utility functions
```

### Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **QR Codes**: qr-code-styling
- **Background Removal**: @imgly/background-removal
- **YouTube Downloads**: yt-dlp-wrap

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done)

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Environment Variables**
   Add any required environment variables in Vercel dashboard.

### Deploy to Other Platforms

#### Netlify
```bash
npm run build
# Deploy the `.next` folder
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Self-Hosted
```bash
npm run build
npm run start
# Or use PM2
pm2 start npm --name "toolnest" -- start
```

---

## ⚙️ Configuration

### next.config.ts

The app includes special headers for WASM support (required for background removal):

```typescript
headers: async () => [
  {
    source: "/(.*)",
    headers: [
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
    ],
  },
],
```

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Made with ❤️ using Next.js**
