function generateRSAKeys(n) {
  if (n !== 512 && n !== 1024) {
    throw new Error("Invalid key size. Only 512 and 1024 are supported.");
  }

  const rsa = new RSAKey();
  rsa.generate(n, "10001"); // '10001' adalah 65537 dalam heksadesimal

  const publicKeyPEM = rsa.getPublicBaseKeyB64();
  const privateKeyPEM = rsa.getPrivateBaseKeyB64();

  return {
    publicKey: `-----BEGIN PUBLIC KEY-----\n${publicKeyPEM}\n-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN PRIVATE KEY-----\n${privateKeyPEM}\n-----END PRIVATE KEY-----`,
  };
}

function encryptRSA(text, publicKeyPEM) {
  const rsa = new RSAKey();
  rsa.readPublicKeyFromPEMString(publicKeyPEM);
  const encrypted = rsa.encrypt(text);
  return hex2b64(encrypted);
}

function decryptRSA(encryptedText, privateKeyPEM) {
  const rsa = new RSAKey();
  rsa.readPrivateKeyFromPEMString(privateKeyPEM);
  const decrypted = rsa.decrypt(b64tohex(encryptedText));
  return decrypted;
}

window.generateRSAKeys = generateRSAKeys;
