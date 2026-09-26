"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const measurements = [
  { size: "XS", bust: "80-84 cm / 31.5-33 in", waist: "62-66 cm / 24.5-26 in", hip: "88-92 cm / 34.5-36 in" },
  { size: "S", bust: "84-88 cm / 33-34.5 in", waist: "66-70 cm / 26-27.5 in", hip: "92-96 cm / 36-38 in" },
  { size: "M", bust: "88-94 cm / 34.5-37 in", waist: "70-76 cm / 27.5-30 in", hip: "96-102 cm / 38-40 in" },
  { size: "L", bust: "94-100 cm / 37-39.5 in", waist: "76-82 cm / 30-32.5 in", hip: "102-108 cm / 40-42.5 in" },
  { size: "XL", bust: "100-108 cm / 39.5-42.5 in", waist: "82-90 cm / 32.5-35.5 in", hip: "108-116 cm / 42.5-45.5 in" },
];

export default function SizeGuidePage() {
  const { dictionary, language } = useLanguage();

  return (
    <div className="min-h-screen bg-obsidian px-4 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1280px]">
        <header className="max-w-3xl border-b border-white/10 pb-8">
          <span className="text-[10px] uppercase tracking-[0.28em] text-champagne">{dictionary.sizeGuide.eyebrow}</span>
          <h1 dir={language === "ar" ? "rtl" : "ltr"} className="mt-4 font-serif text-5xl uppercase tracking-[0.1em] md:text-6xl">{dictionary.sizeGuide.title}</h1>
          <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-ivory/60">{dictionary.sizeGuide.intro}</p>
        </header>

        <div className="mt-10 overflow-x-auto border-y border-white/10">
          <table className="w-full min-w-[660px] border-collapse text-left">
            <caption className="sr-only">{dictionary.sizeGuide.caption}</caption>
            <thead><tr className="border-b border-white/10 text-start text-[9px] uppercase tracking-[0.2em] text-champagne"><th scope="col" className="px-4 py-4 font-normal md:px-6">{dictionary.sizeGuide.size}</th><th scope="col" className="px-4 py-4 font-normal md:px-6">{dictionary.sizeGuide.bust}</th><th scope="col" className="px-4 py-4 font-normal md:px-6">{dictionary.sizeGuide.waist}</th><th scope="col" className="px-4 py-4 font-normal md:px-6">{dictionary.sizeGuide.hip}</th></tr></thead>
            <tbody className="divide-y divide-white/10">
              {measurements.map((row) => (
                <tr key={row.size} className="text-sm text-ivory/70"><th scope="row" className="px-4 py-5 font-serif text-xl font-normal text-ivory md:px-6">{row.size}</th><td className="whitespace-nowrap px-4 py-5 text-xs md:px-6">{row.bust}</td><td className="whitespace-nowrap px-4 py-5 text-xs md:px-6">{row.waist}</td><td className="whitespace-nowrap px-4 py-5 text-xs md:px-6">{row.hip}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 border-b border-white/10 pb-10 md:grid-cols-2 md:gap-16">
          <section><span className="text-[9px] uppercase tracking-[0.2em] text-champagne">{dictionary.sizeGuide.askEyebrow}</span><p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/55">{dictionary.sizeGuide.askBody}</p></section>
          <section><span className="text-[9px] uppercase tracking-[0.2em] text-champagne">{dictionary.sizeGuide.waistEyebrow}</span><p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/55">{dictionary.sizeGuide.waistBody}</p></section>
        </div>
        <Link href="/concierge" className="mt-8 inline-block border-b border-champagne pb-2 text-[10px] uppercase tracking-[0.19em] text-champagne">{dictionary.sizeGuide.contact}</Link>
      </div>
    </div>
  );
}