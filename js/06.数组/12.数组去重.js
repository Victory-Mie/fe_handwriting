const arr = [
  0,
  0,
  1,
  2,
  undefined,
  2,
  "a",
  null,
  {},
  null,
  "a",
  [],
  undefined,
  {},
  [],
  NaN,
  true,
  new Date(),
  NaN,
  /a/,
  new Date(),
  true,
  /a/,
];

/**
 * 方法1
 *
 * new Set
 *
 * 缺点 只去重一些基本类型数据 Number(NaN), String, Boolean, null, undefined
 * 不能去重引用类型数据 Object Array RegExp Date
 */
const arr1 = [...new Set(arr)];
console.log(arr1);

/**
 * 方法2 （推荐）
 *
 * 数组去重就是比较值与类型是否都相等(即===全等)
 * 利用值与类型是否都相等，使用 typeof item 类型 + item值 组成一个字符串
 * 通用的数组去重
 *
 * JSON.stringify来转换对象、数组、正则表达式和日期，以便可以将它们作为键使用。但是，请注意，这种方法对于复杂的对象或包含循环引用的对象可能不适用，并且对于大型数据集可能效率不高。
 *
 */
function uniqueArr(arr) {
  let map = new Set();
  const uniArr = arr.filter((item) => {
    const key = JSON.stringify(item); // JSON.stringify(item) 将每个元素转换为JSON字符串，这样即使是引用类型（如对象、数组、日期等）也能得到唯一的字符串表示。
    if (!map.has(key)) {
      map.add(key);
      return true;
    }
    return false;
  });
  return uniArr;
}
const arr2 = uniqueArr(arr);
console.log("方法2 ->", arr2);
