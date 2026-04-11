"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ActivityRow = {
  id: string;
  occurred_at: string;
  event_type: "family_created" | "player_created" | "team_assignment";
  title: string;
  description: string;
  family_id: string | null;
  family_name: string | null;
  player_id: string | null;
  player_name: string | null;
  team_id: string | null;
  team_name: string | null;
};

type Props = {
  rows: ActivityRow[];
};

function formatEventType(type: ActivityRow["event_type"]) {
  switch (type) {
    case "family_created":
      return "Family created";
    case "player_created":
      return "Player created";
    case "team_assignment":
      return "Team assignment";
    default:
      return type;
  }
}

function getEventClasses(type: ActivityRow["event_type"]) {
  switch (type) {
    case "family_created":
      return "border border-blue-500/30 bg-blue-500/10 text-blue-300";
    case "player_created":
      return "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "team_assignment":
      return "border border-amber-500/30 bg-amber-500/10 text-amber-300";
    default:
      return "border border-white/10 bg-white/[0.04] text-slate-300";
  }
}

export default function ActivityAdminClient({ rows }: Props) {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        q.length === 0 ||
        [
          row.title,
          row.description,
          row.family_name,
          row.player_name,
          row.team_name,
        ]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(q));

      const matchesEvent =
        eventFilter === "all" || row.event_type === eventFilter;

      return matchesSearch && matchesEvent;
    });
  }, [rows, search, eventFilter]);

  const visibleEvents = filteredRows.length;
  const familyCreatedCount = filteredRows.filter((row) => row.event_type === "family_created").length;
  const playerCreatedCount = filteredRows.filter((row) => row.event_type === "player_created").length;
  const assignmentCount = filteredRows.filter((row) => row.event_type === "team_assignment").length;

  function resetFilters() {
    setSearch("");
    setEventFilter("all");
  }

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Visible Events</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleEvents}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Families Created</p>
          <p className="mt-3 text-3xl font-black text-white">{familyCreatedCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Players Created</p>
          <p className="mt-3 text-3xl font-black text-white">{playerCreatedCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Team Assignments</p>
          <p className="mt-3 text-3xl font-black text-white">{assignmentCount}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px_auto]">
          <div>
            <label htmlFor="activity-search" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Search activity
            </label>
            <input
              id="activity-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search family, player, team, or event"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60a5fa]"
            />
          </div>

          <div>
            <label htmlFor="activity-event-filter" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Event Type
            </label>
            <select
              id="activity-event-filter"
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              <option value="all">All</option>
              <option value="family_created">Family created</option>
              <option value="player_created">Player created</option>
              <option value="team_assignment">Team assignment</option>
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
              <th className="px-4 py-3">When</th>
              <th className="px-4 py-3">Event</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Family</th>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Team</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr key={`${row.id}-${index}`} className="border-b border-white/5">
                <td className="px-4 py-4 text-slate-400">
                  {new Date(row.occurred_at).toISOString().slice(0, 16).replace("T", " ")}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getEventClasses(row.event_type)}`}>
                    {formatEventType(row.event_type)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="font-semibold text-white">{row.title}</div>
                  <div className="mt-1 text-xs text-slate-400">{row.description}</div>
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {row.family_id ? (
                    <Link href={`/admin/families/${row.family_id}`} className="transition hover:text-[#93c5fd]">
                      {row.family_name || "—"}
                    </Link>
                  ) : (
                    row.family_name || "—"
                  )}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {row.player_id ? (
                    <Link href={`/admin/players/${row.player_id}`} className="transition hover:text-[#93c5fd]">
                      {row.player_name || "—"}
                    </Link>
                  ) : (
                    row.player_name || "—"
                  )}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {row.team_id ? (
                    <Link href={`/admin/teams/${row.team_id}`} className="transition hover:text-[#93c5fd]">
                      {row.team_name || "—"}
                    </Link>
                  ) : (
                    row.team_name || "—"
                  )}
                </td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No activity matches the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
