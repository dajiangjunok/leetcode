// 题：
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。
// 例：输入：nums = [3,2,4], target = 6
// 输出：[1,2]

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (target - nums[i] === nums[j]) {
        return [i, j]
      }
    }
  }
};

// 想法：
/**
 * 暴力破解,题意可知，
 * 是两个索引下的数字之和等于目标值，并且只会对应一个答案，因此两次循环即可完成查找。循环nums,拿出一项与target做差，之后循环内部再次循环剩余数，找到与差值相等的索引j即可
 */

 var twoSum = function(nums, target) {
  let map = new Map();
   for (let i = 0; i < nums.length; i++){
      if(map.has(target - nums[i])){
          return [map.get(target - nums[i]), i];
      }else{
          map.set(nums[i], i);
      }
  }
};
// 想法
/**
 *  使用map对象
 *  创建一个map对象，循环nums, 
 *  如果  target-当前循环数  的差值 在map对象中不存在，则将这个值放到map对象中
 *  如果map对象中含有  target-当前循环数  的差值，说明该索引i  和  map中存储的键值 组成的数组就是解
 */
 