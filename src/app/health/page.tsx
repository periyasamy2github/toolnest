"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Calculator, Activity, Wind, Droplets, Flame, Dumbbell, HeartPulse, Brain, Coins, Hourglass, Moon } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/components/Animations";

const tools = [
    {
        title: "BMI Calculator",
        description: "Calculate your Body Mass Index (BMI).",
        icon: Calculator,
        href: "/health/bmi-calculator",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        title: "Sleep Calculator",
        description: "Calculate sleep cycles and wake up times.",
        icon: Moon,
        href: "/health/sleep-calculator",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
    },
    {
        title: "Body Fat",
        description: "Estimate your body fat percentage using the US Navy method.",
        icon: Activity,
        href: "/health/body-fat-calculator",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        title: "Breathing",
        description: "Relax with guided breathing techniques including Pranayama.",
        icon: Wind,
        href: "/health/breathing-exercise",
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
    },
    {
        title: "Water Intake",
        description: "Calculate your daily water needs based on weight and activity.",
        icon: Droplets,
        href: "/health/water-intake-calculator",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Calories",
        description: "Calculate daily calorie needs and track food intake.",
        icon: Flame,
        href: "/health/calories-calculator",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Fitness Age",
        description: "Discover your fitness age based on lifestyle and health metrics.",
        icon: Dumbbell,
        href: "/health/fitness-age",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
    {
        title: "Health Score",
        description: "Track your daily wellness with a comprehensive health score.",
        icon: HeartPulse,
        href: "/health/health-score",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    },
    {
        title: "Burnout Risk",
        description: "Assess your risk of burnout based on work and lifestyle factors.",
        icon: Brain,
        href: "/health/burnout-risk",
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
    {
        title: "Smoking Cost",
        description: "Calculate how much money you spend on smoking.",
        icon: Coins,
        href: "/health/smoking-cost",
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
    },
    {
        title: "Life Expectancy",
        description: "Estimate your life expectancy based on lifestyle and health factors.",
        icon: Hourglass,
        href: "/health/life-expectancy",
        color: "text-indigo-400",
        bg: "bg-indigo-400/10",
    }
];

export default function HealthToolsPage() {
    return (
        <m.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="space-y-12 pb-24"
        >
            <m.div variants={fadeInUp} className="flex items-center gap-6">
                <Link href="/" className="p-3 rounded-xl glass hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
                    <ArrowLeft className="text-zinc-100" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-gradient">Health Tools</h1>
                    <p className="text-zinc-400 text-lg">Simple and private tools for a healthier lifestyle, right in your browser.</p>
                </div>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {tools.map((tool) => (
                    <m.div key={tool.title} variants={fadeInUp} className="h-full">
                        <Link
                            href={tool.href}
                            className="group relative flex flex-col h-full overflow-hidden glass-card p-6"
                        >
                            <div className={`p-3 rounded-2xl ${tool.bg} ${tool.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-black/20`}>
                                <tool.icon size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-500">
                                {tool.title}
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow group-hover:text-zinc-300 transition-colors duration-500">
                                {tool.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm font-bold text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                                Open Tool <ArrowRight size={16} />
                            </div>
                        </Link>
                    </m.div>
                ))}
            </div>
        </m.div>
    );
}
