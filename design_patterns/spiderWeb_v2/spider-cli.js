const { spider } = require("./spider");

const url = process.argv[2];
const nesting = Number.parseInt(process.argv[3], 10) || 1;

spider(url, nesting, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Download complete");
});
