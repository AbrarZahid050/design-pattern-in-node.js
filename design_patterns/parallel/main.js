const { task1, task2, task3, task4 } = require("./tasks");
const TaskQueue = require("./taskQueue");

(function Main() {
  const tasks = new TaskQueue(2);

  tasks.on("empty", () => {
    console.warn("-> [warning] please add tasks, queue is currently empty.\n");
  });

  tasks.on("error", (err) => {
    console.error(
      `-> [Error] in process: '${err.process}', with message: ${err.message}`
    );
  });

  tasks.execute();
  tasks.pushTask(task1);
  tasks.pushTask(task2);
  tasks.pushTask(task3);
  tasks.pushTask(task4);
  tasks.execute();
})();
