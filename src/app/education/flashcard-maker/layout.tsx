import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Flashcard Maker - Create and Study Digital Flashcards | ToolNest",
    description: "Create custom digital flashcards for effective studying and memorization. Simple, free, and 100% private online learning tool.",
    keywords: ["flashcard maker", "create flashcards", "study tool", "memorization", "online learning", "ToolNest"],
};

export default function FlashcardMakerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
