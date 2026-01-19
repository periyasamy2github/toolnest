import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video Converter - Convert MP4, AVI, WEBM Online | ToolNest",
    description: "Convert video files between formats like MP4, WEBM, AVI, and MOV instantly. Free online video converter with no file size limit. 100% private.",
    keywords: ["video converter", "convert mp4 to avi", "video format converter", "online video converter", "webm converter"],
};

export default function VideoConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
