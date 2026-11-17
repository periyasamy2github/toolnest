import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/compressor" },
    title: "Online Image Compressor - Reduce Image Size Without Quality Loss",
    description: "Compress JPG, PNG, and WebP images online for free. Reduce file size by up to 90% while maintaining high quality. Fast, secure, and 100% private.",
    keywords: ["image compressor", "reduce image size", "compress png", "compress jpg", "online image optimizer", "WebToolNest", "free image compression"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Image Compressor",
        description: "Reduce image file size by up to 90% without losing quality.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
