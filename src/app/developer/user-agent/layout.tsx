import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/developer/user-agent");

export default function UserAgentParserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
