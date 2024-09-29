import { z } from "zod";
export declare const z_signup: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    programId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    programId: number;
}, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    programId: number;
}>;
export declare const z_updateUser: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    programId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    programId: number;
}, {
    name: string;
    email: string;
    programId: number;
}>;
export declare const z_resetUploads: z.ZodObject<{
    userId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: number;
}, {
    userId: number;
}>;
export declare const z_verifyOTP: z.ZodObject<{
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    otp: string;
}, {
    otp: string;
}>;
export declare const z_updatePassword: z.ZodObject<{
    previousPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    previousPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}, {
    previousPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}>;
export declare const z_signin: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const z_createProgram: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const z_editProgram: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: number;
}, {
    name: string;
    id: number;
}>;
export declare const z_createQuestionPaper: z.ZodObject<{
    courseName: z.ZodString;
    courseCode: z.ZodString;
    year: z.ZodNumber;
    examType: z.ZodString;
    programId: z.ZodNumber;
    pdf: z.ZodEffects<z.ZodAny, any, any>;
}, "strip", z.ZodTypeAny, {
    programId: number;
    courseName: string;
    courseCode: string;
    year: number;
    examType: string;
    pdf?: any;
}, {
    programId: number;
    courseName: string;
    courseCode: string;
    year: number;
    examType: string;
    pdf?: any;
}>;
export declare const z_deleteQP: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export declare const z_editQuestionPaper: z.ZodObject<{
    id: z.ZodNumber;
    courseName: z.ZodOptional<z.ZodString>;
    courseCode: z.ZodOptional<z.ZodString>;
    year: z.ZodOptional<z.ZodNumber>;
    examType: z.ZodOptional<z.ZodString>;
    programId: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: number;
    programId?: number | undefined;
    courseName?: string | undefined;
    courseCode?: string | undefined;
    year?: number | undefined;
    examType?: string | undefined;
}, {
    id: number;
    programId?: number | undefined;
    courseName?: string | undefined;
    courseCode?: string | undefined;
    year?: number | undefined;
    examType?: string | undefined;
}>;
export declare const z_reviewQP: z.ZodObject<{
    id: z.ZodNumber;
    status: z.ZodEnum<["rejected", "approved"]>;
}, "strip", z.ZodTypeAny, {
    status: "rejected" | "approved";
    id: number;
}, {
    status: "rejected" | "approved";
    id: number;
}>;
export declare const z_createNotification: z.ZodObject<{
    userId: z.ZodNumber;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    userId: number;
}, {
    message: string;
    userId: number;
}>;
export declare const z_createMessage: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
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
