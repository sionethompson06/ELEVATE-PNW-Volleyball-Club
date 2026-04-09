import Link from "next/link";
import { createServerSupabase } from "../../../lib/supabase/server";
import CoachesAdminClient from "../../../components/admin/CoachesAdminClient";

export default async function AdminCoachesPage() {
  const supabase = createServerSupabase();

  const { data: coaches, error } = await supabase
    .from("coach_profiles")
    .select("id, first_name, last_name, email, phone, title, is_active")
    .order("created_at", { ascending: false });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Coaches
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Manage coach records for assignment to teams.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/teams" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">
            Teams
          </Link>
        </div>
      </div>

      {error ? (
        <p className="mt-6 text-red-400">Failed to load coaches: {error.message}</p>
      ) : (
        <CoachesAdminClient coaches={coaches ?? []} />
      )}
    </section>
  );
}
