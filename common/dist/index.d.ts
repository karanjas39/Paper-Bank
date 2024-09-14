import { z } from "zod";
export declare const z_signup: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    programId: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    programId: number;
}, {
    name: string;
    email: string;
    password: string;
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
export type z_updateUser_type = z.infer<typeof z_updateUser>;
export type z_updatePassword_type = z.infer<typeof z_updatePassword>;
export type z_signin_type = z.infer<typeof z_signin>;
export type z_createProgram_type = z.infer<typeof z_createProgram>;
export type z_createQuestionPaper_type = z.infer<typeof z_createQuestionPaper>;
export type z_reviewQP_type = z.infer<typeof z_reviewQP>;
export type z_createNotification_type = z.infer<typeof z_createNotification>;
export type z_createMessage_type = z.infer<typeof z_createMessage>;
