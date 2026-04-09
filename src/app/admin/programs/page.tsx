import Link from "next/link";
import { createServerSupabase } from "../../../lib/supabase/server";

export default async function AdminProgramsPage() {
  const supabase = createServerSupabase();

  const { data: programs, error } = await supabase
    .from("programs")
    .select("id,name,age_group,description,is_active,created_at")
    .order("age_group", { ascending: true });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#34d399]">
            Admin
          </p>
          <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Programs
          </h1>
          <p className="mt-4 max-w-3xl text-slate-400">
            Program structure for the active ELEVATE season.
          </p>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/teams" className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95">
            Teams
          </Link>
        </div>
      </div>

      {error ? (
        <p className="mt-6 text-red-400">Failed to load programs: {error.message}</p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-[#0b1220]/70">
          <table className="min-w-full text-sm text-white">
            <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
              <tr>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3">Age Group</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Active</th>
              </tr>
            </thead>
            <tbody>
              {(programs ?? []).map((program) => (
                <tr key={program.id} className="border-b border-white/5">
                  <td className="px-4 py-4 font-semibold text-white">{program.name}</td>
                  <td className="px-4 py-4 text-slate-300">{program.age_group}</td>
                  <td className="px-4 py-4 text-slate-300">{program.description || "—"}</td>
                  <td className="px-4 py-4 text-slate-300">
                    {program.is_active ? "Yes" : "No"}
                  </td>
                </tr>
              ))}

              {(programs ?? []).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                    No programs found.
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
