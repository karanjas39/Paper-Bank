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
});

export const z_createQuestionPaper = z.object({
  courseName: z.string().min(1),
  courseCode: z.string().min(1),
  year: z.coerce.number(),
  examType: z.string().min(1),
  programId: z.number(),
  pdf: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Invalid file type. Expected a PDF.",
    }),
});

export const z_reviewQP = z.object({
  id: z.number(),
  status: z.enum(["rejected", "approved"]),
});

export const z_createNotification = z.object({
  userId: z.number(),
  message: z.string().min(1),
});

export const z_createMessage = z.object({
  message: z.string().min(1).max(100),
});

// TYPES
export type z_signup_type = z.infer<typeof z_signup>;
export type z_signin_type = z.infer<typeof z_signin>;
export type z_createProgram_type = z.infer<typeof z_createProgram>;
export type z_createQuestionPaper_type = z.infer<typeof z_createQuestionPaper>;
export type z_reviewQP_type = z.infer<typeof z_reviewQP>;
export type z_createNotification_type = z.infer<typeof z_createNotification>;
export type z_createMessage_type = z.infer<typeof z_createMessage>;
