"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    Calculator,
    Plus,
    Trash2,
    RotateCcw,
    Percent,
    Target,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import BackButton from "@/components/BackButton";

interface Assignment {
    id: string;
    name: string;
    score: number;
    maxScore: number;
    weight: number;
}

export default function GradeCalculator() {
    const [assignments, setAssignments] = useState<Assignment[]>([
        { id: "1", name: "Homework 1", score: 90, maxScore: 100, weight: 10 },
        { id: "2", name: "Midterm Exam", score: 85, maxScore: 100, weight: 30 },
    ]);
    const [currentGrade, setCurrentGrade] = useState<number>(0);
    const [totalWeight, setTotalWeight] = useState<number>(0);
    const [targetGrade, setTargetGrade] = useState<number>(90);
    const [requiredGrade, setRequiredGrade] = useState<number | null>(null);

    useEffect(() => {
        calculateGrade();
    }, [assignments, targetGrade]);

    const calculateGrade = () => {
        let weightedSum = 0;
        let weightSum = 0;

        assignments.forEach(a => {
            const percentage = (a.score / a.maxScore) * 100;
            weightedSum += percentage * a.weight;
            weightSum += a.weight;
        });

        setTotalWeight(weightSum);
        const grade = weightSum > 0 ? weightedSum / weightSum : 0;
        setCurrentGrade(grade);

        // Calculate required grade for remaining weight
        const remainingWeight = 100 - weightSum;
        if (remainingWeight > 0) {
            // (current * weightSum + required * remaining) / 100 = target
            // required * remaining = target * 100 - current * weightSum
            const required = (targetGrade * 100 - weightedSum) / remainingWeight;
            setRequiredGrade(required);
        } else {
            setRequiredGrade(null);
        }
    };

    const addAssignment = () => {
        setAssignments([
            ...assignments,
            {
                id: Math.random().toString(36).substr(2, 9),
                name: `Assignment ${assignments.length + 1}`,
                score: 0,
                maxScore: 100,
                weight: 10
            }
        ]);
    };

    const removeAssignment = (id: string) => {
        setAssignments(assignments.filter(a => a.id !== id));
    };

    const updateAssignment = (id: string, field: keyof Assignment, value: string | number) => {
        setAssignments(assignments.map(a =>
            a.id === id ? { ...a, [field]: value } : a
        ));
    };

    const reset = () => {
        setAssignments([{ id: "1", name: "Assignment 1", score: 0, maxScore: 100, weight: 10 }]);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="mb-6"><BackButton /></div>
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Grade <span className="text-blue-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate your weighted grade and see what you need to score.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calculator Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
                        <div className="space-y-4">
                            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2 px-2">
                                <div className="col-span-4">Assignment</div>
                                <div className="col-span-3">Score / Max</div>
                                <div className="col-span-3">Weight (%)</div>
                                <div className="col-span-2"></div>
                            </div>

                            <AnimatePresence mode="popLayout">
                                {assignments.map((assignment) => (
                                    <m.div
                                        key={assignment.id}
                                        layout
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="grid grid-cols-12 gap-4 items-center bg-zinc-900/50 p-2 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors"
                                    >
                                        <div className="col-span-4">
                                            <input
                                                type="text"
                                                value={assignment.name}
                                                onChange={(e) => updateAssignment(assignment.id, "name", e.target.value)}
                                                className="w-full bg-transparent border-none text-white placeholder-zinc-600 focus:ring-0 p-0 text-sm md:text-base font-medium"
                                                placeholder="Name"
                                            />
                                        </div>
                                        <div className="col-span-3 flex items-center gap-2">
                                            <input
                                                type="number"
                                                min="0"
                                                value={assignment.score}
                                                onChange={(e) => updateAssignment(assignment.id, "score", parseFloat(e.target.value) || 0)}
                                                className="w-full bg-zinc-950 border border-white/10 rounded-lg text-white text-sm p-2 focus:ring-2 focus:ring-blue-500/50 outline-none text-center"
                                            />
                                            <span className="text-zinc-500">/</span>
                                            <input
                                                type="number"
                                                min="0"
                                                value={assignment.maxScore}
                                                onChange={(e) => updateAssignment(assignment.id, "maxScore", parseFloat(e.target.value) || 0)}
                                                className="w-full bg-zinc-950 border border-white/10 rounded-lg text-white text-sm p-2 focus:ring-2 focus:ring-blue-500/50 outline-none text-center"
                                            />
                                        </div>
                                        <div className="col-span-3">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={assignment.weight}
                                                onChange={(e) => updateAssignment(assignment.id, "weight", parseFloat(e.target.value) || 0)}
                                                className="w-full bg-zinc-950 border border-white/10 rounded-lg text-white text-sm p-2 focus:ring-2 focus:ring-blue-500/50 outline-none text-center"
                                            />
                                        </div>
                                        <div className="col-span-2 flex justify-end">
                                            <button
                                                onClick={() => removeAssignment(assignment.id)}
                                                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                disabled={assignments.length === 1}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </m.div>
                                ))}
                            </AnimatePresence>

                            <button
                                onClick={addAssignment}
                                className="w-full py-3 mt-4 border border-dashed border-white/20 rounded-xl text-zinc-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <Plus size={18} />
                                Add Assignment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Percent size={120} />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div>
                                <div className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-1">Current Grade</div>
                                <div className="text-6xl font-black tracking-tighter">
                                    {currentGrade.toFixed(1)}%
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                                <div>
                                    <div className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Total Weight</div>
                                    <div className="text-2xl font-bold">{totalWeight}%</div>
                                </div>
                                <div>
                                    <div className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Items</div>
                                    <div className="text-2xl font-bold">{assignments.length}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Target size={20} className="text-blue-400" />
                            What do I need?
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400 text-sm">Target Grade</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={targetGrade}
                                        onChange={(e) => setTargetGrade(parseFloat(e.target.value) || 0)}
                                        className="w-16 bg-zinc-950 border border-white/10 rounded-lg text-white text-sm p-1 text-center focus:ring-1 focus:ring-blue-500"
                                    />
                                    <span className="text-zinc-500">%</span>
                                </div>
                            </div>

                            {requiredGrade !== null ? (
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                    <div className="text-zinc-400 text-xs uppercase tracking-wider mb-1">You need to average</div>
                                    <div className={cn(
                                        "text-3xl font-black",
                                        requiredGrade > 100 ? "text-red-400" : "text-green-400"
                                    )}>
                                        {requiredGrade.toFixed(1)}%
                                    </div>
                                    <div className="text-zinc-500 text-xs mt-1">
                                        on remaining {100 - totalWeight}%
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-zinc-500 text-sm">
                                    Total weight is 100%. <br /> No remaining assignments.
                                </div>
                            )}
                        </div>

                        <button
                            onClick={reset}
                            className="w-full py-3 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2 font-medium"
                        >
                            <RotateCcw size={18} />
                            Reset Calculator
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
