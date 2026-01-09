import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Productivity Tools",
    description: "Boost your productivity with our suite of utility tools. Pomodoro timer, world clock, unit converter, QR code generator, and more.",
    keywords: ["pomodoro timer", "world clock", "unit converter", "qr code generator", "stopwatch", "random picker"],
};

export default function UtilsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
