const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().getSeconds());
    }, 3000);
  });
};

const tasks = [delay, delay, delay];

const func = async () => {
  tasks.map(async (task, index) => {
    const stop = await task();
    console.log(`-> [task-${index + 1}] - ${stop - start}s`);
    if (index === tasks.length - 1) {
      console.log("----------End------------");
    }
  });

  // --->Must have part:
  // const promises = tasks.map(async (task) => {
  //   return await task();
  // });

  // --->first iteration:
  // for (const promise of promises) {
  //   const stop = await promise;
  //   console.log(`-> [task-${++index}] - ${stop - start}s`)
  // }

  // --->second iteration:
  // const res = await Promise.all(promises);
  // res.map((stop, index) =>
  //   console.log(`-> [task-${index + 1}] - ${stop - start}s`)
  // );
  // console.log("----------End------------");
};

console.log("----------Start----------");
const start = new Date().getSeconds();
func();
