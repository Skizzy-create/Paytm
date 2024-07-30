const { verifyToken } = require("./authOps");

// middleware to check if user is authenticated
function authenticateToken(req, res, next) {
    try {
        const token = req.cookies.token;
        // console.log("Token", token);
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Acess Cookies"
            });
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized Access Cookies"
            });
        }
        res.user = decoded;
        next();
    } catch (err) {
        console.log("Error: ", err);
        return res.status(500).json({
            msg: "Server Error: Cookie Auth",
            error: err
        });
    }
}

module.exports = {
    authenticateToken
}