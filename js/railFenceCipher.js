function railFenceCipher(text, key, encode = true) {
  if (key <= 1) return text; // No encryption needed for key 1 or less

  const rail = Array.from({ length: key }, () => []);
  let direction = 1; // 1 for down, -1 for up
  let row = 0;

  if (encode) {
    // Encryption
    for (let char of text) {
      rail[row].push(char);
      row += direction;
      if (row === 0 || row === key - 1) direction *= -1;
    }
    return rail.flat().join("");
  } else {
    // Decryption
    const zigzag = Array.from({ length: text.length }, () => null);
    let index = 0;

    // Mark the positions in zigzag pattern
    for (let i = 0; i < key; i++) {
      row = i;
      direction = 1;
      for (let j = 0; j < text.length; j++) {
        if (row === i) zigzag[j] = "*";
        row += direction;
        if (row === 0 || row === key - 1) direction *= -1;
      }
    }

    // Fill the marked positions with the actual characters
    for (let i = 0; i < text.length; i++) {
      if (zigzag[i] === "*") zigzag[i] = text[index++];
    }

    // Read the zigzag pattern to get the original text
    let result = "";
    row = 0;
    direction = 1;
    for (let i = 0; i < text.length; i++) {
      result += zigzag[i];
      row += direction;
      if (row === 0 || row === key - 1) direction *= -1;
    }
    return result;
  }
}
