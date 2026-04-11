"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PlayerRow = {
  id: string;
  first_name: string;
  last_name: string;
  age_group: string | null;
  school: string | null;
  primary_position: string | null;
  registration_status: string | null;
  payment_status: string | null;
  portal_enabled: boolean;
  family_name: string | null;
  family_id: string | null;
  current_team_name: string | null;
  current_team_id: string | null;
};

type Props = {
  players: PlayerRow[];
};

function formatStatus(value: string | null) {
  if (!value) return "—";
  return value.replaceAll("_", " ");
}

function getRegistrationClasses(status: string | null) {
  switch (status) {
    case "complete":
      return "border border-green-500/30 bg-green-500/10 text-green-300";
    case "in_progress":
      return "border border-amber-500/30 bg-amber-500/10 text-amber-300";
    case "started":
      return "border border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
    default:
      return "border border-white/10 bg-white/[0.04] text-slate-300";
  }
}

export default function PlayersAdminClient({ players }: Props) {
  const [search, setSearch] = useState("");
  const [ageGroupFilter, setAgeGroupFilter] = useState("all");
  const [registrationFilter, setRegistrationFilter] = useState("all");
  const [portalFilter, setPortalFilter] = useState("all");

  const uniquePlayers = useMemo(() => {
    const seen = new Set<string>();
    return players.filter((player) => {
      if (seen.has(player.id)) return false;
      seen.add(player.id);
      return true;
    });
  }, [players]);

  const ageGroupOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        uniquePlayers
          .map((player) => player.age_group)
          .filter((value): value is string => Boolean(value))
      )
    ).sort();

    return ["all", ...values];
  }, [uniquePlayers]);

  const registrationOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        uniquePlayers
          .map((player) => player.registration_status)
          .filter((value): value is string => Boolean(value))
      )
    ).sort();

    return ["all", ...values];
  }, [uniquePlayers]);

  const filteredPlayers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return uniquePlayers.filter((player) => {
      const matchesSearch =
        searchValue.length === 0 ||
        [
          `${player.first_name} ${player.last_name}`,
          player.first_name,
          player.last_name,
          player.school,
          player.primary_position,
          player.family_name,
          player.current_team_name,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(searchValue));

      const matchesAgeGroup =
        ageGroupFilter === "all" || player.age_group === ageGroupFilter;

      const matchesRegistration =
        registrationFilter === "all" ||
        player.registration_status === registrationFilter;

      const matchesPortal =
        portalFilter === "all" ||
        (portalFilter === "enabled" && player.portal_enabled) ||
        (portalFilter === "not_enabled" && !player.portal_enabled);

      return (
        matchesSearch &&
        matchesAgeGroup &&
        matchesRegistration &&
        matchesPortal
      );
    });
  }, [uniquePlayers, search, ageGroupFilter, registrationFilter, portalFilter]);

  const visiblePlayers = filteredPlayers.length;
  const visiblePortalEnabled = filteredPlayers.filter((player) => player.portal_enabled).length;
  const visibleRegistrationComplete = filteredPlayers.filter(
    (player) => player.registration_status === "complete"
  ).length;
  const visibleRegistrationInProgress = filteredPlayers.filter(
    (player) => player.registration_status === "in_progress" || player.registration_status === "started"
  ).length;
  const visibleAssigned = filteredPlayers.filter((player) => player.current_team_id).length;
  const visibleNotStarted = Math.max(
    visiblePlayers - visibleRegistrationComplete - visibleRegistrationInProgress,
    0
  );

  const totalPlayers = uniquePlayers.length;
  const totalComplete = uniquePlayers.filter((player) => player.registration_status === "complete").length;
  const totalInProgress = uniquePlayers.filter(
    (player) => player.registration_status === "in_progress" || player.registration_status === "started"
  ).length;
  const totalNotStarted = Math.max(totalPlayers - totalComplete - totalInProgress, 0);
  const totalPortalEnabled = uniquePlayers.filter((player) => player.portal_enabled).length;

  function resetFilters() {
    setSearch("");
    setAgeGroupFilter("all");
    setRegistrationFilter("all");
    setPortalFilter("all");
  }

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total Players</p>
          <p className="mt-3 text-3xl font-black text-white">{totalPlayers}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Complete</p>
          <p className="mt-3 text-3xl font-black text-white">{totalComplete}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">In Progress</p>
          <p className="mt-3 text-3xl font-black text-white">{totalInProgress}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Not Started</p>
          <p className="mt-3 text-3xl font-black text-white">{totalNotStarted}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portal Enabled</p>
          <p className="mt-3 text-3xl font-black text-white">{totalPortalEnabled}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Registration Readiness
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Filtered Operations Snapshot
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-[#05070b]/60 px-4 py-2 text-sm text-slate-300">
            Showing {visiblePlayers} of {totalPlayers}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Visible Players</p>
            <p className="mt-2 text-2xl font-black text-white">{visiblePlayers}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assigned Team</p>
            <p className="mt-2 text-2xl font-black text-white">{visibleAssigned}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Complete</p>
            <p className="mt-2 text-2xl font-black text-white">{visibleRegistrationComplete}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">In Progress</p>
            <p className="mt-2 text-2xl font-black text-white">{visibleRegistrationInProgress}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Not Started</p>
            <p className="mt-2 text-2xl font-black text-white">{visibleNotStarted}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_180px_220px_180px_auto]">
          <div>
            <label htmlFor="player-search" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Search players
            </label>
            <input
              id="player-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search player, family, school, team, or position"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60a5fa]"
            />
          </div>

          <div>
            <label htmlFor="player-age-group-filter" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Age Group
            </label>
            <select
              id="player-age-group-filter"
              value={ageGroupFilter}
              onChange={(event) => setAgeGroupFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              {ageGroupOptions.map((option, optionIndex) => (
                <option key={`${option}-${optionIndex}`} value={option}>
                  {option === "all" ? "All" : option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="player-registration-filter" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Registration
            </label>
            <select
              id="player-registration-filter"
              value={registrationFilter}
              onChange={(event) => setRegistrationFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              {registrationOptions.map((option, optionIndex) => (
                <option key={`${option}-${optionIndex}`} value={option}>
                  {option === "all" ? "All" : formatStatus(option)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="player-portal-filter" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Portal
            </label>
            <select
              id="player-portal-filter"
              value={portalFilter}
              onChange={(event) => setPortalFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              <option value="all">All</option>
              <option value="enabled">Enabled</option>
              <option value="not_enabled">Not enabled</option>
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
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Age Group</th>
              <th className="px-4 py-3">School</th>
              <th className="px-4 py-3">Primary Position</th>
              <th className="px-4 py-3">Family</th>
              <th className="px-4 py-3">Current Team</th>
              <th className="px-4 py-3">Registration</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Portal</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player, index) => (
              <tr key={`${player.id}-${index}`} className="border-b border-white/5">
                <td className="px-4 py-4 font-semibold text-white">
                  <Link href={`/admin/players/${player.id}`} className="text-white transition hover:text-[#93c5fd]">
                    {player.first_name} {player.last_name}
                  </Link>
                </td>
                <td className="px-4 py-4 text-slate-300">{player.age_group || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{player.school || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{player.primary_position || "—"}</td>
                <td className="px-4 py-4 text-slate-300">
                  {player.family_id ? (
                    <Link href={`/admin/families/${player.family_id}`} className="transition hover:text-[#93c5fd]">
                      {player.family_name || "—"}
                    </Link>
                  ) : (
                    player.family_name || "—"
                  )}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {player.current_team_id ? (
                    <Link href={`/admin/teams/${player.current_team_id}`} className="transition hover:text-[#93c5fd]">
                      {player.current_team_name || "Assigned"}
                    </Link>
                  ) : (
                    "Not assigned"
                  )}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRegistrationClasses(player.registration_status)}`}>
                    {formatStatus(player.registration_status)}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300">{formatStatus(player.payment_status)}</td>
                <td className="px-4 py-4 text-slate-300">
                  {player.portal_enabled ? "Enabled" : "Not enabled"}
                </td>
              </tr>
            ))}

            {filteredPlayers.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                  No players match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
