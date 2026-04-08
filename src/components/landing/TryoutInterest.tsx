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
            Join the tryout interest list to receive updates about teams, training opportunities, and upcoming tryout information.
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
            <p className="text-base font-semibold text-white">Suggested launch fields:</p>
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
          <form className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Player First Name" className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]" />
              <input type="text" placeholder="Player Last Name" className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Parent/Guardian Name" className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]" />
              <input type="email" placeholder="Email Address" className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Age Group" className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]" />
              <input type="text" placeholder="Primary Position" className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]" />
            </div>

            <textarea
              placeholder="Tell us about the athlete's experience or interest"
              rows={5}
              className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
            />

            <button
              type="button"
              className="mt-2 inline-flex justify-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Submit Interest
            </button>

            <p className="text-xs text-slate-500">
              This is currently a design-stage form. Next, we can connect it to email,
              Google Forms, Airtable, or a real database.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
