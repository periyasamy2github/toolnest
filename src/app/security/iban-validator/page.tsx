"use client";

import { useState } from "react";
import { Globe, Check, X } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function IBANValidator() {
    const [iban, setIban] = useState("");
    const [result, setResult] = useState<{ valid: boolean; country: string } | null>(null);

    const validateIBAN = (input: string) => {
        // Remove spaces and uppercase
        const cleanIBAN = input.replace(/\s/g, "").toUpperCase();

        if (!cleanIBAN) {
            setResult(null);
            return;
        }

        // Basic format check (Country Code + Check Digits + BBAN)
        // Minimal length is 15 (Norway), max is 34
        if (cleanIBAN.length < 15 || cleanIBAN.length > 34) {
            setResult({ valid: false, country: "Unknown" });
            return;
        }

        // Move first 4 chars to end
        const rearranged = cleanIBAN.substring(4) + cleanIBAN.substring(0, 4);

        // Convert letters to numbers (A=10, B=11, ..., Z=35)
        let numeric = "";
        for (let i = 0; i < rearranged.length; i++) {
            const char = rearranged.charAt(i);
            if (/[A-Z]/.test(char)) {
                numeric += (char.charCodeAt(0) - 55).toString();
            } else {
                numeric += char;
            }
        }

        // Modulo 97 check on big integer
        // We need to handle large numbers, so we process in chunks or use BigInt
        let valid = false;
        try {
            valid = BigInt(numeric) % BigInt(97) === BigInt(1);
        } catch (e) {
            valid = false;
        }

        // Extract country code
        const countryCode = cleanIBAN.substring(0, 2);
        // Map common codes to names (simplified list)
        const countries: Record<string, string> = {
            DE: "Germany", GB: "United Kingdom", FR: "France", IT: "Italy", ES: "Spain",
            NL: "Netherlands", CH: "Switzerland", BE: "Belgium", AT: "Austria", PT: "Portugal",
            SE: "Sweden", NO: "Norway", DK: "Denmark", FI: "Finland", PL: "Poland",
            TR: "Turkey", BR: "Brazil", AE: "UAE", SA: "Saudi Arabia", IN: "India"
        };

        setResult({
            valid,
            country: countries[countryCode] || countryCode
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setIban(val);
        validateIBAN(val);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    IBAN <span className="text-cyan-500">Validator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Validate International Bank Account Numbers (IBAN) and identify the country.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8 max-w-2xl mx-auto">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">IBAN Number</label>
                    <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            value={iban}
                            onChange={handleChange}
                            placeholder="DE89 3704 0044 0532 0130 00"
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-xl text-white focus:ring-2 focus:ring-cyan-500/50 outline-none font-mono uppercase"
                        />
                    </div>
                </div>

                {iban && result && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className={`p-6 rounded-2xl border ${result.valid ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"} flex flex-col items-center justify-center text-center space-y-2`}>
                            {result.valid ? (
                                <Check size={32} className="text-green-500" />
                            ) : (
                                <X size={32} className="text-red-500" />
                            )}
                            <span className={`font-bold ${result.valid ? "text-green-400" : "text-red-400"}`}>
                                {result.valid ? "Valid IBAN" : "Invalid IBAN"}
                            </span>
                        </div>

                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                            <Globe size={32} className="text-zinc-400" />
                            <div className="space-y-1">
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">Country</div>
                                <div className="font-bold text-white">{result.country}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
