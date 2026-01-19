"use client";

import { useState } from "react";
import { CreditCard, Check, X } from "lucide-react";

export default function CreditCardValidator() {
    const [cardNumber, setCardNumber] = useState("");
    const [result, setResult] = useState<{ valid: boolean; type: string } | null>(null);

    const validateCard = (number: string) => {
        // Remove spaces and non-digits
        const cleanNumber = number.replace(/\D/g, "");

        if (!cleanNumber) {
            setResult(null);
            return;
        }

        // Luhn Algorithm
        let sum = 0;
        let shouldDouble = false;
        for (let i = cleanNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cleanNumber.charAt(i));

            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        const isValid = (sum % 10) === 0;

        // Determine Card Type
        let type = "Unknown";
        if (/^4/.test(cleanNumber)) type = "Visa";
        else if (/^5[1-5]/.test(cleanNumber)) type = "MasterCard";
        else if (/^3[47]/.test(cleanNumber)) type = "American Express";
        else if (/^6(?:011|5)/.test(cleanNumber)) type = "Discover";
        else if (/^3(?:0[0-5]|[68])/.test(cleanNumber)) type = "Diners Club";
        else if (/^35(?:2[89]|[3-8])/.test(cleanNumber)) type = "JCB";

        setResult({ valid: isValid, type });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCardNumber(val);
        validateCard(val);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Credit Card <span className="text-yellow-500">Validator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Validate credit card numbers using the Luhn algorithm and identify the issuer.
                </p>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-8 max-w-2xl mx-auto">
                <div className="space-y-4">
                    <label className="text-sm font-medium text-zinc-400">Card Number</label>
                    <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={handleChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-xl text-white focus:ring-2 focus:ring-yellow-500/50 outline-none font-mono"
                        />
                    </div>
                </div>

                {cardNumber && result && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className={`p-6 rounded-2xl border ${result.valid ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"} flex flex-col items-center justify-center text-center space-y-2`}>
                            {result.valid ? (
                                <Check size={32} className="text-green-500" />
                            ) : (
                                <X size={32} className="text-red-500" />
                            )}
                            <span className={`font-bold ${result.valid ? "text-green-400" : "text-red-400"}`}>
                                {result.valid ? "Valid Number" : "Invalid Number"}
                            </span>
                        </div>

                        <div className="bg-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2">
                            <CreditCard size={32} className="text-zinc-400" />
                            <div className="space-y-1">
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">Issuer</div>
                                <div className="font-bold text-white">{result.type}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
