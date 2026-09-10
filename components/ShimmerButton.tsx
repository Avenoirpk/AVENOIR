"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "outline";
};

export default function ShimmerButton({ children, variant = "solid", className = "", ...rest }: Props) {
  const base =
    "relative overflow-hidden rounded-full px-8 py-3 font-medium text-sm transition active:scale-[0.98]";
  const solid =
    "bg-navy text-cream bg-[linear-gradient(110deg,#12183f,45%,#2a3579,55%,#12183f)] bg-[length:200%_100%] hover:animate-shimmer";
  const outline = "border border-navy text-navy hover:bg-navy hover:text-cream";

  return (
    <button className={`${base} ${variant === "solid" ? solid : outline} ${className}`} {...rest}>
      {children}
    </button>
  );
}
