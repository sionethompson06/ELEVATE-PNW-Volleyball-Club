const programs = [
  {
    title: "Club Teams",
    description:
      "Competitive team experiences built around consistency, accountability, and long-term athlete development.",
  },
  {
    title: "Clinics & Skills Training",
    description:
      "Focused reps for passing, serving, defense, attacking, movement, and game confidence.",
  },
  {
    title: "Season Support",
    description:
      "A stronger communication and resource system for players, coaches, and families.",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
          Programs
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Premium structure. Athlete-first experience.
        </h2>
        <p className="mt-4 text-neutral-400">
          A clean starting point for a club that wants to feel serious, organized,
          and built for growth from day one.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {programs.map((program) => (
          <div
            key={program.title}
            className="rounded-3xl border border-[#d4af37]/15 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#d4af37]/40 hover:bg-white/[0.07]"
          >
            <div className="h-1.5 w-14 rounded-full bg-[#d4af37]" />
            <h3 className="mt-5 text-xl font-semibold text-white">{program.title}</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              {program.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
