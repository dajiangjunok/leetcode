// 题
/**
 * 编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。
 * 不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。
 */

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
 var reverseString = function(s) {
  const length = s.length;
  for (let left = 0, right = length - 1; left < right; ++left, --right) {
      [s[left], s[right]] = [s[right], s[left]]
  }
}

// 想法
/**
 * 字符串进行循环，两个指针一个从前往后   一个从后往前，交换位置【left < right停止循环】
 */