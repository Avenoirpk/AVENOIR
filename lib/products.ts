export type Product = {
  id: string;
  name: string;
  category: "Bags" | "Shoes" | "Jewelry" | "Watches" | "Belts" | "Hats" | "Sunglasses" | "Clothing";
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  sizes?: string[];
  colors?: string[];
  bestSeller?: boolean;
};

export const products: Product[] = [
  {
    id: "avn-bag-01",
    name: "Camille Structured Tote",
    category: "Bags",
    price: 8900,
    oldPrice: 11500,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
    ],
    rating: 4.8,
    reviews: 214,
    description:
      "A structured everyday tote in full-grain leather, finished with brushed gold hardware and a suede-lined interior.",
    colors: ["Black", "Tan", "Ivory"],
    bestSeller: true,
  },
  {
    id: "avn-shoe-01",
    name: "Aria Block Heel",
    category: "Shoes",
    price: 6200,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=800&auto=format&fit=crop",
    ],
    rating: 4.6,
    reviews: 132,
    description: "A clean block-heel silhouette in soft nappa leather, made for all-day comfort without compromise.",
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Black", "Nude"],
    bestSeller: true,
  },
  {
    id: "avn-jewel-01",
    name: "Lumen Pearl Necklace",
    category: "Jewelry",
    price: 4300,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop"],
    rating: 4.9,
    reviews: 88,
    description: "Freshwater pearls set on a fine gold-plated chain — a quiet, everyday layering piece.",
  },
  {
    id: "avn-watch-01",
    name: "Meridian Steel Watch",
    category: "Watches",
    price: 15900,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop"],
    rating: 4.7,
    reviews: 61,
    description: "A minimal stainless steel timepiece with a sapphire crystal face and interchangeable strap.",
    bestSeller: true,
  },
  {
    id: "avn-belt-01",
    name: "Sienna Leather Belt",
    category: "Belts",
    price: 2600,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"],
    rating: 4.5,
    reviews: 47,
    description: "Full-grain leather belt with a brushed brass buckle, cut for a tailored fit.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "avn-hat-01",
    name: "Noor Wide Brim Hat",
    category: "Hats",
    price: 3100,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop"],
    rating: 4.4,
    reviews: 29,
    description: "A wide-brim felt hat with a grosgrain band — the finishing piece for warm-weather dressing.",
  },
  {
    id: "avn-sun-01",
    name: "Rivage Cat-Eye Sunglasses",
    category: "Sunglasses",
    price: 3600,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"],
    rating: 4.6,
    reviews: 73,
    description: "Acetate cat-eye frames with UV400 polarized lenses and a subtle tortoise finish.",
  },
  {
    id: "avn-cloth-01",
    name: "Elodie Silk Blouse",
    category: "Clothing",
    price: 5400,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop"],
    rating: 4.7,
    reviews: 96,
    description: "A fluid mulberry-silk blouse with mother-of-pearl buttons and a relaxed drape.",
    sizes: ["XS", "S", "M", "L"],
    bestSeller: true,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const bestSellers = products.filter((p) => p.bestSeller);
export const categories = Array.from(new Set(products.map((p) => p.category)));
