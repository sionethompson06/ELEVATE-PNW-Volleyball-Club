"use client";

import Link from "next/link";
import { useState } from "react";

type Coach = {
  id: string;
  first_name: string;
  last_name: string;
  title: string | null;
};

type PlayerRow = {
  membership_id: string;
  player_id: string | null;
  first_name: string;
  last_name: string;
  age_group: string | null;
  primary_position: string | null;
  school: string | null;
  assigned_at: string;
};

type TeamDetail = {
  id: string;
  team_name: string;
  display_name: string | null;
  tier: string | null;
  roster_limit: number | null;
  is_active: boolean;
  program_name: string | null;
  program_age_group: string | null;
  head_coach_profile_id: string | null;
  assistant_coach_profile_id: string | null;
  assigned_head_coach_name: string | null;
  assigned_assistant_coach_name: string | null;
};

export default function TeamDetailClient({
  team,
  coaches,
  roster,
}: {
  team: TeamDetail;
  coaches: Coach[];
  roster: PlayerRow[];
}) {
  const [message, setMessage] = useState("");
  const [selectedHeadCoachId, setSelectedHeadCoachId] = useState(team.head_coach_profile_id || "");
  const [selectedAssistantCoachId, setSelectedAssistantCoachId] = useState(team.assistant_coach_profile_id || "");

  async function assignCoach(role: "head" | "assistant", coachProfileId: string) {
    setMessage("");

    const res = await fetch(`/api/admin/teams/${team.id}/assign-coach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coachProfileId, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data?.error || "Unable to assign coach.");
      return;
    }

    setMessage(data.message || "Coach assigned successfully.");
    window.location.reload();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/admin/teams" className="text-[#60a5fa] transition hover:text-[#34d399]">
        ← Back to teams
      </Link>

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          Team Detail
        </p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          {team.display_name || team.team_name}
        </h1>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Program</p>
            <p className="mt-2 text-white">{team.program_name || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Age Group</p>
            <p className="mt-2 text-white">{team.program_age_group || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Tier</p>
            <p className="mt-2 text-white">{team.tier || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Roster Limit</p>
            <p className="mt-2 text-white">{team.roster_limit ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Active</p>
            <p className="mt-2 text-white">{team.is_active ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
          Coach Assignment
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5">
            <h2 className="text-xl font-black text-white">Head Coach</h2>
            <p className="mt-2 text-sm text-slate-400">
              Current Head Coach: <span className="font-semibold text-white">{team.assigned_head_coach_name || "Not assigned"}</span>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <select
                value={selectedHeadCoachId}
                onChange={(e) => setSelectedHeadCoachId(e.target.value)}
                className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
              >
                <option value="">Select head coach</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.first_name} {coach.last_name}{coach.title ? ` — ${coach.title}` : ""}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => assignCoach("head", selectedHeadCoachId)}
                className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Assign Head Coach
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5">
            <h2 className="text-xl font-black text-white">Assistant Coach</h2>
            <p className="mt-2 text-sm text-slate-400">
              Current Assistant Coach: <span className="font-semibold text-white">{team.assigned_assistant_coach_name || "Not assigned"}</span>
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <select
                value={selectedAssistantCoachId}
                onChange={(e) => setSelectedAssistantCoachId(e.target.value)}
                className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
              >
                <option value="">Select assistant coach</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.first_name} {coach.last_name}{coach.title ? ` — ${coach.title}` : ""}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => assignCoach("assistant", selectedAssistantCoachId)}
                className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:bg-[#2f6df6]/10 hover:text-[#93c5fd]"
              >
                Assign Assistant Coach
              </button>
            </div>
          </div>
        </div>

        {message && (
          <p className="mt-4 text-sm text-green-400">{message}</p>
        )}
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Roster
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Assigned Players
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-[#05070b]/60 px-4 py-2 text-sm text-slate-300">
            Total: {roster.length}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10 bg-[#05070b]/40">
          <table className="min-w-full text-sm text-white">
            <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
              <tr>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Age Group</th>
                <th className="px-4 py-3">Primary Position</th>
                <th className="px-4 py-3">School</th>
                <th className="px-4 py-3">Assigned</th>
              </tr>
            </thead>
            <tbody>
              {roster.map((player) => (
                <tr key={player.membership_id} className="border-b border-white/5">
                  <td className="px-4 py-4 font-semibold text-white">
                    {player.first_name} {player.last_name}
                  </td>
                  <td className="px-4 py-4 text-slate-300">{player.age_group || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{player.primary_position || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{player.school || "—"}</td>
                  <td className="px-4 py-4 text-slate-400">
                    {new Date(player.assigned_at).toISOString().slice(0, 10)}
                  </td>
                </tr>
              ))}

              {roster.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                    No players assigned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
