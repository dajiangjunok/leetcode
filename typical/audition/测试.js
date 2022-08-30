const arr = [11, 2, 4, 51, 13, 42, 22, 6]
// 【】2 4 51 13 42 22 6              11
// 冒泡排序
// function mySort(arr) {
//   let length = arr.length - 1
//   for (let j = 0; j < length; j++) {
//     for (let i = 0; i < length; i++) {
//       if (arr[i] > arr[i + 1]) {
//         const temporary = arr[i]
//         arr[i] = arr[i + 1]
//         arr[i + 1] = temporary
//       }
//     }
//     length--
//   }

//   return arr
// }
// console.log(mySort(arr))

//快排
function sort(start, end, arr) {
  const flag = arr[start]
  let left = start,
    right = end

  while (left !== right) {
    // 右边大于标志且右索引大于左索引
    while (arr[right] >= flag && right > left) {
      right--
    }
    arr[left] = arr[right]
    // 左边小于标志且右索引大于左索引
    while (arr[left] <= flag && right > left) {
      left++
    }
    arr[right] = arr[left]
  }
  arr[left] = flag

  return left
}

function quickSort(start, end, arr) {
  if (start < end) {
    const mid = sort(start, end, arr)
    quickSort(start, mid - 1, arr)
    quickSort(mid + 1, end, arr)
  }
}

function sortArray(nums) {
  quickSort(0, nums.length - 1, nums)
  return nums
}

console.log(sortArray(arr))
