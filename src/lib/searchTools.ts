import { tools, Tool } from "@/data/tools";

// match every word of the query against title, description and tags
export const searchTools = (query: string): Tool[] => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return tools;
  return tools.filter((t) => {
    const text = `${t.title} ${t.description} ${(t.tags ?? []).join(" ")}`.toLowerCase();
    return words.every((w) => text.includes(w));
  });
};
