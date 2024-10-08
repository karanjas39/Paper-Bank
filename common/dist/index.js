"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z_createMessage = exports.z_createNotification = exports.z_reviewQP = exports.z_editQuestionPaper = exports.z_deleteQP = exports.z_createQuestionPaper = exports.z_editProgram = exports.z_createProgram = exports.z_signin = exports.z_updatePassword = exports.z_verifyOTP = exports.z_resetUploads = exports.z_updateUser = exports.z_signup = void 0;
const zod_1 = require("zod");
// SCHEMAS
exports.z_signup = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    confirmPassword: zod_1.z.string().min(6),
    programId: zod_1.z.number(),
});
exports.z_updateUser = zod_1.z.object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    programId: zod_1.z.number(),
});
exports.z_resetUploads = zod_1.z.object({
    userId: zod_1.z.number(),
});
exports.z_verifyOTP = zod_1.z.object({
    otp: zod_1.z.string().length(6),
});
exports.z_updatePassword = zod_1.z.object({
    previousPassword: zod_1.z.string().min(6),
    newPassword: zod_1.z.string().min(6),
    confirmNewPassword: zod_1.z.string().min(6),
});
exports.z_signin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.z_createProgram = zod_1.z.object({
    name: zod_1.z.string().min(1),
});
exports.z_editProgram = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().min(1),
});
exports.z_createQuestionPaper = zod_1.z.object({
    courseName: zod_1.z.string().min(1),
    courseCode: zod_1.z.string().min(1),
    year: zod_1.z.coerce.number(),
    examType: zod_1.z.string().min(1),
    programId: zod_1.z.number(),
    pdf: zod_1.z
        .any()
        .refine((file) => file instanceof File && file.type === "application/pdf", {
        message: "Invalid file type. Expected a PDF.",
    }),
});
exports.z_deleteQP = zod_1.z.object({
    id: zod_1.z.number(),
});
exports.z_editQuestionPaper = zod_1.z.object({
    id: zod_1.z.number(),
    courseName: zod_1.z.string().min(1).optional(),
    courseCode: zod_1.z.string().min(1).optional(),
    year: zod_1.z.coerce.number().optional(),
    examType: zod_1.z.string().min(1).optional(),
    programId: zod_1.z.number().optional(),
});
exports.z_reviewQP = zod_1.z.object({
    id: zod_1.z.number(),
    status: zod_1.z.enum(["rejected", "approved"]),
});
exports.z_createNotification = zod_1.z.object({
    userId: zod_1.z.number(),
    message: zod_1.z.string().min(1),
});
exports.z_createMessage = zod_1.z.object({
    message: zod_1.z.string().min(1).max(100),
});
