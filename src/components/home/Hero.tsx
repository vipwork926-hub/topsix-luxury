"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import DynamicImage from "@/components/ui/DynamicImage";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { dictionary } = useLanguage();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-charcoal">
        <div className="absolute inset-0 bg-obsidian/40 z-10" />
        <DynamicImage
          siteImage="homeHero"
          alt="TOPSIX Mood" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 flex flex-col items-center pt-20">
        <span className="mb-5 text-[10px] uppercase tracking-[0.28em] text-champagne md:text-xs">
          {dictionary.home.brandTagline}
        </span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory tracking-[0.1em] mb-6 uppercase"
        >
          {dictionary.home.heroTitle}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-champagne font-serif text-xl md:text-2xl mb-12 italic tracking-wider"
        >
          {dictionary.home.heroSubtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/concierge" className="bg-ivory px-8 py-3 text-sm uppercase tracking-[0.2em] text-obsidian transition-colors duration-300 hover:bg-champagne">
            {dictionary.home.heroPrimary}
          </Link>
          <Link href="/shop" className="border border-ivory px-8 py-3 text-sm uppercase tracking-[0.2em] text-ivory transition-colors duration-300 hover:bg-ivory/10">
            {dictionary.home.heroSecondary}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}