/**
 * 模拟 Promise.all
 */

function myPromiseAny(iterable) {
  let res = [];
  let count = 0;
  let len = iterable.length;
  return new Promise((resolve, reject) => {
    for (const [i, p] of iterable.entries()) {
      Promise.resolve(p).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          res[i] = reason;
          count++;
          if (count === len) {
            reject(res);
          }
        }
      );
    }
  });
}
const test1 = myPromiseAny([
  Promise.reject("Error 1"),
  Promise.resolve("Success 1"),
  Promise.reject("Error 2"),
]);

test1
  .then((result) => console.log(result)) // should log "Success 1"
  .catch((error) => console.log(error));

const test2 = myPromiseAny([
  Promise.reject("Error 1"),
  Promise.reject("Error 2"),
]);

test2
  .then((result) => console.log(result))
  .catch((error) => console.log(error)); // ['Error 1', 'Error 2']
