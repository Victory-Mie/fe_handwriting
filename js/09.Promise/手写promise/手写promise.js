// class MyPromise {
//   constructor(executor) {
//     try {
//       executor(this.resolve, this.reject)
//     } catch (e) {
//       this.reject(e)
//     }

//     status = "pending";
//     value = undefined;;
//     reason = undefined;
//     onFulfilledCallbacks = [];
//     onRejectedCallbacks = [];

//     resolve = (value) => {
//       if (status === "pending") {
//         status = "fulfilled";
//         value = value;
//         onFulfilledCallbacks.forEach(fn => fn());
//       }
//     }

//     reject = (reason) => {
//       if (status === "pending") {
//         status = "rejected";
//         reason = reason;
//         onRejectedCallbacks.forEach(fn => fn());
//       }
//     }
//     then(onFulfilled, onRejected){
//       onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
//       onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
//       let promise2 = new MyPromise((resolve, reject) => {
//         const fulfilledMicrotask = () => {
//           queueMicrotask(() => {
//             try {
//               const x = onFulfilled(value);
//               resolvePromise(promise2, x, resolve, reject);
//             } catch (e) {
//               reject(e);
//             }
//           });
//         }
//         const rejectedMicrotask = () => {
//           queueMicrotask(() => {
//             try {
//               const x = onRejected(reason);
//               resolvePromise(promise2, x, resolve, reject);
//             } catch (e) {
//               reject(e);
//             }
//           });
//         }
//         if (this.status === 'fulfilled') {
//           fulfilledMicrotask();
//         } else if (this.status === 'rejected') {
//           rejectedMicrotask();
//         } else if (this.status === 'pending') {
//           this.onFulfilledCallbacks.push(fulfilledMicrotask);
//           this.onRejectedCallbacks.push(rejectedMicrotask);
//         }
//       });
//       return promise2;
//     }
//   }
//   // resolvePromise 函数
//   // 处理 then 方法的返回值 x
//   // 1. 如果 x 是一个 Promise，采用它的状态
//   // 2. 如果 x 是一个对象或者函数, 让 x 执行 x.then 方法，并且传递两个回调函数作为参数，第一个参数叫做 resolvePromise，第二个参数叫做 rejectPromise
//   // 3. 如果 x 不是对象也不是函数，以 x 为参数执行 promise

// }

// function resolvePromise(promise2, x, resolve, reject) {
//   if (promise2 === x) { // 循环引用报错
//     return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
//   }
//   if (typeof x === 'object' || typeof x === 'function') {
//     // x 为 null 直接返回，否则会报错
//     if (x === null) {
//       return resolve(x);
//     }
//     let then;
//     try {
//       // 把 x.then 赋值给 then
//       then = x.then;
//     }catch (e) {
//       // 如果取 x.then 的值时抛出错误 e，则以 e 为据因拒绝 promise
//       return reject(e);
//     }

//     if (typeof then === 'function') {
//       let called = false; // 设置called标识,避免多次调用
//       try {
//         then.call(x, y => {// 递归解析的过程需要传递 promise2，直到解析出非 promise 值
//           if (called) return;
//           called = true;
//           resolvePromise(promise2, y, resolve, reject);
//         }, r => {
//           if (called) return;
//           called = true;
//           reject(r);
//         })
//       } catch (e) {
//         if (called) return;
//         reject(e);
//       }
//     }else{
//       resolve(x);//如果 then 不是函数，以 x 为参数执行 promise
//     }
//   }else{
//     resolve(x);//如果 x 不为对象或者函数，以 x 为参数执行 promise
//   }
// }

// // 测试promise A+规范
// MyPromise.deferred = function () {
//   var result = {};
//   result.promise = new MyPromise(function (resolve, reject) {
//     result.resolve = resolve;
//     result.reject = reject;
//   });

//   return result;
// };
// module.exports = MyPromise;

const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  constructor(exector) {
    try {
      exector(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  status = PENDING;
  value = null;
  reason = undefined;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  resolve = (value) => {
    if (this.status == PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };
  reject = (reason) => {
    if ((this.status = PENDING)) {
      this.status = REJECTED;
      this.reason = reason;
      console.log(this.onRejectedCallbacks);
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  then(onFulfilled, onRejected) {
    // onFulfilled,onRejected 必须是函数
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new Promise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value); // 执行onFulfilled，并且把返回值传递给下一个then
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.status === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });
    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    if (value instanceof Promise) return value;
    else {
      return new Promise((resolve, reject) => {
        resolve(value);
      });
    }
  }

  static reject(reason) {
    if (reason instanceof Promise) return reason;
    else {
      return new Promise((resolve, reject) => {
        reject(reason);
      });
    }
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 防止循环引用
  if (promise === x) {
    return reject(
      new TypeError("The promise and the return value are the same")
    );
  }
  if (typeof x == "object" || typeof x == "function") {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      then = x.then;
    } catch (e) {
      return reject(e);
    }

    if (typeof then == "function") {
      let called = false;
      try {
        then.call(
          x,
          (res) => {
            if (called) return;
            called = true;
            resolvePromise(promise, res, resolve, reject);
          },
          (rej) => {
            if (called) return;
            called = true;
            reject(rej);
          }
        );
      } catch (e) {
        if (called) return;
        // called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}
// 测试promise A+规范
Promise.deferred = function () {
  var result = {};
  result.promise = new Promise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};
module.exports = Promise;
