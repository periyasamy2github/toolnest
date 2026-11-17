import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/developer/keycode-event");

export default function KeycodeEventLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
