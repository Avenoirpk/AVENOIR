"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/products";

export default function BestSellerSwiper({ products }: { products: Product[] }) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={24}
      slidesPerView={2}
      breakpoints={{
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {products.map((p) => (
        <SwiperSlide key={p.id}>
          <ProductCard product={p} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
