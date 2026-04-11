"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FamilySummary = {
  id: string;
  family_name: string | null;
  primary_parent_name: string | null;
  primary_parent_email: string | null;
  primary_parent_phone: string | null;
  account_status: string | null;
  created_at: string | null;
};

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
  current_team_id: string | null;
  current_team_name: string | null;
};

function formatStatus(status: string | null) {
  if (!status) return "—";
  return status.replaceAll("_", " ");
}

function getFamilyStatusClasses(status: string | null) {
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

function getRegistrationClasses(status: string | null) {
  switch (status) {
    case "complete":
      return "border border-green-500/30 bg-green-500/10 text-green-300";
    case "in_progress":
      return "border border-amber-500/30 bg-amber-500/10 text-amber-300";
    case "started":
      return "border border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
    case "not_started":
      return "border border-white/10 bg-white/[0.04] text-slate-300";
    default:
      return "border border-white/10 bg-white/[0.04] text-slate-300";
  }
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

function getPlayerReadiness(player: PlayerRow) {
  if (
    player.portal_enabled &&
    player.registration_status === "complete" &&
    player.payment_status === "paid"
  ) {
    return "Ready";
  }

  if (player.payment_status === "partial") return "Balance remaining";
  if (player.payment_status === "due") return "Needs payment";
  return "Needs follow-up";
}

export default function FamilyDetailClient({
  family,
  players,
}: {
  family: FamilySummary;
  players: PlayerRow[];
}) {
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [bulkRegistrationStatus, setBulkRegistrationStatus] = useState("in_progress");
  const [bulkPaymentStatus, setBulkPaymentStatus] = useState("due");

  async function bulkUpdateFamilyPlayers(
    patch: Record<string, unknown>,
    successMessage: string
  ) {
    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/admin/families/${family.id}/bulk-update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data?.error || "Unable to bulk update family players.");
      setSaving(false);
      return;
    }

    setMessage(successMessage);
    setSaving(false);
    window.location.reload();
  }

  const totalPlayers = players.length;
  const portalEnabledCount = players.filter((player) => player.portal_enabled).length;
  const registrationCompleteCount = players.filter(
    (player) => player.registration_status === "complete"
  ).length;
  const registrationInProgressCount = players.filter(
    (player) =>
      player.registration_status === "in_progress" || player.registration_status === "started"
  ).length;
  const paymentPaidCount = players.filter((player) => player.payment_status === "paid").length;
  const paymentDueCount = players.filter((player) => player.payment_status === "due").length;
  const paymentPartialCount = players.filter((player) => player.payment_status === "partial").length;
  const assignedPlayersCount = players.filter((player) => player.current_team_id).length;

  const registrationReadyCount = players.filter(
    (player) =>
      player.portal_enabled &&
      player.registration_status === "complete" &&
      player.payment_status === "paid"
  ).length;

  const familyReadinessLabel = useMemo(() => {
    if (totalPlayers === 0) return "No players";
    if (registrationReadyCount === totalPlayers) return "Fully ready";
    if (registrationReadyCount > 0) return "Partially ready";
    return "Needs follow-up";
  }, [registrationReadyCount, totalPlayers]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/families"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to families
        </Link>

        <div className="flex gap-3">
          <Link
            href="/admin/players"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
          >
            Open Players
          </Link>
          <Link
            href="/admin/payments"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
          >
            Open Payments
          </Link>
        </div>
      </div>

      {message && (
        <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
          {message}
        </div>
      )}

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Family Detail
            </p>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {family.family_name || "Family"}
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Family profile, linked players, portal progress, registration readiness, and payment visibility.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getFamilyStatusClasses(
                family.account_status
              )}`}
            >
              {formatStatus(family.account_status)}
            </span>
            <span className="text-xs text-slate-500">
              Created {family.created_at ? new Date(family.created_at).toISOString().slice(0, 10) : "—"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Primary Parent</p>
            <p className="mt-2 text-white">{family.primary_parent_name || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
            <p className="mt-2 break-words text-white">{family.primary_parent_email || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</p>
            <p className="mt-2 text-white">{family.primary_parent_phone || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Readiness</p>
            <p className="mt-2 text-white">{familyReadinessLabel}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-8">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Players</p>
          <p className="mt-3 text-3xl font-black text-white">{totalPlayers}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portal Enabled</p>
          <p className="mt-3 text-3xl font-black text-white">{portalEnabledCount}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Registration Complete</p>
          <p className="mt-3 text-3xl font-black text-white">{registrationCompleteCount}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">In Progress</p>
          <p className="mt-3 text-3xl font-black text-white">{registrationInProgressCount}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Paid</p>
          <p className="mt-3 text-3xl font-black text-white">{paymentPaidCount}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Partial</p>
          <p className="mt-3 text-3xl font-black text-white">{paymentPartialCount}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Due</p>
          <p className="mt-3 text-3xl font-black text-white">{paymentDueCount}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assigned Team</p>
          <p className="mt-3 text-3xl font-black text-white">{assignedPlayersCount}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Bulk Actions
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Update All Linked Players
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Registration Status
              </label>
              <div className="mt-2 flex gap-3">
                <select
                  value={bulkRegistrationStatus}
                  onChange={(e) => setBulkRegistrationStatus(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
                >
                  <option value="not_started">not started</option>
                  <option value="started">started</option>
                  <option value="in_progress">in progress</option>
                  <option value="complete">complete</option>
                </select>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    bulkUpdateFamilyPlayers(
                      { registration_status: bulkRegistrationStatus },
                      "Registration status updated for all linked players."
                    )
                  }
                  className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd] disabled:opacity-50"
                >
                  Save All
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Payment Status
              </label>
              <div className="mt-2 flex gap-3">
                <select
                  value={bulkPaymentStatus}
                  onChange={(e) => setBulkPaymentStatus(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
                >
                  <option value="due">due</option>
                  <option value="partial">partial</option>
                  <option value="paid">paid</option>
                </select>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    bulkUpdateFamilyPlayers(
                      { payment_status: bulkPaymentStatus },
                      "Payment status updated for all linked players."
                    )
                  }
                  className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd] disabled:opacity-50"
                >
                  Save All
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  bulkUpdateFamilyPlayers(
                    { portal_enabled: true },
                    "Portal enabled for all linked players."
                  )
                }
                className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
              >
                Enable Portal for All
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() =>
                  bulkUpdateFamilyPlayers(
                    { portal_enabled: false },
                    "Portal disabled for all linked players."
                  )
                }
                className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd] disabled:opacity-50"
              >
                Disable Portal for All
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Payment Follow-up
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Needs Attention
          </h2>

          <div className="mt-6 space-y-4">
            {players.filter((player) => getPlayerReadiness(player) !== "Ready").length > 0 ? (
              players
                .filter((player) => getPlayerReadiness(player) !== "Ready")
                .map((player, index) => (
                  <div
                    key={`${player.id}-attention-${index}`}
                    className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Link
                        href={`/admin/players/${player.id}`}
                        className="font-semibold text-white transition hover:text-[#93c5fd]"
                      >
                        {player.first_name} {player.last_name}
                      </Link>
                      <span className="text-xs text-slate-500">{player.age_group || "—"}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {player.payment_status !== "paid" && (
                        <span className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                          Payment {formatStatus(player.payment_status)}
                        </span>
                      )}
                      {player.registration_status !== "complete" && (
                        <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                          Registration {formatStatus(player.registration_status)}
                        </span>
                      )}
                      {!player.portal_enabled && (
                        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                          Portal not enabled
                        </span>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-sm text-slate-400">All linked players appear financially ready.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Registration Checklist
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Per-Player Readiness
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-[#05070b]/60 px-4 py-2 text-sm text-slate-300">
            Ready: {registrationReadyCount} / {totalPlayers}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10 bg-[#05070b]/40">
          <table className="min-w-full text-sm text-white">
            <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
              <tr>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Age Group</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3">Portal</th>
                <th className="px-4 py-3">Registration</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Ready</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => {
                const readiness = getPlayerReadiness(player);

                return (
                  <tr key={`${player.id}-${index}`} className="border-b border-white/5">
                    <td className="px-4 py-4 font-semibold text-white">
                      <Link
                        href={`/admin/players/${player.id}`}
                        className="transition hover:text-[#93c5fd]"
                      >
                        {player.first_name} {player.last_name}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-slate-300">{player.age_group || "—"}</td>
                    <td className="px-4 py-4 text-slate-300">
                      {player.current_team_id && player.current_team_name ? (
                        <Link
                          href={`/admin/teams/${player.current_team_id}`}
                          className="transition hover:text-[#93c5fd]"
                        >
                          {player.current_team_name}
                        </Link>
                      ) : (
                        "Not assigned"
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          player.portal_enabled
                            ? "border border-green-500/30 bg-green-500/10 text-green-300"
                            : "border border-white/10 bg-white/[0.04] text-slate-300"
                        }`}
                      >
                        {player.portal_enabled ? "Enabled" : "Not enabled"}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRegistrationClasses(
                          player.registration_status
                        )}`}
                      >
                        {formatStatus(player.registration_status)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPaymentClasses(
                          player.payment_status
                        )}`}
                      >
                        {formatStatus(player.payment_status)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          readiness === "Ready"
                            ? "border border-green-500/30 bg-green-500/10 text-green-300"
                            : readiness === "Balance remaining"
                              ? "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                              : "border border-red-500/30 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {readiness}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {players.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    No linked players yet.
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
