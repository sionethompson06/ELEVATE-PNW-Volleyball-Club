const stats = [
  { value: "4", label: "Role-based portals" },
  { value: "100%", label: "Mobile-friendly foundation" },
  { value: "1", label: "Connected club platform" },
  { value: "24/7", label: "Access-ready structure" },
];

export default function StatsBand() {
  return (
    <section className="border-y border-[#d4af37]/10 bg-black/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/5 p-5 text-center">
            <p className="text-3xl font-black text-[#d4af37]">{stat.value}</p>
            <p className="mt-2 text-sm text-neutral-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
