import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/video/cropper" },
    title: "Video Cropper - Crop and Resize Video Online",
    description: "Crop video dimensions and change aspect ratio online for free. Easy-to-use online video editor. 100% private and secure.",
    keywords: ["video cropper", "crop video", "resize video", "video aspect ratio", "online video editor"]
};

export default function VideoCropperLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
