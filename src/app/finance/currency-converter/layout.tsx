import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/currency-converter" },
    title: "Currency Converter - Real-time Exchange Rates Online",
    description: "Convert between major world currencies instantly. Supports USD, EUR, GBP, INR, JPY, and more with real-time exchange rates. 100% private.",
    keywords: ["currency converter", "exchange rates", "usd to inr", "forex calculator", "money converter"],
};

export default function CurrencyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
