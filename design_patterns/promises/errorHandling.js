// asynchronous function which is going to throw an error.
const delayError = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("[error:3000]");
    }, 3000);
  });
};

const errroNotCaught = async () => {
  try {
    // Anti-Pattern in Node.JS:
    // Due to "return" statement, error will not be caught by the
    // try-catch block.
    return delayError();
  } catch (err) {
    console.error(`-> [errorNotCaught] : ${err}\n`);
  }
};

errroNotCaught()
  .catch((err) => {
    // the error would be caught by the caller of the async func
    console.error(`-> [main] : ${err}\n`);
  })
  .finally(() => console.log("------------End-----------------\n"));

console.log("------------Start---------------\n");
