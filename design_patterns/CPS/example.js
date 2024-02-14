const fs = require("node:fs");

const cache = {};

// Correct pattern - making the synchronous bit asynchronous,
// by wrapping it in "process.nextTick()"
const inconsistentRead = (filename, callback) => {
  // asynchronous:
  if (cache[filename]) {
    return process.nextTick(() => {
      console.log("-> [inconsistentRead] - [cache]");
      callback(null, cache[filename]);
    });
  }

  // asynchronous:
  fs.readFile(filename, "utf-8", (err, data) => {
    if (err) {
      return callback(err);
    }
    console.log("-> [inconsistentRead] - [read]");
    cache[filename] = data;
    callback(null, data);
  });
};

const createFileReader = (filename) => {
  const listeners = [];

  inconsistentRead(filename, (err, value) => {
    listeners.forEach((listener) => {
      if (err) {
        return listener(err.message);
      }
      listener(value);
    });
  });

  return {
    onDataReady: (listener) => listeners.push(listener),
  };
};

const reader1 = createFileReader("example.txt");
reader1.onDataReady((data) => {
  console.log("-> [reader1] :", data);

  const reader2 = createFileReader("example.txt");
  // reader2 will now receive the data,
  reader2.onDataReady((data) => {
    console.log("-> [reader2] :", data);
  });
});
