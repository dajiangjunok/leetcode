/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const length = nums.length
  if (length === 0) return 0
  let fast = 1,
    slow = 1
  while (fast < length) {
    if (nums[fast] != nums[slow - 1]) {
      nums[slow] = nums[fast]
      slow++
      fast++
    } else {
      fast++
    }
  }
  nums.splice(slow)
  return slow
};

console.log(removeDuplicates([1,2,2,3,3,3]));
// 思路
/**
 * 双指针 fast指针  slow指针
 * 初始化两个指针索引为 1
 * fast指针对比slow指针上一针，相等则fast指针加一查看下一针，不相等则让fast针索引所在位置值赋值给slow针索引位置值
 * 当fast针跑完，索引0到slow-1 的值就是去重后数组的数据
 */

// 官方正解
// var removeDuplicates = function(nums) {
//     const n = nums.length;
//     if (n === 0) {
//         return 0;
//     }
//     let fast = 1, slow = 1;
//     while (fast < n) {
//         if (nums[fast] !== nums[fast - 1]) {
//             nums[slow] = nums[fast];
//             ++slow;
//         }
//         ++fast;
//     }
//     return slow;
// };