"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products as initialProducts, Product } from "@/lib/products";

export default function AdminProducts() {
  const [list, setList] = useState<Product[]>(initialProducts);

  const removeProduct = (id: string) => setList((l) => l.filter((p) => p.id !== id));

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-4xl text-navy">Products</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin" className="text-navy/50 hover:text-navy">Dashboard</Link>
          <Link href="/admin/orders" className="text-navy/50 hover:text-navy">Orders</Link>
          <Link href="/admin/products" className="text-navy font-medium">Products</Link>
        </nav>
      </div>

      <button className="bg-navy text-cream px-6 py-3 rounded-full text-sm mb-8 hover:bg-navy2 transition">
        + Add New Product
      </button>

      <p className="text-xs text-navy/40 mb-4">
        Note: this table currently manages the mock catalog in memory (lib/products.ts). Wire it up to your
        real database to persist changes.
      </p>

      <div className="space-y-3">
        {list.map((p) => (
          <div key={p.id} className="flex items-center gap-4 bg-white/60 rounded-2xl p-4">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="56px" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-navy">{p.name}</p>
              <p className="text-xs text-navy/50">{p.category}</p>
            </div>
            <span className="text-sm font-semibold text-navy">Rs {p.price.toLocaleString()}</span>
            <button className="text-sm text-navy/50 hover:text-navy">Edit</button>
            <button onClick={() => removeProduct(p.id)} className="text-sm text-red-400 hover:text-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
