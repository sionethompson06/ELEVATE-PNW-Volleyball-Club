import Link from "next/link";

const portals = [
  {
    title: "Admin",
    description: "Manage club operations, announcements, documents, and access.",
    href: "/admin",
  },
  {
    title: "Parents",
    description: "Get team updates, schedules, forms, and important resources.",
    href: "/parents",
  },
  {
    title: "Coaches",
    description: "Access planning tools, team communication, and staff resources.",
    href: "/coaches",
  },
  {
    title: "Players",
    description: "See training details, club expectations, and athlete resources.",
    href: "/players",
  },
];

export default function PortalCards() {
  return (
    <section id="portals" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
          Club Portals
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          One platform. Four role-based experiences.
        </h2>
        <p className="mt-4 text-neutral-400">
          Start with clean entry pages now, then connect secure sign-in and private dashboards next.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {portals.map((portal) => (
          <Link
            key={portal.title}
            href={portal.href}
            className="group rounded-3xl border border-[#d4af37]/15 bg-black/40 p-6 transition hover:border-[#d4af37]/50 hover:bg-white/[0.05]"
          >
            <p className="text-lg font-semibold text-white">{portal.title}</p>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              {portal.description}
            </p>
            <span className="mt-6 inline-block text-sm font-semibold text-[#d4af37] transition group-hover:translate-x-1">
              Open portal →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
