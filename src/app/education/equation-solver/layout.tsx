import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Equation Solver - Solve Linear and Quadratic Equations Online | ToolNest",
    description: "Solve linear and quadratic equations instantly online for free. Get step-by-step solutions for your math problems. 100% private.",
    keywords: ["equation solver", "solve equations", "math solver", "linear equations", "quadratic equations", "ToolNest"],
};

export default function EquationSolverLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
