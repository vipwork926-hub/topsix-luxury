"use client";

import Link from "next/link";
import DynamicImage from "@/components/ui/DynamicImage";
import { WORLDS } from "@/data/mock";
import { useLanguage } from "@/context/LanguageContext";

export default function WorldsPage() {
  const { dictionary, language } = useLanguage();

  return (
    <div className="min-h-screen bg-obsidian">
      <header className="relative flex min-h-[56vh] items-end overflow-hidden border-b border-white/10 px-4 pb-12 pt-24 md:min-h-[66vh] md:px-12 md:pb-16">
        <DynamicImage
          siteImage="worldsHero"
          alt={dictionary.worldsIndex.title}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-obsidian/10" />
        <div className="relative mx-auto w-full max-w-[1920px]">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.32em] text-champagne">
            {dictionary.worldsIndex.eyebrow}
          </span>
          <h1 dir={language === "ar" ? "rtl" : "ltr"} className="max-w-4xl font-serif text-5xl uppercase leading-[0.95] tracking-[0.12em] text-ivory md:text-7xl">
            {dictionary.worldsIndex.title}
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl text-ivory/70">
            {dictionary.worldsIndex.body}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1920px] px-4 py-16 md:px-12 md:py-24">
        <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-champagne">
              {dictionary.worldsIndex.findFeeling}
            </span>
            <h2 className="font-serif text-3xl uppercase tracking-[0.12em] md:text-4xl">
              {dictionary.worldsIndex.titleShort}
            </h2>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-ivory/45">
            {String(WORLDS.length).padStart(2, "0")} {dictionary.worldsIndex.countSuffix}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {WORLDS.map((world) => (
            (() => {
              const translation = dictionary.worlds.entries[world.id as keyof typeof dictionary.worlds.entries];
              return (
            <article key={world.id} className="group relative aspect-[4/5] overflow-hidden bg-charcoal">
              <DynamicImage
                worldId={world.id}
                src={world.image}
                alt={`${translation.name}، ${translation.mood}`}
                className="absolute inset-0 h-full w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/15" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-[0.28em] text-champagne">{world.id}</span>
                  <span className="border border-white/20 px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-ivory/70">
                    {dictionary.worldsIndex.label}
                  </span>
                </div>
                <div>
                  <p className="mb-3 font-serif text-lg italic text-ivory/75">&ldquo;{translation.message}&rdquo;</p>
                  <h3 className="font-serif text-3xl uppercase tracking-[0.15em] text-ivory md:text-4xl">
                    {translation.name}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/65">{translation.mood}</p>
                  <Link
                    href="/shop"
                    className="mt-6 inline-block border-b border-champagne pb-2 text-[10px] uppercase tracking-[0.22em] text-ivory transition-colors hover:text-champagne"
                  >
                    {dictionary.worldsIndex.explore}
                  </Link>
                </div>
              </div>
            </article>
              );
            })()
          ))}
        </div>
      </section>
    </div>
  );
}