import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video Watermark - Add Text or Logo to Video Online | ToolNest",
    description: "Protect your videos by adding custom text or logo watermarks online for free. Adjust opacity, position, and size. 100% private and secure.",
    keywords: ["video watermark", "add logo to video", "protect video", "video copyright", "online video tool"],
};

export default function VideoWatermarkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
