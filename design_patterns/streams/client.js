import { request } from "node:http";
import { basename } from "node:path";
import { createReadStream } from "node:fs";
import { createGzip } from "node:zlib";

// const filename = "./enwik9.txt";

// const httpRequestObject = {
//   hostname: "localhost",
//   port: 5555,
//   path: "/",
//   method: "POST",
//   headers: {
//     "Content-Type": "application/octet-stream",
//     "Content-Encoding": "gzip",
//     "X-Filename": basename(filename),
//   },
// };

// const req = request(httpRequestObject, (res) => {
//   console.log(`Response from server is : ${res.statusCode}`);
// });

// createReadStream(filename)
//   .pipe(createGzip())
//   .pipe(req)
//   .on("finish", () => {
//     console.log("File successfully sent.");
//   });
