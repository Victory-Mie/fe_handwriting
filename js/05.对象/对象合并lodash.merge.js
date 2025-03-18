function isObject(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
}
const merge = function (object, sources) {
  // isObject: 判断一个值是否为对象
  // 所有普通对象（如 {} 和 []）都会返回 true。
  // 所有函数（如 function() {}）也会返回 true。
  if (!isObject(object) || !isObject(sources)) {
    return sources === undefined ? object : sources;
  }
  // 合并两个对象的 key，另外要区分数组的初始值为 []
  return Object.keys({ ...object, ...sources }).reduce(
    (acc, key) => {
      // 会一直递归到最后一层非对象数据
      acc[key] = merge(object[key], sources[key]);
      return acc;
    },
    Array.isArray(sources) ? [] : {}
  );
};

const testCases = [
  {
    object: { a: [{ b: 1 }] },
    other: { a: [{ b: 2 }] },
    expected: { a: [{ b: 2 }] }, // 取 other 的值
  },
  {
    object: { a: [{ b: 1 }, { d: 4 }] },
    other: { a: [{ c: 3 }, { e: 5 }] },
    expected: {
      a: [
        { b: 1, c: 3 },
        { d: 4, e: 5 },
      ],
    }, // 合并数组项
  },
  {
    object: { x: 10, y: { z: 20 } },
    other: { x: 30, y: { w: 40 } },
    expected: { x: 30, y: { z: 20, w: 40 } }, // 合并嵌套对象
  },
  {
    object: { arr: [{ a: 1 }, { b: 2 }] },
    other: { arr: [{ c: 3 }] },
    expected: { arr: [{ a: 1, c: 3 }, { b: 2 }] }, // 合并对象时，如果数组中的对象具有相同的索引位置，merge 会将它们的属性合并，而不是替换整个数组。
  },
  {
    object: { a: 1, b: 2 },
    other: { c: 3 },
    expected: { a: 1, b: 2, c: 3 }, // 合并无重叠属性
  },
  {
    object: {},
    other: {},
    expected: {}, // 合并两个空对象
  },
  {
    object: { a: [{ b: 1 }] },
    other: { a: [{ b: 2 }] },
    expected: { a: [{ b: 2 }] }, // 取 other 的值
  },
  {
    object: { a: [{ b: 1 }] },
    other: { a: [{ c: 2 }] },
    expected: { a: [{ b: 1, c: 2 }] }, // 合并不同的键
  },
  {
    object: { a: { x: 1 } },
    other: { a: { y: 2 } },
    expected: { a: { x: 1, y: 2 } }, // 合并嵌套对象
  },
  {
    object: { a: [1, 2, 3] },
    other: { a: [4, 5] },
    expected: { a: [4, 5, 3] }, // 数组替换
  },
  {
    object: { a: { b: { c: 1 } } },
    other: { a: { b: { d: 2 } } },
    expected: { a: { b: { c: 1, d: 2 } } }, // 深层嵌套合并
  },
];

// 运行测试
testCases.forEach(({ object, other, expected }, index) => {
  const result = merge(object, other);
  console.log(result);
  const isPassed = JSON.stringify(result) === JSON.stringify(expected);
  console.log(`Test Case ${index + 1}:`, isPassed ? "Passed" : "Failed");
});
