const task1 = (cb) => {
  setTimeout(() => {
    task2(cb);
  }, 2000);
};

const task2 = (cb) => {
  setTimeout(() => {
    task3(cb);
  }, 2000);
};

const task3 = (cb) => {
  setTimeout(() => {
    cb();
  }, 2000);
};

task1(() => {
  console.log("1,2 and 3");
});
