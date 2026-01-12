import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Productivity & Utility Tools - QR Generator, Unit Converter, and More Online",
    description: "ToolNest offers a suite of productivity utility tools. Pomodoro timer, world clock, unit converter, QR code generator, and more. 100% private and browser-based.",
    keywords: [
        "pomodoro timer", "world clock", "unit converter", "qr code generator",
        "stopwatch", "random picker", "free utility tools", "online productivity tools",
        "ToolNest utility tools"
    ],
};

export default function UtilsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
