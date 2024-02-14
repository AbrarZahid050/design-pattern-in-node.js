const EventEmitter = require("node:events");
const fs = require("node:fs");

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(file) {
    this.files.push(file);
    return this;
  }

  find() {
    for (const file of this.files) {
      fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
          return this.emit("error", err);
        }

        this.emit("fileread", file);
        const match = data.match(this.regex);
        if (match) {
          match.forEach((element) => this.emit("found", file, element));
        }
      });
    }
    return this;
  }
}

const findPattern = new FindRegex(/test./g);
findPattern
  .addFile("example.txt")
  .addFile("example2.txt")
  .find()
  .on("fileread", (file) => console.log(`-> [fileread] ${file} was read.`))
  .on("found", (file, match) =>
    console.log(`-> [found] ${match} is in file ${file}`)
  )
  .on("error", (err) => console.error(`-> [error] ${err.message}`));

// Removing the filereadHandler after a certain time
setTimeout(() => {
  findPattern.removeListener("fileread", () =>
    console.log("-> filereadHandler removed.")
  );
}, 5000);
