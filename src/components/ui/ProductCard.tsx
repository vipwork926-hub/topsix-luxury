"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/product/${product.slug}`} className="group block cursor-pointer">
        <div className="relative mb-5 aspect-[3/4] overflow-hidden bg-charcoal">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          {product.tags.length > 0 && (
            <div className="absolute left-4 top-4 border border-white/10 bg-obsidian/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ivory backdrop-blur-md">
              {product.tags[0]}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center space-y-1 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-champagne">
            {product.world}
          </span>
          <h3 className="font-serif text-lg tracking-wider text-ivory transition-colors group-hover:text-champagne">
            {product.name}
          </h3>
          <p className="pt-1 text-xs tracking-[0.15em] text-ivory/60">
            EGP {product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}