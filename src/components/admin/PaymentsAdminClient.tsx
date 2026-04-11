"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PaymentRow = {
  player_id: string;
  player_name: string;
  age_group: string | null;
  family_id: string | null;
  family_name: string | null;
  payment_status: string | null;
  registration_status: string | null;
  portal_enabled: boolean;
  current_team_id: string | null;
  current_team_name: string | null;
};

type Props = {
  rows: PaymentRow[];
};

function formatStatus(value: string | null) {
  if (!value) return "—";
  return value.replaceAll("_", " ");
}

function getPaymentClasses(status: string | null) {
  switch (status) {
    case "paid":
      return "border border-green-500/30 bg-green-500/10 text-green-300";
    case "partial":
      return "border border-amber-500/30 bg-amber-500/10 text-amber-300";
    case "due":
      return "border border-red-500/30 bg-red-500/10 text-red-300";
    default:
      return "border border-white/10 bg-white/[0.04] text-slate-300";
  }
}

function getReadinessLabel(row: PaymentRow) {
  if (row.payment_status === "paid" && row.registration_status === "complete" && row.portal_enabled) {
    return "Ready";
  }
  if (row.payment_status === "partial") {
    return "Balance remaining";
  }
  if (row.payment_status === "due") {
    return "Needs payment";
  }
  return "Needs review";
}

export default function PaymentsAdminClient({ rows }: Props) {
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [readinessFilter, setReadinessFilter] = useState("all");

  const paymentOptions = useMemo(() => {
    const values = Array.from(
      new Set(rows.map((row) => row.payment_status).filter((v): v is string => Boolean(v)))
    ).sort();
    return ["all", ...values];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesSearch =
        q.length === 0 ||
        [row.player_name, row.family_name, row.age_group, row.current_team_name]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(q));

      const matchesPayment =
        paymentFilter === "all" || row.payment_status === paymentFilter;

      const readiness = getReadinessLabel(row);
      const matchesReadiness =
        readinessFilter === "all" ||
        (readinessFilter === "ready" && readiness === "Ready") ||
        (readinessFilter === "balance_remaining" && readiness === "Balance remaining") ||
        (readinessFilter === "needs_payment" && readiness === "Needs payment") ||
        (readinessFilter === "needs_review" && readiness === "Needs review");

      return matchesSearch && matchesPayment && matchesReadiness;
    });
  }, [rows, search, paymentFilter, readinessFilter]);

  const totalPlayers = filteredRows.length;
  const paidCount = filteredRows.filter((r) => r.payment_status === "paid").length;
  const partialCount = filteredRows.filter((r) => r.payment_status === "partial").length;
  const dueCount = filteredRows.filter((r) => r.payment_status === "due").length;
  const readyCount = filteredRows.filter((r) => getReadinessLabel(r) === "Ready").length;

  function resetFilters() {
    setSearch("");
    setPaymentFilter("all");
    setReadinessFilter("all");
  }

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-5">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Visible Players</p>
          <p className="mt-3 text-3xl font-black text-white">{totalPlayers}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Paid</p>
          <p className="mt-3 text-3xl font-black text-white">{paidCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Partial</p>
          <p className="mt-3 text-3xl font-black text-white">{partialCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Due</p>
          <p className="mt-3 text-3xl font-black text-white">{dueCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Ready</p>
          <p className="mt-3 text-3xl font-black text-white">{readyCount}</p>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto]">
          <div>
            <label htmlFor="payments-search" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Search payments
            </label>
            <input
              id="payments-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player, family, age group, or team"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60a5fa]"
            />
          </div>

          <div>
            <label htmlFor="payments-status-filter" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Payment Status
            </label>
            <select
              id="payments-status-filter"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              {paymentOptions.map((option, index) => (
                <option key={`${option}-${index}`} value={option}>
                  {option === "all" ? "All" : formatStatus(option)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="payments-readiness-filter" className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Readiness
            </label>
            <select
              id="payments-readiness-filter"
              value={readinessFilter}
              onChange={(e) => setReadinessFilter(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-[#05070b]/60 px-4 py-3 text-sm text-white outline-none transition focus:border-[#60a5fa]"
            >
              <option value="all">All</option>
              <option value="ready">Ready</option>
              <option value="balance_remaining">Balance remaining</option>
              <option value="needs_payment">Needs payment</option>
              <option value="needs_review">Needs review</option>
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
              <th className="px-4 py-3">Family</th>
              <th className="px-4 py-3">Age Group</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3">Portal</th>
              <th className="px-4 py-3">Registration</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Readiness</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr key={`${row.player_id}-${index}`} className="border-b border-white/5">
                <td className="px-4 py-4 font-semibold text-white">
                  <Link href={`/admin/players/${row.player_id}`} className="transition hover:text-[#93c5fd]">
                    {row.player_name}
                  </Link>
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
                <td className="px-4 py-4 text-slate-300">{row.age_group || "—"}</td>
                <td className="px-4 py-4 text-slate-300">
                  {row.current_team_id && row.current_team_name ? (
                    <Link href={`/admin/teams/${row.current_team_id}`} className="transition hover:text-[#93c5fd]">
                      {row.current_team_name}
                    </Link>
                  ) : (
                    "Not assigned"
                  )}
                </td>
                <td className="px-4 py-4 text-slate-300">
                  {row.portal_enabled ? "Enabled" : "Not enabled"}
                </td>
                <td className="px-4 py-4 text-slate-300">{formatStatus(row.registration_status)}</td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPaymentClasses(row.payment_status)}`}>
                    {formatStatus(row.payment_status)}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300">{getReadinessLabel(row)}</td>
              </tr>
            ))}

            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
                  No payment records match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
