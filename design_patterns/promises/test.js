// const TaskQueuePC = require("./taskQueuePC");

// const task = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(new Date().getSeconds());
//     }, 3000);
//   });
// };

// console.log("------------Start------------");
// const startTime = new Date().getSeconds();
// // setting three consumers.
// const tasks = new TaskQueuePC(3, startTime);

// // Six tasks will be produced, tasks which would
// // run in parallel would have the same ending times.
// tasks.runTask(task);
// tasks.runTask(task);
// tasks.runTask(task);
// tasks.runTask(task);
// tasks.runTask(task);
// tasks.runTask(task);

const task = () => {
  // 12:
  return new Promise((resolve) => {
    // 13:
    setTimeout(() => {
      console.log("--> event loop");
      resolve("task-done");
    }, 1000);
    return;
  });
};

const queue = [];

const consumer = async () => {
  while (true) {
    // 1:
    const task = await getNextTask();
    // 10: the promise was resolved in the runTask-function
    // plz see the line-number 75 for reference.

    //for the line below, task() -> taskWrapper();
    const data = await task();
    console.log(data);
  }
};

const getNextTask = () => {
  // 2:
  return new Promise((resolve) => {
    queue.push(resolve);
    // 3: after this the consumer would go into sleep
    // back to the Main-function.
  });
};

const runTask = (task) => {
  // 5:
  const taskWrapper = async () => {
    // 11: this is where the actual task is going to get invoked.
    const taskPromise = await task();
    // 14: result would be returned to the "data" named variable
    // plz see the line-number 47.
    return taskPromise;
  };

  // 6:
  const consumer = queue.shift();
  // 7: since in getNextTask-function we pushed the "resolve" function of
  // the promise the line below is is the same as "resolve(taskWrapper)".
  // plz keep in mind that this resolve is for the promise which we have
  // declared in getNextTask-function.
  consumer(taskWrapper);
  // 8: back to our Main-function.
};

const Main = () => {
  console.log("------------Start------------");
  consumer();
  // 4:
  runTask(task);
  // 9: since no more code here, control would go back to our consumer-function
};

Main();
