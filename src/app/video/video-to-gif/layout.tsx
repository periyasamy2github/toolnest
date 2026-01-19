import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video to GIF - Create Animated GIFs from Video Online | ToolNest",
    description: "Convert video clips to animated GIFs online for free. Create high-quality GIFs from MP4, AVI, or MOV files. Customize frame rate and size. 100% private.",
    keywords: ["video to gif", "gif maker", "create gif from video", "mp4 to gif", "online gif converter"],
};

export default function VideoToGifLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
