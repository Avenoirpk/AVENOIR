"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const STAGES = ["Order Placed", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackContent />
    </Suspense>
  );
}

function TrackContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState<any>(null);
  const [inputId, setInputId] = useState(orderId ?? "");

  useEffect(() => {
    if (!orderId) return;
    try {
      const orders = JSON.parse(localStorage.getItem("avenoir_orders") || "[]");
      setOrder(orders.find((o: any) => o.id === orderId) ?? null);
    } catch {
      setOrder(null);
    }
  }, [orderId]);

  // Demo: derive a pretend "current stage" from how long ago the order was placed.
  const currentStageIndex = order ? 1 : 0;

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
      <h1 className="font-display text-4xl text-navy mb-3" data-aos="fade-up">Track Your Order</h1>
      <p className="text-navy/60 mb-10">Enter your order ID to see day-by-day delivery status.</p>

      <div className="flex gap-3 mb-12">
        <input
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="e.g. AVN-482913"
          className="flex-1 border rounded-full px-5 py-3 bg-white"
        />
        <a
          href={`/track?order=${inputId}`}
          className="bg-navy text-cream px-6 py-3 rounded-full font-medium hover:bg-navy2 transition"
        >
          Track
        </a>
      </div>

      {orderId && !order && (
        <p className="text-navy/50">No order found with ID <strong>{orderId}</strong> on this device.</p>
      )}

      {order && (
        <div data-aos="fade-up">
          <div className="bg-white/60 rounded-3xl p-6 mb-10">
            <p className="text-sm text-navy/50">Order ID</p>
            <p className="font-semibold text-navy text-lg mb-2">{order.id}</p>
            <p className="text-sm text-navy/50">Status</p>
            <p className="font-medium text-gold">{order.status}</p>
          </div>

          <div className="relative flex justify-between">
            <div className="absolute top-4 left-0 w-full h-0.5 bg-navy/10" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-gold transition-all"
              style={{ width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%` }}
            />
            {STAGES.map((stage, i) => (
              <div key={stage} className="flex flex-col items-center gap-2 relative z-10 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i <= currentStageIndex ? "bg-gold text-navy" : "bg-white border border-navy/20 text-navy/30"
                  }`}
                >
                  {i <= currentStageIndex ? "✓" : i + 1}
                </div>
                <span className="text-[10px] text-center text-navy/60 max-w-[70px]">{stage}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-navy/40 mt-10">
            Estimated delivery within 4–8 working days of order confirmation.
          </p>
        </div>
      )}
    </div>
  );
}
