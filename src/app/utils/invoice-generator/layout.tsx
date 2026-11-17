import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/invoice-generator" },
    title: "Invoice Generator - Create Professional PDF Invoices Online",
    description: "Generate professional, customizable invoices with logo upload, auto-calculations, and instant PDF export. Free, 100% private, and no signup required.",
    keywords: ["invoice generator", "free invoice maker", "PDF invoice", "create invoice online", "invoice template", "business invoice", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Invoice Generator",
        description: "Create professional invoices with logo, auto-calculations, and PDF export. 100% free and private.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
