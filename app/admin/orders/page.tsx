"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STATUSES = ["Pending Verification", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem("avenoir_orders") || "[]"));
    } catch {
      setOrders([]);
    }
  }, []);

  const updateStatus = (id: string, status: string) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(updated);
    localStorage.setItem("avenoir_orders", JSON.stringify(updated));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-4xl text-navy">Orders</h1>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin" className="text-navy/50 hover:text-navy">Dashboard</Link>
          <Link href="/admin/orders" className="text-navy font-medium">Orders</Link>
          <Link href="/admin/products" className="text-navy/50 hover:text-navy">Products</Link>
        </nav>
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white/60 rounded-3xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-navy">{o.id}</p>
                <p className="text-xs text-navy/50">{o.customer?.firstName} {o.customer?.lastName} · {o.customer?.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className="border rounded-full px-4 py-2 text-sm bg-white"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button
                  onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                  className="text-sm text-gold hover:underline"
                >
                  {expanded === o.id ? "Hide" : "View proof"}
                </button>
              </div>
            </div>

            {expanded === o.id && (
              <div className="mt-4 grid md:grid-cols-2 gap-6 border-t border-navy/10 pt-4">
                <div>
                  <p className="text-xs text-navy/50 mb-2">Payment Screenshot</p>
                  {o.paymentScreenshot ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={o.paymentScreenshot} alt="Payment proof" className="rounded-xl max-h-64 border" />
                  ) : (
                    <p className="text-red-500 text-sm">No screenshot on file.</p>
                  )}
                </div>
                <div className="text-sm text-navy/70 space-y-1">
                  <p><strong>Address:</strong> {o.customer?.address}, {o.customer?.city}</p>
                  <p><strong>Total:</strong> Rs {o.subtotal?.toLocaleString()}</p>
                  <p className="pt-2 font-medium text-navy">Items</p>
                  {o.items?.map((i: any) => (
                    <p key={i.product.id}>{i.product.name} × {i.qty}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {orders.length === 0 && <p className="text-navy/40">No orders placed yet.</p>}
      </div>
    </div>
  );
}
