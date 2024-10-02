function XOR(text, key, inputType, keyType, outputType) {
  // Convert input text to binary if input type is "teks"
  let binaryText =
    inputType === "binary" ? text : stringToBinary(text).replace(/\s+/g, "");

  // Convert key to binary if key type is "teks"
  let binaryKey =
    keyType === "binary"
      ? key.replace(/\s+/g, "")
      : stringToBinary(key).replace(/\s+/g, "");

  // Perform XOR operation
  let resultBinary = "";
  for (let i = 0; i < binaryText.length; i++) {
    resultBinary += (
      binaryText[i] ^ binaryKey[i % binaryKey.length]
    ).toString();
  }

  // Convert result to desired output type
  return outputType === "binary"
    ? resultBinary
    : binaryToString(resultBinary.match(/.{1,8}/g).join(" "));
}

function stringToBinary(text) {
  return text
    .split("")
    .map((char) => {
      return char.charCodeAt(0).toString(2).padStart(8, "0");
    })
    .join(" ");
}

function binaryToString(binary) {
  return binary
    .split(" ")
    .map((bin) => {
      return String.fromCharCode(parseInt(bin, 2));
    })
    .join("");
}

window.XOR = XOR;
window.stringToBinary = stringToBinary;
window.binaryToString = binaryToString;
