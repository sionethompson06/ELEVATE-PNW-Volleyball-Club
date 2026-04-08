import Image from "next/image";
import Link from "next/link";

export default function FounderStory() {
  return (
    <section id="founder" className="mx-auto max-w-7xl px-4 py-18 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1220]/70">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/shawna.jpg"
              alt="Shawna Thompson on a volleyball court"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2f6df6]/12 via-[#0f172a] to-[#22c55e]/10 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Founder Story
          </p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Built from ʻohana, purpose, and love for the game
          </h2>

          <p className="mt-5 text-slate-300">
            Shawna Thompson is the founder and head coach of ELEVATE PNW Volleyball
            Club, a leader grounded in purpose, culture, and community. Born and
            raised in Honolulu, Hawai‘i, she brings a deep connection to her Native
            Hawaiian roots and a diverse heritage that shapes how she leads. For
            Shawna, everything begins with ʻohana.
          </p>

          <p className="mt-4 text-slate-400">
            Her volleyball journey reflects discipline and excellence. She earned a
            Junior National Championship at the 16U level, won a high school state
            title, and went on to compete as a four-year letter athlete at Menlo
            College. Through the game, she developed not only as a player, but as a
            leader with resilience and vision.
          </p>

          <p className="mt-4 text-slate-400">
            ELEVATE was built for something bigger. Shawna started the club
            alongside her family, creating a family-run organization rooted in
            ʻohana. She saw a gap in youth sports where performance was prioritized
            over personal growth, and set out to build a program grounded in pono,
            where doing what is right matters just as much as winning.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#05070b]/60 p-5">
            <p className="text-lg font-semibold italic text-white">
              “I’m not just coaching volleyball, I’m building people. Athletes
              should leave stronger in who they are, not just in how they play.”
            </p>
          </div>

          <p className="mt-6 text-slate-400">
            Families can expect structure, honesty, and high standards. Shawna
            leads with kuleana, holding athletes accountable while supporting their
            growth with intention and care. She believes effort, attitude, and
            discipline define success, and challenges every athlete to take
            ownership of their development.
          </p>

          <p className="mt-4 text-slate-400">
            ELEVATE is more than a club, it is ʻohana. A place where athletes are
            guided with aloha, challenged with purpose, and prepared for life beyond
            the game.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#tryouts"
              className="inline-flex items-center justify-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Join Tryout Interest List
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:bg-[#2f6df6]/10 hover:text-[#93c5fd]"
            >
              Contact ELEVATE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
