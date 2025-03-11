// 算法步骤：
// 使用前10个元素构建最小堆
// 遍历剩余元素
// -当前元素 ≤ 堆顶：跳过
// -当前元素 > 堆顶：替换堆顶并堆化
// -最终堆中元素即为Top10

function findTopK(arr, k) {
  // 建堆
  const heap = arr.slice(0, k);
  buildMinHeap(heap);

  // 遍历剩余元素
  for (let i = k; i < arr.length; i++) {
    if (arr[i] > heap[0]) {
      heap[0] = arr[i];
      heapify(heap, k, 0);
    }
  }
  return heap;
}

function buildMinHeap(arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i);
  }
}

function heapify(arr, n, i) {
  let smallest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] < arr[smallest]) smallest = left;
  if (right < n && arr[right] < arr[smallest]) smallest = right;

  if (smallest !== i) {
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    heapify(arr, n, smallest);
  }
}
// 复杂度分析：
// 时间复杂度：O(n log k)
// 空间复杂度：O(k)

// 优势体现:
// 内存占用固定（只需维护k大小的堆）
// 适合处理数据流（无需存储全部数据）
// 当k << n时效率优势明显（如k=10, n=1000）

// 测试不同方案的耗时
function testPerformance() {
  const data = Array.from({ length: 1e6 }, () => Math.random() * 1e6);

  console.time("QuickSelect");
  findTopK(data.slice(), 10);
  console.timeEnd("QuickSelect");

  console.time("MinHeap");
  findTopK(data.slice(), 10);
  console.timeEnd("MinHeap");

  console.time("FullSort");
  data
    .slice()
    .sort((a, b) => b - a)
    .slice(0, 10);
  console.timeEnd("FullSort");
}
testPerformance();

// QuickSelect: 16.10498046875 ms
// QuickSelect: 16.342ms

// MinHeap: 7.382080078125 ms
// MinHeap: 7.602ms

// FullSort: 1101.800048828125 ms
// FullSort: 1.102s
