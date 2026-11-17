import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/converters/text-case" },
    title: "Text Case Converter",
    description: "Convert text case instantly: Uppercase, Lowercase, Title Case, Camel Case, Snake Case, and more.",
};

export default function TextCaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
