import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#2f6df6]/18 via-[#0f172a] to-[#22c55e]/12 p-8 sm:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Next Phase
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Ready to turn this into a full club app?
          </h2>
          <p className="mt-4 text-slate-300">
            This build is structured to grow into a more dynamic platform with
            authentication, registration, schedules, announcements, payments, and mobile install support.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
