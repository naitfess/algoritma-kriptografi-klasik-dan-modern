function encryptRailFenceCipher(text, key) {
  if (key <= 1) return text; // No encryption needed for key 1 or less

  const rail = Array.from({ length: key }, () => []);
  let direction = 1; // 1 for down, -1 for up
  let row = 0;

  for (let char of text) {
    rail[row].push(char);
    row += direction;
    if (row === 0 || row === key - 1) direction *= -1;
  }

  return rail.flat().join("");
}

function decryptRailFenceCipher(text, key) {
  if (key <= 1) return text; // No decryption needed for key 1 or less

  const zigzag = Array.from({ length: key }, () => []);
  let direction = 1; // 1 for down, -1 for up
  let row = 0;

  // Mark the positions in zigzag pattern
  for (let i = 0; i < text.length; i++) {
    zigzag[row].push(i);
    row += direction;
    if (row === 0 || row === key - 1) direction *= -1;
  }

  // Fill the marked positions with the actual characters
  let index = 0;
  for (let r = 0; r < key; r++) {
    for (let i = 0; i < zigzag[r].length; i++) {
      zigzag[r][i] = text[index++];
    }
  }

  // Read the zigzag pattern to get the original text
  let result = "";
  row = 0;
  direction = 1;
  for (let i = 0; i < text.length; i++) {
    result += zigzag[row].shift();
    row += direction;
    if (row === 0 || row === key - 1) direction *= -1;
  }

  return result;
}

window.encryptRailFenceCipher = encryptRailFenceCipher;
window.decryptRailFenceCipher = decryptRailFenceCipher;
