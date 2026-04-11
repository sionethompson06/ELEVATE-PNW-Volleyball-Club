import Link from "next/link";
import AdminDashboardClient from "../../components/admin/AdminDashboardClient";
import { createServerSupabase } from "../../lib/supabase/server";

export default async function AdminHomePage() {
  const supabase = createServerSupabase();

  const [
    { count: leadCount, error: leadsError },
    { data: families, error: familiesError },
    { data: players, error: playersError },
    { count: teamCount, error: teamsError },
    { count: coachCount, error: coachesError },
    { data: familyActivity, error: familyActivityError },
    { data: playerActivity, error: playerActivityError },
    { data: assignmentActivity, error: assignmentActivityError },
  ] = await Promise.all([
    supabase.from("tryout_submissions").select("id", { count: "exact", head: true }),
    supabase.from("families").select("id, family_name"),
    supabase.from("players").select(`
      id,
      first_name,
      last_name,
      registration_status,
      payment_status,
      portal_enabled,
      current_team_id
    `),
    supabase.from("teams").select("id", { count: "exact", head: true }),
    supabase.from("coach_profiles").select("id", { count: "exact", head: true }),
    supabase.from("families").select("id, family_name, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("players").select("id, first_name, last_name, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("team_memberships").select(`
      id,
      assigned_at,
      players (
        id,
        first_name,
        last_name
      ),
      teams (
        id,
        team_name,
        display_name
      )
    `).order("assigned_at", { ascending: false }).limit(5),
  ]);

  const error =
    leadsError ||
    familiesError ||
    playersError ||
    teamsError ||
    coachesError ||
    familyActivityError ||
    playerActivityError ||
    assignmentActivityError;

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load admin dashboard: {error.message}</p>
      </section>
    );
  }

  const playerRows = players ?? [];

  const activity = [
    ...((familyActivity ?? []).map((item) => ({
      id: `family-${item.id}`,
      occurred_at: item.created_at,
      label: item.family_name ? `${item.family_name} created` : "Family created",
      href: `/admin/families/${item.id}`,
      meta: "New family record added.",
    })) ?? []),
    ...((playerActivity ?? []).map((item) => ({
      id: `player-${item.id}`,
      occurred_at: item.created_at,
      label: `${item.first_name} ${item.last_name} created`,
      href: `/admin/players/${item.id}`,
      meta: "New player record added.",
    })) ?? []),
    ...((assignmentActivity ?? []).map((item) => {
      const player = Array.isArray(item.players) ? item.players[0] : item.players;
      const team = Array.isArray(item.teams) ? item.teams[0] : item.teams;
      const playerName = player ? `${player.first_name} ${player.last_name}` : "Player";
      const teamName = team?.display_name || team?.team_name || "team";

      return {
        id: `assignment-${item.id}`,
        occurred_at: item.assigned_at,
        label: `${playerName} assigned`,
        href: team?.id ? `/admin/teams/${team.id}` : null,
        meta: `${playerName} assigned to ${teamName}.`,
      };
    }) ?? []),
  ]
    .sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime())
    .slice(0, 8);

  const stats = {
    lead_count: leadCount || 0,
    family_count: (families ?? []).length,
    player_count: playerRows.length,
    team_count: teamCount || 0,
    coach_count: coachCount || 0,
    payment_due_count: playerRows.filter((p) => p.payment_status === "due").length,
    payment_partial_count: playerRows.filter((p) => p.payment_status === "partial").length,
    registration_incomplete_count: playerRows.filter((p) => p.registration_status !== "complete").length,
    portal_not_enabled_count: playerRows.filter((p) => !p.portal_enabled).length,
    unassigned_player_count: playerRows.filter((p) => !p.current_team_id).length,
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Executive view of recruiting, registration, payments, rostering, and recent CRM activity.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/admin/families" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Families</Link>
          <Link href="/admin/players" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Players</Link>
          <Link href="/admin/teams" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Teams</Link>
          <Link href="/admin/payments" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Payments</Link>
          <Link href="/admin/activity" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">Activity</Link>
        </div>
      </div>

      <AdminDashboardClient stats={stats} activity={activity} />
    </section>
  );
}
