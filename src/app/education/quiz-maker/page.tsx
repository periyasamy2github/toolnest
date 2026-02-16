"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Play, CheckCircle2, XCircle, Trophy, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

type Question = {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number; // Index of correct option
};

export default function QuizMaker() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [mode, setMode] = useState<"create" | "play" | "result">("create");

    // Play State
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // Form State
    const [qText, setQText] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correct, setCorrect] = useState(0);

    const addQuestion = () => {
        if (!qText || options.some(o => !o)) return;
        setQuestions([
            ...questions,
            {
                id: crypto.randomUUID(),
                text: qText,
                options: [...options],
                correctAnswer: correct
            }
        ]);
        setQText("");
        setOptions(["", "", "", ""]);
        setCorrect(0);
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const startQuiz = () => {
        if (questions.length === 0) return;
        setMode("play");
        setCurrentQ(0);
        setScore(0);
        setSelected(null);
        setShowFeedback(false);
    };

    const handleAnswer = (index: number) => {
        if (showFeedback) return;
        setSelected(index);
        setShowFeedback(true);
        if (index === questions[currentQ].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(prev => prev + 1);
            setSelected(null);
            setShowFeedback(false);
        } else {
            setMode("result");
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Quiz <span className="text-red-500">Maker</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Create custom quizzes and test your knowledge.
                </p>
            </div>

            {mode === "create" ? (
                <div className="space-y-8">
                    {/* Creator */}
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400">Question</label>
                                <input
                                    type="text"
                                    value={qText}
                                    onChange={(e) => setQText(e.target.value)}
                                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-red-500/50 outline-none"
                                    placeholder="What is the powerhouse of the cell?"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {options.map((opt, i) => (
                                    <div key={i} className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-400 flex justify-between">
                                            Option {i + 1}
                                            <button
                                                onClick={() => setCorrect(i)}
                                                className={cn(
                                                    "text-xs px-2 py-0.5 rounded-full transition-colors",
                                                    correct === i ? "bg-green-500 text-white" : "bg-zinc-800 text-zinc-500 hover:text-white"
                                                )}
                                            >
                                                {correct === i ? "Correct Answer" : "Mark Correct"}
                                            </button>
                                        </label>
                                        <input
                                            type="text"
                                            value={opt}
                                            onChange={(e) => {
                                                const newOpts = [...options];
                                                newOpts[i] = e.target.value;
                                                setOptions(newOpts);
                                            }}
                                            className={cn(
                                                "w-full bg-zinc-950 border rounded-xl p-4 text-white focus:ring-2 outline-none transition-colors",
                                                correct === i ? "border-green-500/50 focus:ring-green-500/50" : "border-white/10 focus:ring-red-500/50"
                                            )}
                                            placeholder={`Option ${i + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={addQuestion}
                            disabled={!qText || options.some(o => !o)}
                            className="w-full py-4 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-bold shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                        >
                            <Plus size={20} /> Add Question
                        </button>
                    </div>

                    {/* List */}
                    {questions.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white">Quiz Questions ({questions.length})</h3>
                                <button
                                    onClick={startQuiz}
                                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                                >
                                    <Play size={18} /> Start Quiz
                                </button>
                            </div>
                            <div className="space-y-4">
                                {questions.map((q, i) => (
                                    <div key={q.id} className="bg-zinc-900 border border-white/10 rounded-xl p-4 flex items-center justify-between group">
                                        <div>
                                            <div className="font-medium text-white mb-1">
                                                <span className="text-zinc-500 mr-2">{i + 1}.</span>
                                                {q.text}
                                            </div>
                                            <div className="text-sm text-zinc-500">
                                                Answer: <span className="text-green-400">{q.options[q.correctAnswer]}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeQuestion(q.id)}
                                            className="p-2 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : mode === "play" ? (
                /* Play Mode */
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setMode("create")}
                            className="p-2 text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <X size={20} /> Exit Quiz
                        </button>
                        <div className="text-zinc-400 font-mono">
                            Question {currentQ + 1} / {questions.length}
                        </div>
                    </div>

                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white text-center">
                            {questions[currentQ].text}
                        </h2>

                        <div className="space-y-3">
                            {questions[currentQ].options.map((opt, i) => {
                                const isSelected = selected === i;
                                const isCorrect = i === questions[currentQ].correctAnswer;
                                let stateClass = "bg-zinc-950 border-white/10 hover:bg-zinc-800";

                                if (showFeedback) {
                                    if (isCorrect) stateClass = "bg-green-500/20 border-green-500 text-green-400";
                                    else if (isSelected) stateClass = "bg-red-500/20 border-red-500 text-red-400";
                                    else stateClass = "bg-zinc-950 border-white/10 opacity-50";
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(i)}
                                        disabled={showFeedback}
                                        className={cn(
                                            "w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between",
                                            stateClass
                                        )}
                                    >
                                        <span className={cn("font-medium", !showFeedback && "text-white")}>{opt}</span>
                                        {showFeedback && isCorrect && <CheckCircle2 size={20} className="text-green-500" />}
                                        {showFeedback && isSelected && !isCorrect && <XCircle size={20} className="text-red-500" />}
                                    </button>
                                );
                            })}
                        </div>

                        {showFeedback && (
                            <div className="flex justify-end animate-in fade-in slide-in-from-bottom duration-300">
                                <button
                                    onClick={nextQuestion}
                                    className="px-8 py-3 bg-white text-black hover:bg-zinc-200 rounded-xl font-bold transition-colors"
                                >
                                    {currentQ === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* Result Mode */
                <div className="max-w-md mx-auto text-center space-y-8 animate-in zoom-in duration-500">
                    <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
                        <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto text-yellow-500">
                            <Trophy size={48} />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-white">Quiz Completed!</h2>
                            <p className="text-zinc-400">You scored</p>
                            <div className="text-6xl font-black text-white">
                                {score} <span className="text-2xl text-zinc-500">/ {questions.length}</span>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <button
                                onClick={() => setMode("create")}
                                className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors font-medium flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={20} /> Create New Quiz
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
