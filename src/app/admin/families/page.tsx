import Link from "next/link";
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
      created_at
    `)
    .order("created_at", { ascending: false });

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
          <Link href="/admin/leads" className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#60a5fa] hover:text-[#93c5fd]">
            Leads
          </Link>
          <Link href="/admin/players" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">
            Players
          </Link>
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
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {(families ?? []).map((family) => (
                <tr key={family.id} className="border-b border-white/5">
                  <td className="px-4 py-4 font-semibold text-white">{family.family_name}</td>
                  <td className="px-4 py-4 text-slate-300">{family.primary_parent_name}</td>
                  <td className="px-4 py-4 text-slate-300">{family.primary_parent_email}</td>
                  <td className="px-4 py-4 text-slate-300">{family.primary_parent_phone}</td>
                  <td className="px-4 py-4 text-slate-300">{family.account_status}</td>
                  <td className="px-4 py-4 text-slate-400">
                    {new Date(family.created_at).toISOString().slice(0, 10)}
                  </td>
                </tr>
              ))}

              {(families ?? []).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
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
