import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/developer/url-parser");

export default function UrlParserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
