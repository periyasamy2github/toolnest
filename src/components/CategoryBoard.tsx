import Link from "next/link";
import { categories, toolsIn } from "@/data/categories";
import type { Tool } from "@/data/tools";
import { SITE_URL } from "@/lib/seo";

const groupNames: Record<string, string> = {
    image: "Image", video: "Video", audio: "Audio", social: "Social media",
    pdf: "PDF", developer: "Developer utilities", converter: "Converters",
    converters: "Converters", security: "Security", finance: "Calculators",
    utils: "Productivity", health: "Health", education: "Study and maths", text: "Text",
};

// group a category's tools by the first segment of their route, keeping tools.ts order
const groupTools = (list: Tool[]) => {
    const groups = new Map<string, Tool[]>();
    for (const t of list) {
        const name = groupNames[t.href.split("/")[1]] ?? "More";
        groups.set(name, [...(groups.get(name) ?? []), t]);
    }
    return [...groups.entries()];
};

export const CategoryBoard = ({ categoryKey }: { categoryKey: string }) => {
    const index = categories.findIndex((c) => c.key === categoryKey);
    const category = categories[index];
    const list = toolsIn(categoryKey);
    const groups = groupTools(list);

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                name: category.title,
                url: `${SITE_URL}${category.href}`,
                mainEntity: {
                    "@type": "ItemList",
                    numberOfItems: list.length,
                    itemListElement: list.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.title, url: `${SITE_URL}${t.href}` })),
                },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "WebToolNest", item: SITE_URL },
                    { "@type": "ListItem", position: 2, name: category.title, item: `${SITE_URL}${category.href}` },
                ],
            },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <section className="grid grid-cols-2 lg:grid-cols-12 gap-2 pt-2">
                <div className="col-span-2 lg:col-span-9 rounded-[var(--radius)] bg-surface text-foreground p-6 lg:p-8 flex flex-col justify-between gap-12 min-h-[300px]">
                    <nav aria-label="Breadcrumb" className="text-base text-muted">
                        <Link href="/" className="text-accent hover:underline">WebToolNest</Link>
                        <span> / {category.name}</span>
                    </nav>
                    <div>
                        <h1 className="text-[11vw] sm:text-[clamp(44px,6vw,96px)] leading-[0.95] font-semibold tracking-[-0.04em] max-w-[14ch]">
                            {category.title}
                        </h1>
                        <p className="mt-8 text-xl lg:text-2xl leading-snug max-w-[44ch]">
                            {category.summary}
                        </p>
                    </div>
                </div>
                <div className="col-span-2 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-2">
                    <div className="rounded-[var(--radius)] bg-accent text-accent-ink p-6 flex flex-col justify-between gap-4 min-h-[180px]">
                        <span className="text-[clamp(56px,6vw,96px)] leading-[0.85] font-semibold tracking-[-0.05em] tabular-nums">{list.length}</span>
                        <span className="text-lg font-medium leading-tight">tools, free and private, in your browser</span>
                    </div>
                    <nav aria-label="Sections" className="tile p-6">
                        <ul className="space-y-2">
                            {groups.map(([name, items], g) => (
                                <li key={name}>
                                    <a href={`#group-${g}`} className="flex justify-between gap-3 text-lg font-medium hover:text-accent transition-colors">
                                        {name} <span className="text-muted tabular-nums">{items.length}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>

            {groups.map(([name, items], g) => (
                <section key={name} aria-labelledby={`group-${g}`} className="mt-24 lg:mt-32 grid lg:grid-cols-12 gap-2 scroll-mt-24">
                    <div className="lg:col-span-3">
                        <h2 id={`group-${g}`} className="reveal lg:sticky lg:top-24 text-[clamp(32px,3.4vw,52px)] leading-none font-semibold tracking-[-0.035em] px-1 pb-4">
                            {name} <span className="text-muted tabular-nums">{items.length}</span>
                        </h2>
                    </div>
                    <ul className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                        {items.map((t, i) => (
                            <li key={t.href} className="reveal" style={{ "--d": `${(i % 6) * 50}ms` } as React.CSSProperties}>
                                <Link href={t.href} className="group tile h-full min-h-[148px] p-5 flex flex-col justify-between gap-6 hover:bg-surface-2 transition-colors">
                                    <t.icon size={24} className="text-accent transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
                                    <span>
                                        <span className="block text-lg font-medium leading-tight group-hover:text-accent transition-colors">{t.title}</span>
                                        <span className="block mt-1.5 text-base leading-snug text-muted">{t.description}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </>
    );
};
