export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-[#d4af37]/20 bg-white/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            A stronger first impression for families
          </h2>
          <p className="mt-4 text-neutral-400">
            Keep the communication clear, premium, and easy to access on mobile.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-sm font-semibold text-white">Email</p>
              <p className="mt-1 text-neutral-400">info@elevatepnwvolleyball.com</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-sm font-semibold text-white">Region</p>
              <p className="mt-1 text-neutral-400">Portland Metro / Tigard Area</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <p className="text-sm font-semibold text-white">Focus</p>
              <p className="mt-1 text-neutral-400">Club teams, clinics, and athlete development</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#d4af37]/20 bg-gradient-to-br from-[#d4af37]/12 via-white/5 to-transparent p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
            Launch Direction
          </p>
          <h3 className="mt-3 text-2xl font-black text-white">
            Ready for the next phase
          </h3>
          <div className="mt-6 space-y-4 text-sm text-neutral-300">
            <p>• Add real logo assets and favicon package</p>
            <p>• Connect tryout form submissions</p>
            <p>• Add secure auth for admin, parents, coaches, and players</p>
            <p>• Build app-style dashboards and announcements</p>
            <p>• Add schedule, documents, and messaging tools</p>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/40 p-5">
            <p className="text-sm font-semibold text-white">Mobile-first note</p>
            <p className="mt-2 text-sm text-neutral-400">
              This layout is already structured to feel cleaner on phones and can grow into a PWA or wrapped mobile app later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
