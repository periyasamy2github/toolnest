import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/filters" },
    title: "Image Filters - Apply Effects and Adjustments Online",
    description: "Enhance your photos with professional filters and adjustments. Control brightness, contrast, saturation, blur, and more. 100% private and secure online photo editor.",
    keywords: ["image filters", "photo effects", "online photo editor", "adjust brightness", "image saturation", "WebToolNest", "instagram filters online"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Image Filters & Effects",
        description: "Apply professional filters and adjustments to your photos instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
