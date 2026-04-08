import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#d4af37]/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_24%),radial-gradient(circle_at_right,rgba(212,175,55,0.08),transparent_30%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              ELEVATE PNW Volleyball Club
            </p>

            <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
              Train with purpose.
              <span className="block text-[#d4af37]">Compete with confidence.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
              A modern volleyball club platform for athletes, families, and coaches —
              built around development, communication, and a culture that pushes players forward.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#tryouts"
                className="rounded-full bg-[#d4af37] px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#e6c65b]"
              >
                Join Tryout Interest List
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                Enter Club Portal
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              {[
                ["Player Development", "Skill-first training"],
                ["Club Communication", "Clear updates for families"],
                ["Team Culture", "Competitive and positive"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm text-neutral-400">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-xl rounded-[2rem] border border-[#d4af37]/20 bg-white/5 p-6 shadow-[0_0_70px_rgba(212,175,55,0.16)] backdrop-blur">
              <div className="rounded-[1.5rem] border border-[#d4af37]/15 bg-black/70 p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                  Built to grow
                </p>

                <div className="mt-6 grid gap-4">
                  {[
                    "Club teams and training pathways",
                    "Family-first communication structure",
                    "Coach, parent, player, and admin portals",
                    "Mobile-friendly foundation for future app features",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-black/40 px-4 py-4 text-sm text-neutral-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-3xl font-black tracking-wide text-white">ELEVATE</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.35em] text-[#d4af37]">
                    PNW Volleyball Club
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
