import { createCipheriv, randomFill, scrypt } from "node:crypto";

const password = "this is a test";

scrypt(password, "salt", 24, (err, key) => {
  if (err) throw err;

  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv("aes-192-ccm", key, iv);

    console.log("-> [cipher]", cipher);
  });
});
