import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/unit-converter" },
    title: "Online Unit Converter - Length, Weight, Temp and More",
    description: "Convert between different units of measurement instantly. Supports length, weight, temperature, volume, area, and more. 100% private and accurate.",
    keywords: ["unit converter", "measurement converter", "length converter", "weight converter", "WebToolNest", "utility tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Unit Converter",
        description: "Convert any unit of measurement quickly and accurately.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
