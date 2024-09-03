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
export declare const z_verifyOTP: z.ZodObject<{
    otp: z.ZodString;
}, "strip", z.ZodTypeAny, {
    otp: string;
}, {
    otp: string;
}>;
export declare const z_createQuestionPaper: z.ZodObject<{
    courseName: z.ZodString;
    courseCode: z.ZodString;
    year: z.ZodNumber;
    examType: z.ZodEnum<["MSE", "ESE"]>;
    pdf: z.ZodEffects<z.ZodAny, any, any>;
}, "strip", z.ZodTypeAny, {
    courseName: string;
    courseCode: string;
    year: number;
    examType: "MSE" | "ESE";
    pdf?: any;
}, {
    courseName: string;
    courseCode: string;
    year: number;
    examType: "MSE" | "ESE";
    pdf?: any;
}>;
export type z_signup_type = z.infer<typeof z_signup>;
export type z_signin_type = z.infer<typeof z_signin>;
export type z_createProgram_type = z.infer<typeof z_createProgram>;
export type z_verifyOTP_type = z.infer<typeof z_verifyOTP>;
export type z_createQuestionPaper_type = z.infer<typeof z_createQuestionPaper>;
