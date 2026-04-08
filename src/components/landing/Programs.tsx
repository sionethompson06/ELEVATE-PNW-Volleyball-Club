const programs = [
  {
    title: "Club Teams",
    description:
      "Competitive team experiences built around consistency, accountability, and long-term athlete development.",
  },
  {
    title: "Skills Clinics",
    description:
      "Focused training sessions that build fundamentals, confidence, and volleyball IQ.",
  },
  {
    title: "Player Development",
    description:
      "A long-term training philosophy centered on repetition, accountability, and individual growth.",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          Programs
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Competitive opportunities built around athlete growth
        </h2>
        <p className="mt-4 text-slate-400">
          ELEVATE is designed to offer a structured club experience that helps athletes improve with purpose and compete with confidence.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {programs.map((program) => (
          <div
            key={program.title}
            className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 transition hover:-translate-y-1 hover:border-[#2f6df6]/35 hover:bg-[#0f172a]/80"
          >
            <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-[#2f6df6] to-[#22c55e]" />
            <h3 className="mt-5 text-xl font-semibold text-white">{program.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{program.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
