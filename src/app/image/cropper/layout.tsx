import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Cropper - Crop, Rotate, and Flip Images Online | ToolNest",
    description: "Crop images to exact dimensions or aspect ratios. Rotate, flip, and adjust images easily in your browser. No upload required - 100% private and secure.",
    keywords: ["image cropper", "crop image online", "rotate image", "flip image", "photo cropper", "ToolNest", "free image editor"],
    openGraph: {
        title: "Free Online Image Cropper | ToolNest",
        description: "Crop, rotate, and flip images instantly with our free online tool.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
