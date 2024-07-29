const { verifyToken } = require("./authOps");

// middleware to check if user is authenticated
function authenticateToken(req, res, next) {
    const token = req.cookies.token;;
    console.log("Token", token);
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized Acess"
        });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({
            message: "Unauthorized Access"
        });
    }
    res.user = decoded;
    next();
}

module.exports = {
    authenticateToken
}