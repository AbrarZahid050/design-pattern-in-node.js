const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().getSeconds());
    }, 3000);
  });
};

const tasks = [delay, delay, delay];
let index = 0;

const func = async () => {
  for (const task of tasks) {
    index++;
    const stop = await task();
    console.log(`-> [task-${index}] - ${stop - start}s`);
  }
  console.log("----------End------------");
};

console.log("----------Start----------");
const start = new Date().getSeconds();
func();
