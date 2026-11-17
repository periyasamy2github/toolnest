import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/matrix-calculator" },
    title: "Matrix Calculator - Perform Matrix Operations Online",
    description: "Perform addition, subtraction, multiplication, and find the determinant or inverse of matrices. 100% private and easy to use.",
    keywords: ["matrix calculator", "matrix operations", "determinant calculator", "inverse matrix", "WebToolNest"],
};

export default function MatrixCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
