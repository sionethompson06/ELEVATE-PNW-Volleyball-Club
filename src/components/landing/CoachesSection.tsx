export default function CoachesSection() {
  return (
    <section id="coaches" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          Coaches
        </p>
        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Coaching that teaches, challenges, and builds confidence
        </h2>
        <p className="mt-4 text-slate-400">
          ELEVATE is built on a coaching philosophy centered on teaching,
          accountability, competitive growth, and confidence-building support.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/70 p-8">
          <p className="text-sm font-semibold text-white">Founder / Head Coach</p>
          <h3 className="mt-3 text-2xl font-black text-white">Shawna Thompson</h3>

          <p className="mt-4 text-slate-400">
            Founder and Head Coach Shawna Thompson brings championship experience,
            collegiate playing experience, and a deep passion for youth development
            to ELEVATE PNW Volleyball Club.
          </p>

          <p className="mt-4 text-slate-400">
            As a club athlete, Shawna was a Junior National Champion in the 16U
            American Division. She also won a high school state championship and
            went on to play collegiately at Menlo College, where she was a four-year
            letter athlete.
          </p>

          <p className="mt-4 text-slate-400">
            She has coached girls ages 12–18 in both high school and club settings
            in California and Hawaii, and founded ELEVATE to create a program where
            athletes can grow through intentional coaching, competitive training,
            and a culture that builds champions on and off the court.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2f6df6]/12 via-[#0f172a] to-[#22c55e]/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Coaching Philosophy
          </p>
          <p className="mt-4 text-slate-300">
            We believe athletes improve best in an environment that combines
            teaching, accountability, clear communication, and confidence-building
            support.
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
