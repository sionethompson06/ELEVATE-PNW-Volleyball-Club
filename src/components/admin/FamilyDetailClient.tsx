"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PlayerRow = {
  id: string;
  first_name: string;
  last_name: string;
  age_group: string | null;
  primary_position: string | null;
  school: string | null;
  registration_status: string | null;
  portal_enabled: boolean | null;
  current_team_name: string | null;
};

type FamilyDetail = {
  id: string;
  family_name: string;
  primary_parent_name: string | null;
  primary_parent_email: string | null;
  primary_parent_phone: string | null;
  account_status: string | null;
  created_at: string | null;
  total_players: number;
  assigned_players: number;
  portal_enabled_count: number;
  registration_complete_count: number;
  registration_in_progress_count: number;
  portal_summary: string;
  registration_summary: string;
};

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

function formatStatusLabel(status: string | null) {
  if (!status) return "—";
  return status.replaceAll("_", " ");
}

function getRegistrationBadgeClasses(status: string | null) {
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

export default function FamilyDetailClient({
  family,
  players,
}: {
  family: FamilyDetail;
  players: PlayerRow[];
}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [saving, setSaving] = useState(false);

  async function runAction(action: "invite-portal" | "enable-portal") {
    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/admin/families/${family.id}/${action}`, {
      method: "POST",
    });

    const data = await res.json();

    if (!res.ok) {
      setMessageType("error");
      setMessage(data?.error || "Action failed.");
      setSaving(false);
      return;
    }

    setMessageType("success");
    setMessage(data?.message || "Action completed successfully.");
    setSaving(false);
    router.refresh();
  }

  const notEnabledCount = players.filter((player) => !player.portal_enabled).length;
  const assignedPlayers = players.filter((player) => player.current_team_name);
  const unassignedPlayers = players.filter((player) => !player.current_team_name);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/admin/families"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to families
        </Link>

        <Link
          href="/admin/players"
          className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
        >
          Open Players
        </Link>
      </div>

      {message && (
        <div
          className={
            messageType === "success"
              ? "mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300"
              : "mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          }
        >
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
              {family.family_name}
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Family operations, portal readiness, registration progress, and current assignments.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClasses(
                family.account_status
              )}`}
            >
              {formatStatusLabel(family.account_status)}
            </span>
            <span className="text-xs text-slate-500">
              Created {family.created_at ? new Date(family.created_at).toISOString().slice(0, 10) : "—"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Primary Parent
            </p>
            <p className="mt-2 text-white">{family.primary_parent_name || "—"}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Email
            </p>
            <p className="mt-2 break-words text-white">
              {family.primary_parent_email || "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Phone
            </p>
            <p className="mt-2 text-white">{family.primary_parent_phone || "—"}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Account Status
            </p>
            <p className="mt-2 text-white">{formatStatusLabel(family.account_status)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Linked Players</p>
          <p className="mt-3 text-3xl font-black text-white">{family.total_players}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Team Assigned</p>
          <p className="mt-3 text-3xl font-black text-white">{family.assigned_players}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portal Enabled</p>
          <p className="mt-3 text-3xl font-black text-white">{family.portal_enabled_count}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Registration Complete</p>
          <p className="mt-3 text-3xl font-black text-white">
            {family.registration_complete_count}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
                Portal Status
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Family Portal Readiness
              </h2>
            </div>

            <span className="rounded-full border border-white/10 bg-[#05070b]/60 px-3 py-1 text-xs text-slate-300">
              {family.portal_enabled_count}/{family.total_players} enabled
            </span>
          </div>

          <p className="mt-4 text-slate-300">{family.portal_summary}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => runAction("invite-portal")}
              className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Working..." : "Invite to Portal"}
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => runAction("enable-portal")}
              className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Working..." : "Enable Portal"}
            </button>
          </div>

          {notEnabledCount === 0 ? (
            <p className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-sm text-green-300">
              All linked players already have portal access enabled.
            </p>
          ) : (
            <p className="mt-4 text-sm text-slate-400">
              {notEnabledCount} linked player{notEnabledCount === 1 ? "" : "s"} still need portal access enabled.
            </p>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
                Registration Progress
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Family Registration Summary
              </h2>
            </div>

            <span className="rounded-full border border-white/10 bg-[#05070b]/60 px-3 py-1 text-xs text-slate-300">
              {family.registration_complete_count}/{family.total_players} complete
            </span>
          </div>

          <p className="mt-4 text-slate-300">{family.registration_summary}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Complete</p>
              <p className="mt-2 text-xl font-bold text-white">
                {family.registration_complete_count}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">In Progress</p>
              <p className="mt-2 text-xl font-bold text-white">
                {family.registration_in_progress_count}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Not Started</p>
              <p className="mt-2 text-xl font-bold text-white">
                {Math.max(
                  family.total_players -
                    family.registration_complete_count -
                    family.registration_in_progress_count,
                  0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Current Team Assignments
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Assignment Overview
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assigned Players</p>
            <p className="mt-2 text-2xl font-black text-white">{assignedPlayers.length}</p>

            <div className="mt-4 space-y-2">
              {assignedPlayers.length > 0 ? (
                assignedPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-white">
                      {player.first_name} {player.last_name}
                    </span>
                    <span className="text-slate-400"> — {player.current_team_name}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">No players assigned yet.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#05070b]/50 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Unassigned Players</p>
            <p className="mt-2 text-2xl font-black text-white">{unassignedPlayers.length}</p>

            <div className="mt-4 space-y-2">
              {unassignedPlayers.length > 0 ? (
                unassignedPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm"
                  >
                    <span className="font-semibold text-white">
                      {player.first_name} {player.last_name}
                    </span>
                    <span className="text-slate-400"> — Not assigned</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">All linked players are assigned.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
              Linked Players
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Family Roster
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-[#05070b]/60 px-4 py-2 text-sm text-slate-300">
            Total: {family.total_players}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10 bg-[#05070b]/40">
          <table className="min-w-full text-sm text-white">
            <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
              <tr>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Age Group</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3">School</th>
                <th className="px-4 py-3">Current Team</th>
                <th className="px-4 py-3">Registration</th>
                <th className="px-4 py-3">Portal</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-b border-white/5">
                  <td className="px-4 py-4 font-semibold text-white">
                    <Link
                      href="/admin/players"
                      className="text-white transition hover:text-[#93c5fd]"
                    >
                      {player.first_name} {player.last_name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{player.age_group || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{player.primary_position || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{player.school || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{player.current_team_name || "Not assigned"}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRegistrationBadgeClasses(
                        player.registration_status
                      )}`}
                    >
                      {formatStatusLabel(player.registration_status || "not_started")}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        player.portal_enabled
                          ? "border border-green-500/30 bg-green-500/10 text-green-300"
                          : "border border-white/10 bg-white/[0.04] text-slate-300"
                      }`}
                    >
                      {player.portal_enabled ? "enabled" : "not enabled"}
                    </span>
                  </td>
                </tr>
              ))}

              {players.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    No players linked to this family yet.
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
