"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ar } from "@/dictionaries/ar";
import { en, type Dictionary } from "@/dictionaries/en";

export type Language = "en" | "ar";

type LanguageContextValue = {
  language: Language;
  dictionary: Dictionary;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  function toggleLanguage() {
    const nextLanguage = language === "en" ? "ar" : "en";
    document.documentElement.lang = nextLanguage;
    document.documentElement.dir = nextLanguage === "ar" ? "rtl" : "ltr";
    setLanguage(nextLanguage);
  }

  return (
    <LanguageContext.Provider value={{ language, dictionary: language === "ar" ? ar : en, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}