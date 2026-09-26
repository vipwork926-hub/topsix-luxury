"use client";

import Link from "next/link";
import DynamicImage from "@/components/ui/DynamicImage";
import { useLanguage } from "@/context/LanguageContext";

const stories = [
  {
    number: "01",
    imageKey: "afterDarkTeaserOne" as const,
    className: "md:col-span-7",
  },
  {
    number: "02",
    imageKey: "afterDarkTeaserTwo" as const,
    className: "md:col-span-5 md:mt-32",
  },
  {
    number: "03",
    imageKey: "afterDarkTeaserThree" as const,
    className: "md:col-span-6",
  },
];

export default function AfterDarkPage() {
  const { dictionary, language } = useLanguage();

  return (
    <div className="min-h-screen bg-obsidian">
      <section className="relative flex min-h-[70vh] items-end overflow-hidden px-4 pb-14 pt-24 md:min-h-[82vh] md:px-12 md:pb-20">
        <DynamicImage
          siteImage="afterDarkHero"
          alt={dictionary.afterDarkPage.title}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/20" />
        <div className="relative mx-auto w-full max-w-[1920px]">
          <span className="mb-5 block text-[10px] uppercase tracking-[0.32em] text-champagne">
            {dictionary.afterDarkPage.eyebrow}
          </span>
          <h1 dir={language === "ar" ? "rtl" : "ltr"} className="font-serif text-6xl uppercase leading-[0.9] tracking-[0.15em] md:text-8xl">
            {dictionary.afterDarkPage.title}
          </h1>
          <p className="mt-6 max-w-lg font-serif text-xl italic text-ivory/75 md:text-2xl">
            {dictionary.afterDarkPage.heroPhrase}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1920px] px-4 py-16 md:px-12 md:py-28">
        <div className="mb-14 flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end">
          <div>
            <span className="mb-3 block text-[10px] uppercase tracking-[0.28em] text-champagne">
              {dictionary.afterDarkPage.journalEyebrow}
            </span>
            <h2 className="font-serif text-3xl uppercase tracking-[0.12em] md:text-4xl">
              {dictionary.afterDarkPage.journalTitle}
            </h2>
          </div>
          <p className="max-w-sm font-serif text-lg text-ivory/55">
            {dictionary.afterDarkPage.journalBody}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12 md:gap-y-24">
          {stories.map((story, index) => {
            const storyCopy = dictionary.afterDarkPage.stories[index];
            return (
            <article key={story.number} className={story.className}>
              <Link href={`/after-dark#story-${story.number}`} className="group block">
                <div className="relative overflow-hidden bg-charcoal">
                  <DynamicImage
                    siteImage={story.imageKey}
                    alt={storyCopy.alt}
                    className="aspect-[4/5] w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-100 md:aspect-[5/4]"
                  />
                  <span className="absolute left-5 top-5 border border-white/20 bg-obsidian/50 px-3 py-2 text-[10px] tracking-[0.2em] text-ivory backdrop-blur-sm">
                    {story.number}
                  </span>
                </div>
                <div id={`story-${story.number}`} className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-champagne">
                      {storyCopy.category}
                    </span>
                    <h3 className="mt-2 max-w-xl font-serif text-2xl leading-snug text-ivory transition-colors group-hover:text-champagne md:text-3xl">
                      {storyCopy.title}
                    </h3>
                  </div>
                  <span aria-hidden="true" className="pt-5 text-xl text-champagne">↗</span>
                </div>
              </Link>
            </article>
            );
          })}
        </div>

        <div className="mt-24 border-t border-white/10 py-16 text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.28em] text-champagne">
            {dictionary.afterDarkPage.closingEyebrow}
          </span>
          <p className="mx-auto max-w-xl font-serif text-2xl text-ivory/75">
            {dictionary.afterDarkPage.closingTitle}
          </p>
          <Link href="/shop" className="mt-8 inline-block border border-champagne px-8 py-4 text-[10px] uppercase tracking-[0.22em] text-champagne transition-colors hover:bg-champagne hover:text-obsidian">
            {dictionary.afterDarkPage.explore}
          </Link>
        </div>
      </section>
    </div>
  );
}