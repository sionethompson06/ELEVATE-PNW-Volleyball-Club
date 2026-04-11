import FamilyDetailClient from "../../../../components/admin/FamilyDetailClient";
import Link from "next/link";
import { createServerSupabase } from "../../../../lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function FamilyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = createServerSupabase();

  const [{ data: family, error: familyError }, { data: players, error: playersError }] =
    await Promise.all([
      supabase
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
        .eq("id", id)
        .single(),
      supabase
        .from("players")
        .select(`
          id,
          first_name,
          last_name,
          age_group,
          primary_position,
          school,
          family_id,
          registration_status,
          payment_status,
          portal_enabled,
          current_team_id
        `)
        .eq("family_id", id)
        .order("last_name", { ascending: true }),
    ]);

  if (familyError || !family) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin/families"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to families
        </Link>
        <p className="mt-6 text-red-400">Family not found.</p>
      </section>
    );
  }

  if (playersError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin/families"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to families
        </Link>
        <p className="mt-6 text-red-400">
          Failed to load family players: {playersError.message}
        </p>
      </section>
    );
  }

  const teamIds = Array.from(
    new Set(
      (players ?? [])
        .map((player) => player.current_team_id)
        .filter((teamId): teamId is string => Boolean(teamId))
    )
  );

  const { data: teamRows, error: teamsError } = teamIds.length
    ? await supabase
        .from("teams")
        .select(`
          id,
          team_name,
          display_name,
          tier
        `)
        .in("id", teamIds)
    : { data: [], error: null };

  if (teamsError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin/families"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to families
        </Link>
        <p className="mt-6 text-red-400">
          Failed to load team assignments: {teamsError.message}
        </p>
      </section>
    );
  }

  const teamById = new Map(
    (teamRows ?? []).map((team) => [
      team.id,
      {
        id: team.id,
        team_name: team.team_name,
        display_name: team.display_name,
        tier: team.tier,
      },
    ])
  );

  const totalPlayers = (players ?? []).length;
  const assignedPlayers = (players ?? []).filter((player) => !!player.current_team_id).length;
  const portalEnabledCount = (players ?? []).filter((player) => player.portal_enabled).length;
  const registrationCompleteCount = (players ?? []).filter(
    (player) => player.registration_status === "complete"
  ).length;
  const registrationInProgressCount = (players ?? []).filter(
    (player) =>
      player.registration_status === "in_progress" || player.registration_status === "started"
  ).length;

  const portalSummary =
    totalPlayers === 0
      ? "No linked players yet."
      : portalEnabledCount === totalPlayers
        ? "Portal enabled for all linked players."
        : portalEnabledCount === 0
          ? "Portal not yet enabled for linked players."
          : `Portal enabled for ${portalEnabledCount} of ${totalPlayers} linked players.`;

  const registrationSummary =
    totalPlayers === 0
      ? "No registration activity yet."
      : registrationCompleteCount === totalPlayers
        ? "Registration complete for all linked players."
        : `${registrationCompleteCount} complete, ${registrationInProgressCount} in progress, ${
            totalPlayers - registrationCompleteCount - registrationInProgressCount
          } not started.`;

  return (
    <FamilyDetailClient
      family={{
        id: family.id,
        family_name: family.family_name,
        primary_parent_name: family.primary_parent_name || null,
        primary_parent_email: family.primary_parent_email || null,
        primary_parent_phone: family.primary_parent_phone || null,
        account_status: family.account_status || null,
        created_at: family.created_at || null,
      }}
      players={(players ?? []).map((player) => {
        const team = player.current_team_id ? teamById.get(player.current_team_id) : null;

        return {
          id: player.id,
          first_name: player.first_name,
          last_name: player.last_name,
          age_group: player.age_group || null,
          primary_position: player.primary_position || null,
          school: player.school || null,
          registration_status: player.registration_status || null,
          payment_status: player.payment_status || null,
          portal_enabled: !!player.portal_enabled,
          current_team_id: team?.id || null,
          current_team_name: team?.display_name || team?.team_name || null,
        };
      })}
    />
  );
}
