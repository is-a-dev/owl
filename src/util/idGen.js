const jwt = require("jsonwebtoken");

const secretKey = process.env.ENCRYPTION_KEY;

async function EncryptData(data, key) {
    const encyptKey = secretKey + key;
    return jwt.sign({data, expiresIn: '9999y' }, encyptKey);
}

async function DecryptData(token) {
    return jwt.verify(token, secretKey);
}

module.exports = { EncryptData, DecryptData };