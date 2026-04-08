export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            About ELEVATE
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Built for athletes who want to grow in the right environment
          </h2>
          <p className="mt-4 text-slate-400">
            ELEVATE was created to give athletes and families a club experience rooted in development, competition, and positive culture.
          </p>
          <p className="mt-4 text-slate-400">
            Our goal is to help players build strong fundamentals, competitive confidence, and a team mindset in an environment that is organized, challenging, and encouraging.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2f6df6]/12 via-[#0f172a] to-[#22c55e]/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Mission
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-200">
            To help athletes grow through intentional coaching, competitive training,
            strong communication, and a team culture that builds confidence on and off the court.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#05070b]/60 p-5">
            <p className="text-sm font-semibold text-white">Placeholder for your founder story</p>
            <p className="mt-2 text-sm text-slate-400">
              This is where we can later add your personal reason for starting ELEVATE and what makes your club different.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
