const fs = require('fs');
const jose = require('node-jose');

// Read the PEM file
const pem = fs.readFileSync('keys/private.pem', 'utf8');
console.log(pem);

// Create a keystore
const keystore = jose.JWK.createKeyStore();

// Add the PEM key to the keystore
keystore.add(pem, 'pem')
  .then(function(key) {
    console.log('Key added to keystore:', key);

    // The JWE you want to decrypt
    const jwe = 'eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiUlNBLU9BRVAiLCJraWQiOiI5cG9mUDVvNWM2bkd1d0RKaU5aV050MVFDOFpQcEFxck9IdzJkOW11UU9JIn0.Le658wZYUzsOIYXtX5bXZvRXxZLyqB9NEvtJazuSxHTj4uO9zwBsAGWFaPuGI09jO1qUrYTwZbblld-h2rgoqHC_g9PYO9yvr8U5-ky7tl3mzbnbet3w8aak9KzqZh-RPnOSrjD3U_xPeAsvgyJzs9s5p1rJ2cEtXEA9QiiJRRysdqIlokKmvD3MvSF4e7y5qsMP4aYUgGMmxuGyOeWV7pRv18O1GRLCot_0su7F-ZH0N3gXibZy_jethQ6Hn1JjAC7DH9q2AaWp1JxUT6VmpzdYyeSG1sLw5EMw54dCi2uBuxcqc8AzoAI7gkeoDOm1Cq_6WNlA4k3GfAjERafOZg.A0x_qLdeom_Fx7LWaIxgVg.aP4ls_u3n6ejgRvc7UKTn73jWnLk4v5dnCQdwVsNOLXEtJRuyYeYOojpdzY4vB4ldPFT9FYvpFU-jcNfznrJWuuTL2H0ftF_De8dqluM5_H_cW7HwREdOltiw1yIqlsM.schEQZmjBdV-ip9dSyIYuQ';

    // Decrypt the JWE
    jose.JWE.createDecrypt(key)
      .decrypt(jwe)
      .then(function(result) {
        const decryptedPayload = result.payload.toString();
        console.log('Decrypted payload:', decryptedPayload);
      })
      .catch(function(err) {
        console.error('Decryption failed:', err);
      });
  })
  .catch(function(err) {
    console.error('Error adding key:', err);
  });
