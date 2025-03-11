// 归并排序是一种基于分治法的排序算法。它的基本思想是将数组分成两半，分别对这两半进行排序
function mergeSort(arr) {
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  console.log(left, right);
  const result = [];
  while (left.length > 0 && right.length > 0) {
    left[0] < right[0] ? result.push(left.shift()) : result.push(right.shift());
  }
  console.log([...result, ...left, ...right]);
  return [...result, ...left, ...right];
}
console.log(mergeSort([4, 5, 3, 6, 2, 7, 1]));
