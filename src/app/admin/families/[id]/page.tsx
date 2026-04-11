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
          portal_enabled
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

  const playerIds = (players ?? []).map((player) => player.id);

  const { data: membershipRows, error: membershipsError } = playerIds.length
    ? await supabase
        .from("team_memberships")
        .select(`
          id,
          player_id,
          team_id,
          status,
          assigned_at,
          teams (
            id,
            team_name,
            display_name,
            tier
          )
        `)
        .in("player_id", playerIds)
        .order("assigned_at", { ascending: false })
    : { data: [], error: null };

  if (membershipsError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin/families"
          className="text-[#60a5fa] transition hover:text-[#34d399]"
        >
          ← Back to families
        </Link>
        <p className="mt-6 text-red-400">
          Failed to load team assignments: {membershipsError.message}
        </p>
      </section>
    );
  }

  const membershipByPlayerId = new Map(
    (membershipRows ?? []).map((row) => [
      row.player_id,
      {
        membership_id: row.id,
        status: row.status,
        assigned_at: row.assigned_at,
        team: Array.isArray(row.teams) ? row.teams[0] : row.teams,
      },
    ])
  );

  const totalPlayers = (players ?? []).length;
  const assignedPlayers = (players ?? []).filter((player) =>
    membershipByPlayerId.has(player.id)
  ).length;
  const portalEnabledCount = (players ?? []).filter((player) => player.portal_enabled).length;
  const registrationCompleteCount = (players ?? []).filter(
    (player) => player.registration_status === "complete"
  ).length;
  const registrationInProgressCount = (players ?? []).filter(
    (player) => player.registration_status && player.registration_status !== "complete"
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
        total_players: totalPlayers,
        assigned_players: assignedPlayers,
        portal_enabled_count: portalEnabledCount,
        registration_complete_count: registrationCompleteCount,
        registration_in_progress_count: registrationInProgressCount,
        portal_summary: portalSummary,
        registration_summary: registrationSummary,
      }}
      players={(players ?? []).map((player) => {
        const membership = membershipByPlayerId.get(player.id);
        const team = membership?.team;

        return {
          id: player.id,
          first_name: player.first_name,
          last_name: player.last_name,
          age_group: player.age_group || null,
          primary_position: player.primary_position || null,
          school: player.school || null,
          registration_status: player.registration_status || null,
          portal_enabled: !!player.portal_enabled,
          current_team_name: team?.display_name || team?.team_name || null,
        };
      })}
    />
  );
}
