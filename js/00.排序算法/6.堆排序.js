// 算法步骤：
// 建堆：将无序数组构建成最大堆
// 排序：重复将堆顶元素与末尾元素交换，并调整堆结构，保证最大值在末尾
// 调整：每次交换后堆大小减1，重新堆化剩余元素

function heapSort(arr) {
  // 建堆（最大堆）
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i);
  }
  console.log(arr);
  // 排序（从小到大）
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    console.log("1", arr);
    heapify(arr, i, 0);
    console.log("2", arr);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = i * 2 + 1;
  const right = i * 2 + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

console.log(heapSort([4, 5, 3, 6, 2, 7, 1]));
// 时间复杂度分析：
// 建堆过程：O(n)
// 每次堆调整：O(log n)
// 总时间复杂度：O(n log n)

// Top K问题解决方案（1000条数据找Top10）:
// 最优解：最小堆实现（推荐方案）
// 算法步骤：
// 使用前10个元素构建最小堆
// 遍历剩余元素：
// 当前元素 ≤ 堆顶：跳过
// 当前元素 > 堆顶：替换堆顶并堆化
// 最终堆中元素即为Top10
