"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

const SLIDES = [
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop",
];

export default function HeroSwiper() {
  return (
    <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative aspect-[4/5]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-full w-full"
      >
        {SLIDES.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full">
              <Image src={src} alt="Avenoir collection" fill className="object-cover" sizes="50vw" priority={i === 0} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
