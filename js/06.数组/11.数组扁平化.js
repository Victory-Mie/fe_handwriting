const arr = [1, , [2, [3, [{ a: [4] }, 5, ["", null, undefined]]]], 6];
// 方法一：Array.flat(depth)
const flat1 = arr.flat(Infinity);
console.log(flat1);

// 方法二：递归，reduce + concat
function flatDeep(arr, d = 1) {
  return d > 1
    ? arr.reduce(
        (acc, cur) =>
          acc.concat(Array.isArray(cur) ? flatDeep(cur, d - 1) : cur),
        []
      )
    : arr.slice();
}
const flat2 = flatDeep(arr, Infinity);
console.log("方法2 ->", flat2);
