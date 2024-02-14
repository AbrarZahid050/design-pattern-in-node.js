const EventEmitter = require("node:events");
const fs = require("node:fs");

const findPattern = (files, regex) => {
  const emitter = new EventEmitter();
  files.forEach((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) return emitter.emit("error", err);

      emitter.emit("fileread", file);
      const match = data.match(regex);
      if (match) {
        match.forEach((element) => emitter.emit("found", file, element));
      }
    });
  });
  return emitter;
};

findPattern(["example.txt", "example2.txt"], /test./g)
  .on("fileread", (file) => console.log(`-> [fileread] ${file} was read.`))
  .on("found", (file, match) =>
    console.log(`-> [found] ${match} is in file ${file}`)
  )
  .on("error", (err) => console.error(`-> [error] ${err.message}`));
