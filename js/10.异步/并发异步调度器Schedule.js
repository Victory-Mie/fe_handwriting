// // JS实现一个带并发限制的异步调度器Scheduler，
// // 保证同时运行的任务最多有两个。
// // 完善代码中Scheduler类，
// // 使得以下程序能正确输出
// // https://github.com/Yuanyuanyuanc/aYuan-learning-notes/issues/2

// //
// class Scheduler {
//   constructor() {
//     this.queue = [];
//     this.maxCount = 2;
//     this.running = 0;
//   }
//   add(task) {
//     return new Promise((resolve) => {
//       // 将任务包装成一个函数，函数会执行任务，并在任务完成后解决外部的 Promise
//       this.queue.push(() => task().then(resolve));
//       // 添加任务后立即尝试调度执行
//       this.schedule();
//     });
//   }
//   schedule() {
//     // 当当前运行的任务数小于最大并发数，且队列中存在等待的任务时，才会执行新任务
//     if (this.running < this.maxCount && this.queue.length > 0) {
//       const task = this.queue.shift();
//       this.running++;
//       // 执行任务
//       // 在任务完成后减少运行中的任务数 以及 递归调用 schedule 尝试执行下一个任务
//       task().then(() => {
//         this.running--;
//         this.schedule();
//       });
//     }
//   }
// }

// // 使用 setTimeout 模拟异步操作。time 参数决定了 Promise 何时被解决（resolved）
// const timeout = (time) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });

// const scheduler = new Scheduler();
// // 向调度器添加一个异步任务并设置完成时的输出
// const addTask = (time, order) => {
//   scheduler.add(() => timeout(time)).then(() => console.log(order));
// };

// addTask(1000, "1");
// addTask(500, "2");
// addTask(300, "3");
// addTask(400, "4");
// // output: 2 3 1 4

// // 一开始，1、2两个任务进入队列
// // 500ms时，2完成，输出2，任务3进队
// // 800ms时，3完成，输出3，任务4进队
// // 1000ms时，1完成，输出1
// // 1200ms时，4完成，输出4

class Scheduler {
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.running = 0;
  }
  add(task) {
    return new Promise((resolve) => {
      this.queue.push(() => task().then(resolve));
      this.schedule();
    });
  }
  schedule() {
    if (this.running < this.maxCount && this.queue.length > 0) {
      const task = this.queue.shift();
      this.running++;
      task().then(() => {
        this.running--;
        this.schedule();
      });
    }
  }
}

const timeout = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(300, "2");
addTask(800, "3");
addTask(500, "4");
