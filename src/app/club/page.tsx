"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import DynamicImage from "@/components/ui/DynamicImage";
import { useLanguage } from "@/context/LanguageContext";

export default function ClubPage() {
  const [submitted, setSubmitted] = useState(false);
  const { dictionary, language } = useLanguage();

  function requestInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-obsidian">
      <section className="relative flex min-h-[58vh] items-end overflow-hidden border-b border-white/10 px-4 pb-12 pt-24 md:min-h-[68vh] md:px-12 md:pb-16">
        <DynamicImage
          siteImage="clubHero"
          alt="A private, quiet moment in warm evening light"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-obsidian/15" />
        <div className="relative mx-auto w-full max-w-[1920px]">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-champagne">{dictionary.clubPage.eyebrow}</span>
          <h1 dir={language === "ar" ? "rtl" : "ltr"} className="max-w-4xl font-serif text-5xl uppercase leading-[0.98] tracking-[0.12em] md:text-7xl">{dictionary.club.welcomeTitle}</h1>
          <p className="mt-6 max-w-lg font-serif text-xl text-ivory/65">{dictionary.clubPage.intro}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-14 px-4 py-16 md:grid-cols-[1fr_0.85fr] md:gap-24 md:px-12 md:py-24">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne">{dictionary.clubPage.listEyebrow}</span>
          <h2 className="mt-3 max-w-xl font-serif text-3xl uppercase leading-tight tracking-[0.08em] md:text-4xl">{dictionary.clubPage.listTitle}</h2>
          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {dictionary.clubPage.privileges.map((privilege, index) => (
              <div key={index} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                <span className="pt-1 text-[10px] tracking-[0.2em] text-champagne">0{index + 1}</span>
                <div>
                  <h3 className="font-serif text-xl">{privilege.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ivory/50">{privilege.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:pt-4">
          <div className="border border-white/10 p-6 sm:p-8">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne">{dictionary.clubPage.requestEyebrow}</span>
            <h2 className="mt-3 font-serif text-2xl">{dictionary.clubPage.formTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ivory/50">{dictionary.clubPage.formBody}</p>
            <form onSubmit={requestInvitation} className="mt-7 space-y-5">
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.17em] text-ivory/60">{dictionary.clubPage.name}</span>
                <input name="name" autoComplete="name" required className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-ivory/30 focus:border-champagne" placeholder={dictionary.clubPage.namePlaceholder} />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.17em] text-ivory/60">{dictionary.clubPage.email}</span>
                <input name="email" type="email" autoComplete="email" required className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-ivory/30 focus:border-champagne" placeholder="you@example.com" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] uppercase tracking-[0.17em] text-ivory/60">{dictionary.clubPage.whatsapp}</span>
                <input name="whatsapp" type="tel" autoComplete="tel" required className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-ivory/30 focus:border-champagne" placeholder="+20" />
              </label>
              <button type="submit" disabled={submitted} className="mt-2 flex w-full items-center justify-center gap-2 border border-champagne bg-champagne px-5 py-4 text-[10px] uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-transparent hover:text-champagne disabled:cursor-default disabled:bg-transparent disabled:text-champagne">
                {submitted ? <><Check size={15} /> {dictionary.clubPage.receivedButton}</> : dictionary.clubPage.invitationButton}
              </button>
              <p aria-live="polite" className="min-h-4 text-center text-xs text-champagne">{submitted ? dictionary.clubPage.receivedMessage : ""}</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}