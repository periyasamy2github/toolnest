import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Filters - Apply Effects & Adjustments Online | ToolNest",
    description: "Enhance your photos with professional filters and adjustments. Control brightness, contrast, saturation, blur, and more. Free online photo editor.",
    keywords: ["image filters", "photo effects", "online photo editor", "adjust brightness", "image saturation", "ToolNest", "instagram filters online"],
    openGraph: {
        title: "Online Image Filters & Effects | ToolNest",
        description: "Apply professional filters and adjustments to your photos instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
