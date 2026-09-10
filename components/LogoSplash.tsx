"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "avenoir_splash_seen";
const LETTERS = "AVENOIR".split("");

export default function LogoSplash() {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
        sessionStorage.setItem(SESSION_KEY, "1");
      }, 2200);
      return () => clearTimeout(timer);
    }
    setChecked(true);
  }, []);

  const skip = () => {
    setVisible(false);
    document.body.style.overflow = "";
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  if (!visible || checked === true) return null;

  return (
    <div
      onClick={skip}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy cursor-pointer"
    >
      <div className="flex">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="font-display text-5xl md:text-7xl text-cream opacity-0 animate-[fadeInUp_0.6s_ease_forwards]"
            style={{ animationDelay: `${i * 0.09}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div
        className="h-[2px] bg-gold mt-4 opacity-0"
        style={{ animation: "drawUnderline 0.8s ease forwards, fadeIn 0.1s ease forwards", animationDelay: `${LETTERS.length * 0.09 + 0.1}s` }}
      />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
