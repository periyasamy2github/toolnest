"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Type, ArrowRightLeft, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

export default function RomanNumeralConverter() {
    const [decimal, setDecimal] = useState("");
    const [roman, setRoman] = useState("");
    const [copied, setCopied] = useState(false);

    const toRoman = (num: number): string => {
        if (num < 1 || num > 3999) return "";
        const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const sym = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        let r = "";
        for (let i = 0; i < val.length; i++) {
            while (num >= val[i]) {
                num -= val[i];
                r += sym[i];
            }
        }
        return r;
    };

    const fromRoman = (str: string): number => {
        const roman = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let num = 0;
        for (let i = 0; i < str.length; i++) {
            const curr = roman[str[i] as keyof typeof roman];
            const next = roman[str[i + 1] as keyof typeof roman];
            if (next > curr) {
                num += next - curr;
                i++;
            } else {
                num += curr;
            }
        }
        return num;
    };

    const handleDecimal = (val: string) => {
        setDecimal(val);
        if (!val) {
            setRoman("");
            return;
        }
        const num = parseInt(val);
        if (!isNaN(num)) {
            setRoman(toRoman(num));
        }
    };

    const handleRoman = (val: string) => {
        const upper = val.toUpperCase().replace(/[^IVXLCDM]/g, "");
        setRoman(upper);
        if (!upper) {
            setDecimal("");
            return;
        }
        const num = fromRoman(upper);
        if (!isNaN(num)) {
            setDecimal(num.toString());
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Roman <span className="text-amber-500">Numerals</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Convert between Decimal numbers and Roman numerals instantly.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center">
                    {/* Decimal Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Decimal Number</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={decimal}
                                onChange={(e) => handleDecimal(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-amber-500/50 outline-none text-2xl font-mono"
                                placeholder="2024"
                                min="1"
                                max="3999"
                            />
                            {decimal && (
                                <button
                                    onClick={() => copyToClipboard(decimal)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-zinc-500">Range: 1 - 3999</p>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center">
                        <div className="p-4 bg-zinc-800 rounded-full text-zinc-400">
                            <ArrowRightLeft size={24} />
                        </div>
                    </div>

                    {/* Roman Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Roman Numeral</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={roman}
                                onChange={(e) => handleRoman(e.target.value)}
                                className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-amber-500/50 outline-none text-2xl font-serif tracking-wider"
                                placeholder="MMXXIV"
                            />
                            {roman && (
                                <button
                                    onClick={() => copyToClipboard(roman)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-zinc-500">Valid chars: I, V, X, L, C, D, M</p>
                    </div>
                </div>

                {/* Reference Table */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-lg font-bold text-white mb-6 text-center">Quick Reference</h3>
                    <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                        {[
                            { r: "I", v: 1 },
                            { r: "V", v: 5 },
                            { r: "X", v: 10 },
                            { r: "L", v: 50 },
                            { r: "C", v: 100 },
                            { r: "D", v: 500 },
                            { r: "M", v: 1000 },
                        ].map((item) => (
                            <div key={item.r} className="bg-zinc-950 border border-white/5 rounded-xl p-4 text-center">
                                <div className="text-2xl font-serif text-amber-500 font-bold mb-1">{item.r}</div>
                                <div className="text-sm text-zinc-400">{item.v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
