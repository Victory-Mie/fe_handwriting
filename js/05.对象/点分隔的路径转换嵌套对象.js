function convertToNestedObject(entry) {
  const res = {};
  for (let key in entry) {
    let path = key.split(".");
    let cur = res;
    path.forEach((k, index) => {
      if (index == path.length - 1) {
        cur[k] = entry[key];
      } else {
        if (!cur[k]) {
          cur[k] = {};
        }
        cur = cur[k];
      }
    });
  }
  return res;
}

// 测试用例
// 输入对象
var entry = {
  "a.b.c.dd": "abcdd",
  "a.d.xx": "adxx",
  "a.e": "ae",
};

// 转换
var output = convertToNestedObject(entry);
console.log(JSON.stringify(output, null, 2));
