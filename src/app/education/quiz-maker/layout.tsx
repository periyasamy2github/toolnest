import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Quiz Maker - Create and Take Custom Quizzes | ToolNest",
    description: "Create custom quizzes for students, employees, or friends. Simple, free, and 100% private online quiz tool.",
    keywords: ["quiz maker", "create quiz", "online quiz", "education tool", "ToolNest"],
};

export default function QuizMakerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
