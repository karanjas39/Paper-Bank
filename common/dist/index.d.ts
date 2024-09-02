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
    academicLevel: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    academicLevel: string;
}, {
    name: string;
    academicLevel: string;
}>;
export type z_signup_type = z.infer<typeof z_signup>;
export type z_signin_type = z.infer<typeof z_signin>;
export type z_createProgram_type = z.infer<typeof z_createProgram>;
