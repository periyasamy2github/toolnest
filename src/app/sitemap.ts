import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const categoryRoutes = ["/media", "/pdf", "/developer", "/finance", "/health", "/writing-social"];

const sitemap = (): MetadataRoute.Sitemap => {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...categoryRoutes.map((r) => ({ url: `${SITE_URL}${r}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...tools.map((t) => ({ url: `${SITE_URL}${t.href}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
};

export default sitemap;
