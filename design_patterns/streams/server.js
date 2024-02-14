import { createServer } from "node:http";
import { createWriteStream } from "node:fs";
import { createGunzip } from "node:zlib";
import { basename, join } from "node:path";

const server = createServer((req, res) => {
  const filename = basename(req.headers["x-filename"]);
  const destFilename = join("./received_files", filename);
  console.log("-> ", destFilename);
  req
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on("finish", () => {
      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("OK\n");
      console.log("File saved ");
    });
});

server.listen(5555, () => {
  console.log("-> [Server] - listening on http://localhost:5555.");
});
