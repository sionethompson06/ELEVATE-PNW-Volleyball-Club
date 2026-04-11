import Link from "next/link";
import TeamsAdminClient from "../../../components/admin/TeamsAdminClient";
import { createServerSupabase } from "../../../lib/supabase/server";

export default async function AdminTeamsPage() {
  const supabase = createServerSupabase();

  const { data: teams, error } = await supabase
    .from("teams")
    .select(`
      id,
      team_name,
      display_name,
      tier,
      roster_limit,
      is_active,
      head_coach_profile_id,
      assistant_coach_profile_id,
      programs (
        id,
        name,
        age_group
      ),
      team_memberships (
        id
      )
    `)
    .order("display_name", { ascending: true });

  const teamRows =
    (teams ?? []).map((team) => {
      const memberships = Array.isArray(team.team_memberships) ? team.team_memberships : [];
      const program = Array.isArray(team.programs) ? team.programs[0] : team.programs;

      return {
        id: team.id,
        team_name: team.team_name || null,
        display_name: team.display_name || null,
        tier: team.tier || null,
        roster_limit: team.roster_limit ?? null,
        is_active: !!team.is_active,
        head_coach_profile_id: team.head_coach_profile_id || null,
        assistant_coach_profile_id: team.assistant_coach_profile_id || null,
        program_name: program?.name || null,
        program_age_group: program?.age_group || null,
        assigned_player_count: memberships.length,
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
            Teams
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Team setup, staffing, tier visibility, and roster assignment overview.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/admin/families" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Families</Link>
          <Link href="/admin/players" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Players</Link>
          <Link href="/admin/coaches" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Coaches</Link>
          <Link href="/admin/payments" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Payments</Link>
          <Link href="/admin/activity" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">Activity</Link>
        </div>
      </div>

      {error ? (
        <p className="mt-6 text-red-400">Failed to load teams: {error.message}</p>
      ) : (
        <TeamsAdminClient teams={teamRows} />
      )}
    </section>
  );
}
