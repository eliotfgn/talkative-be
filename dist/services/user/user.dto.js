"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDto = exports.AccountDto = void 0;
const zod_1 = require("zod");
const AccountDto = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format.'),
    password: zod_1.z
        .string()
        .min(8, 'Password should have at least 8 characteres.')
        .regex(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]'), 'Password must have alphanumeric characters and at least one special character.'),
});
exports.AccountDto = AccountDto;
const ProfileDto = zod_1.z.object({
    username: zod_1.z.string().min(3, 'Username must have at least 3 characteres.'),
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string(),
    profilePic: zod_1.z.string(),
});
exports.ProfileDto = ProfileDto;
