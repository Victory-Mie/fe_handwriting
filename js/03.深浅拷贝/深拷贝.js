function deepClone(target, map = new WeakMap()) {
  // 处理null和非引用类型
  if (target === null || typeof target !== "object") return target;

  // 处理数组类型
  let result =
    Array.isArray(target) ||
    Object.prototype.toString.call(target) === "[object Array]"
      ? []
      : {};

  // 建立存储空间，防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, copy);

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      copy[key] = deepClone(target[key], map);
    }
  }
  return copy;
}

// test
const target = {
  field1: 1,
  field2: undefined,
  field3: "ConardLi",
  field4: {
    child: "child",
    child2: {
      child2: "child2",
    },
  },
  field5: [1, 2, 3, 4],
};
target.field6 = target;

let copy = deepClone(target);

target.filed2 = [1, 2, 3];

console.log(copy);

// <ref *1> {
//   field1: 1,
//   field2: undefined,
//   field3: 'ConardLi',
//   field4: { child: 'child', child2: { child2: 'child2' } },
//   field5: [ 1, 2, 3, 4 ],
//   field6: [Circular *1]
// }
const arr = [1, 2, 3];
const clonedArr = deepClone(arr);
console.log(clonedArr); // 预期: [1, 2, 3]，但你的代码会返回一个空数组 []
