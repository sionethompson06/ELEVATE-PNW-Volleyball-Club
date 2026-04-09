import Link from "next/link";
import { createServerSupabase } from "../../../lib/supabase/server";
import PlayerAssignmentClient from "../../../components/admin/PlayerAssignmentClient";

export default async function AdminPlayersPage() {
  const supabase = createServerSupabase();

  const [{ data: players, error: playersError }, { data: teams, error: teamsError }] =
    await Promise.all([
      supabase
        .from("players")
        .select(`
          id,
          first_name,
          last_name,
          age_group,
          school,
          primary_position,
          registration_status,
          payment_status,
          portal_enabled,
          current_team_id,
          created_at,
          families (
            family_name,
            primary_parent_name,
            primary_parent_email
          )
        `)
        .order("created_at", { ascending: false }),
      supabase
        .from("teams")
        .select(`
          id,
          team_name,
          display_name,
          programs (
            age_group
          )
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false }),
    ]);

  if (playersError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load players: {playersError.message}</p>
      </section>
    );
  }

  if (teamsError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load teams: {teamsError.message}</p>
      </section>
    );
  }

  function getTeamName(teamId: string | null) {
    if (!teamId) return "Not assigned";
    const match = (teams ?? []).find((team) => team.id === teamId);
    return match ? match.display_name || match.team_name : "Assigned";
  }

  const normalizedTeams = (teams ?? []).map((team) => {
    const program = Array.isArray(team.programs) ? team.programs[0] : team.programs;
    return {
      ...team,
      age_group: program?.age_group || null,
    };
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Players
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Player records created through the ELEVATE CRM conversion process.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/families" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
            Families
          </Link>
          <Link href="/admin/teams" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">
            Teams
          </Link>
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
            {(players ?? []).map((player) => {
              const family = Array.isArray(player.families)
                ? player.families[0]
                : player.families;

              return (
                <tr key={player.id} className="border-b border-white/5">
                  <td className="px-4 py-4 font-semibold text-white">
                    {player.first_name} {player.last_name}
                  </td>
                  <td className="px-4 py-4 text-slate-300">{player.age_group || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{player.school || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{player.primary_position || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{family?.family_name || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">{getTeamName(player.current_team_id)}</td>
                  <td className="px-4 py-4 text-slate-300">{player.registration_status}</td>
                  <td className="px-4 py-4 text-slate-300">{player.payment_status}</td>
                  <td className="px-4 py-4 text-slate-300">
                    {player.portal_enabled ? "Enabled" : "Not enabled"}
                  </td>
                </tr>
              );
            })}

            {(players ?? []).length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                  No players created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PlayerAssignmentClient players={players ?? []} teams={normalizedTeams} />
    </section>
  );
}
