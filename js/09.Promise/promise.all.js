// Promise.all(iterable) 等待所有都完成（或第一个失败）
function myPromiseAll(iterable) {
  return new Promise((resolve, reject) => {
    let res = [];
    let count = 0;
    let len = iterable.length;
    if (!len) {
      resolve(res);
    }
    for (const [i, p] of iterable.entries()) {
      //entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)
      Promise.resolve(p).then(
        (val) => {
          res[i] = val;
          count++;
          if (count === len) {
            resolve(res);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    }
  });
}
/**
 * 测试
 */
function red() {
  return { code: 200, data: "red" };
}
function green() {
  return { code: 200, data: "green" };
}
function yellow() {
  return { code: 200, data: "yellow" };
}
const light = (time, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = cb();
      if (result.code === 200) {
        resolve(result.data);
      } else {
        reject(result.data);
      }
    }, time);
  });
};

const p1 = light(3000, red);
const p2 = light(2000, yellow);
const p3 = light(1000, green);

myPromiseAll([p1, p2, p3]).then(
  (value) => {
    console.log("success ->", value);
  },
  (reason) => {
    console.log("fail -> ", reason);
  }
);
