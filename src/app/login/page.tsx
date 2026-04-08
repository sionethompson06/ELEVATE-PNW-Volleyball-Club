import Link from "next/link";

const roles = [
  {
    title: "Admin",
    href: "/admin",
    description: "Club operations, setup, communications, and management tools.",
  },
  {
    title: "Parents",
    href: "/parents",
    description: "Schedules, updates, team resources, and family information.",
  },
  {
    title: "Coaches",
    href: "/coaches",
    description: "Practice planning, communication, and team management.",
  },
  {
    title: "Players",
    href: "/players",
    description: "Training resources, team updates, and athlete development.",
  },
];

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
          Sign In
        </p>
        <h1 className="mt-3 text-4xl font-bold text-white">Choose your portal</h1>
        <p className="mt-4 text-neutral-400">
          For now, these are placeholder portal destinations. In the next phase,
          we can connect them to real authentication and private dashboards.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {roles.map((role) => (
          <Link
            key={role.title}
            href={role.href}
            className="rounded-3xl border border-[#d4af37]/15 bg-white/5 p-6 transition hover:border-[#d4af37]/40 hover:bg-white/[0.07]"
          >
            <h2 className="text-xl font-semibold text-white">{role.title}</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              {role.description}
            </p>
            <span className="mt-6 inline-block text-sm font-semibold text-[#d4af37]">
              Continue →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
