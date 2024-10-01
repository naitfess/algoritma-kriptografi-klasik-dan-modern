function caesarCipher(str, shift) {
  return str.replace(/[a-zA-Z]/g, (char) => {
    const start = char <= "Z" ? 65 : 97;
    const newCharCode =
      ((((char.charCodeAt(0) - start + shift) % 26) + 26) % 26) + start;
    return String.fromCharCode(newCharCode);
  });
}
