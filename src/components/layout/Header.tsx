"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Header() {
  const { items, setIsOpen } = useCart();
  const { language, dictionary, toggleLanguage } = useLanguage();
  const { content } = useSiteContent();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-50 bg-obsidian/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-[1920px] items-center justify-between px-4 md:px-12">
        {/* Left Navigation */}
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-ivory/80 md:flex">
          <Link href="/shop" className="transition-colors hover:text-champagne">{dictionary.header.shop}</Link>
          <Link href="/worlds" className="transition-colors hover:text-champagne">{dictionary.header.worlds}</Link>
          <Link href="/after-dark" className="transition-colors hover:text-champagne">{dictionary.header.afterDark}</Link>
        </nav>

        {/* Center Logo */}
        <Link href="/" aria-label="TOPSIX home" className="absolute left-1/2 -translate-x-1/2">
          {content.brandLogo.useImageLogo && content.brandLogo.imageUrl ? (
            <img src={content.brandLogo.imageUrl} alt={content.brandLogo.text} className="max-h-8 max-w-24 object-contain md:max-h-9 md:max-w-36" />
          ) : (
            <span className="font-serif text-xl uppercase tracking-[0.2em] text-ivory md:text-2xl md:tracking-[0.3em]">{content.brandLogo.text}</span>
          )}
        </Link>

        {/* Right Navigation */}
        <div className="flex items-center gap-2 text-ivory/80 sm:gap-4 md:gap-6">
          <Link href="/club" className="hidden transition-colors hover:text-champagne md:block">
            <span className="text-xs uppercase tracking-[0.2em]">{dictionary.header.club}</span>
          </Link>
          <Link href="/concierge" className="hidden text-[10px] uppercase tracking-[0.16em] text-ivory/55 transition-colors hover:text-champagne lg:block">
            {dictionary.header.concierge}
          </Link>
          <button type="button" aria-label={dictionary.header.search} className="hidden transition-colors hover:text-champagne md:block"><Search size={18} strokeWidth={1.5} /></button>
          <button type="button" aria-label={dictionary.header.account} className="hidden transition-colors hover:text-champagne md:block"><User size={18} strokeWidth={1.5} /></button>
          <button
            type="button"
            aria-label={`${dictionary.header.openBag}${itemCount ? `, ${itemCount}` : ""}`}
            onClick={() => setIsOpen(true)}
            className="relative hover:text-champagne transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {itemCount > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-champagne px-1 text-[9px] text-obsidian">{itemCount}</span>}
          </button>
          <button
            type="button"
            aria-label={language === "ar" ? dictionary.header.switchToEnglish : dictionary.header.switchToArabic}
            aria-pressed={language === "ar"}
            onClick={toggleLanguage}
            className="border-l border-white/15 pl-2 text-[9px] uppercase tracking-[0.12em] transition-colors hover:text-champagne sm:pl-4 sm:text-[10px] sm:tracking-[0.16em]"
          >
            <span className={language === "en" ? "text-champagne" : ""}>EN</span>
            <span className="px-1 text-ivory/35">|</span>
            <span className={language === "ar" ? "text-champagne" : ""}>AR</span>
          </button>
        </div>
      </div>
    </header>
  );
}