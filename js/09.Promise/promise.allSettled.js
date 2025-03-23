function myPromiseAllSettled(iterable) {
  return new Promise((resolve, reject) => {
    let res = [];
    let count = 0;
    let len = iterable.length;
    for (const [i, p] of iterable.entries()) {
      Promise.resolve(p).then(
        (value) => {
          res[i] = value;
          count++;
          if (count === len) {
            resolve(res);
          }
        },
        (reason) => {
          res[i] = reason;
          count++;
          if (count === len) {
            resolve(res);
          }
        }
      );
    }
  });
}
const test1 = myPromiseAllSettled([
  Promise.resolve("Success 1"),
  Promise.resolve("Success 2"),
  Promise.resolve("Success 3"),
]);

test1
  .then((result) => console.log(result))
  // should log: [
  //   { status: 'fulfilled', value: 'Success 1' },
  //   { status: 'fulfilled', value: 'Success 2' },
  //   { status: 'fulfilled', value: 'Success 3' }
  // ]
  .catch((error) => console.log(error));
