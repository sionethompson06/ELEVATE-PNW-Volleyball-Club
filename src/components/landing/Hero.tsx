import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,109,246,0.26),transparent_22%),radial-gradient(circle_at_right,rgba(34,197,94,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.10),transparent_26%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-18 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="inline-flex rounded-full border border-[#2f6df6]/25 bg-[#2f6df6]/10 px-4 py-2 shadow-[0_0_30px_rgba(47,109,246,0.10)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#34d399]">
                Public Club Information
              </p>
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              Train with purpose.
              <span className="mt-2 block bg-gradient-to-r from-[#60a5fa] to-[#34d399] bg-clip-text text-transparent">
                Compete with confidence.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              ELEVATE helps athletes grow through intentional coaching,
              competitive training, and a culture that builds confidence,
              integrity, and preparation for the next level.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="#tryouts"
                className="inline-flex items-center justify-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(47,109,246,0.24)] transition hover:scale-[1.01]"
              >
                Join Tryout Interest List
              </Link>

              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:bg-[#2f6df6]/10 hover:text-[#93c5fd]"
              >
                Learn About ELEVATE
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#60a5fa]" />
                <span>Player development focused</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
                <span>Strong family communication</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#60a5fa]" />
                <span>Competitive club culture</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl rounded-[2rem] border border-[#2f6df6]/20 bg-[#0b1220]/70 p-6 shadow-[0_0_70px_rgba(47,109,246,0.18)] backdrop-blur-xl">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,rgba(47,109,246,0.14),transparent_62%)]" />

              <div className="relative rounded-[1.6rem] border border-white/10 bg-[#05070b]/80 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#34d399]">
                    Why families choose ELEVATE
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                    <span className="text-xs text-slate-400">Recruiting season</span>
                  </div>
                </div>

                <div className="mt-7 grid gap-4">
                  {[
                    "Intentional coaching and athlete development",
                    "Competitive training with a positive culture",
                    "Organized communication for players and families",
                    "A club experience built to grow year after year",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-[#0b1220]/70 px-4 py-4 transition hover:border-[#2f6df6]/35"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#2f6df6]/35 bg-[#2f6df6]/10 text-xs font-bold text-[#60a5fa]">
                          {index + 1}
                        </div>
                        <p className="text-sm text-slate-200">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-4xl font-black tracking-wide text-white">ELEVATE</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.38em] text-[#34d399]">
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
