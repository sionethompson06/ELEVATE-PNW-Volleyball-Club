import { z } from "zod";

export const tryoutInterestSchema = z.object({
  playerFirstName: z.string().min(1, "Player first name is required"),
  playerLastName: z.string().min(1, "Player last name is required"),
  playerBirthdate: z.string().optional(),
  ageGroup: z.enum(["12U", "14U", "16U"]),
  gradYear: z.coerce.number().int().optional(),
  school: z.string().optional(),
  primaryPosition: z.string().optional(),
  secondaryPosition: z.string().optional(),
  experienceLevel: z.string().optional(),
  previousClub: z.string().optional(),
  parentPrimaryName: z.string().min(1, "Parent name is required"),
  parentPrimaryEmail: z.string().email("Valid email is required"),
  parentPrimaryPhone: z.string().min(7, "Valid phone is required"),
  notesFromFamily: z.string().optional(),
});
