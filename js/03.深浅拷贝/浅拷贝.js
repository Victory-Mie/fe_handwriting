const shallowClone = (arr) => {
  const copy = [];
  for (let i in arr) {
    console.log(i);
    // 只拷贝属于该对象arr的枚举值，不拷贝继承的。
    if (arr.hasOwnProperty(i)) {
      copy[i] = arr[i];
    }
  }
  return copy;
};

// test
const arr1 = [1, 2, ["jsliang", "JavaScriptLiang"], 4];
Array.prototype.customProp = "This is a custom property";
const arr2 = shallowClone(arr1);
arr2[2].push("LiangJunrong");
arr2[3] = 5;

console.log(arr1);
// [ 1, 2, [ 'jsliang', 'JavaScriptLiang', 'LiangJunrong' ], 4 ]
console.log(arr2);
// [ 1, 2, [ 'jsliang', 'JavaScriptLiang', 'LiangJunrong' ], 5 ]
