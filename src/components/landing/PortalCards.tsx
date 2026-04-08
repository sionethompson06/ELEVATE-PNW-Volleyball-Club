import Link from "next/link";

const portals = [
  {
    title: "Admin",
    description: "Manage club operations, announcements, documents, and access.",
    href: "/admin",
  },
  {
    title: "Parents",
    description: "Schedules, forms, updates, and key family information.",
    href: "/parents",
  },
  {
    title: "Coaches",
    description: "Planning tools, communication, team oversight, and resources.",
    href: "/coaches",
  },
  {
    title: "Players",
    description: "Training details, team expectations, and athlete resources.",
    href: "/players",
  },
];

export default function PortalCards() {
  return (
    <section id="portals" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          Club Portals
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          One platform. Four role-based experiences.
        </h2>
        <p className="mt-4 text-slate-400">
          Start with simple role pages now, then expand into secure dashboards and app-style navigation.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {portals.map((portal) => (
          <Link
            key={portal.title}
            href={portal.href}
            className="group rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 transition hover:-translate-y-1 hover:border-[#2f6df6]/35 hover:bg-[#0f172a]/80"
          >
            <p className="text-lg font-semibold text-white">{portal.title}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {portal.description}
            </p>
            <span className="mt-6 inline-block text-sm font-semibold text-[#60a5fa] transition group-hover:translate-x-1">
              Open portal →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
