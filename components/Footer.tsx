import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-cream/80 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <div className="font-display text-2xl text-cream tracking-widest mb-3">AVENOIR</div>
          <p className="text-cream/60 max-w-xs">
            Considered pieces for everyday dressing — bags, shoes, jewelry and more, made to last.
          </p>
        </div>
        <div>
          <h4 className="text-cream font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-cream/60">
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/track">Track Order</Link></li>
            <li><Link href="/account">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-cream/60">
            <li>Returns & Refunds</li>
            <li>Shipping Info</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream font-semibold mb-3">Promise</h4>
          <ul className="space-y-2 text-cream/60">
            <li>Free shipping, always</li>
            <li>4–8 working day delivery</li>
            <li>Easy return & refund</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Avenoir. All rights reserved.
      </div>
    </footer>
  );
}
