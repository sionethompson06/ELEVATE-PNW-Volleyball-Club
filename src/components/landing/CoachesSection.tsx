export default function CoachesSection() {
  return (
    <section id="coaches" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          Coaches
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Coaching that teaches, challenges, and builds confidence
        </h2>
        <p className="mt-4 text-slate-400">
          Parents want to know who is leading their athlete. This section is built to introduce your coaching philosophy and future coaching staff.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/70 p-8">
          <p className="text-sm font-semibold text-white">Founder / Head Coach Placeholder</p>
          <h3 className="mt-3 text-2xl font-black text-white">Coach Name Here</h3>
          <p className="mt-4 text-slate-400">
            Add your coaching background, playing experience, certifications, and leadership story here.
          </p>
          <p className="mt-4 text-slate-400">
            You can also describe the coaching philosophy athletes and families will experience inside the club.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2f6df6]/12 via-[#0f172a] to-[#22c55e]/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Coaching Philosophy
          </p>
          <p className="mt-4 text-slate-300">
            We believe athletes improve best in an environment that combines teaching,
            accountability, clear communication, and confidence-building support.
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <p>• Teach the game with clarity</p>
            <p>• Train with purpose and consistency</p>
            <p>• Build confidence through preparation</p>
            <p>• Create a culture players want to be part of</p>
          </div>
        </div>
      </div>
    </section>
  );
}
