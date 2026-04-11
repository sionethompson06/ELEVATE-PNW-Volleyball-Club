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
  family_id: string | null;
  family_name: string | null;
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
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const [selectedHeadCoachId, setSelectedHeadCoachId] = useState(
    team.head_coach_profile_id || ""
  );
  const [selectedAssistantCoachId, setSelectedAssistantCoachId] = useState(
    team.assistant_coach_profile_id || ""
  );

  const [editingTier, setEditingTier] = useState(team.tier || "Silver");
  const [editingRosterLimit, setEditingRosterLimit] = useState(
    team.roster_limit ? String(team.roster_limit) : ""
  );
  const [editingIsActive, setEditingIsActive] = useState(team.is_active);
  const [savingSettings, setSavingSettings] = useState(false);

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
      setMessageType("error");
      setMessage(data?.error || "Unable to assign coach.");
      return;
    }

    setMessageType("success");
    setMessage(data.message || "Coach assigned successfully.");
    window.location.reload();
  }

  async function saveTeamSettings() {
    setSavingSettings(true);
    setMessage("");

    const payload = {
      tier: editingTier,
      rosterLimit: editingRosterLimit ? Number(editingRosterLimit) : null,
      isActive: editingIsActive,
    };

    const res = await fetch(`/api/admin/teams/${team.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessageType("error");
      setMessage(data?.error || "Unable to update team settings.");
      setSavingSettings(false);
      return;
    }

    setMessageType("success");
    setMessage("Team settings updated successfully.");
    setSavingSettings(false);
    window.location.reload();
  }

  const teamLabel = team.display_name || team.team_name;
  const rosterCount = roster.length;
  const rosterOpenSpots =
    typeof team.roster_limit === "number" ? Math.max(team.roster_limit - rosterCount, 0) : null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link href="/admin/teams" className="text-[#60a5fa] transition hover:text-[#34d399]">
          ← Back to teams
        </Link>

        <div className="flex gap-3">
          <Link
            href="/admin/players"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
          >
            Open Players
          </Link>
          <Link
            href="/admin/coaches"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
          >
            Open Coaches
          </Link>
        </div>
      </div>

      {message && (
        <div
          className={
            messageType === "success"
              ? "mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300"
              : "mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          }
        >
          {message}
        </div>
      )}

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Team Detail
            </p>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {teamLabel}
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Team staffing, roster assignment, and coach setup.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getTierClasses(
                team.tier
              )}`}
            >
              {team.tier || "—"}
            </span>
            <span className="text-xs text-slate-500">
              {team.is_active ? "Active team" : "Inactive team"}
            </span>
          </div>
        </div>

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

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Roster Count</p>
          <p className="mt-3 text-3xl font-black text-white">{rosterCount}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Open Spots</p>
          <p className="mt-3 text-3xl font-black text-white">
            {rosterOpenSpots ?? "—"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Head Coach</p>
          <p className="mt-3 text-base font-bold text-white">
            {team.assigned_head_coach_name || "Not assigned"}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assistant Coach</p>
          <p className="mt-3 text-base font-bold text-white">
            {team.assigned_assistant_coach_name || "Not assigned"}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Team Settings
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Edit Team Configuration
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Tier
            </label>
            <select
              value={editingTier}
              onChange={(e) => setEditingTier(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
            >
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Nationals">Nationals</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Roster Limit
            </label>
            <input
              type="number"
              min="0"
              value={editingRosterLimit}
              onChange={(e) => setEditingRosterLimit(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
              placeholder="No limit"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Active Status
            </label>
            <select
              value={editingIsActive ? "active" : "inactive"}
              onChange={(e) => setEditingIsActive(e.target.value === "active")}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={saveTeamSettings}
            disabled={savingSettings}
            className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {savingSettings ? "Saving..." : "Save Team Settings"}
          </button>
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
              Current Head Coach:{" "}
              <span className="font-semibold text-white">
                {team.assigned_head_coach_name || "Not assigned"}
              </span>
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
                    {coach.first_name} {coach.last_name}
                    {coach.title ? ` — ${coach.title}` : ""}
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
              Current Assistant Coach:{" "}
              <span className="font-semibold text-white">
                {team.assigned_assistant_coach_name || "Not assigned"}
              </span>
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
                    {coach.first_name} {coach.last_name}
                    {coach.title ? ` — ${coach.title}` : ""}
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
                <th className="px-4 py-3">Family</th>
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
                    {player.player_id ? (
                      <Link
                        href={`/admin/players/${player.player_id}`}
                        className="text-white transition hover:text-[#93c5fd]"
                      >
                        {player.first_name} {player.last_name}
                      </Link>
                    ) : (
                      `${player.first_name} ${player.last_name}`
                    )}
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    {player.family_id ? (
                      <Link
                        href={`/admin/families/${player.family_id}`}
                        className="transition hover:text-[#93c5fd]"
                      >
                        {player.family_name || "—"}
                      </Link>
                    ) : (
                      player.family_name || "—"
                    )}
                  </td>
                  <td className="px-4 py-4 text-slate-300">{player.age_group || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">
                    {player.primary_position || "—"}
                  </td>
                  <td className="px-4 py-4 text-slate-300">{player.school || "—"}</td>
                  <td className="px-4 py-4 text-slate-400">
                    {new Date(player.assigned_at).toISOString().slice(0, 10)}
                  </td>
                </tr>
              ))}

              {roster.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
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
