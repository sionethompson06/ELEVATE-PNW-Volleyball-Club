const pillars = [
  {
    title: "Player Development",
    description:
      "We build athletes through intentional training, skill growth, and a long-term development mindset.",
  },
  {
    title: "Competitive Culture",
    description:
      "Players are challenged to work hard, compete well, and grow in an environment built on accountability and confidence.",
  },
  {
    title: "Strong Communication",
    description:
      "Families need clarity and trust. Our goal is a club experience that is organized, responsive, and connected.",
  },
  {
    title: "Purpose Beyond the Court",
    description:
      "We want athletes to grow not only as volleyball players, but also as teammates, leaders, and people.",
  },
];

export default function WhyElevate() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          Why ELEVATE
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          A club experience built on development, culture, and trust
        </h2>
        <p className="mt-4 text-slate-400">
          Families are looking for more than a roster spot. They are looking for a place where athletes can improve, compete, and belong.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 transition hover:-translate-y-1 hover:border-[#2f6df6]/35 hover:bg-[#0f172a]/80"
          >
            <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-[#2f6df6] to-[#22c55e]" />
            <h3 className="mt-5 text-xl font-semibold text-white">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
