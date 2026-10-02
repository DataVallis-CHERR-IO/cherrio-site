import { z } from "zod";

export const ROLES = ["donor", "charity", "fundraiser", "cherrion"] as const;
export type Role = (typeof ROLES)[number];

export const subscribeSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  role: z.enum(ROLES).default("donor"),
  consent: z.literal(true),
  source: z.string().trim().max(64).regex(/^[a-z0-9/_-]*$/).default("home"),
  // Honeypot: real people never fill this hidden field.
  company: z.string().max(0).optional().default(""),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;

/** Plain-language error for a failed validation (no apologies, says how to fix it). */
export function errorMessage(err: z.ZodError): string {
  const field = err.issues[0]?.path[0];
  if (field === "email") return "Enter a valid email address, like you@example.com.";
  if (field === "consent") return "Tick the box so we may email you about the launch.";
  return "Check the form and try again.";
}
