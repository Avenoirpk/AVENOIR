"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ShimmerButton from "@/components/ShimmerButton";

export default function AccountPage() {
  const [user, setUser] = useState<{ email: string; guest: boolean } | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const u = localStorage.getItem("avenoir_user");
      if (u) setUser(JSON.parse(u));
      const o = localStorage.getItem("avenoir_orders");
      if (o) setOrders(JSON.parse(o));
    } catch {
      // ignore
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("avenoir_user");
    setUser(null);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-navy mb-4">You&apos;re not logged in</h1>
        <p className="text-navy/60 mb-8">Log in or continue as guest to view your account.</p>
        <Link href="/login"><ShimmerButton>Go to Login</ShimmerButton></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-14">
      <div className="flex items-center justify-between mb-10" data-aos="fade-up">
        <div>
          <h1 className="font-display text-4xl text-navy">My Account</h1>
          <p className="text-navy/50 mt-1">{user.guest ? "Guest session" : user.email}</p>
        </div>
        <button onClick={logout} className="text-sm text-navy/60 hover:text-red-500">Logout</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/60 rounded-3xl p-6">
          <h3 className="font-semibold text-navy mb-1">Orders</h3>
          <p className="text-2xl font-display text-navy">{orders.length}</p>
        </div>
        <div className="bg-white/60 rounded-3xl p-6">
          <h3 className="font-semibold text-navy mb-1">Wishlist</h3>
          <p className="text-2xl font-display text-navy">0</p>
        </div>
        <div className="bg-white/60 rounded-3xl p-6">
          <h3 className="font-semibold text-navy mb-1">Saved Addresses</h3>
          <p className="text-2xl font-display text-navy">0</p>
        </div>
      </div>

      <h2 className="font-semibold text-navy mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-navy/50">No orders yet. <Link href="/shop" className="underline">Start shopping →</Link></p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <Link
              key={o.id}
              href={`/track?order=${o.id}`}
              className="flex items-center justify-between bg-white/60 rounded-2xl p-4 hover:bg-white/90 transition"
            >
              <div>
                <p className="font-medium text-navy">{o.id}</p>
                <p className="text-xs text-navy/50">{new Date(o.placedAt).toLocaleDateString()}</p>
              </div>
              <span className="text-sm text-gold">{o.status}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
