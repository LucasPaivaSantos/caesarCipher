const encrypt = (key: number, clearText: string) => {
  return clearText
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + key) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + key) % 26) + 97);
      }
      //mantem caracteres não letras
      return char;
    })
    .join("");
};

const decrypt = (key: number, cipherText: string) => {
  return encrypt(-key, cipherText);
};

export { encrypt, decrypt };
