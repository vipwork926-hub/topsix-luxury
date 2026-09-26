"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import DynamicImage from "@/components/ui/DynamicImage";
import { useLanguage } from "@/context/LanguageContext";
import { OCCASIONS, WORLDS } from "@/data/mock";
import { useProductCatalog } from "@/context/ProductCatalogContext";

const moods = [
  { world: "The Romance" },
  { world: "The Siren" },
  { world: "The Tease" },
  { world: "The X" },
  { world: "The Muse" },
  { world: null },
] as const;

export default function ConciergePage() {
  const { dictionary, language } = useLanguage();
  const { products } = useProductCatalog();
  const [step, setStep] = useState(1);
  const [selectedMoodIndex, setSelectedMoodIndex] = useState<number | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const selectedMood = selectedMoodIndex === null ? null : moods[selectedMoodIndex];
  const selectedMoodCopy = selectedMoodIndex === null ? null : dictionary.conciergePage.moods[selectedMoodIndex];
  const selectedOccasionIndex = selectedOccasion === null ? -1 : OCCASIONS.indexOf(selectedOccasion as (typeof OCCASIONS)[number]);

  const matchingProducts = products.filter((product) => {
    const matchesWorld = !selectedMood?.world || product.world === selectedMood.world;
    const matchesOccasion = !selectedOccasion || product.occasion.includes(selectedOccasion);
    return matchesWorld && matchesOccasion;
  });
  const recommendations = matchingProducts.length
    ? matchingProducts.slice(0, 3)
    : products.filter((product) => product.world === selectedMood?.world).slice(0, 3);
  const selectedWorld = WORLDS.find((world) => world.name.toLowerCase() === selectedMood?.world?.toLowerCase());
  const featuredWorlds = WORLDS.filter((world) =>
    !selectedMood?.world || world.name.toLowerCase() === selectedMood.world.toLowerCase(),
  ).slice(0, selectedMood?.world ? 1 : 3);

  function restart() {
    setStep(1);
    setSelectedMoodIndex(null);
    setSelectedOccasion(null);
  }

  return (
    <div className="min-h-screen bg-obsidian">
      <section className="relative flex min-h-[42vh] items-end overflow-hidden border-b border-white/10 px-4 pb-10 pt-24 md:min-h-[50vh] md:px-12 md:pb-14">
        <DynamicImage
          siteImage="conciergeHero"
          alt="An editorial portrait in a quiet, dark setting"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/35 to-obsidian/10" />
        <div className="relative mx-auto w-full max-w-[1920px]">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-champagne">{dictionary.conciergePage.eyebrow}</span>
          <h1 dir={language === "ar" ? "rtl" : "ltr"} className="font-serif text-5xl uppercase tracking-[0.12em] md:text-7xl">{dictionary.conciergePage.title}</h1>
          <p className="mt-4 max-w-lg font-serif text-xl text-ivory/65">{dictionary.conciergePage.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-10 md:py-16">
        <div className="mb-10 flex items-center gap-3" aria-label={`${dictionary.conciergePage.steps[step - 1]} / 3`}>
          {[1, 2, 3].map((number) => (
            <div key={number} className={`h-px flex-1 transition-colors ${number <= step ? "bg-champagne" : "bg-white/15"}`} />
          ))}
          <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-ivory/45">0{step} / 03</span>
        </div>

        {step === 1 && (
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne">{dictionary.conciergePage.steps[0]}</span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">{dictionary.conciergePage.firstQuestion}</h2>
            <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setSelectedMoodIndex(index);
                    setStep(2);
                  }}
                  className="group flex min-h-28 flex-col items-start justify-center border border-white/10 px-6 py-5 text-left transition-colors hover:border-champagne/70 hover:bg-white/[0.03]"
                >
                  <span className="flex w-full items-center justify-between font-serif text-2xl text-ivory group-hover:text-champagne">
                    {dictionary.conciergePage.moods[index].label}<ArrowRight size={17} strokeWidth={1.4} />
                  </span>
                  <span className="mt-2 text-xs text-ivory/45">{dictionary.conciergePage.moods[index].note}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <button type="button" onClick={() => setStep(1)} className="mb-7 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ivory/45 hover:text-ivory"><ArrowLeft size={14} /> {dictionary.conciergePage.changeMood}</button>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-champagne">{dictionary.conciergePage.steps[1]}</span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">{dictionary.conciergePage.occasionQuestion}</h2>
            <p className="mt-3 font-serif text-lg text-ivory/55">{selectedMoodCopy?.label}. {dictionary.conciergePage.occasionHelp}</p>
            <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
              {OCCASIONS.map((occasion, index) => (
                <button key={occasion} type="button" onClick={() => { setSelectedOccasion(occasion); setStep(3); }} className="min-h-20 border border-white/10 px-4 py-5 text-[10px] uppercase tracking-[0.17em] text-ivory/75 transition-colors hover:border-champagne hover:text-champagne">
                  {dictionary.conciergePage.occasions[index]}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-champagne">{dictionary.conciergePage.yourEdit} {selectedOccasionIndex >= 0 ? dictionary.conciergePage.occasions[selectedOccasionIndex] : ""}</span>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl">{dictionary.conciergePage.resultTitle}</h2>
                <p className="mt-2 font-serif text-lg text-ivory/55">{selectedMoodCopy?.label} / {selectedWorld ? dictionary.worlds.entries[selectedWorld.id as keyof typeof dictionary.worlds.entries].name : dictionary.conciergePage.allWorlds}</p>
              </div>
              <button type="button" onClick={restart} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.17em] text-ivory/50 hover:text-champagne"><RotateCcw size={14} /> {dictionary.conciergePage.restart}</button>
            </div>

            {featuredWorlds.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-3">
                {featuredWorlds.map((world) => (
                  <Link key={world.id} href="/worlds" className="border border-white/15 px-4 py-3 text-[10px] uppercase tracking-[0.16em] transition-colors hover:border-champagne hover:text-champagne">
                    {dictionary.worlds.entries[world.id as keyof typeof dictionary.worlds.entries].name} <span className="ml-2 text-ivory/40">/ {dictionary.worlds.entries[world.id as keyof typeof dictionary.worlds.entries].mood}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
            {recommendations.length === 0 && <p className="py-12 text-center font-serif text-xl text-ivory/55">{dictionary.conciergePage.exploreEmpty}</p>}
            <Link href="/shop" className="mt-10 inline-flex items-center gap-3 border-b border-champagne pb-2 text-[10px] uppercase tracking-[0.2em] text-champagne">{dictionary.conciergePage.exploreAll} <ArrowRight size={15} /></Link>
          </div>
        )}
      </section>
    </div>
  );
}