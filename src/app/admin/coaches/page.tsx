import Link from "next/link";
import CoachesAdminClient from "../../../components/admin/CoachesAdminClient";
import { createServerSupabase } from "../../../lib/supabase/server";

export default async function AdminCoachesPage() {
  const supabase = createServerSupabase();

  const { data: coaches, error } = await supabase
    .from("coach_profiles")
    .select(`
      id,
      first_name,
      last_name,
      title,
      email,
      phone,
      is_active,
      head_teams:teams!teams_head_coach_profile_id_fkey (
        id
      ),
      assistant_teams:teams!teams_assistant_coach_profile_id_fkey (
        id
      )
    `)
    .order("last_name", { ascending: true });

  const coachRows =
    (coaches ?? []).map((coach) => {
      const headTeams = Array.isArray(coach.head_teams) ? coach.head_teams : [];
      const assistantTeams = Array.isArray(coach.assistant_teams) ? coach.assistant_teams : [];

      return {
        id: coach.id,
        first_name: coach.first_name,
        last_name: coach.last_name,
        title: coach.title || null,
        email: coach.email || null,
        phone: coach.phone || null,
        is_active: !!coach.is_active,
        head_team_count: headTeams.length,
        assistant_team_count: assistantTeams.length,
        assigned_team_count: headTeams.length + assistantTeams.length,
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
            Coaches
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Coach directory, staffing visibility, and team assignment overview.
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

      {error ? (
        <p className="mt-6 text-red-400">Failed to load coaches: {error.message}</p>
      ) : (
        <CoachesAdminClient coaches={coachRows} />
      )}
    </section>
  );
}
