"use client";

import { MessageCircle } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export default function WhatsAppConcierge() {
  const { content } = useSiteContent();
  const number = content.storeSettings.whatsappNumber.replace(/\D/g, "");
  const message = encodeURIComponent(content.storeSettings.conciergeMessage);
  const whatsappUrl = number ? `https://wa.me/${number}?text=${message}` : `https://wa.me/?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with the TOPSIX Concierge on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 items-center gap-3 border border-white/15 bg-charcoal/95 px-4 text-ivory shadow-xl shadow-black/30 backdrop-blur transition-colors hover:border-champagne/60 hover:text-champagne"
    >
      <MessageCircle size={18} strokeWidth={1.5} />
      <span className="text-[10px] uppercase tracking-[0.2em]">Concierge</span>
    </a>
  );
}