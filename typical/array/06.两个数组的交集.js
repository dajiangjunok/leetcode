// 题:
// 给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，
// 应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。
// 例 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]    输出：[4,9]
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const number = []
  let medium = nums1

  if (nums1.length > nums2.length) {
    nums1 = nums2
    nums2 = medium
  }
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      if (nums1[i] === nums2[j]) {
        // 相同的舔进数组，把nums2中此时一致的数字移除
        number.push(nums1[i])
        nums2.splice(j, 1)
        break
      }
    }
  }

  return number
};

// 想法:
/**
 * 1.创建一个新的空数组number接收符合条件的元素
 * 2.从nums1数组拿出一个元素，然后循环nums2,一个一个与拿出的元素对比，如果出现一致，则将这个元素放入数组number中，
 * 然后将nums2中对比一致的这个元素从这个数组中删除,并跳出nums2循环。避免出现[1,1,1,2]与[1,1,3,4,5] 会向number数组中添加三个1的情况
 * 3.为了尽可能的少循环代码，外层循环次数应该小于等于内层循环，因此先对比nums1和nums2长度，然后给出相反的操作
 */