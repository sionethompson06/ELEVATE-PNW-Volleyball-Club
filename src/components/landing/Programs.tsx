const programs = [
  {
    title: "Club Teams",
    description:
      "Competitive team experiences built around training quality, accountability, and development.",
  },
  {
    title: "Clinics & Camps",
    description:
      "Flexible training opportunities for fundamentals, positional growth, and repetition.",
  },
  {
    title: "Parent Communication",
    description:
      "A cleaner experience for schedules, updates, event details, and club-wide information.",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
          Programs
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Designed for growth on and off the court
        </h2>
        <p className="mt-4 text-neutral-400">
          Keep the first release simple, polished, and scalable while building a
          long-term club platform.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {programs.map((program) => (
          <div
            key={program.title}
            className="rounded-3xl border border-[#d4af37]/15 bg-white/5 p-6 transition hover:border-[#d4af37]/40 hover:bg-white/[0.07]"
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
