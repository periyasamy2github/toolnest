import type { Metadata } from "next";
import { tools } from "@/data/tools";

export const SITE_URL = "https://webtoolnest.web.app";
export const SITE_NAME = "WebToolNest";
// a page that sets its own openGraph replaces the inherited one, image included
export const OG_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630, alt: "WebToolNest: free online tools that run in your browser" };

// metadata for a tool route, built from its entry in tools.ts
export const toolMetadata = (href: string): Metadata => {
  const tool = tools.find((t) => t.href === href);
  if (!tool) return { alternates: { canonical: href } };

  const title = `${tool.title} - Free Online Tool`;
  const description = `${tool.description} Free, private and runs in your browser. No sign-up, nothing uploaded.`;

  return {
    title,
    description,
    keywords: [...(tool.tags ?? []), tool.title.toLowerCase(), "free online tool", SITE_NAME],
    alternates: { canonical: href },
    openGraph: { title: `${tool.title} | ${SITE_NAME}`, description, url: href, type: "website", images: [OG_IMAGE] },
  };
};
