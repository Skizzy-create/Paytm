const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || "Temp website secreat"

function generateToken(user, res) {
    try {
        const payload = {
            id: user._id,
            username: user.username
        };
        const token = jwt.sign(payload, JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        console.log('Token Generated Sucessfully');
        return token;
    } catch (err) {
        console.log("Error Generating JWT :\n", err);
        return false;
    }
};

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        console.error("Error verifying JWT:", "\n", err);
        return false;
    }
}

module.exports = {
    generateToken,
    verifyToken
}