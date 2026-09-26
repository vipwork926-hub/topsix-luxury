"use client";

import { WORLDS } from "@/data/mock";
import DynamicImage from "@/components/ui/DynamicImage";
import { useLanguage } from "@/context/LanguageContext";

export default function SixWorlds() {
  const { dictionary } = useLanguage();

  return (
    <section className="py-24 px-4 md:px-12 bg-charcoal">
      <div className="max-w-[1920px] mx-auto mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
        <div>
          <span className="text-champagne text-xs tracking-[0.3em] uppercase block mb-3">
            {dictionary.worlds.eyebrow}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl tracking-[0.1em] uppercase text-ivory">
            {dictionary.worlds.title}
          </h2>
        </div>
        <p className="font-serif text-lg italic text-ivory/60 mt-4 md:mt-0">
          {dictionary.worlds.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {WORLDS.map((world) => {
          const translation = dictionary.worlds.entries[world.id as keyof typeof dictionary.worlds.entries];
          return (
            <div key={world.id} className="group relative aspect-[4/5] cursor-pointer overflow-hidden bg-obsidian">
              <div className="absolute inset-0 z-10 bg-black/50 transition-all duration-700 group-hover:bg-black/20" />
              <DynamicImage worldId={world.id} src={world.image} alt={translation.name} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-8">
                <span className="text-xs tracking-[0.3em] text-champagne">{world.id}</span>
                <div>
                  <h3 className="mb-2 font-serif text-2xl uppercase tracking-[0.2em] text-ivory md:text-3xl">{translation.name}</h3>
                  <p className="mb-4 font-serif text-sm italic text-champagne">&ldquo;{translation.message}&rdquo;</p>
                  <span className="inline-block border-b border-champagne pb-1 text-[11px] uppercase tracking-[0.25em] text-ivory/90 opacity-0 transition-opacity duration-500 group-hover:opacity-100">{dictionary.worlds.enter} &rarr;</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}