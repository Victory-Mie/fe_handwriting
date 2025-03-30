/**
 * 方法一：简单对象扁平化
 *
 * 简单的对象扁平化只考虑了普通对象类型
 *
 * {a:{b:{c:1},d:2}}  -> {a.b.c: 1, a.d: 2}
 */

const flatten = (obj) => {
  const res = {};
  function flat(item, preKey = "") {
    // Object.entries(item)将一个对象转换为一个包含键值对数组的数组
    Object.entries(item).forEach(([key, val]) => {
      const newKey = preKey ? `${preKey}.${key}` : key;
      if (val && Object.prototype.toString.call(val) === "[object Object]") {
        flat(val, newKey);
      } else res[newKey] = val;
    });
  }
  flat(obj);
  return res;
};
const o = flatten({ a: { b: { c: 1 }, d: 2 } }); // {a.b.c: 1, a.d: 2}
console.log(o);
