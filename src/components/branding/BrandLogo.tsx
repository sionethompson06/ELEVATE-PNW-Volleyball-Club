import Link from "next/link";

export default function BrandLogo() {
  return (
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
  );
}
