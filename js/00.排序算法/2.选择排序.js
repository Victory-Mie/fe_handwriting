function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minindex = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minindex]) {
        minindex = j;
      }
    }
    if (minindex != i) {
      [arr[minindex], arr[i]] = [arr[i], arr[minindex]];
    }
  }
  return arr;
}

console.log(selectionSort([4, 5, 3, 6, 2, 7, 1]));
// 解释该算法的原理：
// 选择排序是一种简单的排序算法，
// 它的原理是将数组分为已排序和未排序两部分，
// 每次从未排序部分中选择最小的元素，
// 将其放到已排序部分的末尾。

// 时间复杂度分析：
// 选择排序的时间复杂度为 O(n^2)，
// 其中 n 是数组的长度。
