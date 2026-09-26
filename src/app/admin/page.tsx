"use client";

import Link from "next/link";
import { ArrowUpRight, Package, ShoppingCart, Users } from "lucide-react";
import { WORLDS } from "@/data/mock";
import { useProductCatalog } from "@/context/ProductCatalogContext";

export default function AdminPage() {
  const { products, isLoading, error } = useProductCatalog();
  const summary = [
    { label: "Products", value: String(products.length).padStart(2, "0"), icon: Package },
    { label: "Orders", value: "--", icon: ShoppingCart },
    { label: "Club members", value: "--", icon: Users },
  ];

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8 md:px-12 md:py-10">
      <header id="overview" className="mb-9 flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-[#cbb894]">Back office / Overview</span>
          <h1 className="font-serif text-3xl tracking-wide sm:text-4xl">Good evening.</h1>
        </div>
        <span className="text-xs text-white/40">TOPSIX Studio</span>
      </header>

      <section aria-label="Store summary" className="grid grid-cols-1 border border-white/10 md:grid-cols-3">
        {summary.map(({ label, value, icon: Icon }, index) => (
          <div key={label} className={`flex items-center justify-between p-5 sm:p-6 ${index > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}`}>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</p>
              <p className="mt-2 font-serif text-3xl">{value}</p>
            </div>
            <Icon size={18} strokeWidth={1.4} className="text-[#cbb894]" />
          </div>
        ))}
      </section>

      <section id="products" className="mt-10 scroll-mt-6 border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#cbb894]">Inventory</span>
            <h2 className="mt-1 font-serif text-xl">Products</h2>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white">
            View storefront <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-white/10">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="text-sm">{product.name}</p>
                <p className="mt-1 text-xs text-white/40">{product.world} · {product.slug}</p>
              </div>
              <div className="flex items-center gap-6 text-xs text-white/55">
                <span>EGP {product.price.toLocaleString()}</span>
                <span className={product.inStock ? "text-emerald-300/80" : "text-rose-300/80"}>
                  {product.inStock ? "In stock" : "Unavailable"}
                </span>
              </div>
            </div>
          ))}
          {products.length === 0 && <p className="px-6 py-8 text-sm text-white/45">{error || (isLoading ? "Loading products…" : "No products to display.")}</p>}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section id="orders" className="scroll-mt-6 border border-white/10">
          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#cbb894]">Fulfilment</span>
            <h2 className="mt-1 font-serif text-xl">Orders</h2>
          </div>
          <p className="px-5 py-7 text-sm text-white/40 sm:px-6">Order management will appear here when commerce is connected.</p>
        </section>

        <section id="worlds" className="scroll-mt-6 border border-white/10">
          <div className="border-b border-white/10 px-5 py-4 sm:px-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#cbb894]">Editorial collections</span>
            <h2 className="mt-1 font-serif text-xl">The Six Worlds</h2>
          </div>
          <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {WORLDS.map((world) => (
              <div key={world.id} className="p-4 sm:p-5">
                <span className="text-[9px] tracking-[0.18em] text-white/35">{world.id}</span>
                <p className="mt-2 text-xs uppercase tracking-[0.13em]">{world.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="club" className="mt-6 scroll-mt-6 border border-white/10">
        <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#cbb894]">Community</span>
            <h2 className="mt-1 font-serif text-xl">TOPSIX Club</h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-white/45">
            Membership and private-list tools will live here. Connect a customer platform to manage member profiles and invitations.
          </p>
        </div>
      </section>
    </div>
  );
}