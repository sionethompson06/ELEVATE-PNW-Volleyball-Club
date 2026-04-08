const programs = [
  {
    title: "12U Girls",
    description:
      "An early competitive club experience focused on fundamentals, confidence, and long-term athlete development.",
  },
  {
    title: "14U Girls",
    description:
      "A strong developmental stage where athletes build skills, game understanding, and competitive consistency.",
  },
  {
    title: "16U Girls",
    description:
      "Advanced preparation for athletes ready to compete at a higher level and continue progressing toward future opportunities.",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          Programs
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Competitive opportunities built around athlete growth
        </h2>
        <p className="mt-4 text-slate-400">
          ELEVATE serves 12U, 14U, and 16U girls volleyball athletes who are ready
          to grow in a competitive, development-focused club environment. Our
          program is built to provide skill development, team training, and
          meaningful competition that prepares athletes for success during the club
          season and beyond.
        </p>
        <p className="mt-4 text-slate-400">
          The girls club volleyball season typically begins in late fall, with
          tryouts held in October and November, practices starting in November or
          December, and tournament competition running from January through the
          spring and summer. ELEVATE is committed to helping athletes train with
          purpose, compete with confidence, and continue progressing toward the
          next level.
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
