export default function TryoutInterest() {
  return (
    <section id="tryouts" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            Tryout Interest
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Start building your first athlete pipeline
          </h2>
          <p className="mt-4 text-neutral-400">
            This section gives families and athletes a clean place to express interest
            before you add a real form backend.
          </p>

          <div className="mt-6 rounded-3xl border border-[#d4af37]/15 bg-white/5 p-6">
            <p className="text-base font-semibold text-white">Suggested for launch:</p>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li>• Player name and age group</li>
              <li>• Parent contact information</li>
              <li>• Volleyball experience level</li>
              <li>• Position interest</li>
              <li>• Tryout availability</li>
            </ul>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#d4af37]/20 bg-white/5 p-6 sm:p-8">
          <form className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Player First Name"
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-[#d4af37]"
              />
              <input
                type="text"
                placeholder="Player Last Name"
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-[#d4af37]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Parent/Guardian Name"
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-[#d4af37]"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-[#d4af37]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Age Group"
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-[#d4af37]"
              />
              <input
                type="text"
                placeholder="Primary Position"
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-[#d4af37]"
              />
            </div>

            <textarea
              placeholder="Tell us about the athlete's experience or interest"
              rows={5}
              className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-neutral-500 outline-none transition focus:border-[#d4af37]"
            />

            <button
              type="button"
              className="mt-2 inline-flex justify-center rounded-full bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c65b]"
            >
              Submit Interest
            </button>

            <p className="text-xs text-neutral-500">
              This is currently a design-stage form. Next, we can connect it to email,
              Google Forms, Airtable, or a real database.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
