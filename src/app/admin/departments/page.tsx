"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { DEPARTMENTS, WORLDS } from "@/data/mock";
import { useProductCatalog } from "@/context/ProductCatalogContext";

export default function AdminDepartmentsPage() {
  const { products } = useProductCatalog();
  const [visibleDepartments, setVisibleDepartments] = useState(() => new Set(DEPARTMENTS.filter((department) => department.visible).map((department) => department.id)));
  const [visibleWorlds, setVisibleWorlds] = useState(() => new Set(WORLDS.map((world) => world.id)));

  function toggleDepartment(id: string) {
    setVisibleDepartments((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleWorld(id: string) {
    setVisibleWorlds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-7 sm:px-8 md:px-12 md:py-10">
      <header className="mb-9 border-b border-white/10 pb-7">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-[#cbb894]">Store structure / Visibility</span>
        <h1 className="font-serif text-3xl sm:text-4xl">Departments & worlds</h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/45">Control which collections appear in the storefront and review the pieces grouped within each.</p>
      </header>

      <section className="border border-white/10">
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb894]">Shop navigation</span>
          <h2 className="mt-1 font-serif text-xl">Departments</h2>
        </div>
        <div className="divide-y divide-white/10">
          {DEPARTMENTS.map((department) => {
            const count = products.filter((product) => product.category === department.name).length;
            const visible = visibleDepartments.has(department.id);
            return (
              <div key={department.id} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <div><p className="text-sm">{department.name}</p><p className="mt-1 text-xs text-white/40">{count} {count === 1 ? "piece" : "pieces"}</p></div>
                <button type="button" aria-pressed={visible} onClick={() => toggleDepartment(department.id)} className={`inline-flex min-w-28 items-center justify-center gap-2 border px-3 py-2 text-[9px] uppercase tracking-[0.16em] transition-colors ${visible ? "border-emerald-200/25 text-emerald-100/75" : "border-white/10 text-white/40"}`}>
                  {visible ? <Eye size={14} /> : <EyeOff size={14} />}{visible ? "Visible" : "Hidden"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section id="worlds" className="mt-7 border border-white/10">
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb894]">Editorial collections</span>
          <h2 className="mt-1 font-serif text-xl">The Six Worlds</h2>
        </div>
        <div className="divide-y divide-white/10">
          {WORLDS.map((world) => {
            const count = products.filter((product) => product.world.toLowerCase() === world.name.toLowerCase()).length;
            const visible = visibleWorlds.has(world.id);
            return (
              <div key={world.id} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] tracking-[0.18em] text-white/35">{world.id}</span>
                  <div><p className="text-sm">{world.name}</p><p className="mt-1 text-xs text-white/40">{count} {count === 1 ? "piece" : "pieces"} / {world.mood}</p></div>
                </div>
                <button type="button" aria-pressed={visible} onClick={() => toggleWorld(world.id)} className={`inline-flex min-w-28 items-center justify-center gap-2 border px-3 py-2 text-[9px] uppercase tracking-[0.16em] transition-colors ${visible ? "border-emerald-200/25 text-emerald-100/75" : "border-white/10 text-white/40"}`}>
                  {visible ? <Eye size={14} /> : <EyeOff size={14} />}{visible ? "Visible" : "Hidden"}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}