import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070b]/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-black uppercase tracking-[0.28em] text-[#34d399]">
            ELEVATE
          </p>
          <p className="mt-1 text-xs font-medium tracking-[0.18em] text-white/80">
            PNW Volleyball Club
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            A public-facing recruiting site for athletes and families, with private
            member access available through Sign In.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Explore
          </h4>
          <div className="mt-3 space-y-2 text-sm text-slate-400">
            <p><Link href="/#about">About</Link></p>
            <p><Link href="/#programs">Programs</Link></p>
            <p><Link href="/#coaches">Coaches</Link></p>
            <p><Link href="/#tryouts">Tryouts</Link></p>
            <p><Link href="/#contact">Contact</Link></p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Member Access
          </h4>
          <div className="mt-3 space-y-2 text-sm text-slate-400">
            <p><Link href="/login">Sign In</Link></p>
            <p>Current players, families, coaches, and staff</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ELEVATE PNW Volleyball Club. All rights reserved.
      </div>
    </footer>
  );
}
