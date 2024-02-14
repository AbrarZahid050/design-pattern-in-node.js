class TaskQueuePC {
  constructor(concurrency, startingTime) {
    this.taskQueue = [];
    this.consumerQueue = [];
    this.startingTime = startingTime;
    this.index = 0;

    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  async consumer() {
    while (true) {
      try {
        const task = await this.getNextTask();
        const stopTime = await task();
        console.log(
          `-> [task-${++this.index}] - ${stopTime - this.startingTime}s`
        );
      } catch (err) {
        console.error(err);
      }
    }
  }

  async getNextTask() {
    return new Promise((resolve, reject) => {
      if (this.taskQueue.length !== 0) {
        return resolve(this.taskQueue.shift());
      }

      this.consumerQueue.push(resolve);
    });
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const taskPromise = task();
        taskPromise.then(resolve, reject);
        return taskPromise;
      };

      if (this.consumerQueue.length !== 0) {
        const consumer = this.consumerQueue.shift();
        consumer(taskWrapper);
      } else {
        this.taskQueue.push(taskWrapper);
      }
    });
  }
}

module.exports = TaskQueuePC;
