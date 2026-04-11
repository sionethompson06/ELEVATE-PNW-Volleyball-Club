import Link from "next/link";
import PaymentsAdminClient from "../../../components/admin/PaymentsAdminClient";
import { createServerSupabase } from "../../../lib/supabase/server";

export default async function AdminPaymentsPage() {
  const supabase = createServerSupabase();

  const { data: players, error } = await supabase
    .from("players")
    .select(`
      id,
      first_name,
      last_name,
      age_group,
      payment_status,
      registration_status,
      portal_enabled,
      current_team_id,
      families (
        id,
        family_name
      )
    `)
    .order("last_name", { ascending: true });

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load payments: {error.message}</p>
      </section>
    );
  }

  const teamIds = Array.from(
    new Set(
      (players ?? [])
        .map((player) => player.current_team_id)
        .filter((teamId): teamId is string => Boolean(teamId))
    )
  );

  const { data: teams, error: teamsError } = teamIds.length
    ? await supabase
        .from("teams")
        .select(`
          id,
          team_name,
          display_name
        `)
        .in("id", teamIds)
    : { data: [], error: null };

  if (teamsError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load team names: {teamsError.message}</p>
      </section>
    );
  }

  const teamById = new Map(
    (teams ?? []).map((team) => [
      team.id,
      {
        id: team.id,
        name: team.display_name || team.team_name,
      },
    ])
  );

  const rows =
    (players ?? []).map((player) => {
      const family = Array.isArray(player.families) ? player.families[0] : player.families;
      const team = player.current_team_id ? teamById.get(player.current_team_id) : null;

      return {
        player_id: player.id,
        player_name: `${player.first_name} ${player.last_name}`,
        age_group: player.age_group || null,
        family_id: family?.id || null,
        family_name: family?.family_name || null,
        payment_status: player.payment_status || null,
        registration_status: player.registration_status || null,
        portal_enabled: !!player.portal_enabled,
        current_team_id: team?.id || null,
        current_team_name: team?.name || null,
      };
    }) ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Payments
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Payment readiness, family follow-up, and player billing visibility.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/admin/families" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Families</Link>
          <Link href="/admin/players" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Players</Link>
          <Link href="/admin/teams" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Teams</Link>
          <Link href="/admin/activity" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">Activity</Link>
        </div>
      </div>

      <PaymentsAdminClient rows={rows} />
    </section>
  );
}
