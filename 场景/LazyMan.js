// 使用了任务队列，让执行顺序变成可控的
// 所有的链式调用，先收集任务，按照函数效果插队，到对应位置
// 使用 next 作为媒介，当自己执行完成，让后续继续执行

const LazyMan = (name) => {
  const queue = []; // 任务队列

  const helloTask = () => {
    console.log(`你好，我是${name}`);

    next();
  };

  queue.push(helloTask); // 入任务队列，默认是第一个打印，出了特殊情况

  // 提醒需要执行后续函数，所以每个方法里执行了自己后，都需要向后传递，让后面执行
  const next = () => {
    const firstFn = queue.shift();

    firstFn?.();
  };

  const lazyMan = {
    sleep(s) {
      const task = () => {
        setTimeout(() => {
          console.log(`我醒了，我刚睡了 ${s} 秒`);

          next();
        }, s * 1000);
      };

      queue.push(task);

      return lazyMan;
    },

    eat(type) {
      const task = () => {
        const eatInfoMap = {
          lunch: "吃午餐",

          supper: "吃晚餐",
        };
        console.log(eatInfoMap[type]);

        next();
      };

      queue.push(task);

      return lazyMan;
    },

    sleepFirst(s) {
      const task = () => {
        setTimeout(() => {
          console.log(`我醒了，我刚刚睡了 ${s} 秒`);

          next();
        }, s * 1000);
      };
      // 这个任务比较特殊，需要在最前方等待，所以直接推送到队列第一个
      queue.unshift(task);

      return lazyMan;
    },
  };

  // setTimeout 会将 next() 推迟到 JavaScript 任务队列的下一次事件循环执行。
  // 这样可以确保 所有链式调用的任务（如 sleepFirst、eat）都已经加入 queue 后，再开始执行任务。
  // 如果直接 next(); , next() 会在 LazyMan 返回前立即执行。后续链式调用还没入队，但是·helloTask中的next() 继续执行，此时queue已为空，任务中断。
  setTimeout(() => next());

  return lazyMan;
};

// LazyMan("Hank").sleepFirst(5).eat("supper");

// 自己实现的
const myLazyMan = (name) => {
  const queue = [];

  const next = () => {
    let firstFn = queue.shift();
    return firstFn?.();
  };

  const hello = () => {
    console.log(`老子是${name}`);
    next();
  };

  queue.push(hello);

  const myLazyMan = {
    sleep(t) {
      let task = () => {
        setTimeout(() => {
          console.log(`老子刚睡了${t}秒`);
          next();
        }, t * 1000);
      };
      queue.push(task);
      return myLazyMan;
    },
    eat(m) {
      const trans = {
        lunch: "午餐",
        supper: "晚餐",
      };
      let task = () => {
        console.log(`老子要吃${trans[m]}`);
        next();
      };
      queue.push(task);
      return myLazyMan;
    },
    sleepFirst(t) {
      let task = () => {
        setTimeout(() => {
          console.log(`老子刚睡了${t}秒`);
          next();
        }, t * 1000);
      };
      queue.unshift(task);
      return myLazyMan;
    },
  };
  setTimeout(() => next());
  return myLazyMan;
};
myLazyMan("Hank").sleepFirst(5).eat("supper");
