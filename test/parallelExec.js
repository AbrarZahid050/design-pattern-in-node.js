const items = [1, 2, 3, 4, 5, 6];
let results = [];

const asyncFunc = (arg, callback) => {
  console.log(`-> [asyncFunc] do something with ${arg}, return 1 sec later.`);
  setTimeout(() => {
    callback(arg * 2);
  }, 1000);
};

const final = (result) => {
  console.log(`-> [final] agr: ${result}`);
};

items.map((item) => {
  asyncFunc(item, (result) => {
    console.log(`-> [items.map] result: ${result}`);
    results.push(result);
    if (results.length === items.length) {
      final(result);
    }
  });
});
