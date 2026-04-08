"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Coaches", href: "/#coaches" },
  { label: "Tryouts", href: "/#tryouts" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070b]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2f6df6]/35 bg-gradient-to-br from-[#2f6df6]/25 to-[#22c55e]/20 shadow-[0_0_28px_rgba(47,109,246,0.22)]">
            <span className="text-sm font-black tracking-[0.25em] text-white">E</span>
          </div>

          <div className="leading-none">
            <p className="text-lg font-black uppercase tracking-[0.28em] text-[#34d399] sm:text-xl">
              ELEVATE
            </p>
            <p className="mt-1 text-[11px] font-medium tracking-[0.18em] text-white/80 sm:text-xs">
              PNW Volleyball Club
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-[#60a5fa]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="inline-flex items-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(47,109,246,0.28)] transition hover:opacity-95"
          >
            Sign In
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center rounded-xl border border-[#2f6df6]/30 bg-[#2f6df6]/10 px-3 py-2 text-sm font-medium text-[#60a5fa] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#05070b]/95 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-slate-300 transition hover:text-[#60a5fa]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
