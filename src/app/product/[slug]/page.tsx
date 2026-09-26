import { notFound } from "next/navigation";
import ProductPurchase from "@/components/ui/ProductPurchase";
import DynamicImage from "@/components/ui/DynamicImage";
import { PRODUCTS } from "@/data/mock";
import { getSupabaseClient } from "@/lib/supabase";
import type { Product } from "@/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product: Product | undefined;
  const supabase = getSupabaseClient();

  if (supabase) {
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).maybeSingle();
    if (error) {
      console.error("Supabase product lookup failed:", error.code);
      notFound();
    }
    product = data as Product | null ?? undefined;
  } else {
    product = PRODUCTS.find((item) => item.slug === slug);
  }

  if (!product) notFound();

  return (
    <article className="bg-obsidian">
      <div className="mx-auto grid max-w-[1920px] gap-10 px-4 py-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[0, 1].map((index) => (
            <div key={`${product.id}-image-${index}`} className={`overflow-hidden bg-charcoal ${index === 0 ? "md:col-span-2" : ""}`}>
              <DynamicImage
                src={index === 0 ? product.images[0] : undefined}
                siteImage={index === 1 ? "productDetailSecond" : undefined}
                alt={`${product.name}, view ${index + 1}`}
                className={`h-full w-full object-cover ${index === 0 ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[4/5]"}`}
              />
            </div>
          ))}
        </div>

        <div className="md:sticky md:top-28 md:h-fit md:py-8">
          <div className="border-b border-white/10 pb-8">
            <span className="mb-4 block text-[10px] uppercase tracking-[0.28em] text-champagne">
              {product.world} / {product.tags[0] ?? "TOPSIX"}
            </span>
            <h1 className="font-serif text-4xl uppercase leading-tight tracking-[0.12em] md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-sm tracking-[0.1em] text-ivory/70">
              EGP {product.price.toLocaleString()}
            </p>
            <p className="mt-6 max-w-lg font-serif text-xl leading-relaxed text-ivory/65">
              {product.description}
            </p>
            <ProductPurchase product={product} />
          </div>

          <section className="border-b border-white/10 py-8">
            <span className="mb-3 block text-[10px] uppercase tracking-[0.25em] text-champagne">
              The mood
            </span>
            <h2 className="font-serif text-2xl text-ivory">A study in quiet confidence.</h2>
            <p className="mt-3 font-serif text-lg leading-relaxed text-ivory/60">
              {product.description} Made for the moments that belong only to you.
            </p>
          </section>

          <div className="divide-y divide-white/10">
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ivory/80">
                Details & care
                <span className="text-lg text-champagne transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pt-4 font-serif text-base leading-relaxed text-ivory/60">
                Designed with considered details and a soft, close-to-skin feel. Handle with care and follow the garment label for laundering.
              </p>
            </details>
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] uppercase tracking-[0.22em] text-ivory/80">
                Delivery & returns
                <span className="text-lg text-champagne transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pt-4 font-serif text-base leading-relaxed text-ivory/60">
                Discreet packaging, delivered with care. For sizing or order support, our concierge is here to help.
              </p>
            </details>
          </div>
        </div>
      </div>
    </article>
  );
}