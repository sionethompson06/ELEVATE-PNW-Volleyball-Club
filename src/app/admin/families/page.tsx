import Link from "next/link";
import { createServerSupabase } from "../../../lib/supabase/server";

function getStatusClasses(status: string | null) {
  switch (status) {
    case "portal_enabled":
      return "border border-green-500/30 bg-green-500/10 text-green-300";
    case "portal_invited":
      return "border border-blue-500/30 bg-blue-500/10 text-blue-300";
    case "active":
      return "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    default:
      return "border border-white/10 bg-white/[0.04] text-slate-300";
  }
}

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
        team_memberships (
          id
        )
      )
    `)
    .order("created_at", { ascending: false });

  const familyRows = families ?? [];

  const totalFamilies = familyRows.length;
  const totalPlayers = familyRows.reduce((sum, family) => {
    const players = Array.isArray(family.players) ? family.players : [];
    return sum + players.length;
  }, 0);

  const totalAssignedPlayers = familyRows.reduce((sum, family) => {
    const players = Array.isArray(family.players) ? family.players : [];
    return (
      sum +
      players.filter((player) => {
        const memberships = Array.isArray(player.team_memberships)
          ? player.team_memberships
          : [];
        return memberships.length > 0;
      }).length
    );
  }, 0);

  const totalPortalEnabledPlayers = familyRows.reduce((sum, family) => {
    const players = Array.isArray(family.players) ? family.players : [];
    return sum + players.filter((player) => player.portal_enabled).length;
  }, 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
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

        <div className="flex gap-3">
          <Link
            href="/admin/leads"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]"
          >
            Leads
          </Link>
          <Link
            href="/admin/players"
            className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Players
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total Families</p>
          <p className="mt-3 text-3xl font-black text-white">{totalFamilies}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Linked Players</p>
          <p className="mt-3 text-3xl font-black text-white">{totalPlayers}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Assigned Players</p>
          <p className="mt-3 text-3xl font-black text-white">{totalAssignedPlayers}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portal Enabled</p>
          <p className="mt-3 text-3xl font-black text-white">{totalPortalEnabledPlayers}</p>
        </div>
      </div>

      {error ? (
        <p className="mt-6 text-red-400">Failed to load families: {error.message}</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-[#0b1220]/70">
          <table className="min-w-full text-sm text-white">
            <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
              <tr>
                <th className="px-4 py-3">Family</th>
                <th className="px-4 py-3">Primary Parent</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Players</th>
                <th className="px-4 py-3">Assigned</th>
                <th className="px-4 py-3">Portal Enabled</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {familyRows.map((family) => {
                const players = Array.isArray(family.players) ? family.players : [];
                const linkedPlayerCount = players.length;
                const portalEnabledCount = players.filter((player) => player.portal_enabled).length;
                const assignedCount = players.filter((player) => {
                  const memberships = Array.isArray(player.team_memberships)
                    ? player.team_memberships
                    : [];
                  return memberships.length > 0;
                }).length;

                return (
                  <tr
                    key={family.id}
                    className="border-b border-white/5 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-4 font-semibold text-white">
                      <Link
                        href={`/admin/families/${family.id}`}
                        className="text-white transition hover:text-[#93c5fd]"
                      >
                        {family.family_name}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-slate-300">{family.primary_parent_name}</td>
                    <td className="px-4 py-4 text-slate-300">{family.primary_parent_email}</td>
                    <td className="px-4 py-4 text-slate-300">{family.primary_parent_phone}</td>
                    <td className="px-4 py-4 text-slate-300">{linkedPlayerCount}</td>
                    <td className="px-4 py-4 text-slate-300">{assignedCount}/{linkedPlayerCount}</td>
                    <td className="px-4 py-4 text-slate-300">
                      {portalEnabledCount}/{linkedPlayerCount}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          family.account_status
                        )}`}
                      >
                        {family.account_status || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-400">
                      {new Date(family.created_at).toISOString().slice(0, 10)}
                    </td>
                  </tr>
                );
              })}

              {familyRows.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                    No families created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
