import Link from "next/link";
import { createServerSupabase } from "../../../lib/supabase/server";
import PlayerAssignmentClient from "../../../components/admin/PlayerAssignmentClient";
import PlayersAdminClient from "../../../components/admin/PlayersAdminClient";

function extractAgeNumber(value: string | null | undefined): string | null {
  if (!value) return null;
  const text = String(value).trim();
  const match = text.match(/\b(\d{1,2})\s*U?\b/i);
  return match ? match[1] : null;
}

function normalizeAgeGroup(value: string | null | undefined): string | null {
  const age = extractAgeNumber(value);
  return age ? `${age}U` : null;
}

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
            id,
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
          tier,
          is_active,
          programs (
            age_group
          )
        `)
        .order("display_name", { ascending: true }),
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

  const normalizedTeams = (teams ?? []).map((team) => {
    const program = Array.isArray(team.programs) ? team.programs[0] : team.programs;
    const normalizedTeamAgeGroup =
      normalizeAgeGroup(program?.age_group) ||
      normalizeAgeGroup(team.display_name) ||
      normalizeAgeGroup(team.team_name);

    return {
      id: String(team.id),
      team_name: team.team_name,
      display_name: team.display_name,
      tier: team.tier || null,
      is_active: !!team.is_active,
      age_group: normalizedTeamAgeGroup,
    };
  });

  function getTeam(teamId: string | null) {
    if (!teamId) return null;
    return normalizedTeams.find((team) => team.id === teamId) || null;
  }

  const playerRows = (players ?? []).map((player) => {
    const family = Array.isArray(player.families) ? player.families[0] : player.families;
    const team = getTeam(player.current_team_id);

    return {
      id: String(player.id),
      first_name: player.first_name,
      last_name: player.last_name,
      age_group: normalizeAgeGroup(player.age_group),
      school: player.school || null,
      primary_position: player.primary_position || null,
      registration_status: player.registration_status || null,
      payment_status: player.payment_status || null,
      portal_enabled: !!player.portal_enabled,
      family_name: family?.family_name || null,
      family_id: family?.id || null,
      current_team_name: team ? team.display_name || team.team_name : null,
      current_team_id: team?.id || null,
    };
  });

  const uniqueRawPlayers = (() => {
    const seen = new Set<string>();
    return (players ?? [])
      .filter((player) => {
        if (seen.has(player.id)) return false;
        seen.add(player.id);
        return true;
      })
      .map((player) => ({
        ...player,
        id: String(player.id),
        age_group: normalizeAgeGroup(player.age_group),
      }));
  })();

  const uniqueTeamsForAssignment = (() => {
    const seen = new Set<string>();
    return normalizedTeams.filter((team) => {
      if (seen.has(team.id)) return false;
      seen.add(team.id);
      return true;
    });
  })();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
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

        <div className="flex flex-wrap gap-3">
          <Link href="/admin/families" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Families</Link>
          <Link href="/admin/teams" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Teams</Link>
          <Link href="/admin/coaches" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Coaches</Link>
          <Link href="/admin/payments" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Payments</Link>
          <Link href="/admin/activity" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">Activity</Link>
        </div>
      </div>

      <PlayersAdminClient players={playerRows} />

      <PlayerAssignmentClient players={uniqueRawPlayers} teams={uniqueTeamsForAssignment} />
    </section>
  );
}
