// 快速排序采用分治法（Divide and Conquer）策略，通过一个“基准”元素将数组分成两个子数组，分别对这两个子数组进行排序。
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [],
    right = [],
    euqual = [];

  for (let num of arr) {
    if (num < pivot) {
      left.push(num);
    } else if (num > pivot) {
      right.push(num);
    } else {
      euqual.push(num);
    }
  }

  return [...quickSort(left), ...euqual, ...quickSort(right)];
}
console.log(quickSort([4, 5, 3, 6, 2, 7, 1]));

// 平均时间复杂度为 O(n log n)
// 每次我们选一个基准，把数组分成两部分。
// 理想情况下，这个基准能把数组大致一分为二。这样的话，递归的深度就大约是 log n，因为每次都在减少一半的元素。
// 而在每一层，我们需要遍历整个数组来进行分区，这个过程的复杂度是 O(n)。
// 综合来看，平均情况就是 O(n log n)。

// 最坏情况下为 O(n²)。
// 种情况通常发生在我们每次选的基准都是数组的最大值或最小值的时候。这样一来，每次分区都只能减少一个元素，像在链表一样，递归的深度就变成了 n。
// 在这种情况下，每层的时间复杂度依然是 O(n)，
// 所以最后的复杂度就是 O(n) × O(n) = O(n²)。

//随机化基准：在每次分区时随机选择基准元素，能够降低最坏情况的发生概率，提升平均性能。
// const randomIndex = Math.floor(Math.random() * arr.length);