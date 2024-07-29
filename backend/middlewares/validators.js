const { userSingUpZod, userLoginZod } = require("../schemas/zodSchema");

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
        console.log("isValid = " + isValid.success);

        if (!isValid) {
            return res.status(411).json({
                msg: "The Data sent is not of the right format",
                error: isValid.err
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

function validateUserLogin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const isValid = userLoginZod.safeParse({
            username: username,
            password: password
        });
        console.log("Login Route called");
        console.log("isValid = " + isValid.success);

        if (!isValid) {
            return res.status(411).json({
                msg: "The Data sent is not of the right format",
                error: isValid.err
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

module.exports = {
    validateUserSingUp,
    validateUserLogin
}