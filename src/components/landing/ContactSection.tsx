import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1220]/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Connect with ELEVATE
          </h2>
          <p className="mt-4 text-slate-400">
            Have questions about programs, tryouts, or the club experience? We’d love to hear from you.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#05070b]/70 p-5">
              <p className="text-sm font-semibold text-white">Email</p>
              <p className="mt-1 text-slate-400">info@elevatepnwvolleyball.com</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#05070b]/70 p-5">
              <p className="text-sm font-semibold text-white">Region</p>
              <p className="mt-1 text-slate-400">Portland Metro / Tigard Area</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#05070b]/70 p-5">
              <p className="text-sm font-semibold text-white">Focus</p>
              <p className="mt-1 text-slate-400">Club teams, clinics, and athlete development</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#tryouts"
              className="inline-flex items-center justify-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Join Tryout Interest List
            </Link>
            <Link
              href="#programs"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:bg-[#2f6df6]/10 hover:text-[#93c5fd]"
            >
              Learn More About Programs
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2f6df6]/12 via-[#0f172a] to-[#22c55e]/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Member Access
          </p>
          <h3 className="mt-3 text-2xl font-black text-white">
            Already part of the ELEVATE family?
          </h3>
          <p className="mt-4 text-slate-300">
            Current club families, players, coaches, and staff can continue into the private club portal through Sign In.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[#05070b]/60 p-5">
            <p className="text-sm font-semibold text-white">Private portal use</p>
            <p className="mt-2 text-sm text-slate-400">
              Schedules, communication, resources, announcements, and club tools stay available through the protected member portal experience.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
