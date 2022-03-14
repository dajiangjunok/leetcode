// 题：
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
// 例：
//  输入  [0,1,0,3,12]
//  输出  [1,3,12,0,0]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var moveZeroes = function (nums) {
  let fast = 1,
    slow = 0
  for (let i = 0; i < nums.length; i++) {
    if (fast >= nums.length) {
      break
    }
    if (nums[slow] === 0 && nums[fast] === 0) {
      fast++
    } else if (nums[slow] === 0 && nums[fast] !== 0) {
      // 慢指针等于0，快指针不等于0，则进行交换操作
      nums[slow] = nums[fast]
      nums[fast] = 0
      slow++
      fast++
    } else {
      fast++
      slow++
    }
  }
};

// 想法：
/**
 *  1.设置两根指针，slow慢指针， fast快指针，循环数组，对比两指针索引对应元素是否为0
 *  2.对比有4种可能   两者都为0 ; 两者都不为0 ;慢指针为0且快指针不为0  ; 快指针为0且慢指针不为0;
 *  3.两者都不为0，说明该处元素顺序等无需变化，只需将两指针往后再指一位即可
 *  4.两者都为0，说明slow指针处的0 不能与快指针出的0交换，因此快指针加一往后指一位，继续循环对比
 *  5.当慢指针为0，快指针不为0，说明需要交换，两者进行交换，然后将快慢指针往后移一位
 *  6.当慢指针不为0， 快指针为0，说明不能交换，此时也是将快慢指针加一  往后移动一位
 *  7.一旦当快指针已经指到数组最后一位的时候，说明该交换的0都已经交换到了前面，此时直接跳出循环即可
 */