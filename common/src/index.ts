import { z } from "zod";

// SCHEMAS
export const z_signup = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  programId: z.number(),
});

export const z_updateUser = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  programId: z.number(),
});

export const z_resetUploads = z.object({
  userId: z.number(),
});

export const z_verifyOTP = z.object({
  otp: z.string().length(6),
});

export const z_updatePassword = z.object({
  previousPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmNewPassword: z.string().min(6),
});

export const z_signin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const z_createProgram = z.object({
  name: z.string().min(1),
});

export const z_editProgram = z.object({
  id: z.number(),
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

export const z_deleteQP = z.object({
  id: z.number(),
});

export const z_editQuestionPaper = z.object({
  id: z.number(),
  courseName: z.string().min(1).optional(),
  courseCode: z.string().min(1).optional(),
  year: z.coerce.number().optional(),
  examType: z.string().min(1).optional(),
  programId: z.number().optional(),
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
export type z_verifyOTP_type = z.infer<typeof z_verifyOTP>;
export type z_updateUser_type = z.infer<typeof z_updateUser>;
export type z_resetUploads_type = z.infer<typeof z_resetUploads>;
export type z_updatePassword_type = z.infer<typeof z_updatePassword>;
export type z_signin_type = z.infer<typeof z_signin>;
export type z_createProgram_type = z.infer<typeof z_createProgram>;
export type z_editProgram_type = z.infer<typeof z_editProgram>;
export type z_createQuestionPaper_type = z.infer<typeof z_createQuestionPaper>;
export type z_editQuestionPaper_type = z.infer<typeof z_editQuestionPaper>;
export type z_reviewQP_type = z.infer<typeof z_reviewQP>;
export type z_deleteQP_type = z.infer<typeof z_deleteQP>;
export type z_createNotification_type = z.infer<typeof z_createNotification>;
export type z_createMessage_type = z.infer<typeof z_createMessage>;
