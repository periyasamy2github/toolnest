import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/gst-calculator" },
    title: "GST Calculator - Inclusive and Exclusive GST Calculation",
    description: "Calculate GST (Goods and Services Tax) inclusive and exclusive amounts online for free. Supports all major tax slabs. 100% private.",
    keywords: ["gst calculator", "tax calculator", "gst inclusive", "gst exclusive", "india tax"],
};

export default function GstLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
