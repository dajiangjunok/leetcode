function sortArray(nums) {
  quickSort(0, nums.length - 1, nums);
  return nums;
}

function quickSort(start, end, arr) {
  if (start < end) {
    const mid = sort(start, end, arr);
    quickSort(start, mid - 1, arr);
    quickSort(mid + 1, end, arr);
  }
}

function sort(start, end, arr) {
  const base = arr[start];
  let left = start;
  let right = end;
  while (left !== right) {
    while (arr[right] >= base && right > left) {
      right--;
    }
    arr[left] = arr[right];
    while (arr[left] <= base && right > left) {
      left++;
    }
    arr[right] = arr[left];
  }
  arr[left] = base;
  return left;
}

const nums = sortArray([19, 97, 9, 17, 1, 8])
console.log(nums);