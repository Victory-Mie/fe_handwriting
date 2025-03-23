function myPromiseRace(iterable) {
  return new Promise((resolve, reject) => {
    for (const [i, p] of iterable.entries()) {
      Promise.resolve(p).then(
        (value) => {
          resolve(value);
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

myPromiseRace([p1, p2, p3]).then(
  (value) => {
    console.log("success ->", value);
  },
  (reason) => {
    console.log("fail -> ", reason);
  }
);
