"use client";

import Link from "next/link";

type SummaryStats = {
  lead_count: number;
  family_count: number;
  player_count: number;
  team_count: number;
  coach_count: number;
  payment_due_count: number;
  payment_partial_count: number;
  registration_incomplete_count: number;
  portal_not_enabled_count: number;
  unassigned_player_count: number;
};

type ActivityPreview = {
  id: string;
  occurred_at: string;
  label: string;
  href: string | null;
  meta: string;
};

export default function AdminDashboardClient({
  stats,
  activity,
}: {
  stats: SummaryStats;
  activity: ActivityPreview[];
}) {
  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-4 xl:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Leads</p>
          <p className="mt-3 text-3xl font-black text-white">{stats.lead_count}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Families</p>
          <p className="mt-3 text-3xl font-black text-white">{stats.family_count}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Players</p>
          <p className="mt-3 text-3xl font-black text-white">{stats.player_count}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Teams</p>
          <p className="mt-3 text-3xl font-black text-white">{stats.team_count}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Coaches</p>
          <p className="mt-3 text-3xl font-black text-white">{stats.coach_count}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-red-300">Payment Due</p>
          <p className="mt-3 text-3xl font-black text-white">{stats.payment_due_count}</p>
          <p className="mt-2 text-sm text-slate-400">Players needing payment follow-up.</p>
        </div>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Partial Payments</p>
          <p className="mt-3 text-3xl font-black text-white">{stats.payment_partial_count}</p>
          <p className="mt-2 text-sm text-slate-400">Players with balance remaining.</p>
        </div>
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-yellow-300">Registration Incomplete</p>
          <p className="mt-3 text-3xl font-black text-white">{stats.registration_incomplete_count}</p>
          <p className="mt-2 text-sm text-slate-400">Players not fully registration complete.</p>
        </div>
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-300">Portal Not Enabled</p>
          <p className="mt-3 text-3xl font-black text-white">{stats.portal_not_enabled_count}</p>
          <p className="mt-2 text-sm text-slate-400">Players still needing portal enablement.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Workflow Shortcuts
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Go Where Work Happens
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recruiting</p>
                <div className="mt-4 space-y-3">
                  <Link href="/admin/leads" className="block rounded-xl border border-white/10 px-4 py-3 text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
                    Leads Pipeline
                  </Link>
                  <Link href="/admin/activity" className="block rounded-xl border border-white/10 px-4 py-3 text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
                    Recent Recruiting Activity
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Registration</p>
                <div className="mt-4 space-y-3">
                  <Link href="/admin/families" className="block rounded-xl border border-white/10 px-4 py-3 text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
                    Family Readiness
                  </Link>
                  <Link href="/admin/players" className="block rounded-xl border border-white/10 px-4 py-3 text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
                    Player Registration Queue
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Rostering</p>
                <div className="mt-4 space-y-3">
                  <Link href="/admin/players" className="block rounded-xl border border-white/10 px-4 py-3 text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
                    Assign Players to Teams
                  </Link>
                  <Link href="/admin/teams" className="block rounded-xl border border-white/10 px-4 py-3 text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
                    Team Operations
                  </Link>
                  <Link href="/admin/coaches" className="block rounded-xl border border-white/10 px-4 py-3 text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
                    Coach Staffing
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Finance</p>
                <div className="mt-4 space-y-3">
                  <Link href="/admin/payments" className="block rounded-xl border border-white/10 px-4 py-3 text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
                    Payment Follow-up
                  </Link>
                  <Link href="/admin/families" className="block rounded-xl border border-white/10 px-4 py-3 text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
                    Family Billing Visibility
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Exception Queues
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Action Needed Now
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Link
                href="/admin/payments"
                className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 transition hover:border-red-400/40"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300">
                  Payment Due
                </p>
                <p className="mt-3 text-3xl font-black text-white">{stats.payment_due_count}</p>
                <p className="mt-2 text-sm text-slate-400">Open players owing payment.</p>
              </Link>

              <Link
                href="/admin/payments"
                className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 transition hover:border-amber-400/40"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Partial Payments
                </p>
                <p className="mt-3 text-3xl font-black text-white">{stats.payment_partial_count}</p>
                <p className="mt-2 text-sm text-slate-400">Players with balance remaining.</p>
              </Link>

              <Link
                href="/admin/players"
                className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5 transition hover:border-yellow-400/40"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">
                  Registration Incomplete
                </p>
                <p className="mt-3 text-3xl font-black text-white">{stats.registration_incomplete_count}</p>
                <p className="mt-2 text-sm text-slate-400">Players needing registration follow-up.</p>
              </Link>

              <Link
                href="/admin/families"
                className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 transition hover:border-blue-400/40"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Portal Not Enabled
                </p>
                <p className="mt-3 text-3xl font-black text-white">{stats.portal_not_enabled_count}</p>
                <p className="mt-2 text-sm text-slate-400">Players still needing portal access.</p>
              </Link>

              <Link
                href="/admin/players"
                className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5 transition hover:border-[#60a5fa]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Unassigned Players
                </p>
                <p className="mt-3 text-3xl font-black text-white">{stats.unassigned_player_count}</p>
                <p className="mt-2 text-sm text-slate-400">Players without a current team.</p>
              </Link>

              <Link
                href="/admin/activity"
                className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5 transition hover:border-[#60a5fa]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Review Recent Activity
                </p>
                <p className="mt-3 text-3xl font-black text-white">{activity.length}</p>
                <p className="mt-2 text-sm text-slate-400">Recent events available for review.</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
                Recent Activity
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Latest Events
              </h2>
            </div>

            <Link
              href="/admin/activity"
              className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
            >
              Open Activity
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {activity.length > 0 ? (
              activity.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    {item.href ? (
                      <Link href={item.href} className="font-semibold text-white transition hover:text-[#93c5fd]">
                        {item.label}
                      </Link>
                    ) : (
                      <p className="font-semibold text-white">{item.label}</p>
                    )}
                    <span className="text-xs text-slate-500">
                      {new Date(item.occurred_at).toISOString().slice(0, 16).replace("T", " ")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{item.meta}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No recent activity available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
