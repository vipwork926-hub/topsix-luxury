"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ProductPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [added, setAdded] = useState(false);
  const { addItem, setIsOpen } = useCart();

  function addToBag() {
    addItem(product, size, color);
    setAdded(true);
    setIsOpen(true);
  }

  return (
    <div className="mt-9 space-y-8">
      {product.colors.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-[10px] uppercase tracking-[0.22em] text-ivory/55">
            Color <span className="text-ivory">/ {color}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={color === option}
                onClick={() => {
                  setColor(option);
                  setAdded(false);
                }}
                className={`border px-4 py-2 text-xs transition-colors ${color === option ? "border-champagne text-champagne" : "border-white/15 text-ivory/65 hover:border-white/40"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {product.sizes.length > 0 && (
        <fieldset>
          <legend className="mb-3 text-[10px] uppercase tracking-[0.22em] text-ivory/55">
            Select size <span className="text-ivory">/ {size}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                onClick={() => {
                  setSize(option);
                  setAdded(false);
                }}
                className={`grid h-11 min-w-11 place-items-center border px-3 text-xs transition-colors ${size === option ? "border-champagne text-champagne" : "border-white/15 text-ivory/65 hover:border-white/40"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <button
        type="button"
        onClick={addToBag}
        disabled={!product.inStock}
        className="w-full border border-champagne bg-champagne px-6 py-4 text-[10px] uppercase tracking-[0.25em] text-obsidian transition-colors hover:bg-transparent hover:text-champagne disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-ivory/40"
      >
        {!product.inStock ? "Currently unavailable" : added ? "Added to bag" : "Add to bag"}
      </button>
      <p aria-live="polite" className="min-h-4 text-center text-xs text-champagne">
        {added ? "Your selection is in the bag." : "Complimentary delivery on orders over EGP 5,000"}
      </p>
    </div>
  );
}