"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQPage() {
  const { dictionary, language } = useLanguage();
  const questions = dictionary.customerFaq.questions;

  return (
    <div className="min-h-screen bg-obsidian px-4 py-16 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
        <header className="md:sticky md:top-32 md:h-fit">
          <span className="text-[10px] uppercase tracking-[0.28em] text-champagne">{dictionary.customerFaq.eyebrow}</span>
          <h1 dir={language === "ar" ? "rtl" : "ltr"} className="mt-4 font-serif text-5xl uppercase leading-[0.95] tracking-[0.1em] md:text-6xl">{dictionary.customerFaq.title}</h1>
          <p className="mt-6 max-w-sm font-serif text-xl leading-relaxed text-ivory/55">{dictionary.customerFaq.intro}</p>
          <Link href="/concierge" className="mt-8 inline-block border-b border-champagne pb-2 text-[10px] uppercase tracking-[0.19em] text-champagne">{dictionary.customerFaq.contact}</Link>
        </header>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {questions.map((item, index) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-1">
                <span className="flex gap-4 font-serif text-xl text-ivory/90 md:text-2xl"><span className="pt-1 text-[9px] font-sans tracking-[0.15em] text-champagne">0{index + 1}</span>{item.question}</span>
                <span aria-hidden="true" className="mt-1 text-xl text-champagne transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-2 ps-9 pe-8 pt-4 text-sm leading-relaxed text-ivory/55">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}