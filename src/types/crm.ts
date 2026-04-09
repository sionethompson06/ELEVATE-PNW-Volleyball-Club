export type TryoutSubmissionStatus =
  | "interest"
  | "application_invited"
  | "application_complete"
  | "tryout_scheduled"
  | "evaluation_complete"
  | "accepted"
  | "waitlisted"
  | "declined"
  | "development_invite";

export interface TryoutInterestInput {
  playerFirstName: string;
  playerLastName: string;
  playerBirthdate?: string;
  ageGroup: "12U" | "14U" | "16U";
  gradYear?: number;
  school?: string;
  primaryPosition?: string;
  secondaryPosition?: string;
  experienceLevel?: string;
  previousClub?: string;
  parentPrimaryName: string;
  parentPrimaryEmail: string;
  parentPrimaryPhone: string;
  notesFromFamily?: string;
}
