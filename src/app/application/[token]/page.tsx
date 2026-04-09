import { createServerSupabase } from "../../../lib/supabase/server";
import ApplicationFormClient from "../../../components/forms/ApplicationFormClient";

async function markInProgress(token: string) {
  const supabase = createServerSupabase();

  const { data: application } = await supabase
    .from("application_forms")
    .select("id,status")
    .eq("invite_token", token)
    .single();

  if (application && application.status === "invited") {
    await supabase
      .from("application_forms")
      .update({
        status: "in_progress",
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", application.id);
  }
}

export default async function ApplicationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = createServerSupabase();

  const { data: application, error: appError } = await supabase
    .from("application_forms")
    .select(`
      id,
      status,
      invite_token,
      tryout_submission_id,
      tryout_submissions (
        id,
        player_first_name,
        player_last_name,
        age_group,
        school,
        primary_position,
        secondary_position,
        parent_primary_name,
        parent_primary_email,
        parent_primary_phone
      )
    `)
    .eq("invite_token", token)
    .single();

  if (appError || !application) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          Application invite not found.
        </div>
      </section>
    );
  }

  await markInProgress(token);

  const lead = Array.isArray(application.tryout_submissions)
    ? application.tryout_submissions[0]
    : application.tryout_submissions;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#34d399]">
          ELEVATE Application
        </p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Complete Your Family Application
        </h1>
        <p className="mt-4 max-w-3xl text-slate-400">
          Please complete this application to continue your athlete’s process with
          ELEVATE. This is the first step toward registration and future portal access.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#34d399]">
            Athlete Information
          </p>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p><span className="text-slate-500">Name:</span> {lead?.player_first_name} {lead?.player_last_name}</p>
            <p><span className="text-slate-500">Age Group:</span> {lead?.age_group || "—"}</p>
            <p><span className="text-slate-500">School:</span> {lead?.school || "—"}</p>
            <p><span className="text-slate-500">Primary Position:</span> {lead?.primary_position || "—"}</p>
            <p><span className="text-slate-500">Secondary Position:</span> {lead?.secondary_position || "—"}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#34d399]">
            Parent / Guardian
          </p>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p><span className="text-slate-500">Name:</span> {lead?.parent_primary_name || "—"}</p>
            <p><span className="text-slate-500">Email:</span> {lead?.parent_primary_email || "—"}</p>
            <p><span className="text-slate-500">Phone:</span> {lead?.parent_primary_phone || "—"}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-6 sm:p-8">
        <ApplicationFormClient token={token} />
      </div>
    </section>
  );
}
