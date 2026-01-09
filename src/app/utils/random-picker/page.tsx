"use client";

import { useState } from "react";
import { ArrowLeft, Dices, RefreshCw, Plus, X, Trophy, List } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RandomPickerPage() {
    const [items, setItems] = useState<string[]>(["Option 1", "Option 2", "Option 3"]);
    const [newItem, setNewItem] = useState("");
    const [winner, setWinner] = useState<string | null>(null);
    const [isPicking, setIsPicking] = useState(false);

    const addItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem.trim()]);
            setNewItem("");
        }
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const pickWinner = () => {
        if (items.length < 2) return;

        setIsPicking(true);
        setWinner(null);

        // Simulate "picking" animation
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * items.length);
            setWinner(items[randomIndex]);
            setIsPicking(false);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/utils" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Random Picker</h1>
                    <p className="text-zinc-400">Randomly select names, numbers, or options from a list.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="glass-card p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                                <List size={16} />
                                Your List
                            </label>
                            <span className="text-xs text-zinc-500">{items.length} items</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addItem()}
                                placeholder="Add new option..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                            />
                            <button
                                onClick={addItem}
                                className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all"
                            >
                                <Plus size={24} />
                            </button>
                        </div>

                        <div className="space-y-2 max-h-80 overflow-auto pr-2 custom-scrollbar">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 group">
                                    <span className="text-sm text-zinc-300">{item}</span>
                                    <button
                                        onClick={() => removeItem(i)}
                                        className="p-1 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setItems([])}
                            className="w-full py-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="glass-card p-8 flex-1 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden">
                        {isPicking && (
                            <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[2px] flex items-center justify-center z-10">
                                <div className="flex flex-col items-center gap-4">
                                    <RefreshCw size={48} className="text-blue-400 animate-spin" />
                                    <p className="text-blue-400 font-bold animate-pulse">Picking a winner...</p>
                                </div>
                            </div>
                        )}

                        {winner ? (
                            <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 rounded-full bg-yellow-500/10 border-2 border-yellow-500/20 flex items-center justify-center mx-auto">
                                    <Trophy size={48} className="text-yellow-500" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-zinc-500 uppercase tracking-widest">The Winner Is</p>
                                    <h2 className="text-4xl font-bold text-zinc-100">{winner}</h2>
                                </div>
                                <button
                                    onClick={pickWinner}
                                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
                                >
                                    Pick Again
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-white/5 flex items-center justify-center mx-auto">
                                    <Dices size={48} className="text-zinc-700" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-xl font-bold text-zinc-400">Ready to Pick?</h2>
                                    <p className="text-sm text-zinc-600">Add at least 2 items to start the random selection.</p>
                                </div>
                                <button
                                    onClick={pickWinner}
                                    disabled={items.length < 2}
                                    className="px-12 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-30 disabled:grayscale"
                                >
                                    Pick a Winner
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="glass-card p-6 border-dashed border-zinc-800">
                        <p className="text-xs text-zinc-500 leading-relaxed italic">
                            "Use this tool for giveaways, deciding what to eat, or picking a team lead. Our algorithm ensures 100% fair and random selection every time."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
