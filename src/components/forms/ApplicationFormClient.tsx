"use client";

import { useState } from "react";

export default function ApplicationFormClient({ token }: { token: string }) {
  const [form, setForm] = useState({
    emergencyContactName: "",
    emergencyContactPhone: "",
    medicalNotes: "",
    handbookAcknowledged: false,
    waiverAcknowledged: false,
    paymentAgreementAcknowledged: false,
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function updateField(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const res = await fetch(`/api/application/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setMessage(data?.error || "Unable to submit application.");
      return;
    }

    setStatus("success");
    setMessage("Application submitted successfully.");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div>
        <h2 className="text-2xl font-black text-white">Application Details</h2>
        <p className="mt-2 text-sm text-slate-400">
          Complete the fields below to continue the ELEVATE onboarding process.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          value={form.emergencyContactName}
          onChange={(e) => updateField("emergencyContactName", e.target.value)}
          placeholder="Emergency Contact Name"
          className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
        />
        <input
          value={form.emergencyContactPhone}
          onChange={(e) => updateField("emergencyContactPhone", e.target.value)}
          placeholder="Emergency Contact Phone"
          className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
        />
      </div>

      <textarea
        value={form.medicalNotes}
        onChange={(e) => updateField("medicalNotes", e.target.value)}
        rows={5}
        placeholder="Medical notes / allergies / important information"
        className="w-full rounded-2xl border border-white/10 bg-[#05070b]/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
      />

      <div className="space-y-3 rounded-2xl border border-white/10 bg-[#05070b]/50 p-5">
        <label className="flex items-start gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={form.handbookAcknowledged}
            onChange={(e) => updateField("handbookAcknowledged", e.target.checked)}
          />
          <span>I acknowledge the club handbook requirements.</span>
        </label>

        <label className="flex items-start gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={form.waiverAcknowledged}
            onChange={(e) => updateField("waiverAcknowledged", e.target.checked)}
          />
          <span>I acknowledge the waiver requirement.</span>
        </label>

        <label className="flex items-start gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={form.paymentAgreementAcknowledged}
            onChange={(e) => updateField("paymentAgreementAcknowledged", e.target.checked)}
          />
          <span>I acknowledge the payment agreement requirement.</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex justify-center rounded-full border border-[#2f6df6]/50 bg-gradient-to-r from-[#2f6df6] to-[#22c55e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </button>

      {message && (
        <p className={status === "success" ? "text-sm text-green-400" : "text-sm text-red-400"}>
          {message}
        </p>
      )}
    </form>
  );
}
