"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Search, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

type Element = {
    number: number;
    symbol: string;
    name: string;
    weight: number;
    category: string;
    summary: string;
    xpos: number;
    ypos: number;
};

// Simplified dataset for demo purposes. In a real app, this would be a full JSON import.
const elements: Element[] = [
    { number: 1, symbol: "H", name: "Hydrogen", weight: 1.008, category: "diatomic nonmetal", xpos: 1, ypos: 1, summary: "Hydrogen is a chemical element with symbol H and atomic number 1." },
    { number: 2, symbol: "He", name: "Helium", weight: 4.0026, category: "noble gas", xpos: 18, ypos: 1, summary: "Helium is a chemical element with symbol He and atomic number 2." },
    { number: 3, symbol: "Li", name: "Lithium", weight: 6.94, category: "alkali metal", xpos: 1, ypos: 2, summary: "Lithium is a chemical element with symbol Li and atomic number 3." },
    { number: 4, symbol: "Be", name: "Beryllium", weight: 9.0122, category: "alkaline earth metal", xpos: 2, ypos: 2, summary: "Beryllium is a chemical element with symbol Be and atomic number 4." },
    { number: 5, symbol: "B", name: "Boron", weight: 10.81, category: "metalloid", xpos: 13, ypos: 2, summary: "Boron is a chemical element with symbol B and atomic number 5." },
    { number: 6, symbol: "C", name: "Carbon", weight: 12.011, category: "polyatomic nonmetal", xpos: 14, ypos: 2, summary: "Carbon is a chemical element with symbol C and atomic number 6." },
    { number: 7, symbol: "N", name: "Nitrogen", weight: 14.007, category: "diatomic nonmetal", xpos: 15, ypos: 2, summary: "Nitrogen is a chemical element with symbol N and atomic number 7." },
    { number: 8, symbol: "O", name: "Oxygen", weight: 15.999, category: "diatomic nonmetal", xpos: 16, ypos: 2, summary: "Oxygen is a chemical element with symbol O and atomic number 8." },
    { number: 9, symbol: "F", name: "Fluorine", weight: 18.998, category: "diatomic nonmetal", xpos: 17, ypos: 2, summary: "Fluorine is a chemical element with symbol F and atomic number 9." },
    { number: 10, symbol: "Ne", name: "Neon", weight: 20.180, category: "noble gas", xpos: 18, ypos: 2, summary: "Neon is a chemical element with symbol Ne and atomic number 10." },
    // ... Adding more representative elements for layout structure
    { number: 11, symbol: "Na", name: "Sodium", weight: 22.990, category: "alkali metal", xpos: 1, ypos: 3, summary: "Sodium is a chemical element with symbol Na and atomic number 11." },
    { number: 12, symbol: "Mg", name: "Magnesium", weight: 24.305, category: "alkaline earth metal", xpos: 2, ypos: 3, summary: "Magnesium is a chemical element with symbol Mg and atomic number 12." },
    { number: 13, symbol: "Al", name: "Aluminium", weight: 26.982, category: "post-transition metal", xpos: 13, ypos: 3, summary: "Aluminium is a chemical element with symbol Al and atomic number 13." },
    { number: 14, symbol: "Si", name: "Silicon", weight: 28.085, category: "metalloid", xpos: 14, ypos: 3, summary: "Silicon is a chemical element with symbol Si and atomic number 14." },
    { number: 19, symbol: "K", name: "Potassium", weight: 39.098, category: "alkali metal", xpos: 1, ypos: 4, summary: "Potassium is a chemical element with symbol K and atomic number 19." },
    { number: 20, symbol: "Ca", name: "Calcium", weight: 40.078, category: "alkaline earth metal", xpos: 2, ypos: 4, summary: "Calcium is a chemical element with symbol Ca and atomic number 20." },
    { number: 26, symbol: "Fe", name: "Iron", weight: 55.845, category: "transition metal", xpos: 8, ypos: 4, summary: "Iron is a chemical element with symbol Fe and atomic number 26." },
    { number: 29, symbol: "Cu", name: "Copper", weight: 63.546, category: "transition metal", xpos: 11, ypos: 4, summary: "Copper is a chemical element with symbol Cu and atomic number 29." },
    { number: 47, symbol: "Ag", name: "Silver", weight: 107.87, category: "transition metal", xpos: 11, ypos: 5, summary: "Silver is a chemical element with symbol Ag and atomic number 47." },
    { number: 79, symbol: "Au", name: "Gold", weight: 196.97, category: "transition metal", xpos: 11, ypos: 6, summary: "Gold is a chemical element with symbol Au and atomic number 79." },
];

const categories: Record<string, string> = {
    "diatomic nonmetal": "bg-blue-500",
    "noble gas": "bg-purple-500",
    "alkali metal": "bg-red-500",
    "alkaline earth metal": "bg-orange-500",
    "metalloid": "bg-teal-500",
    "polyatomic nonmetal": "bg-indigo-500",
    "post-transition metal": "bg-green-500",
    "transition metal": "bg-yellow-500",
    "lanthanide": "bg-pink-500",
    "actinide": "bg-rose-500",
};

export default function PeriodicTable() {
    const [selected, setSelected] = useState<Element | null>(null);
    const [search, setSearch] = useState("");

    const filtered = elements.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.symbol.toLowerCase().includes(search.toLowerCase()) ||
        e.number.toString().includes(search)
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Periodic <span className="text-cyan-500">Table</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Explore chemical elements and their properties.
                </p>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 outline-none"
                    placeholder="Search by name, symbol, or number..."
                />
            </div>

            {/* Table Grid */}
            <div className="overflow-x-auto pb-8">
                <div className="min-w-[1000px] grid grid-cols-[repeat(18,minmax(0,1fr))] gap-2 p-4 bg-zinc-900/30 border border-white/5 rounded-3xl backdrop-blur-sm">
                    {filtered.map((el) => (
                        <button
                            key={el.number}
                            onClick={() => setSelected(el)}
                            className={cn(
                                "aspect-square rounded-lg p-1 flex flex-col items-center justify-center transition-all hover:scale-110 hover:z-10 hover:shadow-lg hover:shadow-cyan-500/20",
                                categories[el.category] || "bg-zinc-800",
                                "bg-opacity-20 hover:bg-opacity-40 border border-white/10"
                            )}
                            style={{
                                gridColumn: el.xpos,
                                gridRow: el.ypos,
                            }}
                        >
                            <span className="text-[10px] text-zinc-400 self-start ml-1">{el.number}</span>
                            <span className="text-lg font-bold text-white">{el.symbol}</span>
                            <span className="text-[8px] text-zinc-400 truncate w-full text-center">{el.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4">
                {Object.entries(categories).map(([cat, color]) => (
                    <div key={cat} className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full", color)} />
                        <span className="text-xs text-zinc-400 capitalize">{cat}</span>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <m.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 p-2 bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex gap-6 mb-6">
                                <div className={cn(
                                    "w-32 h-32 rounded-2xl flex flex-col items-center justify-center border border-white/10",
                                    categories[selected.category] || "bg-zinc-800",
                                    "bg-opacity-20"
                                )}>
                                    <span className="text-xl text-zinc-400 mb-1">{selected.number}</span>
                                    <span className="text-5xl font-bold text-white mb-1">{selected.symbol}</span>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-1">{selected.name}</h2>
                                    <div className="text-cyan-400 font-mono mb-2">{selected.weight} u</div>
                                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-xs text-zinc-300 capitalize border border-white/10">
                                        {selected.category}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                    <h3 className="text-sm font-medium text-zinc-400 mb-2 flex items-center gap-2">
                                        <Info size={16} /> Description
                                    </h3>
                                    <p className="text-zinc-300 leading-relaxed">
                                        {selected.summary}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Electron Config</div>
                                        <div className="text-white font-mono text-sm">Coming Soon</div>
                                    </div>
                                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Phase</div>
                                        <div className="text-white font-mono text-sm">Solid</div>
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
