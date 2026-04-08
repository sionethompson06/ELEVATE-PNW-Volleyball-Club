import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_30%),radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              ELEVATE PNW Volleyball Club
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Build players.
              <span className="block text-[#d4af37]">Build culture.</span>
              Build something bigger.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
              A modern club platform for families, coaches, players, and admins —
              designed for clear communication, strong culture, and long-term athlete development.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="rounded-full bg-[#d4af37] px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-[#e6c65b]"
              >
                Enter Club Portal
              </Link>
              <Link
                href="/#programs"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-[#d4af37] hover:text-[#d4af37]"
              >
                Explore Programs
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl rounded-[2rem] border border-[#d4af37]/25 bg-white/5 p-8 shadow-[0_0_60px_rgba(212,175,55,0.18)] backdrop-blur">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle,rgba(212,175,55,0.15),transparent_65%)]" />
              <div className="relative rounded-[1.5rem] border border-[#d4af37]/15 bg-black/60 p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
                  Club Focus
                </p>
                <div className="mt-6 grid gap-4">
                  {[
                    "Skill development",
                    "Team culture",
                    "Competitive training",
                    "Family communication",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-sm text-neutral-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-3xl font-bold text-white">ELEVATE</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#d4af37]">
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
