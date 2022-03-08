// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 说明：

// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let number = 0
  for (let i = 0; i < nums.length; i++) {
    number ^= nums[i]
  }
  return number
};
// 想法:
/**
 * 1.任何数和 0 做异或运算，结果仍然是原来的数，即 a^0=a。
 * 2.任何数和其自身做异或运算，结果是 0，即  a^a=0。
 * 3.异或运算满足交换律和结合律，即  a^b^a = b^a^a = b^(a^a) = b^0 = b。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  // 1.排序
  nums = nums.sort((a, b) => a - b)
  if (nums[nums.length - 1] !== nums[nums.length - 2]) {
    return nums[nums.length - 1]
  }
  if (nums[0] !== nums[1]) {
    return nums[0]
  }
  console.log(nums)
  // 2.循环
  for (let i = 1; i < nums.length - 1; i++) {
    if ((nums[i] !== nums[i - 1]) && (nums[i] !== nums[i + 1])) {
      return nums[i]
    }
  }
};

// 想法:
/**
 * 1.先从小到大排序
 * 2.题目要求，数组必定最小长度为3。
 * 3.如果第1项或者最后1项 是那个异类，则nums[0] !== nums[1]  或者  nums[nums.length-1] !==  nums[nums.length-2]
 * 4.当【3】情况不成立时候进行循环数组，一旦一个位置的数据跟它前后位置数据不一致，说明它就是异类
 */