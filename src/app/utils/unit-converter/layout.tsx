import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Unit Converter - Length, Weight, Temp and More | ToolNest",
    description: "Convert between different units of measurement instantly. Supports length, weight, temperature, volume, area, and more. 100% private and accurate.",
    keywords: ["unit converter", "measurement converter", "length converter", "weight converter", "ToolNest", "utility tools"],
    openGraph: {
        title: "Online Unit Converter | ToolNest",
        description: "Convert any unit of measurement quickly and accurately.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
