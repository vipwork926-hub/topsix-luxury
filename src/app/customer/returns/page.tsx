"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ReturnsPage() {
  const { dictionary, language } = useLanguage();
  const { returnsPage } = dictionary;

  return (
    <div className="min-h-screen bg-obsidian px-4 py-16 md:px-12 md:py-24">
      <article className="mx-auto max-w-[1100px]">
        <header className="max-w-3xl border-b border-white/10 pb-9">
          <span className="text-[10px] uppercase tracking-[0.28em] text-champagne">{returnsPage.eyebrow}</span>
          <h1 dir={language === "ar" ? "rtl" : "ltr"} className="mt-4 font-serif text-5xl uppercase tracking-[0.1em] md:text-6xl">{returnsPage.title}</h1>
          <p className="mt-6 font-serif text-xl leading-relaxed text-ivory/60">{returnsPage.intro}</p>
        </header>

        <section className="grid grid-cols-1 gap-8 border-b border-white/10 py-10 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
          <div><span className="text-[9px] uppercase tracking-[0.2em] text-champagne">{returnsPage.approachEyebrow}</span><h2 className="mt-2 font-serif text-2xl">{returnsPage.approachTitle}</h2></div>
          <div className="space-y-5 text-sm leading-relaxed text-ivory/60">{returnsPage.approach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>

        <section className="border-b border-white/10 py-10">
          <span className="text-[9px] uppercase tracking-[0.2em] text-champagne">{returnsPage.stepsEyebrow}</span>
          <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
            {returnsPage.steps.map((step, index) => (
              <div key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 py-5 md:grid-cols-[5rem_1fr] md:gap-8"><span className="pt-1 text-[10px] tracking-[0.16em] text-champagne">0{index + 1}</span><div><h2 className="font-serif text-xl">{step.title}</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-ivory/55">{step.text}</p></div></div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-5 py-9 md:grid-cols-[1fr_auto] md:items-end">
          <div><span className="text-[9px] uppercase tracking-[0.2em] text-champagne">{returnsPage.helpEyebrow}</span><p className="mt-2 max-w-xl font-serif text-xl text-ivory/70">{returnsPage.helpBody}</p></div>
          <Link href="/concierge" className="inline-block border-b border-champagne pb-2 text-[10px] uppercase tracking-[0.19em] text-champagne">{returnsPage.contact}</Link>
        </section>
      </article>
    </div>
  );
}