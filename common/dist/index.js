"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z_verifyOTP = exports.z_createProgram = exports.z_signin = exports.z_signup = void 0;
const zod_1 = require("zod");
// SCHEMAS
exports.z_signup = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    programId: zod_1.z.number(),
});
exports.z_signin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.z_createProgram = zod_1.z.object({
    name: zod_1.z.string().min(1),
});
exports.z_verifyOTP = zod_1.z.object({
    otp: zod_1.z.string().length(6),
});
