// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 说明：

// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
/**
 * @param {number[]} nums
 * @return {number}
 */
 var singleNumber = function(nums) {
  // 1.排序
  nums = nums.sort((a,b)=>a-b)
  // 2.循环
  for(let i;i<nums.length - 2;i++){
      if(nums[i+1]!==nums[0] && nums[i+1]!==nums[i+2]){
          return nums[i+1]
      }
  }
};