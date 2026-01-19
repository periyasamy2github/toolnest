"use client";

import { useState } from "react";
import { ArrowRightLeft, Copy, Check } from "lucide-react";

const MORSE_CODE: Record<string, string> = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.",
    "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..",
    "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.",
    "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
    "Y": "-.--", "Z": "--..", "1": ".----", "2": "..---", "3": "...--",
    "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..",
    "9": "----.", "0": "-----", " ": "/"
};

const REVERSE_MORSE: Record<string, string> = Object.entries(MORSE_CODE).reduce((acc, [k, v]) => {
    acc[v] = k;
    return acc;
}, {} as Record<string, string>);

export default function MorseCode() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);

    const convert = () => {
        if (!input.trim()) {
            setOutput("");
            return;
        }

        if (mode === "encode") {
            const result = input.toUpperCase().split("").map(char => {
                return MORSE_CODE[char] || char;
            }).join(" ");
            setOutput(result);
        } else {
            const result = input.split(" ").map(code => {
                return REVERSE_MORSE[code] || code;
            }).join("");
            setOutput(result);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Morse Code <span className="text-yellow-500">Converter</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Translate text to Morse code and vice versa.
                </p>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setMode("encode")}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${mode === "encode" ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}
                >
                    Text to Morse
                </button>
                <button
                    onClick={() => setMode("decode")}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${mode === "decode" ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}
                >
                    Morse to Text
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">
                        {mode === "encode" ? "Text Input" : "Morse Input (space separated)"}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === "encode" ? "SOS" : "... --- ..."}
                        className="w-full h-64 bg-zinc-900/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none font-mono text-sm resize-none"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-zinc-400">Output</label>
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className="text-zinc-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        )}
                    </div>
                    <div className="relative h-64">
                        <textarea
                            readOnly
                            value={output}
                            className="w-full h-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-yellow-400 font-mono text-sm resize-none focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    onClick={convert}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-bold shadow-lg shadow-yellow-500/20 flex items-center gap-2 transition-all"
                >
                    <ArrowRightLeft size={20} />
                    Convert
                </button>
            </div>
        </div>
    );
}
