"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ShimmerButton from "@/components/ShimmerButton";
import ProductCard from "@/components/ProductCard";

type ProductClientProps = {
  id: string;
};

export default function ProductClient({
  id,
}: ProductClientProps) {
  const product = getProduct(id);
  const router = useRouter();
  const { addItem } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState<string | undefined>(
    undefined
  );
  const [color, setColor] = useState<string | undefined>(
    undefined
  );
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center text-navy/60">
        <h1 className="text-2xl font-semibold mb-3">
          Product not found
        </h1>

        <p className="mb-6">
          The product you are looking for does not exist.
        </p>

        <button
          onClick={() => router.push("/shop")}
          className="px-6 py-3 rounded-full bg-navy text-cream hover:opacity-90 transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const related = products
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4);

  const handleAdd = () => {
    addItem(product, 1, size, color);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  const handleBuyNow = () => {
    addItem(product, 1, size, color);
    router.push("/checkout");
  };

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : ["/placeholder-product.jpg"];

  const safeActiveImage =
    productImages[activeImg] || productImages[0];

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-14">
      <div className="grid md:grid-cols-2 gap-14">
        {/* Product Gallery */}
        <div data-aos="fade-right">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/50 mb-4">
            <Image
              src={safeActiveImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-3 flex-wrap">
            {productImages.map((img, index) => (
              <button
                key={`${img}-${index}`}
                type="button"
                onClick={() => setActiveImg(index)}
                aria-label={`View product image ${
                  index + 1
                }`}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                  activeImg === index
                    ? "border-navy"
                    : "border-transparent hover:border-navy/30"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} image ${
                    index + 1
                  }`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div data-aos="fade-left">
          <p className="text-xs uppercase tracking-widest text-gold mb-2">
            {product.category}
          </p>

          <h1 className="font-display text-4xl md:text-5xl text-navy mb-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm text-navy/60 mb-6">
            <span className="text-gold">
              {"★".repeat(
                Math.max(
                  0,
                  Math.min(5, Math.round(product.rating || 0))
                )
              )}
            </span>

            <span>
              {product.rating || 0} ·{" "}
              {product.reviews || 0} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-semibold text-navy">
              Rs {product.price.toLocaleString()}
            </span>

            {product.oldPrice ? (
              <span className="text-navy/40 line-through">
                Rs {product.oldPrice.toLocaleString()}
              </span>
            ) : null}
          </div>

          {/* Description */}
          <p className="text-navy/60 leading-relaxed mb-8 max-w-md">
            {product.description}
          </p>

          {/* Size Selection */}
          {product.sizes &&
            product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-navy mb-2">
                  Size
                </p>

                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((itemSize) => (
                    <button
                      key={itemSize}
                      type="button"
                      onClick={() => setSize(itemSize)}
                      className={`px-4 py-2 rounded-full border text-sm transition ${
                        size === itemSize
                          ? "bg-navy text-cream border-navy"
                          : "border-navy/20 text-navy/70 hover:border-navy"
                      }`}
                    >
                      {itemSize}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Color Selection */}
          {product.colors &&
            product.colors.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-medium text-navy mb-2">
                  Color
                </p>

                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((itemColor) => (
                    <button
                      key={itemColor}
                      type="button"
                      onClick={() => setColor(itemColor)}
                      className={`px-4 py-2 rounded-full border text-sm transition ${
                        color === itemColor
                          ? "bg-navy text-cream border-navy"
                          : "border-navy/20 text-navy/70 hover:border-navy"
                      }`}
                    >
                      {itemColor}
                    </button>
                  ))}
                </div>
              </div>
            )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <ShimmerButton
              onClick={handleAdd}
              className="flex-1"
            >
              {added ? "Added ✓" : "Add to Cart"}
            </ShimmerButton>

            <ShimmerButton
              onClick={handleBuyNow}
              variant="outline"
              className="flex-1"
            >
              Buy Now
            </ShimmerButton>
          </div>

          {/* Trust Information */}
          <div className="grid grid-cols-2 gap-4 text-sm bg-white/50 p-4 rounded-2xl mt-8">
            <div>🔒 Secure Checkout</div>
            <div>🚚 Free Shipping</div>
            <div>↩️ Easy Returns</div>
            <div>📦 4–8 Day Delivery</div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2
            className="font-display text-2xl text-navy mb-8"
            data-aos="fade-up"
          >
            You may also like
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
