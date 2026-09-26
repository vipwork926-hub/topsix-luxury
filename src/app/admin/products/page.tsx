"use client";

import { useState, type FormEvent } from "react";
import { Plus, Search, X } from "lucide-react";
import { CATEGORIES, WORLDS } from "@/data/mock";
import { useProductCatalog } from "@/context/ProductCatalogContext";

const sizes = ["XS", "S", "M", "L", "XL"];
const currency = new Intl.NumberFormat("en-EG", { maximumFractionDigits: 0 });

export default function AdminProductsPage() {
  const { products, isLoading, error: catalogError, refreshProducts } = useProductCatalog();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.category} ${product.world}`.toLowerCase().includes(search.toLowerCase()),
  );

  async function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("title") ?? "").trim();
    const category = String(form.get("category"));
    const world = String(form.get("world") ?? "The Muse");
    const price = Number(form.get("price"));
    const tags = String(form.get("tags") ?? "").split(",").map((tag) => tag.trim()).filter(Boolean);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const image = WORLDS.find((entry) => entry.name.toLowerCase() === world.toLowerCase())?.image ?? "";
    setIsSaving(true);
    setFormError("");

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
      slug,
      name,
      description: String(form.get("description") ?? "").trim(),
      price,
      images: [image],
      category,
      sizes,
      colors: ["Obsidian"],
      world,
      occasion: ["After Dark"],
      tags,
      stock: 6,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error?.message ?? "The product could not be saved.");

      await refreshProducts();
      setIsModalOpen(false);
      formElement.reset();
    } catch (saveError) {
      setFormError(saveError instanceof Error ? saveError.message : "The product could not be saved.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8 md:px-12 md:py-10">
      <header className="mb-8 flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-[#cbb894]">Inventory / Catalogue</span>
          <h1 className="font-serif text-3xl sm:text-4xl">Products</h1>
          <p className="mt-2 text-sm text-white/45">{products.length} pieces in your collection</p>
        </div>
        <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center gap-2 border border-[#cbb894] px-5 py-3 text-[10px] uppercase tracking-[0.17em] text-[#e1d1b4] transition-colors hover:bg-[#cbb894] hover:text-[#090909]">
          <Plus size={15} /> Add new product
        </button>
      </header>

      {(catalogError || formError) && <p role="alert" className="mb-5 border border-rose-200/15 px-4 py-3 text-xs text-rose-200/80">{formError || catalogError}</p>}

      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <label className="flex max-w-sm items-center gap-3 border-b border-white/15 py-2 text-white/45">
          <Search size={15} />
          <span className="sr-only">Search products</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search inventory" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35" />
        </label>
        <span className="text-[10px] uppercase tracking-[0.17em] text-white/35">{visibleProducts.length} shown</span>
      </div>

      <div className="overflow-x-auto border border-white/10">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.18em] text-white/40">
              <th className="px-4 py-4 font-normal">Piece</th>
              <th className="px-4 py-4 font-normal">Category</th>
              <th className="px-4 py-4 font-normal">World</th>
              <th className="px-4 py-4 font-normal">Price</th>
              <th className="px-4 py-4 font-normal">Stock</th>
              <th className="px-4 py-4 font-normal">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {visibleProducts.map((product) => (
              <tr key={product.id} className="text-sm text-white/75">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" className="h-12 w-10 object-cover" />
                    <div><p>{product.name}</p><p className="mt-1 text-[10px] text-white/35">{product.slug}</p></div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs">{product.category}</td>
                <td className="px-4 py-3 text-xs">{product.world}</td>
                <td className="px-4 py-3 text-xs">EGP {currency.format(product.price)}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] ${product.stock === 0 ? "text-rose-300" : product.stock < 5 ? "text-amber-200" : "text-emerald-200"}`}>
                    {product.stock === 0 ? "Out of stock" : product.stock < 5 ? `Low / ${product.stock}` : `In stock / ${product.stock}`}
                  </span>
                </td>
                <td className="px-4 py-3 text-[9px] uppercase tracking-[0.12em] text-[#cbb894]">{product.tags.join(", ") || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleProducts.length === 0 && <p className="px-5 py-12 text-center text-sm text-white/40">{isLoading ? "Loading inventory…" : "No pieces match that search."}</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4">
          <section role="dialog" aria-modal="true" aria-labelledby="new-product-title" className="my-8 w-full max-w-2xl border border-white/15 bg-[#101010] shadow-2xl shadow-black/60">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
              <div><span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb894]">Inventory / New entry</span><h2 id="new-product-title" className="mt-1 font-serif text-2xl">Add a product</h2></div>
              <button type="button" aria-label="Close product form" onClick={() => setIsModalOpen(false)} className="p-2 text-white/50 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={addProduct} className="grid gap-5 px-5 py-6 md:grid-cols-2 sm:px-7">
              <label className="sm:col-span-2"><span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-white/50">Title</span><input name="title" required maxLength={80} className="w-full border border-white/15 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#cbb894]" /></label>
              <label><span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-white/50">Price / EGP</span><input name="price" type="number" min="1" step="1" required className="w-full border border-white/15 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#cbb894]" /></label>
              <label><span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-white/50">Category</span><select name="category" required className="w-full border border-white/15 bg-[#101010] px-3 py-3 text-sm outline-none focus:border-[#cbb894]">{CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label><span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-white/50">World</span><select name="world" required className="w-full border border-white/15 bg-[#101010] px-3 py-3 text-sm outline-none focus:border-[#cbb894]">{WORLDS.map((world) => <option key={world.id} value={world.name.replace("THE ", "The ")}>{world.name}</option>)}</select></label>
              <label><span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-white/50">Tags / comma separated</span><input name="tags" placeholder="LIMITED, TOPSIX EDIT" className="w-full border border-white/15 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#cbb894]" /></label>
              <label className="sm:col-span-2"><span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-white/50">Description</span><textarea name="description" required rows={4} className="w-full resize-y border border-white/15 bg-transparent px-3 py-3 text-sm outline-none focus:border-[#cbb894]" /></label>
              <div className="flex justify-end gap-3 border-t border-white/10 pt-5 sm:col-span-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-white/55 hover:text-white">Cancel</button>
                <button type="submit" disabled={isSaving} className="border border-[#cbb894] bg-[#cbb894] px-5 py-3 text-[9px] uppercase tracking-[0.16em] text-[#090909] hover:bg-transparent hover:text-[#e1d1b4] disabled:opacity-60">{isSaving ? "Saving" : "Save product"}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}