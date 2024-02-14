const fs = require("node:fs");

const promisify = (callbackBasedAPI) => {
  const promisified = (...args) => {
    const promise = new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        (err, result) => {
          if (err) {
            return reject(err);
          }

          resolve(result);
        },
      ];
      callbackBasedAPI(...newArgs);
    });
    return promise;
  };
  return promisified;
};

const readFile = promisify(fs.readFile);
readFile("./example.txt")
  .then((data) => console.log(data.toString()))
  .catch((err) => console.error(err));
