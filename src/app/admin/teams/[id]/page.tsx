import TeamDetailClient from "../../../../components/admin/TeamDetailClient";
import { createServerSupabase } from "../../../../lib/supabase/server";

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerSupabase();

  const [
    { data: team, error: teamError },
    { data: rosterRows, error: rosterError },
    { data: coaches, error: coachesError },
  ] = await Promise.all([
    supabase
      .from("teams")
      .select(`
        id,
        team_name,
        display_name,
        tier,
        roster_limit,
        is_active,
        head_coach_profile_id,
        assistant_coach_profile_id,
        programs (
          id,
          name,
          age_group
        ),
        head_coach:coach_profiles!teams_head_coach_profile_id_fkey (
          id,
          first_name,
          last_name,
          title
        ),
        assistant_coach:coach_profiles!teams_assistant_coach_profile_id_fkey (
          id,
          first_name,
          last_name,
          title
        )
      `)
      .eq("id", id)
      .single(),
    supabase
      .from("team_memberships")
      .select(`
        id,
        status,
        assigned_at,
        players (
          id,
          first_name,
          last_name,
          age_group,
          primary_position,
          school,
          family_id,
          families (
            id,
            family_name
          )
        )
      `)
      .eq("team_id", id)
      .order("assigned_at", { ascending: true }),
    supabase
      .from("coach_profiles")
      .select("id, first_name, last_name, title")
      .eq("is_active", true)
      .order("last_name", { ascending: true }),
  ]);

  if (teamError || !team) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Team not found.</p>
      </section>
    );
  }

  if (rosterError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load roster: {rosterError.message}</p>
      </section>
    );
  }

  if (coachesError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-red-400">Failed to load coaches: {coachesError.message}</p>
      </section>
    );
  }

  const program = Array.isArray(team.programs) ? team.programs[0] : team.programs;
  const headCoach = Array.isArray(team.head_coach) ? team.head_coach[0] : team.head_coach;
  const assistantCoach = Array.isArray(team.assistant_coach) ? team.assistant_coach[0] : team.assistant_coach;

  const roster = (rosterRows ?? []).map((entry) => {
    const player = Array.isArray(entry.players) ? entry.players[0] : entry.players;
    const family = player?.families
      ? Array.isArray(player.families)
        ? player.families[0]
        : player.families
      : null;

    return {
      membership_id: entry.id,
      player_id: player?.id || null,
      family_id: family?.id || player?.family_id || null,
      family_name: family?.family_name || null,
      first_name: player?.first_name || "",
      last_name: player?.last_name || "",
      age_group: player?.age_group || null,
      primary_position: player?.primary_position || null,
      school: player?.school || null,
      assigned_at: entry.assigned_at,
    };
  });

  return (
    <TeamDetailClient
      team={{
        id: team.id,
        team_name: team.team_name,
        display_name: team.display_name,
        tier: team.tier,
        roster_limit: team.roster_limit,
        is_active: team.is_active,
        program_name: program?.name || null,
        program_age_group: program?.age_group || null,
        head_coach_profile_id: team.head_coach_profile_id || null,
        assistant_coach_profile_id: team.assistant_coach_profile_id || null,
        assigned_head_coach_name: headCoach
          ? `${headCoach.first_name} ${headCoach.last_name}`
          : null,
        assigned_assistant_coach_name: assistantCoach
          ? `${assistantCoach.first_name} ${assistantCoach.last_name}`
          : null,
      }}
      coaches={coaches ?? []}
      roster={roster}
    />
  );
}
