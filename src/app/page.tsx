import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { categories, toolsIn } from "@/data/categories";
import { ToolFinder } from "@/components/ToolFinder";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const quickLinks = [
  { label: "Compress an image", href: "/image/compressor", tone: "bg-bone text-bark" },
  { label: "Merge PDF files", href: "/pdf/merge", tone: "bg-bone-2 text-bark" },
  { label: "Format JSON", href: "/developer/json-formatter", tone: "bg-clay text-bone" },
  { label: "Make a QR code", href: "/utils/qr-code", tone: "bg-bark text-bone" },
];

const facts = [
  `${tools.length} tools in ${categories.length} categories`,
  "Free, with no sign-up",
  "Files stay on your device",
  "Works on phone and desktop",
  "Open source on GitHub",
];

const faqs = [
  {
    q: "Is WebToolNest free?",
    a: "Yes. Every tool is free to use, with no account, no trial and no paid tier.",
  },
  {
    q: "Are my files uploaded to a server?",
    a: "No. Image, PDF, video, audio and text tools read your file in the browser and do the work on your device with JavaScript and WebAssembly. A few tools that need live data, such as the API tester or currency rates, only send the requests you ask them to.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. The tools run in any current browser on Windows, macOS, Linux, Android and iOS.",
  },
  {
    q: "Is there a file size limit?",
    a: "There is no limit set by us. Very large videos depend on your device's memory and take longer on a phone than on a laptop.",
  },
  {
    q: "Can I use the results for work?",
    a: "Yes. What you make is yours, including compressed images, merged PDFs, invoices and generated QR codes.",
  },
  {
    q: "Who makes WebToolNest?",
    a: "It is built and maintained by Periyasamy S. The source code is public on GitHub.",
  },
];

const stages = [
  { time: "A second", grow: 1, tone: "bg-bone text-bark", text: "Open the tool. It loads in your browser like any page." },
  { time: "A few seconds", grow: 2, tone: "bg-bone-2 text-bark", text: "Choose your file. It is read from your device, not sent anywhere." },
  { time: "Under a minute", grow: 5, tone: "bg-clay text-bone", text: "Your own processor compresses, merges or converts it." },
  { time: "Instantly", grow: 1, tone: "bg-accent text-accent-ink", text: "Save the result. No copy is kept, because none was made." },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      name: "WebToolNest tools",
      numberOfItems: tools.length,
      itemListElement: tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.title, url: `${SITE_URL}${t.href}` })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const Home = () => (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />

    {/* first screen: name band, category links, then nest, live finder and quick links */}
    <section className="grid grid-cols-2 lg:grid-cols-12 gap-2 pt-2 lg:h-[calc(100svh-72px)] lg:min-h-[760px] lg:grid-rows-[200px_64px_1fr]">
      <h1 className="col-span-2 lg:col-span-12 h-[96px] lg:h-auto rounded-[var(--radius)] bg-surface text-accent overflow-hidden flex items-center justify-center whitespace-nowrap font-semibold tracking-[-0.045em] leading-[0.8] text-[14.6vw] lg:text-[clamp(160px,17vw,300px)]">
        <span className="block translate-y-[4%]">WebToolNest</span>
        <span className="sr-only">: free online tools</span>
      </h1>

      <p className="col-span-2 order-2 lg:hidden text-[6.4vw] sm:text-[28px] leading-[1.15] font-medium tracking-[-0.015em] px-1 pt-3 pb-1">
        {tools.length} free online tools. Your files never leave your device.
      </p>

      <ul className="contents">
        {categories.map((c) => (
          <li key={c.href} className="order-6 lg:order-none lg:col-span-2 lg:row-start-2">
            <Link href={c.href} className="tile h-[64px] flex items-center justify-between gap-2 px-4 text-base font-medium hover:bg-surface-2 transition-colors">
              {c.name}
              <span className="text-muted tabular-nums">{toolsIn(c.key).length}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="col-span-2 lg:col-start-1 lg:col-span-2 lg:row-start-3 order-7 lg:order-none tile p-5 flex flex-col gap-4 text-lg font-medium leading-snug min-h-0">
        {facts.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <div className="col-span-2 lg:col-start-3 lg:col-span-8 lg:row-start-3 order-3 lg:order-none tile p-2 flex flex-col gap-2 min-h-0">
        <p className="hidden lg:block text-[clamp(24px,2.2vw,34px)] leading-[1.15] font-medium tracking-[-0.015em] px-4 pt-3 pb-2 max-w-[34ch]">
          {tools.length} free online tools. Your files never leave your device.
        </p>
        <div className="flex-1 min-h-0">
          <ToolFinder />
        </div>
      </div>

      <ul className="col-span-2 lg:col-start-11 lg:col-span-2 lg:row-start-3 order-5 lg:order-none grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-5 gap-2">
        {quickLinks.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={`${l.tone} h-full min-h-[72px] flex items-start p-4 rounded-[var(--radius)] text-[15px] font-medium leading-snug transition-transform hover:-translate-y-0.5`}>
              {l.label}
            </Link>
          </li>
        ))}
        <li className="col-span-2 lg:col-span-1">
          <Link href="#tools" className="bg-accent text-accent-ink h-full min-h-[72px] flex flex-col justify-between p-4 rounded-[var(--radius)] font-semibold text-lg leading-tight transition-transform hover:-translate-y-0.5 active:translate-y-0">
            See all {tools.length} tools
            <svg aria-hidden width="28" height="28" viewBox="0 0 28 28" className="self-end">
              <path d="M14 4 V24 M6 16 L14 24 L22 16" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </Link>
        </li>
      </ul>
    </section>

    {/* every tool, by category, as filled bars that open in place */}
    <section id="tools" aria-labelledby="tools-heading" className="mt-40 scroll-mt-20">
      <div>
        <h2 id="tools-heading" className="reveal font-semibold tracking-[-0.05em] leading-[0.8] text-[clamp(96px,16vw,240px)] -ml-[0.04em]">
          Tools<span className="sr-only">: all {tools.length}, by category</span>
        </h2>
        <div className="mt-6 space-y-1.5">
          {categories.map((c, i) => {
            const list = toolsIn(c.key);
            return (
              <details key={c.key} open={i === 0} name="categories" className="reveal group tile" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <summary className="flex items-center justify-between gap-4 h-14 px-5 cursor-pointer text-base font-medium hover:text-accent transition-colors">
                  <span>{c.title} <span className="text-muted tabular-nums">{list.length}</span></span>
                  <span className="faq-plus" aria-hidden />
                </summary>
                <div className="px-5 pb-6">
                  <p className="text-muted mb-4 max-w-[60ch]">{c.summary}</p>
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2.5">
                    {list.map((t) => (
                      <li key={t.href}>
                        <Link href={t.href} className="flex justify-between gap-3 hover:text-accent transition-colors">
                          <span>{t.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={c.href} className="inline-block mt-5 text-accent font-medium hover:underline">
                    Open the {c.name.toLowerCase()} board
                  </Link>
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>

    {/* close-ups: real readouts from the tools, enlarged and cropped by the tile edges */}
    <section aria-labelledby="closeups-heading" className="mt-40 grid grid-cols-2 lg:grid-cols-12 auto-rows-[28vw] lg:auto-rows-[104px] gap-2">
      <div className="reveal col-span-2 row-span-2 lg:col-span-6 lg:row-span-2 tile p-6">
        <h2 id="closeups-heading" className="text-[9vw] lg:text-[clamp(36px,4vw,60px)] leading-[1.02] font-semibold tracking-[-0.035em] max-w-[14ch]">
          Small tools, done properly.
        </h2>
      </div>

      <CloseUp href="/developer/password-generator" className="col-span-2 row-span-3 lg:col-start-7 lg:col-span-3 lg:row-span-4 lg:row-start-1 bg-accent text-accent-ink" name="Password Generator" line="Strong passwords made on your device." d={60}>
        <span data-ui className="absolute left-5 top-4 font-semibold tracking-[-0.03em] leading-[0.95] text-[15vw] lg:text-[6.2vw] break-all w-[3.6em]">
          k7#Vq9!mZ2
        </span>
      </CloseUp>

      <CloseUp href="/developer/json-formatter" className="col-span-1 row-span-2 lg:col-start-10 lg:col-span-3 lg:row-span-4 lg:row-start-1 bg-bark text-bone" name="JSON Formatter" line="Beautify, validate and minify." d={120}>
        <pre data-ui className="absolute left-0 top-3 text-[4.4vw] lg:text-[2.2vw] leading-[1.25] text-bone-2">
          <code>{`{\n  "tool": "json",\n  "valid": true,\n  "size": 1284\n}`}</code>
        </pre>
      </CloseUp>

      <CloseUp href="/image/compressor" className="col-span-1 row-span-2 lg:col-start-1 lg:col-span-6 lg:row-span-4 lg:row-start-3 bg-bone text-bark" name="Image Compressor" line="Shrink JPG, PNG and WebP without uploading them." d={60}>
        <span data-ui className="absolute right-5 top-5 text-right font-semibold tracking-[-0.05em] leading-[0.9] text-[13vw] lg:text-[11vw] tabular-nums">
          −75%
          <span className="block text-base lg:text-2xl tracking-normal font-medium text-clay pt-2">2.4 MB to 612 KB</span>
        </span>
      </CloseUp>

      <CloseUp href="/finance/loan-emi" className="col-span-1 row-span-2 lg:col-start-7 lg:col-span-3 lg:row-span-2 bg-clay text-bone" name="Loan EMI" line="₹10,00,000 at 9% for 5 years." d={120}>
        <span data-ui className={figure}>₹20,758</span>
      </CloseUp>

      <CloseUp href="/pdf/merge" className="col-span-1 row-span-2 lg:col-start-10 lg:col-span-3 lg:row-span-2 bg-surface-2 text-foreground" name="Merge PDF" line="Three files in, one file out." d={180}>
        <span data-ui className={figure}>3 → 1</span>
      </CloseUp>

      <CloseUp href="/health/bmi-calculator" className="col-span-1 row-span-2 lg:col-start-1 lg:col-span-3 lg:row-span-2 bg-bone-2 text-bark" name="BMI" line="70 kg at 177 cm." d={60}>
        <span data-ui className={figure}>22.3</span>
      </CloseUp>

      <CloseUp href="/text/word-counter" className="col-span-1 row-span-2 lg:col-start-4 lg:col-span-3 lg:row-span-2 bg-surface text-foreground" name="Word Counter" line="Words, characters and reading time." d={120}>
        <span data-ui className={figure}>1,284</span>
      </CloseUp>

      <CloseUp href="/utils/unit-converter" className="col-span-2 row-span-2 lg:col-start-7 lg:col-span-6 lg:row-span-2 bg-bone text-bark" name="Unit Converter" line="Length, weight, temperature and more." d={180}>
        <span data-ui className={figure}>1 mi = 1.609 km</span>
      </CloseUp>
    </section>

    {/* how it works: the stages as one bar, widths from how long each takes */}
    <section aria-labelledby="how-heading" className="mt-40">
      <h2 id="how-heading" className="reveal text-[11vw] lg:text-[clamp(48px,6.4vw,104px)] leading-[0.95] font-semibold tracking-[-0.04em] mb-16 max-w-[16ch] px-1">
        Nothing leaves your device
      </h2>
      <ol data-ui className="flex flex-col lg:flex-row gap-1.5">
        {stages.map((s, i) => (
          <li key={s.time} className="reveal lg:min-w-[12%] flex flex-col gap-3" style={{ flexGrow: s.grow, flexBasis: 0, "--d": `${i * 90}ms` } as React.CSSProperties}>
            <span className={`${s.tone} rounded-[var(--radius)] p-5 min-h-[72px] lg:h-[22vh] text-[22px] lg:text-[clamp(20px,2vw,30px)] font-semibold tracking-[-0.02em] leading-tight`}>
              {s.time}
            </span>
            <span className="text-[17px] leading-snug max-w-[24ch] px-1">{s.text}</span>
          </li>
        ))}
      </ol>
    </section>

    {/* the one loud moment: the claim, travelling */}
    <div className="marquee mt-40 -mx-4 lg:-mx-3 overflow-hidden bg-accent text-accent-ink py-6" aria-hidden>
      <div className="marquee-track flex w-max whitespace-nowrap text-[clamp(56px,9vw,150px)] font-semibold tracking-[-0.045em] leading-none">
        {[0, 1].map((k) => (
          <span key={k} className="pr-[0.5em]">
            Your files stay on your device · {tools.length} free tools · WebToolNest ·&nbsp;
          </span>
        ))}
      </div>
    </div>

    {/* questions */}
    <section aria-labelledby="faq-heading" className="mt-40 grid lg:grid-cols-12 gap-2">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-24 space-y-6">
          <h2 id="faq-heading" className="reveal text-[9vw] lg:text-[4vw] leading-[0.98] font-semibold tracking-[-0.04em] px-1">
            Questions, answered
          </h2>
        </div>
      </div>
      <div className="lg:col-span-8 space-y-2">
        {faqs.map((f, i) => (
          <details key={f.q} name="faq" open={i === 1} className="reveal group rounded-[var(--radius)] bg-surface open:bg-accent open:text-accent-ink transition-colors" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
            <summary className="flex items-center justify-between gap-6 min-h-[72px] px-6 cursor-pointer text-lg lg:text-xl font-medium">
              <h3>{f.q}</h3>
              <span className="faq-plus" aria-hidden />
            </summary>
            <p className="px-6 pb-6 text-[17px] leading-relaxed max-w-[52ch]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  </>
);

// one size for every readout so the board reads as one system
const figure = "absolute right-5 top-4 font-semibold tracking-[-0.04em] leading-none text-[8.5vw] lg:text-[4.6vw] tabular-nums";

type CloseUpProps ={ href: string; className: string; name: string; line: string; d: number; children: React.ReactNode };

// one tile of the close-up board: an enlarged readout, captioned bottom-left
const CloseUp = ({ href, className, name, line, d, children }: CloseUpProps) => (
  <Link
    href={href}
    data-ui
    className={`reveal group relative overflow-hidden rounded-[var(--radius)] p-5 flex flex-col justify-end transition-[filter] hover:brightness-110 ${className}`}
    style={{ "--d": `${d}ms` } as React.CSSProperties}
  >
    <span className="transition-transform duration-500 group-hover:-translate-y-1">{children}</span>
    <span className="relative">
      <span className="block text-lg font-medium leading-tight">{name}</span>
      <span className="block text-[15px] leading-snug opacity-80">{line}</span>
    </span>
  </Link>
);

export default Home;
