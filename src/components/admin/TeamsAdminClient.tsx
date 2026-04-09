"use client";

import Link from "next/link";
import { useState } from "react";

type Program = {
  id: string;
  name: string;
  age_group: string;
};

type Team = {
  id: string;
  team_name: string;
  display_name?: string | null;
  tier?: string | null;
  roster_limit: number | null;
  is_active: boolean;
  programs:
    | {
        id: string;
        name: string;
        age_group: string;
      }
    | {
        id: string;
        name: string;
        age_group: string;
      }[]
    | null;
};

const tierOptions = ["Silver", "Gold", "Nationals"];

export default function TeamsAdminClient({
  teams,
  programs,
}: {
  teams: Team[];
  programs: Program[];
}) {
  const [programId, setProgramId] = useState(programs[0]?.id || "");
  const [tier, setTier] = useState("Silver");
  const [rosterLimit, setRosterLimit] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function createTeam() {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/admin/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        programId,
        tier,
        rosterLimit,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data?.error || "Unable to create team.");
      setSaving(false);
      return;
    }

    setMessage(`Team "${data.team.display_name || data.team.team_name}" created successfully.`);
    setSaving(false);
    window.location.reload();
  }

  async function updateTeam(teamId: string, patch: Record<string, unknown>) {
    setMessage("");

    const res = await fetch(`/api/admin/teams/${teamId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patch),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data?.error || "Unable to update team.");
      return;
    }

    setMessage(`Team "${data.team.display_name || data.team.team_name}" updated successfully.`);
    window.location.reload();
  }

  async function deleteTeam(teamId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team? This only works if no players are assigned."
    );

    if (!confirmed) return;

    setMessage("");

    const res = await fetch(`/api/admin/teams/${teamId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data?.error || "Unable to delete team.");
      return;
    }

    setMessage(data.message || "Team deleted successfully.");
    window.location.reload();
  }

  return (
    <div className="mt-8">
      <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
        <h2 className="text-2xl font-black text-white">Create Team</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <select
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
          >
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name} ({program.age_group})
              </option>
            ))}
          </select>

          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
          >
            {tierOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input
            value={rosterLimit}
            onChange={(e) => setRosterLimit(e.target.value)}
            placeholder="Roster Limit"
            className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
          />
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={createTeam}
            disabled={saving}
            className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {saving ? "Creating..." : "Create Team"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm text-green-400">{message}</p>
        )}
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-[#0b1220]/70">
        <table className="min-w-full text-sm text-white">
          <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
            <tr>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Roster Limit</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => {
              const program = Array.isArray(team.programs) ? team.programs[0] : team.programs;

              return (
                <tr key={team.id} className="border-b border-white/5">
                  <td className="px-4 py-4 font-semibold">
                    <Link
                      href={`/admin/teams/${team.id}`}
                      className="text-[#60a5fa] transition hover:text-[#34d399]"
                    >
                      {team.display_name || team.team_name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    {program ? `${program.name} (${program.age_group})` : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      defaultValue={team.tier || "Silver"}
                      onChange={(e) =>
                        updateTeam(team.id, { tier: e.target.value })
                      }
                      className="rounded-xl border border-white/10 bg-[#05070b]/70 px-3 py-2 text-white outline-none"
                    >
                      {tierOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <input
                      defaultValue={team.roster_limit ?? ""}
                      onBlur={(e) =>
                        updateTeam(team.id, { rosterLimit: e.target.value || null })
                      }
                      className="w-24 rounded-xl border border-white/10 bg-[#05070b]/70 px-3 py-2 text-white outline-none"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <label className="inline-flex items-center gap-2 text-slate-300">
                      <input
                        type="checkbox"
                        defaultChecked={team.is_active}
                        onChange={(e) =>
                          updateTeam(team.id, { isActive: e.target.checked })
                        }
                      />
                      {team.is_active ? "Yes" : "No"}
                    </label>
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() => deleteTeam(team.id)}
                      className="rounded-full border border-red-500/40 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

            {teams.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No teams created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
