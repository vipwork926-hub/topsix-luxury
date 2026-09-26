"use client";

import { useState, type FormEvent } from "react";
import { Check, RotateCcw, Save } from "lucide-react";
import { SITE_CONTENT_DEFAULTS, type SiteImageKey } from "@/data/content";
import { useSiteContent } from "@/context/SiteContentContext";
import { WORLDS } from "@/data/mock";

const imageFields: { key: SiteImageKey; label: string; description: string }[] = [
  { key: "homeHero", label: "Homepage hero", description: "The full-width opening campaign image." },
  { key: "brandStoryMuse", label: "Brand story / The Muse", description: "First image in the philosophy section." },
  { key: "brandStoryNoir", label: "Brand story / The Noir", description: "Second image in the philosophy section." },
  { key: "shopHero", label: "Shop campaign", description: "The shop collection masthead." },
  { key: "worldsHero", label: "Worlds campaign", description: "The Six Worlds landing masthead." },
  { key: "clubHero", label: "TOPSIX Club campaign", description: "The private club masthead." },
  { key: "conciergeHero", label: "Concierge campaign", description: "The mood consultation masthead." },
  { key: "afterDarkHero", label: "After Dark masthead", description: "The editorial journal opener." },
  { key: "afterDarkTeaserOne", label: "After Dark / Rituals", description: "First editorial story image." },
  { key: "afterDarkTeaserTwo", label: "After Dark / A private view", description: "Second editorial story image." },
  { key: "afterDarkTeaserThree", label: "After Dark / The mood", description: "Third editorial story image." },
  { key: "packaging", label: "Packaging scene", description: "Backdrop behind the unboxing composition." },
  { key: "productDetailSecond", label: "Product detail / secondary", description: "Secondary editorial image on product pages." },
];

function ImageField({
  label,
  description,
  value,
  onSave,
}: {
  label: string;
  description: string;
  value: string;
  onSave: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(draft.trim());
    setSaved(true);
  }

  return (
    <form onSubmit={submit} className="border border-white/10 bg-white/[0.015]">
      <div className="relative aspect-[16/9] overflow-hidden bg-[#171717]">
        <img src={draft || value} alt={`${label} preview`} className="h-full w-full object-cover opacity-85" />
        <span className="absolute bottom-3 left-3 bg-black/65 px-2 py-1 text-[8px] uppercase tracking-[0.18em] text-white/70">Preview</span>
      </div>
      <div className="p-4">
        <h3 className="text-xs uppercase tracking-[0.14em] text-ivory">{label}</h3>
        <p className="mt-1 min-h-8 text-[11px] leading-relaxed text-white/40">{description}</p>
        <label className="mt-3 block">
          <span className="sr-only">Image URL for {label}</span>
          <input type="url" required value={draft} onChange={(event) => { setDraft(event.target.value); setSaved(false); }} className="w-full border-b border-white/15 bg-transparent py-2 text-[11px] text-white/70 outline-none focus:border-[#cbb894]" />
        </label>
        <button type="submit" className="mt-3 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#d8c7a7] hover:text-white">
          {saved ? <Check size={13} /> : <Save size={13} />}{saved ? "Saved" : "Save image"}
        </button>
      </div>
    </form>
  );
}

function LogoSettings({
  initial,
  onSave,
}: {
  initial: { text: string; imageUrl: string; useImageLogo: boolean };
  onSave: (value: typeof initial) => void;
}) {
  const [text, setText] = useState(initial.text);
  const [imageUrl, setImageUrl] = useState(initial.imageUrl);
  const [useImageLogo, setUseImageLogo] = useState(initial.useImageLogo);
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave({ text: text.trim() || SITE_CONTENT_DEFAULTS.brandLogo.text, imageUrl: imageUrl.trim(), useImageLogo });
    setSaved(true);
  }

  return (
    <form onSubmit={submit} className="grid gap-6 border border-white/10 p-5 md:grid-cols-[1fr_0.8fr] md:p-7">
      <div>
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb894]">Global identity</span>
        <h2 className="mt-2 font-serif text-2xl">Logo settings</h2>
        <label className="mt-5 block"><span className="mb-2 block text-[9px] uppercase tracking-[0.15em] text-white/45">Text fallback</span><input value={text} onChange={(event) => { setText(event.target.value); setSaved(false); }} required className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none focus:border-[#cbb894]" /></label>
        <label className="mt-4 block"><span className="mb-2 block text-[9px] uppercase tracking-[0.15em] text-white/45">Image logo URL</span><input type="url" value={imageUrl} onChange={(event) => { setImageUrl(event.target.value); setSaved(false); }} placeholder="https://..." className="w-full border-b border-white/15 bg-transparent py-3 text-sm outline-none focus:border-[#cbb894]" /></label>
        <label className="mt-5 inline-flex cursor-pointer items-center gap-3 text-xs text-white/70">
          <input type="checkbox" checked={useImageLogo} onChange={(event) => { setUseImageLogo(event.target.checked); setSaved(false); }} className="accent-[#d4c3a3]" />
          Use image logo site-wide
        </label>
        <div><button type="submit" className="mt-5 inline-flex items-center gap-2 border border-[#cbb894] px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-[#e1d1b4] hover:bg-[#cbb894] hover:text-obsidian">{saved ? <Check size={13} /> : <Save size={13} />}{saved ? "Logo saved" : "Save logo"}</button></div>
      </div>
      <div className="flex min-h-40 items-center justify-center border border-white/10 bg-[#070707] p-6">
        {useImageLogo && imageUrl ? <img src={imageUrl} alt={text} className="max-h-20 max-w-full object-contain" /> : <span className="font-serif text-3xl tracking-[0.25em]">{text || "TOPSIX"}</span>}
      </div>
    </form>
  );
}

export default function AdminAssetsPage() {
  const { content, updateSiteImage, updateWorldCover, updateBrandLogo, resetContent } = useSiteContent();

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8 md:px-12 md:py-10">
      <header className="mb-9 flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div><span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-[#cbb894]">Studio / Brand system</span><h1 className="font-serif text-3xl sm:text-4xl">Assets & identity</h1><p className="mt-2 max-w-xl text-sm text-white/45">Update campaign imagery, world covers, and the global mark. Changes are saved in this browser.</p></div>
        <button type="button" onClick={resetContent} className="inline-flex items-center gap-2 self-start border border-white/15 px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-white/55 transition-colors hover:border-[#cbb894] hover:text-[#e1d1b4] sm:self-auto"><RotateCcw size={13} /> Restore defaults</button>
      </header>

      <section className="mb-10">
        <LogoSettings key={JSON.stringify(content.brandLogo)} initial={content.brandLogo} onSave={updateBrandLogo} />
      </section>

      <section className="mb-12">
        <div className="mb-5 border-b border-white/10 pb-4"><span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb894]">Campaign system</span><h2 className="mt-1 font-serif text-2xl">Global site imagery</h2></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {imageFields.map((field) => (
            <ImageField key={`${field.key}-${content.siteImages[field.key]}`} label={field.label} description={field.description} value={content.siteImages[field.key]} onSave={(value) => updateSiteImage(field.key, value)} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 border-b border-white/10 pb-4"><span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb894]">The Six Worlds</span><h2 className="mt-1 font-serif text-2xl">Cover photography</h2></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {WORLDS.map((world) => (
            <ImageField key={`${world.id}-${content.worldCovers[world.id]}`} label={world.name} description={world.mood} value={content.worldCovers[world.id] ?? world.image} onSave={(value) => updateWorldCover(world.id, value)} />
          ))}
        </div>
      </section>
    </div>
  );
}