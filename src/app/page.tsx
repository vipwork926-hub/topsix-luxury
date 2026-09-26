"use client";

import Hero from "@/components/home/Hero";
import BrandStory from "@/components/home/BrandStory";
import SixWorlds from "@/components/home/SixWorlds";
import PackagingSection from "@/components/home/PackagingSection";
import LocalizedPhrase from "@/components/home/LocalizedPhrase";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useProductCatalog } from "@/context/ProductCatalogContext";

export default function Home() {
  const { dictionary } = useLanguage();
  const { products, isLoading } = useProductCatalog();

  return (
    <>
    <div className="bg-obsidian w-full min-h-screen">
      <Hero />
      <BrandStory />
      <SixWorlds />

      {/* Featured Pieces */}
      <section className="mx-auto max-w-[1920px] px-4 py-20 md:px-12 md:py-32">
        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
          <div>
            <span className="mb-2 block text-xs uppercase tracking-[0.3em] text-champagne">
              {dictionary.home.featuredEyebrow}
            </span>
            <h2 className="font-serif text-3xl uppercase tracking-[0.15em] text-ivory md:text-4xl">
              {dictionary.home.featuredTitle}
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs tracking-[0.2em] uppercase border-b border-champagne pb-1 text-ivory/80 hover:text-champagne transition-colors"
          >
            {dictionary.home.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length === 0 && <p className="py-10 text-center font-serif text-lg text-ivory/55">{isLoading ? "Your selection is being prepared." : dictionary.shop.empty}</p>}
      </section>

      <PackagingSection />

      {/* After Dark Editorial Teaser */}
      <section className="border-t border-white/5 bg-gradient-to-b from-obsidian to-plum/40 px-4 py-20 text-center md:py-32">
        <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-wine">
          {dictionary.home.editorial}
        </span>
        <h2 className="mb-6 font-serif text-4xl uppercase tracking-[0.15em] text-ivory md:text-5xl">
          {dictionary.home.afterDark}
        </h2>
        <div className="mb-10"><LocalizedPhrase /></div>
        <Link href="/after-dark" className="inline-block border border-wine px-10 py-3 text-xs uppercase tracking-[0.25em] text-ivory transition-all duration-300 hover:border-wine hover:bg-wine">
          {dictionary.home.enterAfterDark}
        </Link>
      </section>
    </div>
    <Footer />
    </>
  );
}