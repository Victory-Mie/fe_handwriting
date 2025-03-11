// 通过相邻元素的成对比较和交换，使较大元素逐渐"浮"到数组末尾，类似水中气泡上浮过程
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([4, 5, 3, 6, 2, 7, 1]));

// 时间复杂度：
// 最好情况（已有序）：O(n) → 只需1轮遍历
// 最坏情况（逆序）：O(n²) → 需要n(n-1)/2次比较
// 平均情况：O(n²)

// 空间复杂度：O(1) → 原地排序