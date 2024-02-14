const { task1, task2, task3, task4 } = require("./tasks");

const finished = () => {
  console.log("---------Tasks done------------");
};

const tasks = [task1, task2, task3, task4];
let completed = 0;
console.log("---------Tasks started---------");

tasks.forEach((task) => {
  task(() => {
    completed++;
    if (completed === tasks.length) {
      return finished();
    }
  });
});
