"use client";

import Link from "next/link";
import { useState } from "react";

type PlayerDetail = {
  id: string;
  first_name: string;
  last_name: string;
  age_group: string | null;
  school: string | null;
  primary_position: string | null;
  secondary_position: string | null;
  registration_status: string | null;
  payment_status: string | null;
  portal_enabled: boolean;
  created_at: string | null;
  current_team_id: string | null;
  current_team_name: string | null;
};

type FamilySummary = {
  id: string | null;
  family_name: string | null;
  primary_parent_name: string | null;
  primary_parent_email: string | null;
  primary_parent_phone: string | null;
  account_status: string | null;
};

function formatStatus(status: string | null) {
  if (!status) return "—";
  return status.replaceAll("_", " ");
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

function getReadinessLabel(player: PlayerDetail) {
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

export default function PlayerDetailClient({
  player,
  family,
}: {
  player: PlayerDetail;
  family: FamilySummary;
}) {
  const playerName = `${player.first_name} ${player.last_name}`;

  const [registrationStatus, setRegistrationStatus] = useState(
    player.registration_status || "not_started"
  );
  const [paymentStatus, setPaymentStatus] = useState(player.payment_status || "due");
  const [portalEnabled, setPortalEnabled] = useState(player.portal_enabled);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function updatePlayer(patch: Record<string, unknown>, successMessage: string) {
    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/admin/players/${player.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data?.error || "Unable to update player.");
      setSaving(false);
      return;
    }

    setMessage(successMessage);
    setSaving(false);
    window.location.reload();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/players"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to players
        </Link>

        <div className="flex flex-wrap gap-3">
          {family.id && (
            <Link
              href={`/admin/families/${family.id}`}
              className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
            >
              Open Family
            </Link>
          )}
          {player.current_team_id && (
            <Link
              href={`/admin/teams/${player.current_team_id}`}
              className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
            >
              Open Team
            </Link>
          )}
          <Link
            href="/admin/payments"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
          >
            Payments
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
              Player Detail
            </p>
            <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              {playerName}
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Player profile, family link, team assignment, registration, and payment readiness.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPaymentClasses(
                player.payment_status
              )}`}
            >
              Payment: {formatStatus(player.payment_status)}
            </span>
            <span className="text-xs text-slate-500">
              Created {player.created_at ? new Date(player.created_at).toISOString().slice(0, 10) : "—"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Age Group</p>
            <p className="mt-2 text-white">{player.age_group || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">School</p>
            <p className="mt-2 text-white">{player.school || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Primary Position</p>
            <p className="mt-2 text-white">{player.primary_position || "—"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Current Team</p>
            <p className="mt-2 text-white">{player.current_team_name || "Not assigned"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Readiness</p>
            <p className="mt-2 text-white">{getReadinessLabel(player)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Status Actions
          </p>
          <h2 className="mt-2 text-2xl font-black text-white">
            Update Player Status
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Registration Status
              </label>
              <div className="mt-2 flex gap-3">
                <select
                  value={registrationStatus}
                  onChange={(e) => setRegistrationStatus(e.target.value)}
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
                    updatePlayer(
                      { registration_status: registrationStatus },
                      "Registration status updated."
                    )
                  }
                  className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd] disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Payment Status
              </label>
              <div className="mt-2 flex gap-3">
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
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
                    updatePlayer(
                      { payment_status: paymentStatus },
                      "Payment status updated."
                    )
                  }
                  className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd] disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Portal Access
              </label>
              <div className="mt-2 flex items-center justify-between rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3">
                <span className="text-white">
                  {portalEnabled ? "Portal enabled" : "Portal not enabled"}
                </span>
                <button
                  type="button"
                  disabled={saving}
                  onClick={() =>
                    updatePlayer(
                      { portal_enabled: !portalEnabled },
                      !portalEnabled ? "Portal enabled." : "Portal disabled."
                    )
                  }
                  className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-50"
                >
                  {portalEnabled ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
                Current Snapshot
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Registration + Payment
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Registration</p>
              <div className="mt-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRegistrationClasses(
                    player.registration_status
                  )}`}
                >
                  {formatStatus(player.registration_status)}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Payment</p>
              <div className="mt-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPaymentClasses(
                    player.payment_status
                  )}`}
                >
                  {formatStatus(player.payment_status)}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portal</p>
              <div className="mt-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    player.portal_enabled
                      ? "border border-green-500/30 bg-green-500/10 text-green-300"
                      : "border border-white/10 bg-white/[0.04] text-slate-300"
                  }`}
                >
                  {player.portal_enabled ? "enabled" : "not enabled"}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Family Status</p>
              <div className="mt-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getFamilyStatusClasses(
                    family.account_status
                  )}`}
                >
                  {formatStatus(family.account_status)}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Player Readiness</p>
              <p className="mt-2 text-lg font-bold text-white">{getReadinessLabel(player)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
                Family Summary
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Linked Family
              </h2>
            </div>

            {family.id && (
              <Link
                href={`/admin/families/${family.id}`}
                className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
              >
                View Family
              </Link>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Family</p>
              <p className="mt-2 text-white">{family.family_name || "—"}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Primary Parent</p>
              <p className="mt-2 text-white">{family.primary_parent_name || "—"}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
              <p className="mt-2 text-white">{family.primary_parent_email || "—"}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Phone</p>
              <p className="mt-2 text-white">{family.primary_parent_phone || "—"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
                Payment Summary
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Payment + Readiness
              </h2>
            </div>

            <Link
              href="/admin/payments"
              className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
            >
              View Payments
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Payment Status</p>
              <p className="mt-2 text-white">{formatStatus(player.payment_status)}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Registration</p>
              <p className="mt-2 text-white">{formatStatus(player.registration_status)}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portal</p>
              <p className="mt-2 text-white">{player.portal_enabled ? "Enabled" : "Not enabled"}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Readiness</p>
              <p className="mt-2 text-white">{getReadinessLabel(player)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
