Array.prototype.some = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.some called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError();
  }
  let obj = Object(this);
  let len = obj.length >>> 0;
  thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  for (let i = 0; i < len; i++) {
    // 有一个成功就返回true
    if (i in obj && callback.call(thisArg, obj[i], i, obj)) {
      return true;
    }
  }
  return false;
};
