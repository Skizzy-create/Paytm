const zod = require("zod");

const userSingUpZod = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6),
});

const userLoginZod = zod.object({
    username: zod.string(),
    password: zod.string()
});

module.exports = {
    userSingUpZod,
    userLoginZod
}