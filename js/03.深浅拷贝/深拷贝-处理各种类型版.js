function deepClone(target, map = new WeakMap()) {
  // 处理 null、原始类型、Date、RegExp
  if (target === null) return target;
  if (typeof target !== "object") return target;
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);

  // 处理循环引用
  if (map.get(target)) {
    return map.get(target);
  }

  // 处理 Map
  if (target instanceof Map) {
    let copy = new Map();
    map.set(target, copy);
    target.forEach((value, key) => {
      copy.set(key, deepClone(value, map));
    });
    return copy;
  }

  // 处理 Set
  if (target instanceof Set) {
    let copy = new Set();
    map.set(target, copy);
    target.forEach((value) => {
      copy.add(deepClone(value, map));
    });
    return copy;
  }

  // 处理 Object 和 Array（包括 Object.create(null)）
  let copy = Array.isArray(target)
    ? []
    : Object.create(Object.getPrototypeOf(target));
  map.set(target, copy);

  // 复制普通属性
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      copy[key] = deepClone(target[key], map);
    }
  }

  // 复制 Symbol 作为键的属性
  Object.getOwnPropertySymbols(target).forEach((symKey) => {
    copy[symKey] = deepClone(target[symKey], map);
  });

  return copy;
}

// 测试用例
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
  field6: new Map([
    ["key1", "value1"],
    ["key2", { nested: "object" }],
  ]),
  field7: new Set([1, 2, 3, { a: 1 }]),
};
target.field8 = target; // 循环引用
target[Symbol("sym")] = "symbolValue"; // Symbol 作为键
const copy = deepClone(target);

console.log(copy);
