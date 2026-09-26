"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LocalizedPhrase() {
  const { language, dictionary } = useLanguage();

  return (
    <p dir={language === "ar" ? "rtl" : "ltr"} className="font-serif text-xl italic text-ivory/70">
      {dictionary.home.afterDarkPhrase}
    </p>
  );
}