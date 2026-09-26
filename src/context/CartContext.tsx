"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Product } from "@/types";
import { useProductCatalog } from "@/context/ProductCatalogContext";

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, quantity: number) => void;
  total: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "topsix-bag";
const emptyItems: CartItem[] = [];
let previousStorageValue: string | null | undefined;
let previousItems = emptyItems;

function parseStoredItems(storageValue: string | null): CartItem[] {
  try {
    const storedItems: unknown = JSON.parse(storageValue ?? "[]");
    if (!Array.isArray(storedItems)) return [];

    return storedItems.filter(
      (item): item is CartItem =>
        typeof item?.productId === "string" &&
        typeof item?.size === "string" &&
        typeof item?.color === "string" &&
        Number.isInteger(item?.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

function getStoredItems() {
  if (typeof window === "undefined") return emptyItems;
  const storageValue = window.localStorage.getItem(storageKey);
  if (storageValue !== previousStorageValue) {
    previousStorageValue = storageValue;
    previousItems = parseStoredItems(storageValue);
  }
  return previousItems;
}

function subscribeToCart(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("topsix-cart-change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("topsix-cart-change", onChange);
  };
}

function saveCartItems(items: CartItem[]) {
  const storageValue = JSON.stringify(items);
  window.localStorage.setItem(storageKey, storageValue);
  previousStorageValue = storageValue;
  previousItems = items;
  window.dispatchEvent(new Event("topsix-cart-change"));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { products } = useProductCatalog();
  const items = useSyncExternalStore(subscribeToCart, getStoredItems, () => emptyItems);
  const [isOpen, setIsOpen] = useState(false);

  function addItem(product: Product, size: string, color: string) {
    const currentItems = getStoredItems();
    const matchingItem = currentItems.find(
      (item) => item.productId === product.id && item.size === size && item.color === color,
    );
    const nextItems = matchingItem
      ? currentItems.map((item) => item === matchingItem ? { ...item, quantity: item.quantity + 1 } : item)
      : [...currentItems, { productId: product.id, size, color, quantity: 1 }];
    saveCartItems(nextItems);
  }

  function removeItem(productId: string, size: string, color: string) {
    saveCartItems(
      getStoredItems().filter(
        (item) => !(item.productId === productId && item.size === size && item.color === color),
      ),
    );
  }

  function updateQty(productId: string, size: string, color: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId, size, color);
      return;
    }

    saveCartItems(
      getStoredItems().map((item) =>
        item.productId === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item,
      ),
    );
  }

  const total = items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, total, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}