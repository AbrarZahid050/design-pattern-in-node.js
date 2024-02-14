const path = require("path");
const { URL } = require("node:url");
const slug = require("slug");

module.exports.urlToFilename = (url) => {
  const parsedURL = new URL(url);

  const urlPath = parsedURL.pathname
    .split("/")
    .filter((component) => {
      return component !== "";
    })
    .map((component) => {
      return slug(component, { remove: null });
    })
    .join("/");

  let filename = path.join(parsedURL.hostname, urlPath);
  if (!path.extname(filename).match(/html/)) {
    filename += ".html";
  }

  return filename;
};
