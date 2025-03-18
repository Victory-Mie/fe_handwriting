// 方法	作用	何时终止遍历	返回值
// some	检测是否至少有一个元素满足条件	遇到第一个 true 就停止遍历	只要有一个 true，返回 true；否则返回 false
// every	检测是否所有元素都满足条件	遇到第一个 false 就停止遍历	所有都 true 才返回 true，否则返回 false

/**
 * 重写 every
 * every(callback(element,index,array),thisArg): Boolean
 *
 * 如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false
 *
 * 注意：若收到一个空数组，此方法在一切情况下都会返回 true。
 *
 * every 不会改变原数组。
 */
Array.prototype.every = function (callback, thisArg) {
    if (this == null) {
      throw new TypeError("this is null or not defined");
    }
    if (typeof callback !== "function") {
      throw new TypeError();
    }
    let obj = Object(this);
    let len = obj.length >>> 0;
    let k = 0;
    thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    while (k < len) {
      if (k in obj) {
        // 有一个失败就返回false
        if (!callback.call(thisArg, obj[k], k, obj)) {
          return false;
        }
      }
      k++;
    }
    return true;
  };
