"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    ArrowLeft,
    Binary,
    Hash,
    Copy,
    Trash2,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/components/Animations";

export default function NumberBasePage() {
    const [values, setValues] = useState({
        binary: "",
        octal: "",
        decimal: "",
        hex: ""
    });
    const [notification, setNotification] = useState("");

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 3000);
    };

    const handleChange = (type: keyof typeof values, value: string) => {
        // Validation regex
        const regex = {
            binary: /^[01]*$/,
            octal: /^[0-7]*$/,
            decimal: /^[0-9]*$/,
            hex: /^[0-9a-fA-F]*$/
        };

        if (!regex[type].test(value)) return;

        let decimalValue: number | null = null;

        if (value === "") {
            setValues({ binary: "", octal: "", decimal: "", hex: "" });
            return;
        }

        try {
            switch (type) {
                case "binary":
                    decimalValue = parseInt(value, 2);
                    break;
                case "octal":
                    decimalValue = parseInt(value, 8);
                    break;
                case "decimal":
                    decimalValue = parseInt(value, 10);
                    break;
                case "hex":
                    decimalValue = parseInt(value, 16);
                    break;
            }

            if (decimalValue !== null && !isNaN(decimalValue)) {
                setValues({
                    binary: decimalValue.toString(2),
                    octal: decimalValue.toString(8),
                    decimal: decimalValue.toString(10),
                    hex: decimalValue.toString(16).toUpperCase()
                });
            }
        } catch (e) {
            // Ignore parse errors
        }
    };

    const copyToClipboard = (text: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        showNotification("Copied!");
    };

    const clearAll = () => {
        setValues({ binary: "", octal: "", decimal: "", hex: "" });
    };

    return (
        <div className="min-h-screen pb-24 space-y-12">
            {/* Header */}
            <m.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex items-center gap-6">
                    <BackButton />
                    <div>
                        <m.h1 variants={fadeInUp} className="text-4xl font-black text-gradient">Number Base Converter</m.h1>
                        <m.p variants={fadeInUp} className="text-zinc-400 text-lg">Binary • Octal • Decimal • Hex</m.p>
                    </div>
                </div>

                <m.div variants={fadeInUp}>
                    <button
                        onClick={clearAll}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors font-bold"
                    >
                        <Trash2 size={18} />
                        Clear All
                    </button>
                </m.div>
            </m.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Binary */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <label className="text-zinc-400 font-bold flex items-center gap-2">
                            <Binary size={18} className="text-blue-400" />
                            Binary (Base 2)
                        </label>
                        <button onClick={() => copyToClipboard(values.binary)} className="text-zinc-500 hover:text-white transition-colors">
                            <Copy size={16} />
                        </button>
                    </div>
                    <input
                        type="text"
                        value={values.binary}
                        onChange={(e) => handleChange("binary", e.target.value)}
                        placeholder="101010"
                        className="w-full bg-zinc-950/50 border border-white/5 rounded-xl p-4 font-mono text-lg text-blue-400 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                    />
                </m.div>

                {/* Decimal */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <label className="text-zinc-400 font-bold flex items-center gap-2">
                            <Hash size={18} className="text-green-400" />
                            Decimal (Base 10)
                        </label>
                        <button onClick={() => copyToClipboard(values.decimal)} className="text-zinc-500 hover:text-white transition-colors">
                            <Copy size={16} />
                        </button>
                    </div>
                    <input
                        type="text"
                        value={values.decimal}
                        onChange={(e) => handleChange("decimal", e.target.value)}
                        placeholder="42"
                        className="w-full bg-zinc-950/50 border border-white/5 rounded-xl p-4 font-mono text-lg text-green-400 focus:ring-2 focus:ring-green-500/50 outline-none transition-all"
                    />
                </m.div>

                {/* Octal */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <label className="text-zinc-400 font-bold flex items-center gap-2">
                            <span className="text-orange-400 font-mono font-black text-lg">8</span>
                            Octal (Base 8)
                        </label>
                        <button onClick={() => copyToClipboard(values.octal)} className="text-zinc-500 hover:text-white transition-colors">
                            <Copy size={16} />
                        </button>
                    </div>
                    <input
                        type="text"
                        value={values.octal}
                        onChange={(e) => handleChange("octal", e.target.value)}
                        placeholder="52"
                        className="w-full bg-zinc-950/50 border border-white/5 rounded-xl p-4 font-mono text-lg text-orange-400 focus:ring-2 focus:ring-orange-500/50 outline-none transition-all"
                    />
                </m.div>

                {/* Hexadecimal */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card p-6 space-y-4"
                >
                    <div className="flex justify-between items-center">
                        <label className="text-zinc-400 font-bold flex items-center gap-2">
                            <span className="text-purple-400 font-mono font-black text-lg">#</span>
                            Hexadecimal (Base 16)
                        </label>
                        <button onClick={() => copyToClipboard(values.hex)} className="text-zinc-500 hover:text-white transition-colors">
                            <Copy size={16} />
                        </button>
                    </div>
                    <input
                        type="text"
                        value={values.hex}
                        onChange={(e) => handleChange("hex", e.target.value)}
                        placeholder="2A"
                        className="w-full bg-zinc-950/50 border border-white/5 rounded-xl p-4 font-mono text-lg text-purple-400 focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
                    />
                </m.div>
            </div>

            {/* Notification Toast */}
            {notification && (
                <m.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-zinc-900 border border-blue-500/50 rounded-full shadow-2xl flex items-center gap-3 z-50"
                >
                    <CheckCircle2 size={18} className="text-blue-500" />
                    <span className="text-white font-medium">{notification}</span>
                </m.div>
            )}
        </div>
    );
}
