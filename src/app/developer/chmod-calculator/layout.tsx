import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/developer/chmod-calculator");

export default function ChmodCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
