Array.prototype.myMap = function (callback, thisArg) {
  const res = [];
  if (this == undefined) {
    throw new TypeError("this is null or not defined");
  }
  if (!callback instanceof Function) {
    throw new TypeError(callback + " is not a function");
  }

  const obj = Object(this);
  const len = obj.length >>> 0; // 无符号右移运算符, 保证为正整数
  for (let i = 0; i < len; i++) {
    if (i in obj) {
      res[i] = callback.call(thisArg, obj[i], i, obj);
    }
  }
  return res;
};

console.log("重写map ->", [1, 2, "3"].myMap(Math.sqrt));
