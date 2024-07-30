// this is not necesssary but harkirat want the auth to be done with headers, 
// the one with cookies is already done in Auth.js
// this is onw with headers
require('dotenv').config;
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "Temp website secret"

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log("Auth Header: ", authHeader);
    // console.log("Auth Header starts with: ", authHeader.startsWith('Bearer '));
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: 'Unauthorized Access -Headers starts with'
        });
    }


    const token = authHeader.split(' ')[1];
    // console.log("Token Header: ", token);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(500).json({
            msg: "Server Error: Header Auth",
            error: err
        });
    }
}

module.exports = {
    authMiddleware
}