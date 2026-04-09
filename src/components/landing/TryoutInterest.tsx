import TryoutInterestForm from "../forms/TryoutInterestForm";

export default function TryoutInterest() {
  return (
    <section id="tryouts" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Tryout Interest
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Interested in ELEVATE?
          </h2>
          <p className="mt-4 text-slate-400">
            ELEVATE’s girls club volleyball season is designed to give athletes a
            structured, competitive, and development-focused experience from late
            fall through early summer. Tryouts are typically held in October and
            November, with team practices beginning in November or December.
            Tournament competition usually runs from January through the spring and
            summer, depending on the team’s level and schedule.
          </p>

          <p className="mt-4 text-slate-400">
            Our goal is to prepare athletes not only for the demands of the club
            season, but also for long-term growth, higher levels of competition, and
            future opportunities in the sport. Families interested in joining
            ELEVATE are encouraged to complete the tryout interest form to receive
            updates about teams, training opportunities, and tryout details.
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
            <p className="text-base font-semibold text-white">What to be ready for</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>• Player name and age group</li>
              <li>• Parent contact information</li>
              <li>• Volleyball experience level</li>
              <li>• Position interest</li>
              <li>• Tryout availability</li>
            </ul>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <TryoutInterestForm />
        </div>
      </div>
    </section>
  );
}
