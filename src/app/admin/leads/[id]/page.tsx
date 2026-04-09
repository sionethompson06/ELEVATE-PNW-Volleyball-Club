import LeadDetailClient from "../../../../components/admin/LeadDetailClient";
import { createServerSupabase } from "../../../../lib/supabase/server";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerSupabase();

  const { data: lead, error } = await supabase
    .from("tryout_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !lead) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Lead not found.</p>
      </section>
    );
  }

  let convertedPlayerCurrentTeamId: string | null = null;

  if (lead.converted_player_id) {
    const { data: player } = await supabase
      .from("players")
      .select("current_team_id")
      .eq("id", lead.converted_player_id)
      .single();

    convertedPlayerCurrentTeamId = player?.current_team_id || null;
  }

  const { data: teams } = await supabase
    .from("teams")
    .select("id,team_name,display_name")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <LeadDetailClient
      lead={{
        ...lead,
        converted_player_current_team_id: convertedPlayerCurrentTeamId,
        available_teams: teams ?? [],
      }}
    />
  );
}
