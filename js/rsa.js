// Fungsi untuk menghitung GCD dari dua bilangan
function gcd(a, b) {
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Fungsi untuk menghitung Extended GCD (algoritma Euclidean Extended)
function extendedGcd(a, b) {
  let s = 0n,
    old_s = 1n;
  let t = 1n,
    old_t = 0n;
  let r = b,
    old_r = a;

  while (r !== 0n) {
    const quotient = old_r / r;
    [old_r, r] = [r, old_r - quotient * r];
    [old_s, s] = [s, old_s - quotient * s];
    [old_t, t] = [t, old_t - quotient * t];
  }

  return { s: old_s, t: old_t, gcd: old_r };
}

// Fungsi untuk menghitung modular exponentiation: (base^exp) % mod
function modExp(base, exp, mod) {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

// Fungsi untuk menghasilkan publicKey dan privateKey dari dua bilangan prima p dan q
function generateRSAKeys(p, q) {
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  const e = generateEncryptionExponent(phi);
  const d = computeDecryptionExponent(e, phi);

  return {
    publicKey: { e, n },
    privateKey: { d, n },
  };
}

// Fungsi untuk menghasilkan eksponen enkripsi (e) yang relatif prima dengan phi
function generateEncryptionExponent(phi) {
  let e = 47n; // Nilai default e

  while (gcd(e, phi) !== 1n) {
    e += 2n; // Menaikkan nilai e hingga memenuhi syarat gcd(e, phi) = 1
  }

  return e;
}

// Fungsi untuk menghitung eksponen dekripsi (d) menggunakan Extended GCD
function computeDecryptionExponent(e, phi) {
  let d = extendedGcd(e, phi).s;

  while (d < 1n) {
    d += phi; // Memastikan d positif
  }

  return d;
}

// Konversi string pesan ke BigInt
function toBigInt(message) {
  const hex = Array.from(message)
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
  return BigInt(`0x${hex}`);
}

// Konversi BigInt kembali menjadi string
function fromBigInt(bigInt) {
  const hex = bigInt.toString(16);
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

// Fungsi untuk mengenkripsi pesan menggunakan kunci publik
function encryptRSA(message, publicKey) {
  const m = toBigInt(message);
  if (m < 0n || m >= publicKey.n) {
    throw new Error(`Message out of bounds: 0 <= m < n`);
  }
  const c = modExp(m, publicKey.e, publicKey.n);
  return c.toString(16); // Menghasilkan ciphertext dalam format hexadecimal
}

// Fungsi untuk mendekripsi ciphertext menggunakan kunci privat
function decryptRSA(ciphertext, privateKey) {
  const c = BigInt(`0x${ciphertext}`);
  const m = modExp(c, privateKey.d, privateKey.n);
  return fromBigInt(m); // Menghasilkan kembali pesan asli dalam bentuk string
}

// Ekspor fungsi ke jendela (untuk digunakan di browser)
window.generateRSAKeys = generateRSAKeys;
window.encryptRSA = encryptRSA;
window.decryptRSA = decryptRSA;
