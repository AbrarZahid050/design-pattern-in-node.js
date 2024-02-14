const { task1, task2, task3, task4 } = require("./tasks");

const finished = () => {
  console.log("---------Tasks done------------");
};

const tasks = [task1, task2, task3, task4];
const concurrency = 2;
let completed = 0;
let running = 0;
let index = 0;
console.log("---------Tasks started---------");

const next = () => {
  while (running < concurrency && index < tasks.length) {
    const task = tasks[index];
    task(() => {
      completed++;
      if (completed === tasks.length) {
        return finished();
      }
      running--;
      next();
    });

    running++;
    index++;
  }
};

next();
