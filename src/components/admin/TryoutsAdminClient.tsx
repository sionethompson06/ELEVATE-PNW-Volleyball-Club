"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type TryoutRow = {
  id: string;
  player_name: string;
  parent_name: string;
  parent_email: string;
  age_group: string;
  current_status: string;
  tryout_date: string | null;
  evaluation_complete: boolean;
};

type Props = {
  rows: TryoutRow[];
};

function formatDateTime(value: string | null) {
  if (!value) return "Not scheduled";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "Invalid date";
  return d.toISOString().slice(0, 16).replace("T", " ");
}

function sortAgeGroups(values: string[]) {
  return [...values].sort((a, b) => {
    const getAge = (value: string) => {
      const match = value.match(/(\d{1,2})\s*U/i);
      return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
    };
    return getAge(a) - getAge(b) || a.localeCompare(b);
  });
}

export default function TryoutsAdminClient({ rows }: Props) {
  const [search, setSearch] = useState("");
  const [ageGroupFilter, setAgeGroupFilter] = useState("all");
  const [scheduleFilter, setScheduleFilter] = useState("all");

  const ageGroupOptions = useMemo(() => {
    const values = Array.from(new Set(rows.map((row) => row.age_group).filter(Boolean)));
    return ["all", ...sortAgeGroups(values)];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        q.length === 0 ||
        [row.player_name, row.parent_name, row.parent_email, row.age_group]
          .filter(Boolean)
          .some((v) => v.toLowerCase().includes(q));

      const matchesAge =
        ageGroupFilter === "all" || row.age_group === ageGroupFilter;

      const matchesSchedule =
        scheduleFilter === "all" ||
        (scheduleFilter === "scheduled" && !!row.tryout_date) ||
        (scheduleFilter === "not_scheduled" && !row.tryout_date) ||
        (scheduleFilter === "evaluated" && row.evaluation_complete) ||
        (scheduleFilter === "not_evaluated" && !row.evaluation_complete);

      return matchesSearch && matchesAge && matchesSchedule;
    });
  }, [rows, search, ageGroupFilter, scheduleFilter]);

  const total = filteredRows.length;
  const scheduled = filteredRows.filter((row) => !!row.tryout_date).length;
  const notScheduled = filteredRows.filter((row) => !row.tryout_date).length;
  const evaluated = filteredRows.filter((row) => row.evaluation_complete).length;

  function resetFilters() {
    setSearch("");
    setAgeGroupFilter("all");
    setScheduleFilter("all");
  }

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Visible Leads</p>
          <p className="mt-3 text-3xl font-black text-white">{total}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Scheduled</p>
          <p className="mt-3 text-3xl font-black text-white">{scheduled}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Not Scheduled</p>
          <p className="mt-3 text-3xl font-black text-white">{notScheduled}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Evaluated</p>
          <p className="mt-3 text-3xl font-black text-white">{evaluated}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_180px_220px_auto]">
          <div>
            <label htmlFor="tryout-search" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Search tryouts
            </label>
            <input
              id="tryout-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player, parent, email, or age group"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60a5fa]"
            />
          </div>

          <div>
            <label htmlFor="tryout-age-filter" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Age Group
            </label>
            <select
              id="tryout-age-filter"
              value={ageGroupFilter}
              onChange={(e) => setAgeGroupFilter(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              {ageGroupOptions.map((age, index) => (
                <option key={`${age}-${index}`} value={age}>
                  {age === "all" ? "All" : age}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tryout-schedule-filter" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Tryout State
            </label>
            <select
              id="tryout-schedule-filter"
              value={scheduleFilter}
              onChange={(e) => setScheduleFilter(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              <option value="all">All</option>
              <option value="scheduled">Scheduled</option>
              <option value="not_scheduled">Not scheduled</option>
              <option value="evaluated">Evaluated</option>
              <option value="not_evaluated">Not evaluated</option>
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
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tryout Date</th>
              <th className="px-4 py-3">Evaluation</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr key={`${row.id}-${index}`} className="border-b border-white/5">
                <td className="px-4 py-4 font-semibold text-white">
                  <Link
                    href={`/admin/leads/${row.id}`}
                    className="transition hover:text-[#93c5fd]"
                  >
                    {row.player_name}
                  </Link>
                </td>
                <td className="px-4 py-4 text-slate-300">{row.age_group}</td>
                <td className="px-4 py-4 text-slate-300">{row.parent_name}</td>
                <td className="px-4 py-4 text-slate-300">{row.parent_email}</td>
                <td className="px-4 py-4 text-slate-300">{row.current_status}</td>
                <td className="px-4 py-4 text-slate-300">{formatDateTime(row.tryout_date)}</td>
                <td className="px-4 py-4 text-slate-300">
                  {row.evaluation_complete ? "Complete" : "Pending"}
                </td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  No tryout records match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
