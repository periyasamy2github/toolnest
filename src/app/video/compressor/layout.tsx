import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video Compressor - Reduce Video Size Online Without Quality Loss | ToolNest",
    description: "Compress MP4, MOV, and AVI videos online for free. Reduce file size without losing quality. 100% private and secure local processing.",
    keywords: ["video compressor", "compress video", "reduce video size", "shrink video", "online video compressor"],
};

export default function VideoCompressorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
