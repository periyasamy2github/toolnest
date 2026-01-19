import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Time Calculator - Add or Subtract Time and Durations | ToolNest",
    description: "Add or subtract time durations, calculate the difference between two times, and convert between different time units. 100% private.",
    keywords: ["time calculator", "calculate time", "time duration", "time difference", "ToolNest"],
};

export default function TimeCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
