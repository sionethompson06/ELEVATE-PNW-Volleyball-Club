"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/#programs" },
  { label: "Portals", href: "/#portals" },
  { label: "Tryouts", href: "/#tryouts" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d4af37]/20 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            ELEVATE
          </span>
          <span className="mt-2 text-sm font-medium text-white sm:text-base">
            PNW Volleyball Club
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-300 transition hover:text-[#d4af37]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="rounded-full border border-[#d4af37] bg-[#d4af37] px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#e6c65b]"
          >
            Sign In
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex items-center rounded-lg border border-[#d4af37]/40 px-3 py-2 text-sm text-[#d4af37] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#d4af37]/15 bg-black md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-neutral-300 transition hover:text-[#d4af37]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full border border-[#d4af37] bg-[#d4af37] px-5 py-3 text-center text-sm font-semibold text-black"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
