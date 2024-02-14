import { gzip, createGzip } from "node:zlib";
import { readFile, writeFile } from "node:fs/promises";
import buffer from "node:buffer";
import { createReadStream, createWriteStream } from "node:fs";

const promisify = (callbackBasedAPI) => {
  const promisified = (...args) => {
    return new Promise((resolve, reject) => {
      const newArg = [
        ...args,
        (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        },
      ];

      callbackBasedAPI(...newArg);
    });
  };
  return promisified;
};

const MainStream = async () => {
  console.log("-----------Start---------");
  createReadStream("./enwik9.txt")
    .pipe(createGzip())
    .pipe(createWriteStream("./test2.gz"))
    .on("finish", () => {
      console.timeEnd("start");
      console.log("-----------End-----------");
    });
};

const Main = async () => {
  console.log("-----------Start---------");
  const gzippedPromise = promisify(gzip);
  const data = await readFile("./enwik9.txt");
  console.log("-> [Main] - reading done, compression starting.");
  const gzippedData = await gzippedPromise(data);
  await writeFile("./test.gz", gzippedData);
  // const stopTime = new Date();
  // const timeTaken = stopTime - startTime;
  console.timeEnd("start");
  console.log("-----------End-----------");
};

const num = (buffer.constants.MAX_LENGTH + 1) / 2 ** 30;
console.log(`-> [Buffer size] - ${Math.round(num)}Gb`);
// const startTime = new Date();
console.time("start");
MainStream();
// Main();
