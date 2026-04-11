"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TeamRow = {
  id: string;
  team_name: string | null;
  display_name: string | null;
  tier: string | null;
  roster_limit: number | null;
  is_active: boolean;
  program_name: string | null;
  program_age_group: string | null;
  head_coach_profile_id: string | null;
  assistant_coach_profile_id: string | null;
  assigned_player_count: number;
};

type Props = {
  teams: TeamRow[];
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

export default function TeamsAdminClient({ teams }: Props) {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [staffingFilter, setStaffingFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  const tierOptions = useMemo(() => {
    const values = Array.from(
      new Set(teams.map((team) => team.tier).filter((value): value is string => Boolean(value)))
    ).sort();
    return ["all", ...values];
  }, [teams]);

  const filteredTeams = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return teams.filter((team) => {
      const teamLabel = team.display_name || team.team_name || "";
      const matchesSearch =
        searchValue.length === 0 ||
        [teamLabel, team.program_name, team.program_age_group]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(searchValue));

      const matchesTier = tierFilter === "all" || team.tier === tierFilter;

      const matchesStaffing =
        staffingFilter === "all" ||
        (staffingFilter === "fully_staffed" &&
          Boolean(team.head_coach_profile_id) &&
          Boolean(team.assistant_coach_profile_id)) ||
        (staffingFilter === "head_only" &&
          Boolean(team.head_coach_profile_id) &&
          !team.assistant_coach_profile_id) ||
        (staffingFilter === "needs_head" && !team.head_coach_profile_id);

      const matchesActive =
        activeFilter === "all" ||
        (activeFilter === "active" && team.is_active) ||
        (activeFilter === "inactive" && !team.is_active);

      return matchesSearch && matchesTier && matchesStaffing && matchesActive;
    });
  }, [teams, search, tierFilter, staffingFilter, activeFilter]);

  const visibleTeams = filteredTeams.length;
  const visiblePlayers = filteredTeams.reduce((sum, team) => sum + team.assigned_player_count, 0);
  const visibleHeadCoachAssigned = filteredTeams.filter((team) => Boolean(team.head_coach_profile_id)).length;
  const visibleAssistantCoachAssigned = filteredTeams.filter(
    (team) => Boolean(team.assistant_coach_profile_id)
  ).length;

  function resetFilters() {
    setSearch("");
    setTierFilter("all");
    setStaffingFilter("all");
    setActiveFilter("all");
  }

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Visible Teams</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleTeams}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assigned Players</p>
          <p className="mt-3 text-3xl font-black text-white">{visiblePlayers}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Head Coach Assigned</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleHeadCoachAssigned}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assistant Coach Assigned</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleAssistantCoachAssigned}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_180px_220px_180px_auto]">
          <div>
            <label
              htmlFor="team-search"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Search teams
            </label>
            <input
              id="team-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search team, program, or age group"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60a5fa]"
            />
          </div>

          <div>
            <label
              htmlFor="team-tier-filter"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Tier
            </label>
            <select
              id="team-tier-filter"
              value={tierFilter}
              onChange={(event) => setTierFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              {tierOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All" : option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="team-staffing-filter"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Staffing
            </label>
            <select
              id="team-staffing-filter"
              value={staffingFilter}
              onChange={(event) => setStaffingFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              <option value="all">All</option>
              <option value="fully_staffed">Fully staffed</option>
              <option value="head_only">Head only</option>
              <option value="needs_head">Needs head coach</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="team-active-filter"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Active
            </label>
            <select
              id="team-active-filter"
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-[#0b1220]/70">
        <table className="min-w-full text-sm text-white">
          <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
            <tr>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Age Group</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3">Players</th>
              <th className="px-4 py-3">Head Coach</th>
              <th className="px-4 py-3">Assistant Coach</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.map((team) => {
              const teamLabel = team.display_name || team.team_name || "Unnamed Team";

              return (
                <tr
                  key={team.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-4 font-semibold text-white">
                    <Link
                      href={`/admin/teams/${team.id}`}
                      className="text-white transition hover:text-[#93c5fd]"
                    >
                      {teamLabel}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{team.program_name || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{team.program_age_group || "—"}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getTierClasses(
                        team.tier
                      )}`}
                    >
                      {team.tier || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{team.assigned_player_count}</td>
                  <td className="px-4 py-4 text-slate-300">
                    {team.head_coach_profile_id ? "Assigned" : "Open"}
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    {team.assistant_coach_profile_id ? "Assigned" : "Open"}
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    {team.is_active ? "Active" : "Inactive"}
                  </td>
                </tr>
              );
            })}

            {filteredTeams.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                  No teams match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
