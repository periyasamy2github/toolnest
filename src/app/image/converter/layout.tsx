import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Converter - Convert JPG, PNG, WEBP, BMP, and GIF | ToolNest",
    description: "Convert images between JPG, PNG, WEBP, BMP, and GIF formats instantly. Free online image converter with no file size limits. 100% private and secure.",
    keywords: ["image converter", "convert jpg to png", "convert png to jpg", "webp converter", "image format converter", "ToolNest", "free image converter"],
    openGraph: {
        title: "Free Online Image Converter | ToolNest",
        description: "Convert images between multiple formats instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
