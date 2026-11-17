import { tools } from "@/data/tools";

export type Category = {
  key: string;
  name: string;
  title: string;
  href: string;
  summary: string;
};

export const categories: Category[] = [
  {
    key: "media",
    name: "Media",
    title: "Image, video and audio tools",
    href: "/media",
    summary: "Compress, resize, crop and convert photos, trim and convert video, cut and merge audio. Files are processed on your device.",
  },
  {
    key: "pdf",
    name: "PDF",
    title: "PDF tools",
    href: "/pdf",
    summary: "Merge, split, compress, rotate, protect and unlock PDF files without uploading them anywhere.",
  },
  {
    key: "dev-tools",
    name: "Developer",
    title: "Developer tools and converters",
    href: "/developer",
    summary: "Format JSON and SQL, decode JWTs, generate hashes and UUIDs, convert between JSON, YAML, CSV and XML.",
  },
  {
    key: "business-finance",
    name: "Finance",
    title: "Finance calculators",
    href: "/finance",
    summary: "EMI, SIP, income tax, GST, compound interest and retirement calculators, plus invoices and QR codes.",
  },
  {
    key: "life-learning",
    name: "Health",
    title: "Health and learning tools",
    href: "/health",
    summary: "BMI, calorie, sleep and water calculators, and study helpers such as GPA, grade and percentage calculators.",
  },
  {
    key: "writing-social",
    name: "Writing",
    title: "Writing and social media tools",
    href: "/writing-social",
    summary: "Word counter, case converter, readability checker, hashtag and caption generators for every platform.",
  },
];

export const toolsIn = (key: string) => tools.filter((t) => t.category === key);
