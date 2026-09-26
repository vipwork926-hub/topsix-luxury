"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { SITE_CONTENT_DEFAULTS, type SiteContent, type SiteImageKey } from "@/data/content";

type SiteContentContextValue = {
  content: SiteContent;
  updateSiteImage: (key: SiteImageKey, value: string) => void;
  updateWorldCover: (id: string, value: string) => void;
  updateBrandLogo: (updates: Partial<SiteContent["brandLogo"]>) => void;
  updateStoreSettings: (updates: Partial<SiteContent["storeSettings"]>) => void;
  resetContent: () => void;
};

const storageKey = "topsix-site-content";
const changeEvent = "topsix-content-change";
const SiteContentContext = createContext<SiteContentContextValue | null>(null);
let previousStorageValue: string | null | undefined;
let previousContent = SITE_CONTENT_DEFAULTS;

function readSiteContent(storageValue: string | null): SiteContent {
  if (!storageValue) return SITE_CONTENT_DEFAULTS;

  try {
    const saved = JSON.parse(storageValue) as Partial<SiteContent>;
    return {
      brandLogo: { ...SITE_CONTENT_DEFAULTS.brandLogo, ...saved.brandLogo },
      siteImages: { ...SITE_CONTENT_DEFAULTS.siteImages, ...saved.siteImages },
      worldCovers: { ...SITE_CONTENT_DEFAULTS.worldCovers, ...saved.worldCovers },
      productImages: SITE_CONTENT_DEFAULTS.productImages,
      storeSettings: { ...SITE_CONTENT_DEFAULTS.storeSettings, ...saved.storeSettings },
    };
  } catch {
    return SITE_CONTENT_DEFAULTS;
  }
}

function getContentSnapshot() {
  if (typeof window === "undefined") return SITE_CONTENT_DEFAULTS;

  try {
    const storageValue = window.localStorage.getItem(storageKey);
    if (storageValue !== previousStorageValue) {
      previousStorageValue = storageValue;
      previousContent = readSiteContent(storageValue);
    }
  } catch {
    return previousContent;
  }

  return previousContent;
}

function subscribeToContent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

function saveContent(content: SiteContent) {
  const storageValue = JSON.stringify(content);
  window.localStorage.setItem(storageKey, storageValue);
  previousStorageValue = storageValue;
  previousContent = content;
  window.dispatchEvent(new Event(changeEvent));
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const content = useSyncExternalStore(
    subscribeToContent,
    getContentSnapshot,
    () => SITE_CONTENT_DEFAULTS,
  );

  function updateSiteImage(key: SiteImageKey, value: string) {
    const current = getContentSnapshot();
    saveContent({ ...current, siteImages: { ...current.siteImages, [key]: value } });
  }

  function updateWorldCover(id: string, value: string) {
    const current = getContentSnapshot();
    saveContent({ ...current, worldCovers: { ...current.worldCovers, [id]: value } });
  }

  function updateBrandLogo(updates: Partial<SiteContent["brandLogo"]>) {
    const current = getContentSnapshot();
    saveContent({ ...current, brandLogo: { ...current.brandLogo, ...updates } });
  }

  function updateStoreSettings(updates: Partial<SiteContent["storeSettings"]>) {
    const current = getContentSnapshot();
    saveContent({ ...current, storeSettings: { ...current.storeSettings, ...updates } });
  }

  function resetContent() {
    window.localStorage.removeItem(storageKey);
    previousStorageValue = null;
    previousContent = SITE_CONTENT_DEFAULTS;
    window.dispatchEvent(new Event(changeEvent));
  }

  return (
    <SiteContentContext.Provider value={{ content, updateSiteImage, updateWorldCover, updateBrandLogo, updateStoreSettings, resetContent }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error("useSiteContent must be used within SiteContentProvider");
  return context;
}