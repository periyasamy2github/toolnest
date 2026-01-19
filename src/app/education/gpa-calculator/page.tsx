"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
    Calculator,
    Plus,
    Trash2,
    RotateCcw,
    GraduationCap,
    Save,
    Download,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Course {
    id: string;
    name: string;
    grade: string;
    credits: number;
}

const GRADE_POINTS: Record<string, number> = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0
};

export default function GPACalculator() {
    const [courses, setCourses] = useState<Course[]>([
        { id: "1", name: "Course 1", grade: "A", credits: 3 },
        { id: "2", name: "Course 2", grade: "B+", credits: 3 },
        { id: "3", name: "Course 3", grade: "A-", credits: 4 },
    ]);
    const [gpa, setGpa] = useState<number>(0);
    const [totalCredits, setTotalCredits] = useState<number>(0);

    useEffect(() => {
        calculateGPA();
    }, [courses]);

    const calculateGPA = () => {
        let totalPoints = 0;
        let credits = 0;

        courses.forEach(course => {
            const points = GRADE_POINTS[course.grade] || 0;
            totalPoints += points * course.credits;
            credits += course.credits;
        });

        setTotalCredits(credits);
        setGpa(credits > 0 ? totalPoints / credits : 0);
    };

    const addCourse = () => {
        setCourses([
            ...courses,
            {
                id: Math.random().toString(36).substr(2, 9),
                name: `Course ${courses.length + 1}`,
                grade: "A",
                credits: 3
            }
        ]);
    };

    const removeCourse = (id: string) => {
        setCourses(courses.filter(c => c.id !== id));
    };

    const updateCourse = (id: string, field: keyof Course, value: string | number) => {
        setCourses(courses.map(c =>
            c.id === id ? { ...c, [field]: value } : c
        ));
    };

    const reset = () => {
        setCourses([{ id: "1", name: "Course 1", grade: "A", credits: 3 }]);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    GPA <span className="text-indigo-500">Calculator</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    Calculate your Grade Point Average easily.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calculator Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
                        <div className="space-y-4">
                            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-zinc-500 uppercase tracking-wider mb-2 px-2">
                                <div className="col-span-5 md:col-span-6">Course Name</div>
                                <div className="col-span-3 md:col-span-2">Grade</div>
                                <div className="col-span-3 md:col-span-2">Credits</div>
                                <div className="col-span-1"></div>
                            </div>

                            <AnimatePresence mode="popLayout">
                                {courses.map((course) => (
                                    <m.div
                                        key={course.id}
                                        layout
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="grid grid-cols-12 gap-4 items-center bg-zinc-900/50 p-2 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors"
                                    >
                                        <div className="col-span-5 md:col-span-6">
                                            <input
                                                type="text"
                                                value={course.name}
                                                onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                                                className="w-full bg-transparent border-none text-white placeholder-zinc-600 focus:ring-0 p-0 text-sm md:text-base font-medium"
                                                placeholder="Course Name"
                                            />
                                        </div>
                                        <div className="col-span-3 md:col-span-2">
                                            <select
                                                value={course.grade}
                                                onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                                                className="w-full bg-zinc-950 border border-white/10 rounded-lg text-white text-sm p-2 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none"
                                            >
                                                {Object.keys(GRADE_POINTS).map(grade => (
                                                    <option key={grade} value={grade}>{grade}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-3 md:col-span-2">
                                            <input
                                                type="number"
                                                min="0"
                                                max="10"
                                                step="0.5"
                                                value={course.credits}
                                                onChange={(e) => updateCourse(course.id, "credits", parseFloat(e.target.value) || 0)}
                                                className="w-full bg-zinc-950 border border-white/10 rounded-lg text-white text-sm p-2 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none"
                                            />
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            <button
                                                onClick={() => removeCourse(course.id)}
                                                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                disabled={courses.length === 1}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </m.div>
                                ))}
                            </AnimatePresence>

                            <button
                                onClick={addCourse}
                                className="w-full py-3 mt-4 border border-dashed border-white/20 rounded-xl text-zinc-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                            >
                                <Plus size={18} />
                                Add Course
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <GraduationCap size={120} />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div>
                                <div className="text-indigo-100 text-sm font-medium uppercase tracking-wider mb-1">Cumulative GPA</div>
                                <div className="text-6xl font-black tracking-tighter">
                                    {gpa.toFixed(2)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                                <div>
                                    <div className="text-indigo-100 text-xs font-medium uppercase tracking-wider mb-1">Total Credits</div>
                                    <div className="text-2xl font-bold">{totalCredits}</div>
                                </div>
                                <div>
                                    <div className="text-indigo-100 text-xs font-medium uppercase tracking-wider mb-1">Courses</div>
                                    <div className="text-2xl font-bold">{courses.length}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <AlertCircle size={20} className="text-indigo-400" />
                            Grade Scale
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(GRADE_POINTS).slice(0, 8).map(([grade, points]) => (
                                <div key={grade} className="flex justify-between p-2 rounded-lg bg-white/5">
                                    <span className="font-bold text-white">{grade}</span>
                                    <span className="text-zinc-400">{points.toFixed(1)}</span>
                                </div>
                            ))}
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
