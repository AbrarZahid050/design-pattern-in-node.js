const fs = require("node:fs");
const path = require("path");
const superagent = require("superagent");
const mkdirp = require("mkdirp");
const { urlToFilename } = require("./util.js");

module.exports.spider = (url, callback) => {
  const filename = urlToFilename(url);
  fs.access(filename, (err) => {
    if (!err || err.code !== "ENOENT") {
      return callback(null, filename, false);
    }
    download(url, filename, (err) => {
      if (err) {
        return callback(err);
      }
      callback(null, filename, true);
    });
  });
};

const saveFile = (filename, content, callback) => {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return callback(err);
    } else {
      fs.writeFile(filename, content, callback);
    }
  });
};

const download = (url, filename, callback) => {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return callback(err);
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return callback(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      callback(null, res.text);
    });
  });
};
