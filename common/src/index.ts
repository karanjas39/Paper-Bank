import { z } from "zod";

// SCHEMAS
export const z_signup = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  programId: z.number(),
});

export const z_signin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const z_createProgram = z.object({
  name: z.string().min(1),
  academicLevel: z.string().min(1),
});

// TYPES
export type z_signup_type = z.infer<typeof z_signup>;
export type z_signin_type = z.infer<typeof z_signin>;
export type z_createProgram_type = z.infer<typeof z_createProgram>;
