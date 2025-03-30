function deepClone(target, map = new WeakMap()) {
  // 处理null和非引用类型。如果不是的话直接返回这个值（已经拷贝到最深处了）。
  if (target === null || typeof target !== "object") return target;

  // 创建拷贝变量，处理数组类型和普通对象类型。
  let result =
    Array.isArray(target) ||
    Object.prototype.toString.call(target) === "[object Array]"
      ? []
      : {};

  // 建立存储空间，防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, result);

  for (const key in target) {
    // for in 用于遍历对象的可枚举属性，包括继承的属性。返回的是属性名（键）。
    // 确保key是target的属性，而不是target原型链上的属性
    if (target.hasOwnProperty(key)) {
      result[key] = deepClone(target[key], map); //递归拷贝，一直拷贝到最深处
    }
  }
  return result;
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
