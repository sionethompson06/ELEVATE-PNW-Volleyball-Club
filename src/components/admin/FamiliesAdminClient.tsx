"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FamilyRow = {
  id: string;
  family_name: string | null;
  primary_parent_name: string | null;
  primary_parent_email: string | null;
  primary_parent_phone: string | null;
  account_status: string | null;
  created_at: string | null;
  player_count: number;
  portal_enabled_count: number;
  registration_complete_count: number;
  assigned_team_count: number;
};

type Props = {
  families: FamilyRow[];
};

function formatStatus(value: string | null) {
  if (!value) return "—";
  return value.replaceAll("_", " ");
}

function getStatusClasses(status: string | null) {
  switch (status) {
    case "portal_enabled":
      return "border border-green-500/30 bg-green-500/10 text-green-300";
    case "portal_invited":
      return "border border-blue-500/30 bg-blue-500/10 text-blue-300";
    case "active":
      return "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    default:
      return "border border-white/10 bg-white/[0.04] text-slate-300";
  }
}

function getReadinessLabel(family: FamilyRow) {
  if (family.player_count === 0) return "No players";
  const fullyReady =
    family.portal_enabled_count === family.player_count &&
    family.registration_complete_count === family.player_count;
  if (fullyReady) return "Fully ready";

  const partiallyReady =
    family.portal_enabled_count > 0 || family.registration_complete_count > 0;
  if (partiallyReady) return "Partially ready";

  return "Needs follow-up";
}

export default function FamiliesAdminClient({ families }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [readinessFilter, setReadinessFilter] = useState("all");

  const statusOptions = useMemo(() => {
    const values = Array.from(
      new Set(
        families
          .map((family) => family.account_status)
          .filter((value): value is string => Boolean(value))
      )
    ).sort();

    return ["all", ...values];
  }, [families]);

  const filteredFamilies = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return families.filter((family) => {
      const readiness = getReadinessLabel(family);

      const matchesSearch =
        searchValue.length === 0 ||
        [
          family.family_name,
          family.primary_parent_name,
          family.primary_parent_email,
          family.primary_parent_phone,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(searchValue));

      const matchesStatus =
        statusFilter === "all" || family.account_status === statusFilter;

      const matchesReadiness =
        readinessFilter === "all" ||
        (readinessFilter === "fully_ready" && readiness === "Fully ready") ||
        (readinessFilter === "partially_ready" && readiness === "Partially ready") ||
        (readinessFilter === "needs_follow_up" && readiness === "Needs follow-up") ||
        (readinessFilter === "no_players" && readiness === "No players");

      return matchesSearch && matchesStatus && matchesReadiness;
    });
  }, [families, search, statusFilter, readinessFilter]);

  const visibleFamilies = filteredFamilies.length;
  const visiblePlayers = filteredFamilies.reduce((sum, family) => sum + family.player_count, 0);
  const visiblePortalEnabled = filteredFamilies.reduce(
    (sum, family) => sum + family.portal_enabled_count,
    0
  );
  const visibleRegistrationComplete = filteredFamilies.reduce(
    (sum, family) => sum + family.registration_complete_count,
    0
  );
  const familiesNeedingFollowUp = filteredFamilies.filter(
    (family) => getReadinessLabel(family) === "Needs follow-up"
  ).length;

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setReadinessFilter("all");
  }

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Visible Families</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleFamilies}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Linked Players</p>
          <p className="mt-3 text-3xl font-black text-white">{visiblePlayers}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portal Enabled</p>
          <p className="mt-3 text-3xl font-black text-white">{visiblePortalEnabled}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Registration Complete</p>
          <p className="mt-3 text-3xl font-black text-white">{visibleRegistrationComplete}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Needs Follow-up</p>
          <p className="mt-3 text-3xl font-black text-white">{familiesNeedingFollowUp}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]">
          <div>
            <label
              htmlFor="family-search"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Search families
            </label>
            <input
              id="family-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search family, parent, email, or phone"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60a5fa]"
            />
          </div>

          <div>
            <label
              htmlFor="family-status-filter"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Account Status
            </label>
            <select
              id="family-status-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              {statusOptions.map((option, index) => (
                <option key={`${option}-${index}`} value={option}>
                  {option === "all" ? "All" : formatStatus(option)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="family-readiness-filter"
              className="text-xs uppercase tracking-[0.2em] text-slate-500"
            >
              Readiness
            </label>
            <select
              id="family-readiness-filter"
              value={readinessFilter}
              onChange={(event) => setReadinessFilter(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              <option value="all">All</option>
              <option value="fully_ready">Fully ready</option>
              <option value="partially_ready">Partially ready</option>
              <option value="needs_follow_up">Needs follow-up</option>
              <option value="no_players">No players</option>
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
              <th className="px-4 py-3">Family</th>
              <th className="px-4 py-3">Primary Parent</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Players</th>
              <th className="px-4 py-3">Portal Enabled</th>
              <th className="px-4 py-3">Registration Complete</th>
              <th className="px-4 py-3">Assigned Team</th>
              <th className="px-4 py-3">Readiness</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredFamilies.map((family, index) => (
              <tr
                key={`${family.id}-${index}`}
                className="border-b border-white/5 transition hover:bg-white/[0.03]"
              >
                <td className="px-4 py-4 font-semibold text-white">
                  <Link
                    href={`/admin/families/${family.id}`}
                    className="text-white transition hover:text-[#93c5fd]"
                  >
                    {family.family_name || "—"}
                  </Link>
                </td>
                <td className="px-4 py-4 text-slate-300">{family.primary_parent_name || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{family.primary_parent_email || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{family.primary_parent_phone || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{family.player_count}</td>
                <td className="px-4 py-4 text-slate-300">
                  {family.portal_enabled_count}/{family.player_count}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {family.registration_complete_count}/{family.player_count}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {family.assigned_team_count}/{family.player_count}
                </td>
                <td className="px-4 py-4 text-slate-300">{getReadinessLabel(family)}</td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                      family.account_status
                    )}`}
                  >
                    {formatStatus(family.account_status)}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-400">
                  {family.created_at ? new Date(family.created_at).toISOString().slice(0, 10) : "—"}
                </td>
              </tr>
            ))}

            {filteredFamilies.length === 0 && (
              <tr>
                <td colSpan={11} className="px-4 py-8 text-center text-slate-400">
                  No families match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
