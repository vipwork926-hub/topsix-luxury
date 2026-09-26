"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { useProductCatalog } from "@/context/ProductCatalogContext";

const currency = new Intl.NumberFormat("en-EG", { maximumFractionDigits: 0 });

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, isOpen, setIsOpen } = useCart();
  const { content } = useSiteContent();
  const { products } = useProductCatalog();

  useEffect(() => {
    if (!isOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, setIsOpen]);

  const bagLines = items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ item, product }] : [];
  });
  const orderText = bagLines
    .map(({ item, product }, index) => `${String(index + 1).padStart(2, "0")} | ${item.quantity} x ${product.name} | ${item.size} | ${item.color}`)
    .join("\n");
  const checkoutNumber = content.storeSettings.whatsappNumber.replace(/\D/g, "");
  const checkoutMessage = `${content.storeSettings.checkoutMessage}\n\n${orderText}\n\nSubtotal: EGP ${currency.format(total)}`;
  const checkoutHref = checkoutNumber
    ? `https://wa.me/${checkoutNumber}?text=${encodeURIComponent(checkoutMessage)}`
    : `https://wa.me/?text=${encodeURIComponent(checkoutMessage)}`;

  return (
    <div className={`fixed inset-0 z-[80] ${isOpen ? "visible" : "invisible"}`} aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close shopping bag"
        onClick={() => setIsOpen(false)}
        className={`absolute inset-0 h-full w-full bg-black/65 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-obsidian shadow-2xl shadow-black/50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-4 py-5 sm:px-6">
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-champagne">TOPSIX / Private bag</span>
            <h2 id="cart-title" className="mt-1 font-serif text-2xl">Your selection</h2>
          </div>
          <button type="button" aria-label="Close shopping bag" onClick={() => setIsOpen(false)} className="p-2 text-ivory/60 transition-colors hover:text-ivory">
            <X size={20} strokeWidth={1.4} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6">
          {bagLines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag size={26} strokeWidth={1.2} className="text-champagne" />
              <p className="mt-5 font-serif text-2xl">Nothing chosen yet.</p>
              <p className="mt-2 max-w-xs text-sm text-ivory/50">Take a moment with the collection. Your pieces will be kept here.</p>
              <Link href="/shop" onClick={() => setIsOpen(false)} className="mt-7 border-b border-champagne pb-2 text-[10px] uppercase tracking-[0.2em] text-ivory hover:text-champagne">
                Explore the collection
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {bagLines.map(({ item, product }) => (
                <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-5">
                  <img src={product.images[0]} alt={product.name} className="h-28 w-20 shrink-0 object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-serif text-lg leading-tight">{product.name}</p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-ivory/45">{item.color} / {item.size}</p>
                      </div>
                      <button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeItem(item.productId, item.size, item.color)} className="p-1 text-ivory/40 transition-colors hover:text-ivory">
                        <Trash2 size={15} strokeWidth={1.4} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div className="flex items-center border border-white/15">
                        <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQty(item.productId, item.size, item.color, item.quantity - 1)} className="p-2 text-ivory/60 hover:text-ivory"><Minus size={12} /></button>
                        <span className="min-w-7 text-center text-xs">{item.quantity}</span>
                        <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => updateQty(item.productId, item.size, item.color, item.quantity + 1)} className="p-2 text-ivory/60 hover:text-ivory"><Plus size={12} /></button>
                      </div>
                      <span className="text-xs tracking-[0.08em]">EGP {currency.format(product.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {bagLines.length > 0 && (
          <footer className="border-t border-white/10 px-4 pb-7 pt-5 sm:px-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ivory/60">Subtotal</span>
              <span className="tracking-[0.08em]">EGP {currency.format(total)}</span>
            </div>
            <p className="mt-2 text-xs text-ivory/40">Delivery and final details are confirmed privately.</p>
            <a href={checkoutHref} target="_blank" rel="noreferrer" className="mt-5 block border border-champagne bg-champagne px-5 py-4 text-center text-[10px] uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-transparent hover:text-champagne">
              Proceed to Private Checkout
            </a>
          </footer>
        )}
      </aside>
    </div>
  );
}