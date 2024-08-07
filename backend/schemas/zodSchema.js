const zod = require("zod");

const userSingUpZod = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6),
});

const userLoginZod = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

const userInfoUpdateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

const accountTransferSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
});

module.exports = {
    userSingUpZod,
    userLoginZod,
    userInfoUpdateSchema,
    accountTransferSchema
}