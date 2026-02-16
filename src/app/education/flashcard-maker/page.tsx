"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Play, RotateCcw, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

type Flashcard = {
    id: string;
    question: string;
    answer: string;
};

export default function FlashcardMaker() {
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [mode, setMode] = useState<"create" | "study">("create");
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    // Form State
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const addCard = () => {
        if (!question || !answer) return;
        setCards([...cards, { id: crypto.randomUUID(), question, answer }]);
        setQuestion("");
        setAnswer("");
    };

    const removeCard = (id: string) => {
        setCards(cards.filter(c => c.id !== id));
    };

    const startStudy = () => {
        if (cards.length === 0) return;
        setMode("study");
        setCurrentCard(0);
        setIsFlipped(false);
    };

    const nextCard = () => {
        if (currentCard < cards.length - 1) {
            setCurrentCard(prev => prev + 1);
            setIsFlipped(false);
        }
    };

    const prevCard = () => {
        if (currentCard > 0) {
            setCurrentCard(prev => prev - 1);
            setIsFlipped(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Flashcard <span className="text-yellow-500">Maker</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Create, manage, and study flashcards.
                </p>
            </div>

            {mode === "create" ? (
                <div className="space-y-8">
                    {/* Creator Input */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Question (Front)</label>
                                <textarea
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full h-32 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none resize-none"
                                    placeholder="What is the capital of France?"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Answer (Back)</label>
                                <textarea
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="w-full h-32 bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-yellow-500/50 outline-none resize-none"
                                    placeholder="Paris"
                                />
                            </div>
                        </div>
                        <button
                            onClick={addCard}
                            disabled={!question || !answer}
                            className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-xl transition-colors font-bold shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
                        >
                            <Plus size={20} /> Add Flashcard
                        </button>
                    </div>

                    {/* Card List */}
                    {cards.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Your Deck ({cards.length})</h3>
                                <button
                                    onClick={startStudy}
                                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                                >
                                    <Play size={18} /> Start Studying
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {cards.map((card) => (
                                    <div key={card.id} className="bg-zinc-900 border border-white/10 rounded-xl p-4 relative group">
                                        <button
                                            onClick={() => removeCard(card.id)}
                                            className="absolute top-2 right-2 p-2 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="font-medium text-white mb-2 pr-8 truncate">{card.question}</div>
                                        <div className="text-sm text-zinc-500 truncate">{card.answer}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* Study Mode */
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setMode("create")}
                            className="p-2 text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <X size={20} /> Exit Study Mode
                        </button>
                        <div className="text-zinc-400 font-mono">
                            {currentCard + 1} / {cards.length}
                        </div>
                    </div>

                    <div className="relative h-80 w-full perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
                        <m.div
                            className="w-full h-full relative preserve-3d cursor-pointer transition-all duration-500"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            {/* Front */}
                            <div className="absolute w-full h-full backface-hidden bg-zinc-900 border border-white/10 rounded-3xl p-8 flex items-center justify-center text-center shadow-2xl">
                                <div className="space-y-4">
                                    <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Question</span>
                                    <h2 className="text-3xl font-bold text-white">{cards[currentCard].question}</h2>
                                    <p className="text-sm text-zinc-500 mt-4">(Click to flip)</p>
                                </div>
                            </div>

                            {/* Back */}
                            <div
                                className="absolute w-full h-full backface-hidden bg-yellow-500 text-black rounded-3xl p-8 flex items-center justify-center text-center shadow-2xl"
                                style={{ transform: "rotateY(180deg)" }}
                            >
                                <div className="space-y-4">
                                    <span className="text-xs font-bold text-black/60 uppercase tracking-widest">Answer</span>
                                    <h2 className="text-3xl font-bold">{cards[currentCard].answer}</h2>
                                </div>
                            </div>
                        </m.div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={prevCard}
                            disabled={currentCard === 0}
                            className="p-4 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => setIsFlipped(!isFlipped)}
                            className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors font-medium"
                        >
                            Flip Card
                        </button>
                        <button
                            onClick={nextCard}
                            disabled={currentCard === cards.length - 1}
                            className="p-4 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
