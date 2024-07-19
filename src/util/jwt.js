const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    // Get the token from the authorization header
    const token = req.cookies['access_token'];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized if token is not provided
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user.user; // Attach the decoded user object to the request object
        next(); // Move to the next middleware
    });
}

function signToken(user) {
    return jwt.sign({user, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, secretKey);
}

module.exports = { authenticateToken, signToken };