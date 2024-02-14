const task1 = (callback) => {
  setTimeout(() => {
    console.log("task-1");
    callback();
  }, 2000);
};

const task2 = (callback) => {
  setTimeout(() => {
    console.log("task-2");
    callback();
  }, 2000);
};

const task3 = (callback) => {
  setTimeout(() => {
    console.log("task-3");
    callback({ process: task3.name, message: "Something went wrong!" });
  }, 2000);
};

const task4 = (callback) => {
  setTimeout(() => {
    console.log("task-4");
    callback();
  }, 2000);
};

module.exports = { task1, task2, task3, task4 };
