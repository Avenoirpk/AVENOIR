"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/lib/products";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-navy/10">
      <div className="flex items-center justify-between px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <Link href="/" className="font-display text-2xl tracking-widest text-navy">
          AVENOIR
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-navy/80">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/shop?category=${encodeURIComponent(c)}`}
              className="hover:text-gold transition-colors border-b-2 border-transparent hover:border-gold pb-1"
            >
              {c}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-navy">
          <Link href="/account" className="text-sm hover:text-gold transition-colors">
            Account
          </Link>
          <Link href="/login" className="text-sm hover:text-gold transition-colors">
            Login
          </Link>
          <Link href="/cart" className="relative text-sm hover:text-gold transition-colors">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-gold text-navy text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
