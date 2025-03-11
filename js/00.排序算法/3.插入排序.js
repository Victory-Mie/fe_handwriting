// 插入排序核心思想
// 1. 从第二个元素开始，依次取出
// 2. 取出后，从后往前依次比较
// 3. 如果取出的元素比当前元素小，就把当前元素向后移动一位
// 4. 重复步骤3，直到取出的元素比当前元素大或者当前元素已经是第一个元素
// 5. 将取出的元素插入到当前元素的后面

function insertSort(arr) {
  // 从第二个元素开始，依次取出
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    let preIndex = i - 1;
    // 取出后，从后往前依次比较,如果取出的元素比当前元素小，就把当前元素向后移动一位
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    // 将取出的元素插入到当前元素的后面
    // 为什么：因为preIndex--，所以preIndex+1就是当前元素的位置
    arr[preIndex + 1] = current;
  }
  return arr;
}
console.log(insertSort([4, 5, 3, 6, 2, 7, 1]));
