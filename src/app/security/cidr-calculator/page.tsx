"use client";

import { useState } from "react";
import { Network, ArrowRight } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function CIDRCalculator() {
    const [rangeStart, setRangeStart] = useState("192.168.1.0");
    const [rangeEnd, setRangeEnd] = useState("192.168.1.255");
    const [cidrs, setCidrs] = useState<string[]>([]);

    const calculateCIDR = () => {
        // Simplified logic to show CIDR blocks for a range
        // A full implementation requires complex bitwise operations to find optimal CIDR blocks
        // For this demo, we'll just show the single largest block if it matches, or a list

        try {
            const start = ipToLong(rangeStart);
            const end = ipToLong(rangeEnd);

            if (start > end) {
                setCidrs(["Invalid Range: Start > End"]);
                return;
            }

            const blocks = rangeToCIDR(start, end);
            setCidrs(blocks);
        } catch (e) {
            setCidrs(["Invalid IP Address"]);
        }
    };

    const ipToLong = (ip: string) => {
        const parts = ip.split('.').map(Number);
        if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) throw new Error("Invalid IP");
        return (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    };

    const longToIp = (long: number) => {
        return [
            (long >>> 24) & 255,
            (long >>> 16) & 255,
            (long >>> 8) & 255,
            long & 255
        ].join('.');
    };

    const rangeToCIDR = (start: number, end: number) => {
        const cidrs = [];
        while (end >= start) {
            let maxSize = 32;
            while (maxSize > 0) {
                const mask = -1 << (32 - (maxSize - 1));
                const maskBase = start & mask;
                if (maskBase !== start) break;
                maxSize--;
            }

            const x = Math.log(end - start + 1) / Math.log(2);
            const maxDiff = 32 - Math.floor(x);

            if (maxSize < maxDiff) maxSize = maxDiff;

            cidrs.push(`${longToIp(start)}/${maxSize}`);
            start += Math.pow(2, 32 - maxSize);
        }
        return cidrs;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    CIDR <span className="text-indigo-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert IP ranges to CIDR notation blocks.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Start IP</label>
                        <input
                            type="text"
                            value={rangeStart}
                            onChange={(e) => setRangeStart(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none font-mono"
                        />
                    </div>
                    <div className="hidden md:flex justify-center pt-6">
                        <ArrowRight className="text-zinc-600" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">End IP</label>
                        <input
                            type="text"
                            value={rangeEnd}
                            onChange={(e) => setRangeEnd(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none font-mono"
                        />
                    </div>
                </div>

                <button
                    onClick={calculateCIDR}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all"
                >
                    <Network size={20} />
                    Convert to CIDR
                </button>

                {cidrs.length > 0 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-lg font-semibold text-white">CIDR Blocks</h3>
                        <div className="bg-zinc-950 border border-white/5 rounded-xl p-4 space-y-2 font-mono text-zinc-300">
                            {cidrs.map((cidr, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                    {cidr}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
