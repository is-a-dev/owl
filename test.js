const fs = require('fs');
const jose = require('node-jose');

// Read the PEM file
const pem = fs.readFileSync('keys/private.pem', 'utf8');

// Create a keystore
const keystore = jose.JWK.createKeyStore();

// Add the PEM key to the keystore
keystore.add(pem, 'pem')
  .then(function(key) {
    console.log('Key added to keystore:', key);

    // Encrypt a payload
    const payload = JSON.stringify({ message: 'Hello, World!' });

    // Encrypt the payload
    jose.JWE.createEncrypt({ format: 'compact' }, key)
      .update(payload)
      .final()
      .then(function(result) {
        const jwe = result;
        console.log('JWE:', jwe);
      });
  })
  .catch(function(err) {
    console.error('Error adding key:', err);
  });
