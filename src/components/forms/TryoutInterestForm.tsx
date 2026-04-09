"use client";

import { useState } from "react";

const initialState = {
  playerFirstName: "",
  playerLastName: "",
  playerBirthdate: "",
  ageGroup: "12U",
  gradYear: "",
  school: "",
  primaryPosition: "",
  secondaryPosition: "",
  experienceLevel: "",
  previousClub: "",
  parentPrimaryName: "",
  parentPrimaryEmail: "",
  parentPrimaryPhone: "",
  notesFromFamily: "",
};

type FieldErrors = Record<string, string[]>;

export default function TryoutInterestForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    const payload = {
      ...form,
      gradYear: form.gradYear ? Number(form.gradYear) : undefined,
      playerBirthdate: form.playerBirthdate || undefined,
    };

    const res = await fetch("/api/tryout-interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setErrorMessage(data?.error || "Something went wrong.");

      if (data?.details?.fieldErrors) {
        setFieldErrors(data.details.fieldErrors);
      }

      return;
    }

    setStatus("success");
    setForm(initialState);
    setFieldErrors({});
  }

  function updateField(name: string, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function renderError(name: string) {
    const errors = fieldErrors[name];
    if (!errors || errors.length === 0) return null;

    return <p className="mt-1 text-xs text-red-400">{errors[0]}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            value={form.playerFirstName}
            onChange={(e) => updateField("playerFirstName", e.target.value)}
            placeholder="Player First Name"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("playerFirstName")}
        </div>
        <div>
          <input
            value={form.playerLastName}
            onChange={(e) => updateField("playerLastName", e.target.value)}
            placeholder="Player Last Name"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("playerLastName")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            type="date"
            value={form.playerBirthdate}
            onChange={(e) => updateField("playerBirthdate", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("playerBirthdate")}
        </div>
        <div>
          <select
            value={form.ageGroup}
            onChange={(e) => updateField("ageGroup", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white outline-none transition focus:border-[#60a5fa]"
          >
            <option value="12U">12U</option>
            <option value="14U">14U</option>
            <option value="16U">16U</option>
          </select>
          {renderError("ageGroup")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            value={form.gradYear}
            onChange={(e) => updateField("gradYear", e.target.value)}
            placeholder="Grad Year (optional)"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("gradYear")}
        </div>
        <div>
          <input
            value={form.school}
            onChange={(e) => updateField("school", e.target.value)}
            placeholder="School (optional)"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("school")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            value={form.primaryPosition}
            onChange={(e) => updateField("primaryPosition", e.target.value)}
            placeholder="Primary Position"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("primaryPosition")}
        </div>
        <div>
          <input
            value={form.secondaryPosition}
            onChange={(e) => updateField("secondaryPosition", e.target.value)}
            placeholder="Secondary Position (optional)"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("secondaryPosition")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            value={form.experienceLevel}
            onChange={(e) => updateField("experienceLevel", e.target.value)}
            placeholder="Experience Level"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("experienceLevel")}
        </div>
        <div>
          <input
            value={form.previousClub}
            onChange={(e) => updateField("previousClub", e.target.value)}
            placeholder="Previous Club (optional)"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("previousClub")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <input
            value={form.parentPrimaryName}
            onChange={(e) => updateField("parentPrimaryName", e.target.value)}
            placeholder="Parent / Guardian Name"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("parentPrimaryName")}
        </div>
        <div>
          <input
            value={form.parentPrimaryEmail}
            onChange={(e) => updateField("parentPrimaryEmail", e.target.value)}
            placeholder="Parent Email"
            className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
          />
          {renderError("parentPrimaryEmail")}
        </div>
      </div>

      <div>
        <input
          value={form.parentPrimaryPhone}
          onChange={(e) => updateField("parentPrimaryPhone", e.target.value)}
          placeholder="Parent Phone"
          className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
        />
        {renderError("parentPrimaryPhone")}
      </div>

      <div>
        <textarea
          value={form.notesFromFamily}
          onChange={(e) => updateField("notesFromFamily", e.target.value)}
          placeholder="Tell us about the athlete's experience or interest"
          rows={5}
          className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-[#60a5fa]"
        />
        {renderError("notesFromFamily")}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex justify-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Interest"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-400">
          Thanks — your interest was submitted successfully.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-400">
          {errorMessage || "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
