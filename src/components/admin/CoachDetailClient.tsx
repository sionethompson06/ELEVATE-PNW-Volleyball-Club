"use client";

import Link from "next/link";

type TeamRow = {
  id: string;
  team_name: string | null;
  display_name: string | null;
  tier: string | null;
  is_active: boolean;
  program_name: string | null;
  program_age_group: string | null;
  assigned_player_count: number;
};

type CoachDetail = {
  id: string;
  first_name: string;
  last_name: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
};

function getTierClasses(tier: string | null) {
  switch (tier) {
    case "Nationals":
      return "border border-purple-500/30 bg-purple-500/10 text-purple-300";
    case "Gold":
      return "border border-amber-500/30 bg-amber-500/10 text-amber-300";
    case "Silver":
      return "border border-slate-400/30 bg-slate-400/10 text-slate-300";
    default:
      return "border border-white/10 bg-white/[0.04] text-slate-300";
  }
}

export default function CoachDetailClient({
  coach,
  headTeams,
  assistantTeams,
}: {
  coach: CoachDetail;
  headTeams: TeamRow[];
  assistantTeams: TeamRow[];
}) {
  const coachName = `${coach.first_name} ${coach.last_name}`;
  const totalAssignments = headTeams.length + assistantTeams.length;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/coaches"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to coaches
        </Link>

        <div className="flex gap-3">
          <Link
            href="/admin/teams"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
          >
            Open Teams
          </Link>
          <Link
            href="/admin/players"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
          >
            Open Players
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Coach Detail
            </p>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {coachName}
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Coach profile, team assignments, and staffing visibility.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                coach.is_active
                  ? "border border-green-500/30 bg-green-500/10 text-green-300"
                  : "border border-white/10 bg-white/[0.04] text-slate-300"
              }`}
            >
              {coach.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Profile Title</p>
            <p className="mt-2 text-white">{coach.title || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
            <p className="mt-2 text-white break-words">{coach.email || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</p>
            <p className="mt-2 text-white">{coach.phone || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
            <p className="mt-2 text-white">{coach.is_active ? "Active" : "Inactive"}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Head Team Assignments</p>
          <p className="mt-3 text-3xl font-black text-white">{headTeams.length}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assistant Team Assignments</p>
          <p className="mt-3 text-3xl font-black text-white">{assistantTeams.length}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total Assignments</p>
          <p className="mt-3 text-3xl font-black text-white">{totalAssignments}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
                Head Coach Role
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Head Team Assignments
              </h2>
            </div>

            <div className="rounded-full border border-white/10 bg-[#05070b]/60 px-4 py-2 text-sm text-slate-300">
              Total: {headTeams.length}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {headTeams.length > 0 ? (
              headTeams.map((team) => {
                const teamLabel = team.display_name || team.team_name || "Unnamed Team";

                return (
                  <div
                    key={team.id}
                    className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <Link
                          href={`/admin/teams/${team.id}`}
                          className="text-base font-semibold text-white transition hover:text-[#93c5fd]"
                        >
                          {teamLabel}
                        </Link>
                        <p className="mt-2 text-sm text-slate-400">
                          {team.program_name || "—"} • {team.program_age_group || "—"}
                        </p>
                      </div>

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getTierClasses(
                          team.tier
                        )}`}
                      >
                        {team.tier || "—"}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                      <span>Players: {team.assigned_player_count}</span>
                      <span>{team.is_active ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400">No head coach assignments yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
                Assistant Coach Role
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Assistant Team Assignments
              </h2>
            </div>

            <div className="rounded-full border border-white/10 bg-[#05070b]/60 px-4 py-2 text-sm text-slate-300">
              Total: {assistantTeams.length}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {assistantTeams.length > 0 ? (
              assistantTeams.map((team) => {
                const teamLabel = team.display_name || team.team_name || "Unnamed Team";

                return (
                  <div
                    key={team.id}
                    className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <Link
                          href={`/admin/teams/${team.id}`}
                          className="text-base font-semibold text-white transition hover:text-[#93c5fd]"
                        >
                          {teamLabel}
                        </Link>
                        <p className="mt-2 text-sm text-slate-400">
                          {team.program_name || "—"} • {team.program_age_group || "—"}
                        </p>
                      </div>

                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getTierClasses(
                          team.tier
                        )}`}
                      >
                        {team.tier || "—"}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                      <span>Players: {team.assigned_player_count}</span>
                      <span>{team.is_active ? "Active" : "Inactive"}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400">No assistant coach assignments yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
