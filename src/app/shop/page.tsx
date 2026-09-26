"use client";

import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import DynamicImage from "@/components/ui/DynamicImage";
import { useLanguage } from "@/context/LanguageContext";
import { useProductCatalog } from "@/context/ProductCatalogContext";

export default function ShopPage() {
  const { dictionary, language } = useLanguage();
  const { products, isLoading, error } = useProductCatalog();

  return (
    <div className="min-h-screen bg-obsidian">
      <section className="relative flex min-h-[52vh] items-end overflow-hidden border-b border-white/10 px-4 pb-12 pt-24 md:min-h-[62vh] md:px-12 md:pb-16">
        <DynamicImage
          siteImage="shopHero"
          alt={dictionary.shop.heroTitle}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/10" />
        <div className="relative mx-auto w-full max-w-[1920px]">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.32em] text-champagne">
            {dictionary.shop.heroEyebrow}
          </span>
          <h1 dir={language === "ar" ? "rtl" : "ltr"} className="max-w-3xl font-serif text-5xl uppercase leading-[0.95] tracking-[0.12em] text-ivory md:text-7xl">
            {dictionary.shop.heroTitle}
          </h1>
          <p className="mt-6 max-w-lg font-serif text-xl text-ivory/70">
            {dictionary.shop.heroBody}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1920px] px-4 py-16 md:px-12 md:py-24">
        <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-2 block text-[10px] uppercase tracking-[0.28em] text-champagne">
              {dictionary.shop.introEyebrow}
            </span>
            <h2 className="font-serif text-3xl uppercase tracking-[0.12em] md:text-4xl">
              {dictionary.shop.title}
            </h2>
          </div>
          <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-ivory/55">
            <span>{String(products.length).padStart(2, "0")} {dictionary.shop.pieceCount}</span>
            <Link href="/after-dark" className="border-b border-champagne/60 pb-1 text-ivory transition-colors hover:text-champagne">
              {dictionary.shop.readAfterDark}
            </Link>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-20 text-center font-serif text-xl text-ivory/60">
            {isLoading ? "The collection is being prepared." : error || dictionary.shop.empty}
          </p>
        )}
      </section>
    </div>
  );
}