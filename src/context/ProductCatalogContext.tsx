"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PRODUCTS } from "@/data/mock";
import type { Product } from "@/types";

type ProductCatalogValue = {
  products: Product[];
  isLoading: boolean;
  error: string;
  refreshProducts: () => Promise<void>;
};

const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
const ProductCatalogContext = createContext<ProductCatalogValue | null>(null);

async function fetchProducts() {
  const response = await fetch("/api/products", { cache: "no-store" });
  const result = await response.json();
  if (!response.ok || !Array.isArray(result.data)) {
    throw new Error(result.error?.message ?? "The collection could not be loaded.");
  }
  return result.data as Product[];
}

export function ProductCatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(hasSupabaseConfig ? [] : PRODUCTS);
  const [isLoading, setIsLoading] = useState(hasSupabaseConfig);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasSupabaseConfig) return;
    let active = true;
    fetchProducts()
      .then((data) => {
        if (active) setProducts(data);
      })
      .catch((loadError: unknown) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "The collection could not be loaded.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function refreshProducts() {
    if (!hasSupabaseConfig) return;
    setIsLoading(true);
    setError("");
    try {
      setProducts(await fetchProducts());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "The collection could not be loaded.");
      throw loadError;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ProductCatalogContext.Provider value={{ products, isLoading, error, refreshProducts }}>
      {children}
    </ProductCatalogContext.Provider>
  );
}

export function useProductCatalog() {
  const context = useContext(ProductCatalogContext);
  if (!context) throw new Error("useProductCatalog must be used within ProductCatalogProvider");
  return context;
}