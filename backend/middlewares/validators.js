const { userSingUpZod, userLoginZod, userInfoUpdateSchema, accountTransferSchema } = require("../schemas/zodSchema");

function validateUserSingUp(req, res, next) {
    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    try {
        const isValid = userSingUpZod.safeParse({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password
        });
        console.log("Singup Route called");
        console.log("isValid zod= " + isValid.success);

        if (!isValid.success) {
            return res.status(411).json({
                msg: "The Data sent is not of the right format",
                error: isValid.error
            });
        }
        next();
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({
            msg: "Internal Server Error -ZOD VALIDATION USER SINGUP",
            error: err
        });
    }
};

async function validateUserLogin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const isValid = userLoginZod.safeParse({
            username: username,
            password: password
        });
        console.log("Login Route called");
        console.log("isValid zod= " + isValid.success);

        if (!isValid.success) {
            return res.status(411).json({
                msg: "The Data sent is not of the right format",
                error: isValid.error
            });
        }
        next();
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({
            msg: "Internal Server Error -ZOD VALIDATION USER LOGIN",
            error: err
        });
    }
};

function validateUserInfoUpdate(req, res, next) {
    const body = req.body;
    try {
        const isValid = userInfoUpdateSchema.safeParse({
            body
        });
        console.log("User Info update Route Called. PUT@/user/");
        console.log("isValid zod= " + isValid.success);

        if (!isValid.success) {
            return res.status(411).json({
                msg: "The Data sent is not of the right format",
                error: isValid.error
            });
        }
        next();
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({
            msg: "Internal Server Error -ZOD VALIDATION USER UPDATE",
            error: err
        });
    }
}

function validateAccountTransfer(req, res, next) {
    const body = req.body;
    try {
        const isValid = accountTransferSchema.safeParse(
            body
        );
        console.log("Account Transfer Route Called. POST@/account/transfer");
        console.log("isValid zod= " + isValid.success);

        if (!isValid.success) {
            console.log("error: " + isValid.error);
            return res.status(411).json({
                msg: "The Data sent is not of the right format",
                error: isValid.error
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            msg: "Internal Server Error -ZOD VALIDATION ACCOUNT TRANSFER",
            error: err
        });
    }
}

module.exports = {
    validateUserSingUp,
    validateUserLogin,
    validateUserInfoUpdate,
    validateAccountTransfer
}