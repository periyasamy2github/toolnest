import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Image Compressor - Reduce Image Size Without Quality Loss | ToolNest",
    description: "Compress JPG, PNG, and WebP images online for free. Reduce file size by up to 90% while maintaining high quality. Fast, secure, and 100% private.",
    keywords: ["image compressor", "reduce image size", "compress png", "compress jpg", "online image optimizer", "ToolNest", "free image compression"],
    openGraph: {
        title: "Online Image Compressor | ToolNest",
        description: "Reduce image file size by up to 90% without losing quality.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
