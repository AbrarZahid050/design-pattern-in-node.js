const TaskQueue = require("./taskQueue");

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().getSeconds());
    }, 3000);
  });
};

const start = new Date().getSeconds();
const func = async () => {
  console.log("start");
  const delay1 = await delay();
  console.log(`-> [delay1] ${delay1 - start}`);
  const delay2 = await delay();
  console.log(`-> [delay1] ${delay2 - start}`);
  return "end";
};

func().then((data) => console.log(`-> [main] ${data}`));

// const tasks = new TaskQueue(2);

// tasks.pushTask(delay);
// tasks.pushTask(delay);
// tasks.pushTask(delay);
// tasks.pushTask(delay);
// tasks.execute();

// const start = new Date().getSeconds();
// const promises = [delay(5000), delay(3000)];

// Promise.all(promises).then((res) => {
//   res.map((stop, index) => {
//     console.log(`-> [task${index + 1}] : ${stop - start}`);
//   });
// });
