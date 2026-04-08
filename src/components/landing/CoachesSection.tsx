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
          Parents want to know who is leading their athlete. ELEVATE is built on a
          coaching philosophy centered on teaching, accountability, competitive
          growth, and confidence-building support.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/70 p-8">
          <p className="text-sm font-semibold text-white">Founder / Head Coach</p>
          <h3 className="mt-3 text-2xl font-black text-white">Shawna Thompson</h3>

          <p className="mt-4 text-slate-400">
            Shawna Thompson is the Founder and Head Coach of ELEVATE PNW Volleyball
            Club. Originally from Honolulu, Hawaii, Shawna brings a rich cultural
            background and a lifelong passion for volleyball to the club. She is
            proud of her Native Hawaiian heritage and her diverse background,
            including Samoan, Portuguese, Filipino, Korean, Chinese, Spanish, and
            English ancestry.
          </p>

          <p className="mt-4 text-slate-400">
            Shawna has competed at elite levels throughout her volleyball journey.
            As a club athlete, she was a Junior National Champion in the 16U
            American Division. She also won a high school state championship and
            went on to play collegiately at Menlo College, where she was a four-year
            letter athlete.
          </p>

          <p className="mt-4 text-slate-400">
            Her passion extends far beyond her own playing career. Shawna is deeply
            committed to helping young athletes develop the skills, mindset, and
            confidence needed to become champions on and off the court. She has
            coached girls ages 12–18 in both high school and club settings in
            California and Hawaii.
          </p>

          <p className="mt-4 text-slate-400">
            She founded ELEVATE to share her love for the game and to build a
            program where youth athletes can be developed with purpose, challenged
            with integrity, and prepared for the next level.
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
