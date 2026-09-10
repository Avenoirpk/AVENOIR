"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ShimmerButton from "@/components/ShimmerButton";
import ProductCard from "@/components/ProductCard";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  const router = useRouter();
  const { addItem } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <div className="max-w-3xl mx-auto px-6 py-24 text-center text-navy/60">Product not found.</div>;
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product, 1, size, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(product, 1, size, color);
    router.push("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
      <div className="grid md:grid-cols-2 gap-14">
        <div data-aos="fade-right">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/50 mb-4">
            <Image src={product.images[activeImg]} alt={product.name} fill className="object-cover" sizes="50vw" priority />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 ${
                  activeImg === i ? "border-navy" : "border-transparent"
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        <div data-aos="fade-left">
          <p className="text-xs uppercase tracking-widest text-gold mb-2">{product.category}</p>
          <h1 className="font-display text-4xl text-navy mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 text-sm text-navy/60 mb-6">
            <span className="text-gold">{"★".repeat(Math.round(product.rating))}</span>
            <span>{product.rating} · {product.reviews} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-semibold text-navy">Rs {product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-navy/40 line-through">Rs {product.oldPrice.toLocaleString()}</span>
            )}
          </div>

          <p className="text-navy/60 leading-relaxed mb-8 max-w-md">{product.description}</p>

          {product.sizes && (
            <div className="mb-6">
              <p className="text-sm font-medium text-navy mb-2">Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      size === s ? "bg-navy text-cream border-navy" : "border-navy/20 text-navy/70"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="mb-8">
              <p className="text-sm font-medium text-navy mb-2">Color</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      color === c ? "bg-navy text-cream border-navy" : "border-navy/20 text-navy/70"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <ShimmerButton onClick={handleAdd} className="flex-1">
              {added ? "Added ✓" : "Add to Cart"}
            </ShimmerButton>
            <ShimmerButton onClick={handleBuyNow} variant="outline" className="flex-1">
              Buy Now
            </ShimmerButton>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm bg-white/50 p-4 rounded-2xl mt-8">
            <div>🔒 Secure Checkout</div>
            <div>🚚 Free Shipping</div>
            <div>↩️ Easy Returns</div>
            <div>📦 4–8 Day Delivery</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-2xl text-navy mb-8" data-aos="fade-up">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
