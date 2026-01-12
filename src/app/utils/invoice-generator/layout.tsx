import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Invoice Generator - Create Professional PDF Invoices | ToolNest",
    description: "Generate professional, customizable invoices with logo upload, auto-calculations, and instant PDF export. Free, private, and no signup required.",
    keywords: ["invoice generator", "free invoice maker", "PDF invoice", "create invoice online", "invoice template", "business invoice", "ToolNest"],
    openGraph: {
        title: "Invoice Generator | ToolNest",
        description: "Create professional invoices with logo, auto-calculations, and PDF export. 100% free and private.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
