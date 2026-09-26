"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const { content } = useSiteContent();
  const { dictionary } = useLanguage();
  const footerLinks = [
    { label: dictionary.footer.links.shop, href: "/shop" },
    { label: dictionary.footer.links.worlds, href: "/worlds" },
    { label: dictionary.footer.links.afterDark, href: "/after-dark" },
    { label: dictionary.footer.links.club, href: "/club" },
    { label: dictionary.footer.links.faq, href: "/customer/faq" },
    { label: dictionary.footer.links.sizeGuide, href: "/customer/size-guide" },
    { label: dictionary.footer.links.returns, href: "/customer/returns" },
  ];

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer className="border-t border-white/10 bg-obsidian px-4 pb-8 pt-16 md:px-12 md:pt-20">
      <div className="mx-auto grid max-w-[1920px] gap-14 md:grid-cols-[1.2fr_0.8fr] md:gap-20">
        <div className="max-w-xl">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.3em] text-champagne">
            {dictionary.footer.newsletterEyebrow}
          </span>
          <h2 className="font-serif text-3xl uppercase tracking-[0.12em] text-ivory md:text-4xl">
            {dictionary.footer.newsletterTitle}
          </h2>
          <p className="mt-4 max-w-md font-serif text-lg text-ivory/60">
            {dictionary.footer.newsletterBody}
          </p>
          <form onSubmit={handleSubscribe} className="mt-8 flex max-w-lg border-b border-white/25">
            <label htmlFor="newsletter-email" className="sr-only">
              {dictionary.footer.emailAddress}
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder={dictionary.footer.emailPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-4 text-sm text-ivory outline-none placeholder:text-ivory/40"
            />
            <button
              type="submit"
              aria-label="Subscribe to the private list"
              className="ml-4 inline-flex items-center gap-2 py-4 text-[10px] uppercase tracking-[0.2em] text-champagne transition-colors hover:text-ivory"
            >
              {subscribed ? dictionary.footer.joined : dictionary.footer.join}
              {!subscribed && <ArrowUpRight size={15} strokeWidth={1.5} />}
            </button>
          </form>
          <p aria-live="polite" className="mt-3 min-h-4 text-xs text-champagne">
            {subscribed ? dictionary.footer.thankYou : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:justify-self-end md:gap-20">
          <div>
            <h3 className="mb-5 text-[10px] uppercase tracking-[0.25em] text-ivory/40">
              {dictionary.footer.discover}
            </h3>
            <nav className="flex flex-col items-start gap-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-ivory/75 transition-colors hover:text-champagne"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="mb-5 text-[10px] uppercase tracking-[0.25em] text-ivory/40">
              {dictionary.footer.follow}
            </h3>
            <nav className="flex flex-col items-start gap-4">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="text-sm text-ivory/75 transition-colors hover:text-champagne">
                {dictionary.footer.instagram}
              </a>
              <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" className="text-sm text-ivory/75 transition-colors hover:text-champagne">
                {dictionary.footer.pinterest}
              </a>
              <Link href="/contact" className="text-sm text-ivory/75 transition-colors hover:text-champagne">
                {dictionary.footer.contact}
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1920px] flex-col gap-3 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.18em] text-ivory/40 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" aria-label="TOPSIX home" className="text-ivory/70 transition-colors hover:text-champagne">
          {content.brandLogo.useImageLogo && content.brandLogo.imageUrl ? (
            <img src={content.brandLogo.imageUrl} alt={content.brandLogo.text} className="max-h-8 max-w-32 object-contain" />
          ) : (
            <span className="font-serif text-lg tracking-[0.25em]">{content.brandLogo.text}</span>
          )}
        </Link>
        <span>© {new Date().getFullYear()} {content.brandLogo.text}</span>
        <span>{dictionary.footer.signoff}</span>
      </div>
    </footer>
  );
}