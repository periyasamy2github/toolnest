import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/periodic-table" },
    title: "Interactive Periodic Table - Explore Chemical Elements",
    description: "Explore the chemical elements with our interactive periodic table. Get detailed information about atomic mass, electron configuration, and more. 100% private.",
    keywords: ["periodic table", "chemical elements", "chemistry tool", "atomic mass", "WebToolNest"],
};

export default function PeriodicTableLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
