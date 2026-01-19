"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import {
    ShieldCheck,
    Check,
    X,
    Eye,
    EyeOff,
    Copy,
    RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function PasswordStrength() {
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [score, setScore] = useState(0);
    const [checks, setChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false
    });

    useEffect(() => {
        checkStrength(password);
    }, [password]);

    const checkStrength = (pass: string) => {
        const newChecks = {
            length: pass.length >= 12,
            uppercase: /[A-Z]/.test(pass),
            lowercase: /[a-z]/.test(pass),
            number: /[0-9]/.test(pass),
            symbol: /[^A-Za-z0-9]/.test(pass)
        };

        setChecks(newChecks);

        let newScore = 0;
        if (newChecks.length) newScore += 20;
        if (newChecks.uppercase) newScore += 20;
        if (newChecks.lowercase) newScore += 20;
        if (newChecks.number) newScore += 20;
        if (newChecks.symbol) newScore += 20;

        setScore(newScore);
    };

    const generatePassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        let newPass = "";
        for (let i = 0; i < 16; i++) {
            newPass += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(newPass);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
    };

    const getStrengthColor = () => {
        if (score <= 20) return "bg-red-500";
        if (score <= 40) return "bg-orange-500";
        if (score <= 60) return "bg-yellow-500";
        if (score <= 80) return "bg-blue-500";
        return "bg-emerald-500";
    };

    const getStrengthLabel = () => {
        if (score <= 20) return "Very Weak";
        if (score <= 40) return "Weak";
        if (score <= 60) return "Moderate";
        if (score <= 80) return "Strong";
        return "Very Strong";
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Password <span className="text-emerald-500">Strength</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Check how secure your password is.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type={isVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-2xl p-6 text-xl md:text-2xl font-mono text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all pr-32"
                            placeholder="Type a password..."
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <button
                                onClick={() => setIsVisible(!isVisible)}
                                className="p-2 text-zinc-500 hover:text-white transition-colors"
                            >
                                {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            <button
                                onClick={generatePassword}
                                className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors"
                                title="Generate Strong Password"
                            >
                                <RefreshCw size={20} />
                            </button>
                            {password && (
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors"
                                >
                                    <Copy size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Strength Meter */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                            <span className="text-zinc-400">Strength</span>
                            <span className={cn(
                                "transition-colors duration-300",
                                score <= 20 ? "text-red-400" :
                                    score <= 40 ? "text-orange-400" :
                                        score <= 60 ? "text-yellow-400" :
                                            score <= 80 ? "text-blue-400" :
                                                "text-emerald-400"
                            )}>
                                {getStrengthLabel()} ({score}%)
                            </span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <m.div
                                initial={{ width: 0 }}
                                animate={{ width: `${score}%` }}
                                className={cn("h-full transition-colors duration-500", getStrengthColor())}
                            />
                        </div>
                    </div>
                </div>

                {/* Checks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: "At least 12 characters", valid: checks.length },
                        { label: "Contains uppercase letter", valid: checks.uppercase },
                        { label: "Contains lowercase letter", valid: checks.lowercase },
                        { label: "Contains number", valid: checks.number },
                        { label: "Contains special character", valid: checks.symbol },
                    ].map((check, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex items-center gap-3 p-4 rounded-xl border transition-all duration-300",
                                check.valid
                                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                    : "bg-zinc-950/50 border-white/5 text-zinc-500"
                            )}
                        >
                            <div className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center border",
                                check.valid
                                    ? "bg-emerald-500 border-emerald-500 text-black"
                                    : "border-zinc-700 bg-zinc-900"
                            )}>
                                {check.valid ? <Check size={14} strokeWidth={3} /> : <X size={14} />}
                            </div>
                            <span className="font-medium">{check.label}</span>
                        </div>
                    ))}
                </div>

                {/* Security Note */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-4">
                    <ShieldCheck className="text-blue-400 shrink-0" size={24} />
                    <div className="space-y-1">
                        <h4 className="text-blue-400 font-bold">Client-Side Only</h4>
                        <p className="text-sm text-blue-200/70">
                            Your password is analyzed locally in your browser. It is never sent to any server.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
