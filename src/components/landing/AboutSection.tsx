export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            About ELEVATE
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Built for athletes who want to grow in the right environment
          </h2>
          <p className="mt-4 text-slate-400">
            ELEVATE’s mission is to help athletes grow through intentional coaching,
            competitive training, strong communication, and a team culture that
            builds confidence on and off the court. We are committed to providing
            every player with skill development, competitive acumen, and elite-level
            preparation so they can reach their potential, showcase their talent,
            and prepare for the next level.
          </p>
          <p className="mt-4 text-slate-400">
            As an elite volleyball club, we want our athletes to love the sport,
            compete with integrity, and grow into the best version of themselves as
            players and people.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2f6df6]/12 via-[#0f172a] to-[#22c55e]/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Vision & Values
          </p>
          <p className="mt-4 text-lg leading-8 text-slate-200">
            Our vision is to be an elite volleyball club that develops confident,
            skilled, and competitive athletes who love the game, compete with
            integrity, and are prepared to succeed at the next level.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#05070b]/60 p-5">
            <p className="text-sm font-semibold text-white">What guides ELEVATE</p>
            <p className="mt-2 text-sm text-slate-400">
              At ELEVATE, we value growth, integrity, discipline, communication,
              confidence, and love for the game. These values shape the way we
              train, compete, communicate, and build our club culture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
