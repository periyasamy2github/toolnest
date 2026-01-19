import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Text Case Converter | ToolNest",
    description: "Convert text case instantly: Uppercase, Lowercase, Title Case, Camel Case, Snake Case, and more.",
};

export default function TextCaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
