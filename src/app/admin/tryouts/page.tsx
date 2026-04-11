import Link from "next/link";
import TryoutsAdminClient from "../../../components/admin/TryoutsAdminClient";
import { createServerSupabase } from "../../../lib/supabase/server";

export default async function AdminTryoutsPage() {
  const supabase = createServerSupabase();

  const { data: submissions, error } = await supabase
    .from("tryout_submissions")
    .select(`
      id,
      age_group,
      current_status,
      tryout_date,
      evaluation_complete,
      player_first_name,
      player_last_name,
      parent_primary_name,
      parent_primary_email
    `)
    .order("submitted_at", { ascending: false });

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load tryouts: {error.message}</p>
      </section>
    );
  }

  const rows =
    (submissions ?? []).map((lead) => ({
      id: lead.id,
      player_name: `${lead.player_first_name} ${lead.player_last_name}`,
      parent_name: lead.parent_primary_name,
      parent_email: lead.parent_primary_email,
      age_group: lead.age_group,
      current_status: lead.current_status,
      tryout_date: lead.tryout_date || null,
      evaluation_complete: !!lead.evaluation_complete,
    })) ?? [];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Tryouts
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Tryout scheduling, upcoming evaluations, and recruiting follow-up visibility.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/admin" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Dashboard</Link>
          <Link href="/admin/leads" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Leads</Link>
          <Link href="/admin/activity" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">Activity</Link>
        </div>
      </div>

      <TryoutsAdminClient rows={rows} />
    </section>
  );
}
