import Link from "next/link";
import FamiliesAdminClient from "../../../components/admin/FamiliesAdminClient";
import { createServerSupabase } from "../../../lib/supabase/server";

export default async function AdminFamiliesPage() {
  const supabase = createServerSupabase();

  const { data: families, error } = await supabase
    .from("families")
    .select(`
      id,
      family_name,
      primary_parent_name,
      primary_parent_email,
      primary_parent_phone,
      account_status,
      created_at,
      players (
        id,
        portal_enabled,
        registration_status,
        current_team_id
      )
    `)
    .order("created_at", { ascending: false });

  const familyRows =
    (families ?? []).map((family) => {
      const players = Array.isArray(family.players) ? family.players : [];
      const portalEnabledCount = players.filter((player) => player.portal_enabled).length;
      const registrationCompleteCount = players.filter(
        (player) => player.registration_status === "complete"
      ).length;
      const assignedTeamCount = players.filter((player) => !!player.current_team_id).length;

      return {
        id: family.id,
        family_name: family.family_name || null,
        primary_parent_name: family.primary_parent_name || null,
        primary_parent_email: family.primary_parent_email || null,
        primary_parent_phone: family.primary_parent_phone || null,
        account_status: family.account_status || null,
        created_at: family.created_at || null,
        player_count: players.length,
        portal_enabled_count: portalEnabledCount,
        registration_complete_count: registrationCompleteCount,
        assigned_team_count: assignedTeamCount,
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
            Families
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Family records created through the ELEVATE CRM conversion process.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/admin/leads" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Leads</Link>
          <Link href="/admin/players" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Players</Link>
          <Link href="/admin/teams" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Teams</Link>
          <Link href="/admin/payments" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">Payments</Link>
          <Link href="/admin/activity" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">Activity</Link>
        </div>
      </div>

      {error ? (
        <p className="mt-6 text-red-400">Failed to load families: {error.message}</p>
      ) : (
        <FamiliesAdminClient families={familyRows} />
      )}
    </section>
  );
}
