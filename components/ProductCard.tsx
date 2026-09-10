"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block" data-aos="fade-up">
      <div className="relative overflow-hidden rounded-3xl bg-white/60 aspect-[4/5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.12]"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.bestSeller && (
          <span className="absolute top-3 left-3 bg-gold text-navy text-[10px] font-bold uppercase px-2 py-1 rounded-full">
            Best Seller
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-wide text-navy/50">{product.category}</p>
        <h3 className="font-medium text-navy">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold text-navy">Rs {product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="text-xs text-navy/40 line-through">Rs {product.oldPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
