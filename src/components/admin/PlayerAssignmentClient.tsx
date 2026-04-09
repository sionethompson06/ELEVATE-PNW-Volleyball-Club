"use client";

import { useState } from "react";

type Team = {
  id: string;
  team_name: string;
  display_name?: string | null;
  age_group?: string | null;
};

type Player = {
  id: string;
  first_name: string;
  last_name: string;
  age_group: string | null;
  current_team_id: string | null;
};

export default function PlayerAssignmentClient({
  players,
  teams,
}: {
  players: Player[];
  teams: Team[];
}) {
  const [message, setMessage] = useState("");

  async function assignPlayer(playerId: string, teamId: string) {
    setMessage("");

    const res = await fetch(`/api/admin/players/${playerId}/assign-team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data?.error || "Unable to assign player.");
      return;
    }

    setMessage(data.message || "Player assigned successfully.");
    window.location.reload();
  }

  function getTeamName(teamId: string | null) {
    if (!teamId) return "Not assigned";
    const match = teams.find((team) => team.id === teamId);
    return match ? match.display_name || match.team_name : "Assigned";
  }

  function getEligibleTeams(playerAgeGroup: string | null) {
    if (!playerAgeGroup) return [];
    return teams.filter((team) => team.age_group === playerAgeGroup);
  }

  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Roster Assignment
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Assign Players to Teams
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Each player can only be assigned to teams within their registered age group.
          </p>
        </div>
      </div>

      {message && (
        <p className="mt-4 text-sm text-green-400">{message}</p>
      )}

      <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10 bg-[#05070b]/40">
        <table className="min-w-full text-sm text-white">
          <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
            <tr>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Age Group</th>
              <th className="px-4 py-3">Current Roster</th>
              <th className="px-4 py-3">Assign to Team</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const eligibleTeams = getEligibleTeams(player.age_group);

              return (
                <tr key={player.id} className="border-b border-white/5">
                  <td className="px-4 py-4 font-semibold text-white">
                    {player.first_name} {player.last_name}
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    {player.age_group || "—"}
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    {getTeamName(player.current_team_id)}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      defaultValue=""
                      onChange={(e) => {
                        if (e.target.value) assignPlayer(player.id, e.target.value);
                      }}
                      className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-2 text-white outline-none"
                    >
                      <option value="">Select team</option>
                      {eligibleTeams.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.display_name || team.team_name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}

            {players.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                  No players available for assignment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
