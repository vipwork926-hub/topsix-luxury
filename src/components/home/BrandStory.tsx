"use client";

import DynamicImage from "@/components/ui/DynamicImage";
import { useLanguage } from "@/context/LanguageContext";

export default function BrandStory() {
  const { dictionary } = useLanguage();

  return (
    <section className="border-b border-white/5 px-4 py-20 text-center md:px-12 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <span className="mb-6 block text-xs uppercase tracking-[0.3em] text-champagne">
          {dictionary.home.philosophyEyebrow}
        </span>
        <h2 className="mb-12 font-serif text-3xl uppercase tracking-[0.15em] text-ivory md:text-5xl">
          {dictionary.home.philosophyTitle}
        </h2>
        <div className="space-y-3 font-serif text-xl italic leading-relaxed text-ivory/80 md:text-2xl">
          <p>{dictionary.home.philosophyKnown}</p>
          <p>{dictionary.home.philosophyUnseen}</p>
          <p>{dictionary.home.philosophySides}</p>
        </div>
        <p className="mt-10 font-sans text-xs uppercase tracking-[0.25em] text-champagne">
          {dictionary.home.philosophyClose}
        </p>
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-2">
          <DynamicImage siteImage="brandStoryMuse" alt={dictionary.worlds.entries["01"].name} className="aspect-[4/3] w-full object-cover opacity-85" />
          <DynamicImage siteImage="brandStoryNoir" alt={dictionary.worlds.entries["04"].name} className="aspect-[4/3] w-full object-cover opacity-85 md:mt-12" />
        </div>
      </div>
    </section>
  );
}