"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, LockKeyhole } from "lucide-react";

export default function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error?.message ?? "Sign-in could not be completed.");
        return;
      }
      window.location.assign(nextPath);
    } catch {
      setError("Sign-in is unavailable right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="fixed inset-0 z-[100] grid min-h-screen place-items-center overflow-y-auto bg-[#080807] px-4 py-12 text-ivory">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_#242019_0%,_transparent_54%)]" />
      <section className="relative w-full max-w-md border border-white/10 bg-[#0c0c0b]/95 px-6 py-9 shadow-2xl shadow-black/50 sm:px-10 sm:py-12">
        <div className="mb-9 flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-serif text-2xl tracking-[0.24em]">TOPSIX</span>
          <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-champagne"><LockKeyhole size={13} /> Studio access</span>
        </div>
        <span className="text-[9px] uppercase tracking-[0.24em] text-champagne">Private / Restricted</span>
        <h1 className="mt-3 font-serif text-3xl">Welcome back.</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/45">Enter your studio password to continue.</p>

        <form onSubmit={signIn} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-[9px] uppercase tracking-[0.16em] text-white/50">Admin password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border-b border-white/20 bg-transparent py-3 text-sm outline-none transition-colors focus:border-champagne"
            />
          </label>
          <p role="alert" className="min-h-5 text-xs text-rose-200/90">{error}</p>
          <button type="submit" disabled={isSubmitting} className="flex w-full items-center justify-between border border-champagne bg-champagne px-5 py-4 text-[9px] uppercase tracking-[0.19em] text-[#090909] transition-colors hover:bg-transparent hover:text-champagne disabled:cursor-wait disabled:opacity-60">
            {isSubmitting ? "Checking access" : "Enter the studio"}
            <ArrowUpRight size={15} />
          </button>
        </form>
      </section>
    </main>
  );
}