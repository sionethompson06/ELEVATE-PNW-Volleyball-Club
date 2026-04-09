"use client";

import { useState } from "react";

type Coach = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  title: string | null;
  is_active: boolean;
};

export default function CoachesAdminClient({ coaches }: { coaches: Coach[] }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    bio: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateField(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function createCoach() {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/admin/coaches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data?.error || "Unable to create coach.");
      setSaving(false);
      return;
    }

    setMessage(`Coach ${data.coach.first_name} ${data.coach.last_name} created successfully.`);
    setSaving(false);
    window.location.reload();
  }

  return (
    <div className="mt-8">
      <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
        <h2 className="text-2xl font-black text-white">Add Coach</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <input
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            placeholder="First Name"
            className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
          />
          <input
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            placeholder="Last Name"
            className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
          />
          <input
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Title"
            className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
          />
          <input
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="Email"
            className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
          />
          <input
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="Phone"
            className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
          />
          <input
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Short Bio"
            className="rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
          />
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={createCoach}
            disabled={saving}
            className="rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
          >
            {saving ? "Creating..." : "Create Coach"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm text-green-400">{message}</p>
        )}
      </div>

      <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-[#0b1220]/70">
        <table className="min-w-full text-sm text-white">
          <thead className="border-b border-white/10 bg-[#05070b]/70 text-left text-slate-300">
            <tr>
              <th className="px-4 py-3">Coach</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Active</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach) => (
              <tr key={coach.id} className="border-b border-white/5">
                <td className="px-4 py-4 font-semibold text-white">
                  {coach.first_name} {coach.last_name}
                </td>
                <td className="px-4 py-4 text-slate-300">{coach.title || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{coach.email || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{coach.phone || "—"}</td>
                <td className="px-4 py-4 text-slate-300">{coach.is_active ? "Yes" : "No"}</td>
              </tr>
            ))}

            {coaches.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  No coaches created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
