"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Team = {
  id: string;
  team_name: string;
  display_name?: string | null;
  age_group?: string | null;
};

type Lead = {
  id: string;
  submitted_at: string;
  current_status: string;
  decision_status: string | null;
  tryout_date: string | null;
  evaluation_complete: boolean;
  admin_notes: string | null;
  notes_from_family: string | null;

  converted_family_id?: string | null;
  converted_player_id?: string | null;
  converted_player_current_team_id?: string | null;

  available_teams?: Team[];

  player_first_name: string;
  player_last_name: string;
  player_birthdate: string | null;
  age_group: string | null;
  grad_year: number | null;
  school: string | null;
  primary_position: string | null;
  secondary_position: string | null;
  experience_level: string | null;
  previous_club: string | null;

  parent_primary_name: string | null;
  parent_primary_email: string | null;
  parent_primary_phone: string | null;
};

const statusOptions = [
  "interest",
  "application_invited",
  "application_complete",
  "tryout_scheduled",
  "evaluation_complete",
  "accepted",
  "waitlisted",
  "declined",
  "development_invite",
];

export default function LeadDetailClient({ lead }: { lead: Lead }) {
  const router = useRouter();

  const [currentStatus, setCurrentStatus] = useState(lead.current_status || "interest");
  const [tryoutDate, setTryoutDate] = useState(
    lead.tryout_date ? String(lead.tryout_date).slice(0, 16) : ""
  );
  const [evaluationComplete, setEvaluationComplete] = useState(lead.evaluation_complete);
  const [adminNotes, setAdminNotes] = useState(lead.admin_notes || "");
  const [convertedFamilyId, setConvertedFamilyId] = useState<string | null>(lead.converted_family_id || null);
  const [convertedPlayerId, setConvertedPlayerId] = useState<string | null>(lead.converted_player_id || null);
  const [currentAssignedTeamId, setCurrentAssignedTeamId] = useState<string | null>(
    lead.converted_player_current_team_id || null
  );
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [saving, setSaving] = useState(false);

  const availableTeams = lead.available_teams || [];

  const eligibleTeams = useMemo(() => {
    if (!lead.age_group) return [];
    return availableTeams.filter((team) => team.age_group === lead.age_group);
  }, [availableTeams, lead.age_group]);

  function getTeamName(teamId: string | null) {
    if (!teamId) return "Not assigned";
    const match = availableTeams.find((team) => team.id === teamId);
    return match ? match.display_name || match.team_name : "Assigned";
  }

  async function patchLead(patch: Record<string, unknown>, successMessage = "Lead updated successfully.") {
    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessageType("error");
      setMessage(data?.error || "Update failed.");
      setSaving(false);
      return false;
    }

    setMessageType("success");
    setMessage(successMessage);
    setSaving(false);
    router.refresh();
    return true;
  }

  async function saveLeadUpdates() {
    await patchLead(
      {
        current_status: currentStatus,
        tryout_date: tryoutDate || null,
        evaluation_complete: evaluationComplete,
        admin_notes: adminNotes,
      },
      "Lead updated successfully."
    );
  }

  async function setDecision(nextStatus: string) {
    setCurrentStatus(nextStatus);
    await patchLead(
      {
        current_status: nextStatus,
        decision_status: nextStatus,
      },
      `Lead marked as ${nextStatus}.`
    );
  }

  async function sendApplication() {
    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/admin/leads/${lead.id}/send-application`, {
      method: "POST",
    });

    const data = await res.json();

    if (!res.ok) {
      setMessageType("error");
      setMessage(data?.error || "Failed to send application.");
      setSaving(false);
      return;
    }

    setCurrentStatus("application_invited");
    setMessageType("success");
    setMessage("Application invite created successfully.");
    setSaving(false);
    router.refresh();
  }

  async function convertLead() {
    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/admin/leads/${lead.id}/convert`, {
      method: "POST",
    });

    const data = await res.json();

    if (!res.ok) {
      setMessageType("error");
      setMessage(data?.error || "Failed to convert lead.");
      setSaving(false);
      return;
    }

    setConvertedFamilyId(data.familyId || null);
    setConvertedPlayerId(data.playerId || null);
    setMessageType("success");
    setMessage(data.message || "Lead converted to family + player successfully.");
    setSaving(false);
    router.refresh();
  }

  async function assignConvertedPlayerToTeam(teamId: string) {
    if (!convertedPlayerId) {
      setMessageType("error");
      setMessage("Convert the lead to a player first.");
      return;
    }

    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/admin/players/${convertedPlayerId}/assign-team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessageType("error");
      setMessage(data?.error || "Unable to assign player to team.");
      setSaving(false);
      return;
    }

    setCurrentAssignedTeamId(teamId);
    setMessageType("success");
    setMessage(data.message || "Player assigned to team successfully.");
    setSaving(false);
    router.refresh();
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/admin/leads" className="text-[#60a5fa] transition hover:text-[#34d399]">
        ← Back to leads
      </Link>

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

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#34d399]">
            Player
          </p>
          <h1 className="mt-3 text-3xl font-black text-white">
            {lead.player_first_name} {lead.player_last_name}
          </h1>

          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <p><span className="text-slate-500">Age Group:</span> {lead.age_group || "—"}</p>
            <p><span className="text-slate-500">Birthdate:</span> {lead.player_birthdate || "—"}</p>
            <p><span className="text-slate-500">Grad Year:</span> {lead.grad_year || "—"}</p>
            <p><span className="text-slate-500">School:</span> {lead.school || "—"}</p>
            <p><span className="text-slate-500">Primary Position:</span> {lead.primary_position || "—"}</p>
            <p><span className="text-slate-500">Secondary Position:</span> {lead.secondary_position || "—"}</p>
            <p><span className="text-slate-500">Experience Level:</span> {lead.experience_level || "—"}</p>
            <p><span className="text-slate-500">Previous Club:</span> {lead.previous_club || "—"}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#34d399]">
            Parent / Family
          </p>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <p><span className="text-slate-500">Parent Name:</span> {lead.parent_primary_name || "—"}</p>
            <p><span className="text-slate-500">Email:</span> {lead.parent_primary_email || "—"}</p>
            <p><span className="text-slate-500">Phone:</span> {lead.parent_primary_phone || "—"}</p>
            <p><span className="text-slate-500">Submitted:</span> {new Date(lead.submitted_at).toISOString().slice(0, 10)}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-[#05070b]/60 p-4">
            <p className="text-sm font-semibold text-white">Family Notes</p>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-400">
              {lead.notes_from_family || "No family notes provided."}
            </p>
          </div>

          {(convertedFamilyId || convertedPlayerId) && (
            <div className="mt-6 rounded-2xl border border-[#2f6df6]/30 bg-[#2f6df6]/10 p-4 text-sm text-slate-300">
              <p><span className="text-slate-500">Converted Family ID:</span> {convertedFamilyId || "—"}</p>
              <p className="mt-2"><span className="text-slate-500">Converted Player ID:</span> {convertedPlayerId || "—"}</p>
              <p className="mt-2"><span className="text-slate-500">Assigned Team:</span> {getTeamName(currentAssignedTeamId)}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#34d399]">
          Decision Actions
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => setDecision("accepted")} className="rounded-full border border-green-500/40 bg-green-500/15 px-5 py-2.5 text-sm font-semibold text-green-300 transition hover:bg-green-500/20">Accept</button>
          <button type="button" onClick={() => setDecision("waitlisted")} className="rounded-full border border-yellow-500/40 bg-yellow-500/15 px-5 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-500/20">Waitlist</button>
          <button type="button" onClick={() => setDecision("declined")} className="rounded-full border border-red-500/40 bg-red-500/15 px-5 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20">Decline</button>
          <button type="button" onClick={() => setDecision("development_invite")} className="rounded-full border border-[#2f6df6]/40 bg-[#2f6df6]/15 px-5 py-2.5 text-sm font-semibold text-[#93c5fd] transition hover:bg-[#2f6df6]/20">Development Invite</button>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#34d399]">
            Application
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={sendApplication}
              disabled={saving}
              className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
            >
              {saving ? "Working..." : "Send Application"}
            </button>

            <button
              type="button"
              onClick={convertLead}
              disabled={saving || !!convertedFamilyId || !!convertedPlayerId}
              className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:bg-[#2f6df6]/10 hover:text-[#93c5fd] disabled:opacity-50"
            >
              {convertedFamilyId || convertedPlayerId
                ? "Already Converted"
                : saving
                ? "Working..."
                : "Convert to Family + Player"}
            </button>
          </div>
        </div>

        {convertedPlayerId && (
          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#34d399]">
              Roster Assignment
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Assign this converted player directly to a team within the same age group.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="text-sm text-slate-300">
                Current Team: <span className="font-semibold text-white">{getTeamName(currentAssignedTeamId)}</span>
              </div>

              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) assignConvertedPlayerToTeam(e.target.value);
                }}
                className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-2 text-white outline-none"
              >
                <option value="">Assign to team</option>
                {eligibleTeams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.display_name || team.team_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#34d399]">
          Admin Workflow
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Status</label>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Tryout Date</label>
            <input
              type="datetime-local"
              value={tryoutDate}
              onChange={(e) => setTryoutDate(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="inline-flex items-center gap-3 text-slate-300">
            <input
              type="checkbox"
              checked={evaluationComplete}
              onChange={(e) => setEvaluationComplete(e.target.checked)}
            />
            Evaluation complete
          </label>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm text-slate-300">Admin Notes</label>
          <textarea
            rows={6}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add admin-only notes here..."
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
          />
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={saveLeadUpdates}
            disabled={saving}
            className="inline-flex justify-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Lead Updates"}
          </button>
        </div>
      </div>
    </section>
  );
}
