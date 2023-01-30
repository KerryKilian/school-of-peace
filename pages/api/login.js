// api/
var CryptoJS = require("crypto-js");

async function handler(req, res) {
  if (req.method === "POST") {
    let data = req.body;
    const hashedPw =
      "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08";

    // Decrypt
    let bytes = CryptoJS.AES.decrypt(data.body, hashedPw);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    // check if sent hashcode is correct
    if (
      decrypted == hashedPw // sdf-2022!
    ) {
      // encrypt message
      const encryptedTrue = CryptoJS.AES.encrypt(
        JSON.stringify({ isCorrect: true }),
        hashedPw
      ).toString();
      // send encrypted message to user
      res.status(202).json({ body: encryptedTrue });
    } else {
      // encrypt message
      const encryptedFalse = CryptoJS.AES.encrypt(
        JSON.stringify({ isCorrect: false }),
        hashedPw
      ).toString();
      // send encrypted message to user
      res.status(401).json({ body: encryptedFalse });
    }
  }
}

export default handler;
