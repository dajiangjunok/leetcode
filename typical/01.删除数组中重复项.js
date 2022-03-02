// 题目：
// 给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。
// 由于在某些语言中不能改变数组的长度，所以必须将结果放在数组nums的第一部分。更规范地说，如果在删除重复项之后有 k 个元素，那么 nums 的前 k 个元素应该保存最终结果。
// 将最终结果插入 nums 的前 k 个位置后返回 k 。
// 不要使用额外的空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

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