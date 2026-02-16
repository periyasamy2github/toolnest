"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Clock, Copy, Check, Info } from "lucide-react";
import Link from "next/link";
import cronstrue from "cronstrue";
import BackButton from "@/components/BackButton";
import { cn } from "@/lib/utils";

export default function CronGeneratorPage() {
    const [cron, setCron] = useState("* * * * *");
    const [desc, setDesc] = useState("");
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("minutes");

    // State for simple mode
    const [minute, setMinute] = useState("*");
    const [hour, setHour] = useState("*");
    const [day, setDay] = useState("*");
    const [month, setMonth] = useState("*");
    const [week, setWeek] = useState("*");

    useEffect(() => {
        const newCron = `${minute} ${hour} ${day} ${month} ${week}`;
        setCron(newCron);
        try {
            setDesc(cronstrue.toString(newCron));
        } catch (e) {
            setDesc("Invalid cron expression");
        }
    }, [minute, hour, day, month, week]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(cron);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const TabButton = ({ id, label }: { id: string, label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                activeTab === id ? "bg-blue-500/20 text-blue-400" : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
            )}
        >
            {label}
        </button>
    );

    const SelectionGrid = ({
        total,
        selected,
        onChange,
        start = 0,
        labels
    }: {
        total: number,
        selected: string,
        onChange: (val: string) => void,
        start?: number,
        labels?: string[]
    }) => {
        const isAll = selected === "*";
        const selectedValues = isAll ? [] : selected.split(",").map(Number);

        const toggle = (val: number) => {
            if (isAll) {
                onChange(val.toString());
            } else {
                if (selectedValues.includes(val)) {
                    const newVals = selectedValues.filter(v => v !== val);
                    onChange(newVals.length ? newVals.sort((a, b) => a - b).join(",") : "*");
                } else {
                    const newVals = [...selectedValues, val].sort((a, b) => a - b);
                    onChange(newVals.join(","));
                }
            }
        };

        return (
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onChange("*")}
                        className={cn(
                            "px-3 py-1 text-xs font-medium rounded-md border transition-colors",
                            isAll ? "bg-blue-500 border-blue-500 text-white" : "border-white/10 text-zinc-400 hover:bg-white/5"
                        )}
                    >
                        Every {activeTab.slice(0, -1)} (*)
                    </button>
                </div>
                <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
                    {Array.from({ length: total }).map((_, i) => {
                        const val = i + start;
                        const isSelected = !isAll && selectedValues.includes(val);
                        return (
                            <button
                                key={val}
                                onClick={() => toggle(val)}
                                className={cn(
                                    "h-8 rounded text-xs font-medium transition-colors border",
                                    isSelected
                                        ? "bg-blue-600 border-blue-600 text-white"
                                        : "bg-zinc-900 border-white/10 text-zinc-400 hover:border-zinc-700"
                                )}
                            >
                                {labels ? labels[i] : val}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4">
                <BackButton />
                <div>
                    <h1 className="text-4xl font-black text-gradient">Cron Job Generator</h1>
                    <p className="text-zinc-400 text-lg">Create and debug cron schedules visually.</p>
                </div>
            </div>

            {/* Result Card */}
            <div className="glass-card p-8 flex flex-col items-center text-center space-y-6 bg-gradient-to-b from-blue-900/20 to-transparent border-blue-500/20">
                <div className="space-y-2">
                    <div className="text-sm font-medium text-blue-400 uppercase tracking-wider">Next Run</div>
                    <div className="text-2xl md:text-3xl font-medium text-zinc-200">
                        "{desc}"
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full max-w-2xl">
                    <div className="flex-1 bg-zinc-950 border border-white/10 rounded-xl p-4 font-mono text-2xl text-center tracking-widest text-white shadow-inner">
                        {cron}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className="p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors shadow-lg shadow-blue-600/20"
                    >
                        {copied ? <Check size={24} /> : <Copy size={24} />}
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div className="glass-card overflow-hidden">
                <div className="flex border-b border-white/10 p-2 gap-2 overflow-x-auto">
                    <TabButton id="minutes" label="Minutes" />
                    <TabButton id="hours" label="Hours" />
                    <TabButton id="day" label="Day" />
                    <TabButton id="month" label="Month" />
                    <TabButton id="week" label="Week" />
                </div>

                <div className="p-8 min-h-[300px]">
                    {activeTab === "minutes" && (
                        <SelectionGrid total={60} selected={minute} onChange={setMinute} />
                    )}
                    {activeTab === "hours" && (
                        <SelectionGrid total={24} selected={hour} onChange={setHour} />
                    )}
                    {activeTab === "day" && (
                        <SelectionGrid total={31} start={1} selected={day} onChange={setDay} />
                    )}
                    {activeTab === "month" && (
                        <SelectionGrid
                            total={12}
                            start={1}
                            selected={month}
                            onChange={setMonth}
                            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                        />
                    )}
                    {activeTab === "week" && (
                        <SelectionGrid
                            total={7}
                            selected={week}
                            onChange={setWeek}
                            labels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                        />
                    )}
                </div>
            </div>

            {/* Quick Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 space-y-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Info size={18} className="text-blue-400" />
                        Common Examples
                    </h3>
                    <div className="space-y-2">
                        {[
                            { l: "Every minute", c: "* * * * *" },
                            { l: "Every hour", c: "0 * * * *" },
                            { l: "Every day at midnight", c: "0 0 * * *" },
                            { l: "Every Monday", c: "0 0 * * 1" },
                        ].map((ex) => (
                            <button
                                key={ex.c}
                                onClick={() => {
                                    const [m, h, d, mo, w] = ex.c.split(" ");
                                    setMinute(m); setHour(h); setDay(d); setMonth(mo); setWeek(w);
                                }}
                                className="w-full flex justify-between items-center p-3 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 transition-colors border border-white/5 text-sm"
                            >
                                <span className="text-zinc-300">{ex.l}</span>
                                <span className="font-mono text-blue-400">{ex.c}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
