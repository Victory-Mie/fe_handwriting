Array.prototype.myReduce = function (callback, initialValue) {
  if (this == undefined) {
    throw new TypeError("this is null or not defined");
  }
  if (!callback instanceof Function) {
    throw new TypeError(callback + "is not a function");
  }
  let obj = Object(this);
  let len = obj.length >>> 0;

  let k = 0;
  let accumulator = initialValue;
  if (arguments.length >= 2) {
    accumulator = arguments[1];
  } else {
    while (k < len && !(k in obj)) {
      k++;
    }
    if (k >= len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = obj[k++];
  }
  while (k < len) {
    accumulator = callback(accumulator, obj[k], k, obj);
    k++;
  }
  return accumulator;
};
/**
 * 数组求和
 *
 * 累加器初始值 0
 */
const arr1 = [0, 1, 2, 3];
let res1 = arr1.myReduce((acc, val, index, arr1) => {
  return acc + val;
}, 0);
console.log("重写reduce,数组求和 ->", res1);

/**
 * 累加对象数组里的值
 *
 * 将对象数组的x属性的值累加
 * 累加器初始值 0
 */
const arr2 = [{ x: 1 }, { x: 2 }, { x: 3 }];
let res2 = arr2.myReduce((acc, val) => {
  return acc + val.x;
}, 0);
console.log("重写reduce,累加对象数组里的值 ->", res2);
