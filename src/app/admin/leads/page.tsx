import LeadsTable from "../../../components/admin/LeadsTable";
import { createServerSupabase } from "../../../lib/supabase/server";

export default async function AdminLeadsPage() {
  const supabase = createServerSupabase();

  const { data: leads, error } = await supabase
    .from("tryout_submissions")
    .select(`
      id,
      submitted_at,
      current_status,
      tryout_date,
      age_group,
      player_first_name,
      player_last_name,
      parent_primary_name,
      parent_primary_email,
      evaluation_complete
    `)
    .order("submitted_at", { ascending: false });

  if (error) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black text-white">Admin Leads</h1>
        <p className="mt-4 text-red-400">Failed to load leads: {error.message}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
        Admin
      </p>
      <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
        Lead Management
      </h1>
      <p className="mt-4 max-w-3xl text-slate-400">
        Review tryout interest submissions, update statuses, schedule tryouts,
        and mark evaluations complete.
      </p>

      <LeadsTable leads={leads ?? []} />
    </section>
  );
}
