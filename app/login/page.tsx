"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy auth: any non-empty email/password is accepted for now.
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("avenoir_user", JSON.stringify({ email, guest: false }));
      setLoading(false);
      router.push("/account");
    }, 500);
  };

  const continueAsGuest = () => {
    localStorage.setItem("avenoir_user", JSON.stringify({ email: "guest", guest: true }));
    router.push("/");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-16 bg-[#f0f4ff]">
      <div className="w-full max-w-sm bg-gold/90 p-8 rounded-[3rem] shadow-2xl" data-aos="zoom-in">
        <h2 className="text-2xl font-display font-bold text-center text-navy mb-8">
          {mode === "login" ? "Login to continue" : "Create your account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-full border-none outline-none text-navy shadow-inner bg-white/90"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 rounded-full border-none outline-none text-navy shadow-inner bg-white/90"
          />

          {mode === "login" && (
            <div className="flex justify-between items-center text-sm text-navy/80 px-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember me
              </label>
              <button type="button" className="hover:underline">Forgot password?</button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-cream py-3 rounded-full font-semibold hover:bg-opacity-90 transition mt-2 disabled:opacity-60"
          >
            {loading ? "Please wait…" : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <button
          onClick={continueAsGuest}
          className="w-full mt-3 border border-navy text-navy py-3 rounded-full font-medium hover:bg-navy hover:text-cream transition"
        >
          Continue as Guest
        </button>

        <p className="text-center text-sm text-navy/80 mt-5">
          {mode === "login" ? "New to Avenoir?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="font-semibold underline"
          >
            {mode === "login" ? "Create one" : "Login"}
          </button>
        </p>

        <div className="mt-8 text-center">
          <p className="text-sm text-navy/70 mb-4">or continue with</p>
          <div className="flex justify-center gap-4">
            <button type="button" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">G</button>
            <button type="button" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">f</button>
            <button type="button" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition">📱</button>
          </div>
          <p className="text-[11px] text-navy/50 mt-3">
            (Google / Facebook / Phone OTP — coming soon)
          </p>
        </div>
      </div>
    </div>
  );
}
