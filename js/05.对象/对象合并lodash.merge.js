function get(obj, arr, defaultValue = "没这玩意儿") {
  let path = Array.isArray(arr)
    ? arr
    : arr.replace(/\[(\d+)\]/g, ".$1").split(".");
  let res = obj;
  for (const key of path) {
    res = res[key];
    if (res === undefined) {
      return defaultValue;
    }
  }
  return res;
}

// 示例对象
const entry = {
  a: {
    b: {
      c: {
        dd: "abcdd",
      },
    },
    d: {
      xx: "adxx",
    },
    e: "ae",
  },
};
const entry1 = { a: [{ b: { c: 3 } }] };
console.log(get(entry, "a[0].b.c", "哈哈哈"));
console.log(get(entry1, "a[0].b.c", "哈哈哈"));
