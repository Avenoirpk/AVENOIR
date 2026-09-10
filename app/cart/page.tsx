"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import ShimmerButton from "@/components/ShimmerButton";

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-navy mb-4">Your cart is empty</h1>
        <p className="text-navy/60 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop"><ShimmerButton>Continue Shopping</ShimmerButton></Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-14">
      <h1 className="font-display text-4xl text-navy mb-10" data-aos="fade-up">Your Cart</h1>

      <div className="space-y-6 mb-10">
        {items.map((item) => (
          <div
            key={item.product.id + (item.size ?? "") + (item.color ?? "")}
            className="flex items-center gap-6 bg-white/60 rounded-3xl p-4"
          >
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
              <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="96px" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-navy">{item.product.name}</h3>
              <p className="text-xs text-navy/50">
                {item.size && `Size ${item.size}`} {item.color && `· ${item.color}`}
              </p>
              <p className="font-semibold text-navy mt-1">Rs {item.product.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center border border-navy/20 rounded-full px-3 py-1 gap-3">
              <button onClick={() => updateQty(item.product.id, item.qty - 1)}>−</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.product.id, item.qty + 1)}>+</button>
            </div>
            <button onClick={() => removeItem(item.product.id)} className="text-navy/40 hover:text-red-500 px-2">
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <div className="w-full max-w-sm bg-white/60 rounded-3xl p-6">
          <div className="flex justify-between text-navy/70 mb-2">
            <span>Subtotal</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-navy/70 mb-4">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg text-navy border-t border-navy/10 pt-4 mb-6">
            <span>Total</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>
          <Link href="/checkout">
            <ShimmerButton className="w-full">Checkout</ShimmerButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
