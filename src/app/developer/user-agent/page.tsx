"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    Monitor,
    Smartphone,
    Globe,
    Cpu,
    Copy,
    Check,
    RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function UserAgentParser() {
    const [uaString, setUaString] = useState("");
    const [info, setInfo] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        // Set initial UA to current browser
        if (typeof window !== "undefined") {
            setUaString(navigator.userAgent);
        }
    }, []);

    useEffect(() => {
        parseUA(uaString);
    }, [uaString]);

    const parseUA = (ua: string) => {
        if (!ua) {
            setInfo(null);
            return;
        }

        // Simple parsing logic (can be replaced with a library like ua-parser-js for more accuracy)
        const browser =
            ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        const os =
            ua.match(/(iphone|ipad|ipod|android|windows phone|windows nt|mac os x|linux)/i) || [];

        let browserName = browser[1] || "Unknown";
        let browserVersion = browser[2] || "Unknown";
        let osName = os[1] || "Unknown";

        // Refine OS names
        if (osName.toLowerCase().includes("windows nt")) osName = "Windows";
        if (osName.toLowerCase().includes("mac os x")) osName = "macOS";
        if (osName.toLowerCase().includes("android")) osName = "Android";
        if (osName.toLowerCase().includes("linux")) osName = "Linux";
        if (osName.toLowerCase().includes("iphone") || osName.toLowerCase().includes("ipad")) osName = "iOS";

        // Refine Browser names
        if (ua.includes("Edg/")) {
            browserName = "Edge";
            browserVersion = ua.split("Edg/")[1].split(" ")[0];
        }

        setInfo({
            browser: { name: browserName, version: browserVersion },
            os: { name: osName },
            device: { type: /mobile/i.test(ua) ? "Mobile" : "Desktop" },
            engine: { name: "Webkit/Gecko" } // Simplified
        });
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uaString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    User Agent <span className="text-purple-500">Parser</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Identify browser, operating system, and device details.
                </p>
            </div>

            <div className="space-y-8">
                {/* Input Section */}
                <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">User Agent String</label>
                        <button
                            onClick={() => setUaString(navigator.userAgent)}
                            className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                        >
                            <RefreshCw size={12} />
                            Use My UA
                        </button>
                    </div>
                    <div className="relative">
                        <textarea
                            value={uaString}
                            onChange={(e) => setUaString(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none resize-none h-24 font-mono text-sm"
                            placeholder="Paste User Agent string here..."
                        />
                        <button
                            onClick={copyToClipboard}
                            className="absolute top-4 right-4 p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors"
                        >
                            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        </button>
                    </div>
                </div>

                {/* Results Grid */}
                {info && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Browser */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-purple-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                                <Globe size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{info.browser.name}</h3>
                                <p className="text-sm text-zinc-500">Version {info.browser.version}</p>
                            </div>
                        </div>

                        {/* OS */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-purple-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
                                <Cpu size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{info.os.name}</h3>
                                <p className="text-sm text-zinc-500">Operating System</p>
                            </div>
                        </div>

                        {/* Device */}
                        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-purple-500/30 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                                {info.device.type === "Mobile" ? <Smartphone size={24} /> : <Monitor size={24} />}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{info.device.type}</h3>
                                <p className="text-sm text-zinc-500">Device Type</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
