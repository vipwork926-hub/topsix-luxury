"use client";

import { useState, type FormEvent } from "react";
import { Check, Save } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export default function AdminSettingsPage() {
  const { content, updateStoreSettings } = useSiteContent();
  const [whatsappNumber, setWhatsappNumber] = useState(content.storeSettings.whatsappNumber);
  const [conciergeMessage, setConciergeMessage] = useState(content.storeSettings.conciergeMessage);
  const [checkoutMessage, setCheckoutMessage] = useState(content.storeSettings.checkoutMessage);
  const [saved, setSaved] = useState(false);

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateStoreSettings({
      whatsappNumber: whatsappNumber.replace(/\D/g, ""),
      conciergeMessage: conciergeMessage.trim(),
      checkoutMessage: checkoutMessage.trim(),
    });
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-7 sm:px-8 md:px-12 md:py-10">
      <header className="mb-9 border-b border-white/10 pb-7">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-[#cbb894]">Studio / Store configuration</span>
        <h1 className="font-serif text-3xl sm:text-4xl">Settings</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/45">Manage the number and messages used by the private concierge and checkout links.</p>
      </header>

      <section className="border border-white/10">
        <div className="border-b border-white/10 px-5 py-4 sm:px-7">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb894]">Contact & checkout configuration</span>
          <h2 className="mt-1 font-serif text-2xl">WhatsApp concierge</h2>
        </div>
        <form onSubmit={saveSettings} className="space-y-7 px-5 py-6 sm:px-7 sm:py-8">
          <label className="block max-w-xl">
            <span className="mb-2 block text-[9px] uppercase tracking-[0.17em] text-white/50">WhatsApp number / country code included</span>
            <input type="tel" inputMode="numeric" autoComplete="tel" required value={whatsappNumber} onChange={(event) => { setWhatsappNumber(event.target.value); setSaved(false); }} placeholder="201000000000" className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none focus:border-[#cbb894]" />
            <span className="mt-2 block text-[11px] text-white/35">Digits only are sent to WhatsApp. Example: 201000000000.</span>
          </label>
          <label className="block">
            <span className="mb-2 block text-[9px] uppercase tracking-[0.17em] text-white/50">Concierge default message</span>
            <textarea required rows={3} value={conciergeMessage} onChange={(event) => { setConciergeMessage(event.target.value); setSaved(false); }} className="w-full resize-y border border-white/15 bg-transparent px-3 py-3 text-sm leading-relaxed outline-none focus:border-[#cbb894]" />
          </label>
          <label className="block">
            <span className="mb-2 block text-[9px] uppercase tracking-[0.17em] text-white/50">Checkout opening message</span>
            <textarea required rows={3} value={checkoutMessage} onChange={(event) => { setCheckoutMessage(event.target.value); setSaved(false); }} className="w-full resize-y border border-white/15 bg-transparent px-3 py-3 text-sm leading-relaxed outline-none focus:border-[#cbb894]" />
          </label>
          <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p aria-live="polite" className="min-h-4 text-xs text-emerald-200/80">{saved ? "Settings saved and applied across the site." : "Changes take effect as soon as you save."}</p>
            <button type="submit" className="inline-flex items-center justify-center gap-2 border border-[#cbb894] bg-[#cbb894] px-5 py-3 text-[9px] uppercase tracking-[0.16em] text-[#090909] transition-colors hover:bg-transparent hover:text-[#e1d1b4]">{saved ? <Check size={14} /> : <Save size={14} />}{saved ? "Saved" : "Save settings"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}