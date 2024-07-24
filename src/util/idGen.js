const fs = require('fs');
const jose = require('node-jose');

async function EncryptPayload(payload) {
    // Read the PEM file
    const pem = fs.readFileSync('keys/private.pem', 'utf8');
    const JSONPayload = JSON.stringify(payload);

    // Create a keystore
    const keystore = jose.JWK.createKeyStore();

    try {
        // Add the PEM key to the keystore
        const key = await keystore.add(pem, 'pem');
        console.log('Key added to keystore:', key);

        // Encrypt the payload
        const result = await jose.JWE.createEncrypt({ format: 'compact' }, key)
            .update(JSONPayload)
            .final();
        
        return result;
    } catch (err) {
        console.error('Error during encryption:', err);
        throw err;
    }
}

async function DecryptPayload(jwe) {
    // Read the PEM file
    const pem = fs.readFileSync('keys/private.pem', 'utf8');

    // Create a keystore
    const keystore = jose.JWK.createKeyStore();

    try {
        // Add the PEM key to the keystore
        const key = await keystore.add(pem, 'pem');
        console.log('Key added to keystore:', key);

        // Decrypt the JWE
        const result = await jose.JWE.createDecrypt(key)
            .decrypt(jwe);
        
        const decryptedPayload = result.payload.toString();
        console.log('Decrypted payload:', decryptedPayload);
        
        return decryptedPayload;
    } catch (err) {
        console.error('Decryption failed:', err);
        throw err;
    }
}

module.exports = { EncryptPayload, DecryptPayload };