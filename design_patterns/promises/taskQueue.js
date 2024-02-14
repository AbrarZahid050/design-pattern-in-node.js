const EventEmitter = require("node:events");

class TaskQueue extends EventEmitter {
  #concurrency;
  #queue = [];
  #running = 0;

  constructor(concurrency) {
    super();
    this.#concurrency = concurrency;
  }

  #next() {
    if (!this.#running && !this.#queue.length) {
      this.#finished();
      return this.emit("empty");
    }

    while (this.#running < this.#concurrency && this.#queue.length) {
      const task = this.#queue.shift();
      const lastIteration = this.#queue.length === 0 ? true : false;

      task()
        .then((res) => console.log(res))
        .finally(() => {
          this.#running--;
          this.#next();
        });
      this.#running++;
    }
  }

  execute() {
    console.log("---------Tasks started---------");
    this.#next();
  }

  pushTask(task) {
    this.#queue.push(task);
  }

  #finished() {
    console.log("---------Tasks done------------");
  }
}

module.exports = TaskQueue;
