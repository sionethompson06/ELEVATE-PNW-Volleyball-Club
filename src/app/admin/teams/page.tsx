import Link from "next/link";
import { createServerSupabase } from "../../../lib/supabase/server";
import TeamsAdminClient from "../../../components/admin/TeamsAdminClient";

export default async function AdminTeamsPage() {
  const supabase = createServerSupabase();

  const [{ data: teams, error: teamsError }, { data: programs, error: programsError }] =
    await Promise.all([
      supabase
        .from("teams")
        .select(`
          id,
          team_name,
          display_name,
          tier,
          roster_limit,
          is_active,
          created_at,
          programs (
            id,
            name,
            age_group
          )
        `)
        .order("created_at", { ascending: false }),
      supabase
        .from("programs")
        .select("id,name,age_group")
        .eq("is_active", true)
        .order("age_group", { ascending: true }),
    ]);

  if (teamsError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load teams: {teamsError.message}</p>
      </section>
    );
  }

  if (programsError) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load programs: {programsError.message}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Teams
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Create teams and prepare for player roster assignment.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/programs" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
            Programs
          </Link>
        </div>
      </div>

      <TeamsAdminClient teams={teams ?? []} programs={programs ?? []} />
    </section>
  );
}
