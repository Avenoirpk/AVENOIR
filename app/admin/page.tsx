"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const o = JSON.parse(localStorage.getItem("avenoir_orders") || "[]");
      setOrders(o);
    } catch {
      setOrders([]);
    }
  }, []);

  const revenue = orders.reduce((sum, o) => sum + (o.subtotal || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-4xl text-navy">Admin Dashboard</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin" className="text-navy font-medium">Dashboard</Link>
          <Link href="/admin/orders" className="text-navy/50 hover:text-navy">Orders</Link>
          <Link href="/admin/products" className="text-navy/50 hover:text-navy">Products</Link>
        </nav>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-navy text-cream rounded-3xl p-6">
          <p className="text-xs text-cream/60 uppercase">Total Orders</p>
          <p className="text-3xl font-display mt-1">{orders.length}</p>
        </div>
        <div className="bg-white/60 rounded-3xl p-6">
          <p className="text-xs text-navy/50 uppercase">Pending Verification</p>
          <p className="text-3xl font-display mt-1 text-navy">
            {orders.filter((o) => o.status === "Pending Verification").length}
          </p>
        </div>
        <div className="bg-white/60 rounded-3xl p-6">
          <p className="text-xs text-navy/50 uppercase">Revenue</p>
          <p className="text-3xl font-display mt-1 text-navy">Rs {revenue.toLocaleString()}</p>
        </div>
        <div className="bg-white/60 rounded-3xl p-6">
          <p className="text-xs text-navy/50 uppercase">Products</p>
          <p className="text-3xl font-display mt-1 text-navy">{products.length}</p>
        </div>
      </div>

      <h2 className="font-semibold text-navy mb-4">Recent Orders</h2>
      <div className="space-y-2">
        {orders.slice(-5).reverse().map((o) => (
          <div key={o.id} className="flex justify-between items-center bg-white/60 rounded-2xl p-4 text-sm">
            <span className="font-medium text-navy">{o.id}</span>
            <span className="text-navy/60">{o.customer?.firstName} {o.customer?.lastName}</span>
            <span className="text-gold">{o.status}</span>
          </div>
        ))}
        {orders.length === 0 && <p className="text-navy/40 text-sm">No orders placed yet.</p>}
      </div>
    </div>
  );
}
