const fs = require("fs");

// Asynchronous Block of Code:
const stream = fs.createReadStream(__filename);
stream.close();
stream.on("close", () => console.log("-> [close]"));

fs.readFile(__filename, () => {
  console.log("-> [readFile]");
  setImmediate(() => console.log("-> [readFile] - [setImmediate]"));
  process.nextTick(() => console.log("-> [readFile] - [process.nextTick]"));
  Promise.resolve().then(() =>
    console.log("-> [readFile] - [Promise.resolve.then]")
  );
});

setImmediate(() => console.log("-> [setImmediate]"));
setTimeout(() => console.log("-> [setTimeout]"), 0);
Promise.resolve().then(() => console.log("-> [Promise.resolve.then]"));
process.nextTick(() => console.log("-> [process.nextTick]"));

// Synchronous Code:
for (let i = 0; i < 2000000000; i++) {
  // to simulate some delay so all the callbacks
  // would be in their respective queues.
}
console.log("-------Starting Event-loop-------");
