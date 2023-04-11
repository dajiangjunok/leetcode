const arr = [1, 1, 1, 2, 3, 3, 3, 4, 5, 5, 6]

function removeDuplicates(nums) {
  const length = nums.length
  if (length === 0) return []
  let fast = 1, slow = 1

  while (fast < length) {
    if (nums[fast] === nums[slow - 1]) {
      fast++
    } else {
      nums[slow] = nums[fast]
      slow++
      fast++
    }
  }

  return nums.splice(0, slow)
}

console.log(removeDuplicates(arr));