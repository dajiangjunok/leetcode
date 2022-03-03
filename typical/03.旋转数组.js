// 题：
// 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var rotate = function(nums, k) {
  if(k > nums.length-1){
      k = k % nums.length
  }
  const copyNums = [...nums]
  for(let i=0;i<nums.length;i++){
      if(i+k >= nums.length){
          nums[i+k-nums.length] = copyNums[i]
      }else{
          nums[i+k] = copyNums[i]
      }
  }
  return nums
};
// 想法：
/**
 *  K是轮转次数，当轮转次数大于数组长度的时候，则数组长度次数的轮转是无效的，如[1,2], k为2时候等于回到了原点，并没有轮转
 *  因此将轮转有效值先计算出来  即  k = k % 数组长度
 *  之后开辟新空间保存原数组
 *  循环数组：
 *      如果 当循环索引位置加轮转次数长度大于 数组长度，说明该位置元素会颠倒排列到数组前面，而排列位置应该就是  当前索引加上轮转次数 减去 数组长度
 *      否则 将当前位置元素往后移 轮转次数k个位置
 *  
 */