// 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  if (nums.length < 2) return false
  nums = nums.sort((a, b) => a - b)

  let fast = 1,
    slow = 0
  let flag = false
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[fast] !== nums[slow]) {
      fast++
      slow++
    } else {
      flag = true
      break
    }
  }
  return flag
};

// 想法：
/**
 *  1.当数组长度小于2，说明一定不会重复，直接返回true
 *  2.长度大于二，则先从小到大排序，然后定义两个指针 fast  slow, 定义flag变量反应最终返回的布尔值
 *    开始循环，前后两个指针对比，如果相同，则说明是出现相同元素，直接跳出循环，返回true
 *    如果前后指针不一致，说明不相等，此时将两根指针分别都加1 ， 继续循环对比
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
 var containsDuplicate = function(nums) {
  if(nums.length<2) return false
  return [...new Set(nums)].length !== nums.length
};

// 想法：
/**
 *  1.当数组长度小于2，说明一定不会重复，直接返回true
 *  2.直接对比去重后数组长度和传入数组长度是否相等，相等返回true 不相等返回false
 */

// 哈希表
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
  const set = new Set();
  for (const x of nums) {
      if (set.has(x)) {
          return true;
      }
      set.add(x);
  }
  return false;
};
 