"use client";

import { ArrowLeft, Activity, Calculator, Wind, Droplets, Flame } from "lucide-react";
import Link from "next/link";

const tools = [
    {
        title: "BMI Calculator",
        description: "Calculate your Body Mass Index (BMI) using Global or Asian/Indian standards.",
        icon: Calculator,
        href: "/health/bmi-calculator",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Body Fat Calculator",
        description: "Estimate your body fat percentage using the US Navy method.",
        icon: Activity,
        href: "/health/body-fat-calculator",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Breathing Exercise",
        description: "Relax with guided breathing techniques including Pranayama.",
        icon: Wind,
        href: "/health/breathing-exercise",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
    },
    {
        title: "Water Intake Calculator",
        description: "Calculate your daily water needs based on weight and activity.",
        icon: Droplets,
        href: "/health/water-intake-calculator",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Calories Calculator",
        description: "Calculate daily calorie needs and track food intake.",
        icon: Flame,
        href: "/health/calories-calculator",
        color: "text-green-400",
        bg: "bg-green-400/10",
    }
];

export default function HealthToolsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <ArrowLeft className="text-zinc-400" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100">Health Tools</h1>
                    <p className="text-zinc-400">Tools for a healthier lifestyle.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.title}
                        href={tool.href}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 hover:bg-zinc-900/80 transition-all duration-300 hover:border-white/20 hover:shadow-xl"
                    >
                        <div className={`p-3 rounded-xl ${tool.bg} ${tool.color} w-fit mb-4`}>
                            <tool.icon size={24} />
                        </div>

                        <h2 className="text-xl font-semibold mb-2 text-zinc-100 group-hover:text-white">
                            {tool.title}
                        </h2>
                        <p className="text-sm text-zinc-400 group-hover:text-zinc-300">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
