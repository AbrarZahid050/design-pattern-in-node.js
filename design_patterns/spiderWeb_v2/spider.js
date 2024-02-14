const fs = require("node:fs");
const mkdirp = require("mkdirp");
const path = require("path");
const superagent = require("superagent");
const { getPageLinks, urlToFilename } = require("./util");

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

module.exports.spider = (url, nesting, callback) => {
  const filename = urlToFilename(url);
  fs.readFile(filename, "utf-8", (err, fileContent) => {
    if (err) {
      if (err !== "ENOENT") {
        callback(err);
      }

      return download(url, filename, (err, requestContent) => {
        if (err) {
          return callback(err);
        }
        spiderLink(url, requestContent, nesting, callback);
      });
    }

    spiderLinks(url, fileContent, nesting, callback);
  });
};

module.exports.spiderLinks = (currentUrl, body, nesting, callback) => {
  if (nesting === 0) {
    return process.nextTick(callback);
  }

  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return process.nextTick(callback);
  }

  const iterator = (index) => {
    if (index === links.length) {
      return callback();
    }

    spider(links[index], nesting - 1, (err) => {
      if (err) {
        return callback(err);
      }

      iterator(index + 1);
    });
  };

  iterator(0);
};
