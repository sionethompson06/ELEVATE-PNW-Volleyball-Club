"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CoachRow = {
  id: string;
  first_name: string;
  last_name: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  head_team_count: number;
  assistant_team_count: number;
  assigned_team_count: number;
};

type Props = {
  coaches: CoachRow[];
};

export default function CoachesAdminClient({ coaches }: Props) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredCoaches = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return coaches.filter((coach) => {
      const fullName = `${coach.first_name} ${coach.last_name}`;

      const matchesSearch =
        searchValue.length === 0 ||
        [fullName, coach.title, coach.email, coach.phone]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(searchValue));

      const matchesActive =
        activeFilter === "all" ||
        (activeFilter === "active" && coach.is_active) ||
        (activeFilter === "inactive" && !coach.is_active);

      const matchesRole =
        roleFilter === "all" ||
        (roleFilter === "has_head_role" && coach.head_team_count > 0) ||
        (roleFilter === "has_assistant_role" && coach.assistant_team_count > 0) ||
        (roleFilter === "both_roles" &&
          coach.head_team_count > 0 &&
          coach.assistant_team_count > 0) ||
        (roleFilter === "unassigned" && coach.assigned_team_count === 0) ||
        (roleFilter === "multi_team" && coach.assigned_team_count > 1);

      return matchesSearch && matchesActive && matchesRole;
    });
  }, [coaches, search, activeFilter, roleFilter]);

  const visibleCoaches = filteredCoaches.length;
  const visibleActive = filteredCoaches.filter((coach) => coach.is_active).length;
  const visibleAssigned = filteredCoaches.filter((coach) => coach.assigned_team_count > 0).length;
  const visibleAssignments = filteredCoaches.reduce(
    (sum, coach) => sum + coach.assigned_team_count,
    0
  );

  function resetFilters() {
    setSearch("");
    setActiveFilter("all");
    setRoleFilter("all");
  }

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Visible Coaches</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleCoaches}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Active Coaches</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleActive}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Coaches Assigned</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleAssigned}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Team Assignments</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleAssignments}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_180px_220px_auto]">
          <div>
            <label
              htmlFor="coach-search"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Search coaches
            </label>
            <input
              id="coach-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search coach, title, email, or phone"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60a5fa]"
            />
          </div>

          <div>
            <label
              htmlFor="coach-active-filter"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Active
            </label>
            <select
              id="coach-active-filter"
              value={activeFilter}
              onChange={(event) => setActiveFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="coach-role-filter"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Assignment Role
            </label>
            <select
              id="coach-role-filter"
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              <option value="all">All</option>
              <option value="has_head_role">Head coach assignments</option>
              <option value="has_assistant_role">Assistant coach assignments</option>
              <option value="both_roles">Both roles</option>
              <option value="multi_team">Multi-team</option>
              <option value="unassigned">Unassigned</option>
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
              <th className="px-4 py-3">Coach</th>
              <th className="px-4 py-3">Profile Title</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Head Teams</th>
              <th className="px-4 py-3">Assistant Teams</th>
              <th className="px-4 py-3">Total Assignments</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoaches.map((coach) => (
              <tr key={coach.id} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                <td className="px-4 py-4 font-semibold text-white">
                  <Link
                    href={`/admin/coaches/${coach.id}`}
                    className="text-white transition hover:text-[#93c5fd]"
                  >
                    {coach.first_name} {coach.last_name}
                  </Link>
                </td>
                <td className="px-4 py-4 text-slate-300">{coach.title || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{coach.email || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{coach.phone || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{coach.head_team_count}</td>
                <td className="px-4 py-4 text-slate-300">{coach.assistant_team_count}</td>
                <td className="px-4 py-4 text-slate-300">{coach.assigned_team_count}</td>
                <td className="px-4 py-4 text-slate-300">
                  {coach.is_active ? "Active" : "Inactive"}
                </td>
              </tr>
            ))}

            {filteredCoaches.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                  No coaches match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
