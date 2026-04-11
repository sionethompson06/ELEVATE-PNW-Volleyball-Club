import Link from "next/link";
import ActivityAdminClient from "../../../components/admin/ActivityAdminClient";
import { createServerSupabase } from "../../../lib/supabase/server";

export default async function AdminActivityPage() {
  const supabase = createServerSupabase();

  const [
    { data: families, error: familiesError },
    { data: players, error: playersError },
    { data: memberships, error: membershipsError },
  ] = await Promise.all([
    supabase
      .from("families")
      .select(`
        id,
        family_name,
        created_at
      `)
      .order("created_at", { ascending: false })
      .limit(50),

    supabase
      .from("players")
      .select(`
        id,
        first_name,
        last_name,
        family_id,
        created_at,
        families (
          id,
          family_name
        )
      `)
      .order("created_at", { ascending: false })
      .limit(100),

    supabase
      .from("team_memberships")
      .select(`
        id,
        player_id,
        team_id,
        assigned_at,
        players (
          id,
          first_name,
          last_name,
          family_id,
          families (
            id,
            family_name
          )
        ),
        teams (
          id,
          team_name,
          display_name
        )
      `)
      .order("assigned_at", { ascending: false })
      .limit(100),
  ]);

  const error = familiesError || playersError || membershipsError;

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load activity: {error.message}</p>
      </section>
    );
  }

  const familyEvents =
    (families ?? []).map((family) => ({
      id: `family-${family.id}`,
      occurred_at: family.created_at,
      event_type: "family_created" as const,
      title: family.family_name ? `${family.family_name} created` : "Family created",
      description: "A new family record was added to the CRM.",
      family_id: family.id,
      family_name: family.family_name || null,
      player_id: null,
      player_name: null,
      team_id: null,
      team_name: null,
    })) ?? [];

  const playerEvents =
    (players ?? []).map((player) => {
      const family = Array.isArray(player.families) ? player.families[0] : player.families;
      const playerName = `${player.first_name} ${player.last_name}`;

      return {
        id: `player-${player.id}`,
        occurred_at: player.created_at,
        event_type: "player_created" as const,
        title: `${playerName} created`,
        description: "A new player record was added to the CRM.",
        family_id: family?.id || player.family_id || null,
        family_name: family?.family_name || null,
        player_id: player.id,
        player_name: playerName,
        team_id: null,
        team_name: null,
      };
    }) ?? [];

  const assignmentEvents =
    (memberships ?? []).map((membership) => {
      const player = Array.isArray(membership.players) ? membership.players[0] : membership.players;
      const family = player?.families
        ? Array.isArray(player.families)
          ? player.families[0]
          : player.families
        : null;
      const team = Array.isArray(membership.teams) ? membership.teams[0] : membership.teams;

      const playerName = player ? `${player.first_name} ${player.last_name}` : "Player";
      const teamName = team?.display_name || team?.team_name || "team";

      return {
        id: `assignment-${membership.id}`,
        occurred_at: membership.assigned_at,
        event_type: "team_assignment" as const,
        title: `${playerName} assigned`,
        description: `${playerName} was assigned to ${teamName}.`,
        family_id: family?.id || player?.family_id || null,
        family_name: family?.family_name || null,
        player_id: player?.id || null,
        player_name: playerName,
        team_id: team?.id || null,
        team_name: teamName,
      };
    }) ?? [];

  const rows = [...familyEvents, ...playerEvents, ...assignmentEvents].sort((a, b) =>
    new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Activity
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Recent CRM events across families, players, and team assignments.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/admin/families" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Families</Link>
          <Link href="/admin/players" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Players</Link>
          <Link href="/admin/teams" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Teams</Link>
          <Link href="/admin/payments" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Payments</Link>
          <Link href="/admin/coaches" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">Coaches</Link>
        </div>
      </div>

      <ActivityAdminClient rows={rows} />
    </section>
  );
}
