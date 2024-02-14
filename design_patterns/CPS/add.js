const add = (a, b, callback) => {
  callback(a + b);
};

const asyncAdd = (a, b, callback) => {
  setImmediate(() => {
    callback(a + b);
  });
};

console.log("before---------->");
add(1, 2, (result) => {
  console.log(result);
});
console.log("after------------>");

console.log("before---------->");
asyncAdd(1, 2, (result) => {
  console.log(result);
});
console.log("after------------>");
