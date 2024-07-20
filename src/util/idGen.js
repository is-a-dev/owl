const jwt = require("jsonwebtoken");

const secretKey = process.env.ENCRYPTION_KEY;

async function EncryptData(data) {
    return jwt.sign({data, expiresIn: '9999y' }, secretKey);
}

async function DecryptData(token) {
    return jwt.verify(token, secretKey);
}

module.exports = { EncryptData, DecryptData };