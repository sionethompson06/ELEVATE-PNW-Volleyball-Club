import Link from "next/link";

const overviewCards = [
  {
    title: "Tryouts",
    text: "For the 2026–2027 CEVA season, tryouts are expected on November 8, 2026 for 14U and younger, and November 15, 2026 for 15U and older.",
  },
  {
    title: "Practices",
    text: "Teams typically practice 2 to 3 times per week for about 2 hours per session, usually on weeknight evenings and Sundays.",
  },
  {
    title: "Tournaments",
    text: "Weekend competition usually runs from January through spring and early summer, with Power League dates forming the backbone of the season.",
  },
  {
    title: "Commitment",
    text: "Travel teams generally compete in 6 to 7 tournaments per season, with later events extending into May, June, or early July depending on the team.",
  },
];

export default function SeasonOverview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          Season Overview
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          What families can expect during club season
        </h2>
        <p className="mt-4 text-slate-400">
          Club volleyball in Oregon, governed largely by CEVA, runs as a
          competitive, high-commitment season starting in late fall and continuing
          through spring and early summer. ELEVATE is designed to prepare athletes
          for that journey with structure, consistency, and clear expectations.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 transition hover:-translate-y-1 hover:border-[#2f6df6]/35 hover:bg-[#0f172a]/80"
          >
            <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-[#2f6df6] to-[#22c55e]" />
            <h3 className="mt-5 text-xl font-semibold text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Practice Expectations
          </p>
          <p className="mt-4 text-slate-400">
            Families should expect a steady training rhythm throughout the season.
            Practices are typically held 2 to 3 times per week, usually around 2
            hours per session, with weeknight evenings and Sundays being common
            practice windows. Locations may include local schools, private clubs,
            and sports facilities depending on team level and gym access.
          </p>
          <p className="mt-4 text-slate-400">
            Our goal is to create an environment where athletes are consistently
            training, improving, and preparing for weekend competition with
            intention and accountability.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2f6df6]/12 via-[#0f172a] to-[#22c55e]/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Tournament Season
          </p>
          <p className="mt-4 text-slate-400">
            Tournament play typically runs on weekends, with January qualifiers and
            Power League dates throughout February, March, and April serving as the
            core of the competitive schedule for older divisions. Younger divisions
            often continue later into May.
          </p>
          <p className="mt-4 text-slate-400">
            ELEVATE wants families to understand that club volleyball is both a
            development opportunity and a significant commitment. Our job is to help
            players prepare for that challenge and grow through it.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#tryouts"
              className="inline-flex items-center justify-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Join Tryout Interest List
            </Link>
            <Link
              href="#programs"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:bg-[#2f6df6]/10 hover:text-[#93c5fd]"
            >
              Learn More About Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
