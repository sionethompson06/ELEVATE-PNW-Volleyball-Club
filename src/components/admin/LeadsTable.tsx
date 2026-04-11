"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Lead = {
  id: string;
  submitted_at: string;
  current_status: string;
  tryout_date: string | null;
  age_group: string;
  player_first_name: string;
  player_last_name: string;
  parent_primary_name: string;
  parent_primary_email: string;
  evaluation_complete: boolean;
};

const statusOptions = [
  "interest",
  "application_invited",
  "application_complete",
  "tryout_scheduled",
  "evaluation_complete",
  "accepted",
  "waitlisted",
  "declined",
  "development_invite",
];

const canonicalAgeGroups = ["12U", "13U", "14U", "15U", "16U", "17U", "18U"];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toISOString().slice(0, 10);
}

function sortAgeGroups(values: string[]) {
  return [...values].sort((a, b) => {
    const getAge = (value: string) => {
      const match = value.match(/(\d{1,2})\s*U/i);
      return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
    };

    return getAge(a) - getAge(b) || a.localeCompare(b);
  });
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [ageGroupFilter, setAgeGroupFilter] = useState("all");
  const [search, setSearch] = useState("");

  async function updateLead(id: string, patch: Record<string, unknown>) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    window.location.reload();
  }

  const ageGroupOptions = useMemo(() => {
    const dataValues = leads
      .map((lead) => lead.age_group)
      .filter((value): value is string => Boolean(value));

    return sortAgeGroups(Array.from(new Set([...canonicalAgeGroups, ...dataValues])));
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "all" || lead.current_status === statusFilter;

      const matchesAge =
        ageGroupFilter === "all" || lead.age_group === ageGroupFilter;

      const searchValue = search.trim().toLowerCase();
      const matchesSearch =
        searchValue.length === 0 ||
        `${lead.player_first_name} ${lead.player_last_name}`
          .toLowerCase()
          .includes(searchValue) ||
        lead.parent_primary_name.toLowerCase().includes(searchValue) ||
        lead.parent_primary_email.toLowerCase().includes(searchValue);

      return matchesStatus && matchesAge && matchesSearch;
    });
  }, [leads, statusFilter, ageGroupFilter, search]);

  const statusCounts = useMemo(() => {
    return leads.reduce<Record<string, number>>((acc, lead) => {
      acc[lead.current_status] = (acc[lead.current_status] || 0) + 1;
      return acc;
    }, {});
  }, [leads]);

  return (
    <div className="mt-6">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search player, parent, or email"
          className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none transition focus:border-[#60a5fa]"
        >
          <option value="all">All statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={ageGroupFilter}
          onChange={(e) => setAgeGroupFilter(e.target.value)}
          className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none transition focus:border-[#60a5fa]"
        >
          <option value="all">All age groups</option>
          {ageGroupOptions.map((ageGroup) => (
            <option key={ageGroup} value={ageGroup}>
              {ageGroup}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statusOptions.map((status) => (
          <div
            key={status}
            className="rounded-2xl border border-white/10 bg-[#0b1220]/70 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {status}
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {statusCounts[status] || 0}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-white/10 bg-[#0b1220]/70">
        <table className="min-w-full text-sm text-white">
          <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
            <tr>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Age Group</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Tryout Date</th>
              <th className="px-4 py-3">Evaluation</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-white/5 align-top">
                <td className="px-4 py-4">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="font-semibold text-[#60a5fa] transition hover:text-[#34d399]"
                  >
                    {lead.player_first_name} {lead.player_last_name}
                  </Link>
                  <div className="mt-1 text-xs text-slate-500">
                    Submitted {formatDate(lead.submitted_at)}
                  </div>
                </td>

                <td className="px-4 py-4 text-slate-300">{lead.age_group}</td>

                <td className="px-4 py-4">
                  <div className="text-slate-200">{lead.parent_primary_name}</div>
                  <div className="mt-1 text-xs text-slate-400">
                    {lead.parent_primary_email}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <select
                    defaultValue={lead.current_status}
                    onChange={(e) =>
                      updateLead(lead.id, { current_status: e.target.value })
                    }
                    className="rounded-xl border border-white/10 bg-[#05070b]/70 px-3 py-2 text-white outline-none"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="px-4 py-4">
                  <input
                    type="datetime-local"
                    defaultValue={lead.tryout_date ? lead.tryout_date.slice(0, 16) : ""}
                    onBlur={(e) =>
                      updateLead(lead.id, {
                        tryout_date: e.target.value || null,
                        current_status: e.target.value
                          ? "tryout_scheduled"
                          : lead.current_status,
                      })
                    }
                    className="rounded-xl border border-white/10 bg-[#05070b]/70 px-3 py-2 text-white outline-none"
                  />
                </td>

                <td className="px-4 py-4">
                  <label className="inline-flex items-center gap-2 text-slate-300">
                    <input
                      type="checkbox"
                      defaultChecked={lead.evaluation_complete}
                      onChange={(e) =>
                        updateLead(lead.id, {
                          evaluation_complete: e.target.checked,
                          current_status: e.target.checked
                            ? "evaluation_complete"
                            : lead.current_status,
                        })
                      }
                    />
                    Complete
                  </label>
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No matching leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
