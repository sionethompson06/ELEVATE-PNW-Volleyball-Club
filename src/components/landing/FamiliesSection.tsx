export default function FamiliesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          What Families Can Expect
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          A club experience that feels organized, challenging, and connected
        </h2>
        <p className="mt-4 text-slate-400">
          We want families to feel confident in the experience their athlete is stepping into.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Clear Communication",
            text: "Families should know where to get updates, schedules, expectations, and next steps.",
          },
          {
            title: "Positive Competitive Environment",
            text: "Players are challenged to grow in a culture built on effort, discipline, and teamwork.",
          },
          {
            title: "Development-Focused Coaching",
            text: "Training should help athletes improve consistently, not just participate.",
          },
          {
            title: "Club Standards",
            text: "We value accountability, respect, coachability, and commitment.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 transition hover:border-[#2f6df6]/35"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
