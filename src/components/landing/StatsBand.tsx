const stats = [
  { value: "4", label: "Role-based portals" },
  { value: "100%", label: "Mobile-friendly foundation" },
  { value: "1", label: "Connected club platform" },
  { value: "24/7", label: "Access-ready structure" },
];

export default function StatsBand() {
  return (
    <section className="border-y border-white/10 bg-[#08101d]/80">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/8 bg-[#0f172a]/70 p-5 text-center">
            <p className="bg-gradient-to-r from-[#60a5fa] to-[#34d399] bg-clip-text text-3xl font-black text-transparent">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
