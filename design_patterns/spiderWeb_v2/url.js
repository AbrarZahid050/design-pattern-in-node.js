const path = require("path");
const { URL } = require("node:url");
const slug = require("slug");
const cheerio = require("cheerio");

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

const getLinkUrl = (currentUrl, element) => {
  const parsedLink = new URL(element.attribs.href || "", currentUrl);
  const currentParsedUrl = new URL(currentUrl);
  if (
    parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname
  ) {
    return null;
  }
  return parsedLink.toString();
};

module.exports.getPageLinks = (currentUrl, body) => {
  return Array.from(cheerio.load(body)("a"))
    .map((element) => {
      return getLinkUrl(currentUrl, element);
    })
    .filter(Boolean);
};
