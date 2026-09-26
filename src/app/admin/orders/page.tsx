import { ArrowUpRight } from "lucide-react";
import { CONCIERGE_REQUESTS, ORDERS } from "@/data/mock";

const currency = new Intl.NumberFormat("en-EG", { maximumFractionDigits: 0 });

export default function AdminOrdersPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8 md:px-12 md:py-10">
      <header className="mb-9 border-b border-white/10 pb-7">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-[#cbb894]">Client care / Fulfilment</span>
        <h1 className="font-serif text-3xl sm:text-4xl">Orders & requests</h1>
        <p className="mt-2 text-sm text-white/45">A considered response begins with knowing who is waiting.</p>
      </header>

      <section className="border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div><span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb894]">Storefront</span><h2 className="mt-1 font-serif text-xl">Customer orders</h2></div>
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">{ORDERS.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead><tr className="border-b border-white/10 text-[9px] uppercase tracking-[0.17em] text-white/40"><th className="px-5 py-3 font-normal">Order</th><th className="px-5 py-3 font-normal">Customer</th><th className="px-5 py-3 font-normal">Pieces</th><th className="px-5 py-3 font-normal">Total</th><th className="px-5 py-3 font-normal">Status</th><th className="px-5 py-3 font-normal">Placed</th></tr></thead>
            <tbody className="divide-y divide-white/10">
              {ORDERS.map((order) => (
                <tr key={order.id} className="text-xs text-white/70">
                  <td className="px-5 py-4 text-[#d8c7a7]">{order.id}</td>
                  <td className="px-5 py-4"><p className="text-white/85">{order.customer}</p><a href={`mailto:${order.email}`} className="mt-1 block text-[10px] text-white/40 hover:text-white/70">{order.email}</a></td>
                  <td className="max-w-52 px-5 py-4 leading-relaxed">{order.productNames.join(", ")}</td>
                  <td className="whitespace-nowrap px-5 py-4">EGP {currency.format(order.total)}</td>
                  <td className="px-5 py-4"><span className="border border-white/10 px-2 py-1 text-[9px] uppercase tracking-[0.1em]">{order.status}</span></td>
                  <td className="whitespace-nowrap px-5 py-4 text-white/45">{order.placedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-7 border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div><span className="text-[9px] uppercase tracking-[0.2em] text-[#cbb894]">Personal styling</span><h2 className="mt-1 font-serif text-xl">Concierge requests</h2></div>
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/40">{CONCIERGE_REQUESTS.length} records</span>
        </div>
        <div className="divide-y divide-white/10">
          {CONCIERGE_REQUESTS.map((request) => (
            <article key={request.id} className="grid gap-4 px-5 py-5 md:grid-cols-[1fr_1fr_0.8fr_auto] md:items-center md:px-6">
              <div><p className="text-sm">{request.name}</p><p className="mt-1 text-xs text-white/40">{request.email}</p></div>
              <div><span className="text-[9px] uppercase tracking-[0.15em] text-white/35">Mood / occasion</span><p className="mt-1 text-xs text-white/70">{request.mood} / {request.occasion}</p></div>
              <div><span className="text-[9px] uppercase tracking-[0.15em] text-white/35">Received</span><p className="mt-1 text-xs text-white/70">{request.receivedAt}</p></div>
              <a href={`https://wa.me/${request.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#d8c7a7] hover:text-white">Reply on WhatsApp <ArrowUpRight size={13} /></a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}