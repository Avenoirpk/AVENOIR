import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import LogoSplash from "@/components/LogoSplash";
import AosInit from "@/components/AosInit";

export const metadata: Metadata = {
  title: "Avenoir — Considered Fashion",
  description: "Bags, shoes, jewelry, watches and more — considered pieces for everyday dressing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans text-navy">
        <CartProvider>
          <LogoSplash />
          <AosInit />
          <Marquee />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
