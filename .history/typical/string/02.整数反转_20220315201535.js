// 题：
/**
 * 整数反转
 * 给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。
 * 如果反转后整数超过 32 位的有符号整数的范围 [−231,  231 − 1] ，就返回 0
 */

/**
 * @param {number} x
 * @return {number}
 */
 var reverse = function(x) {
  let rev = 0;
  while (x !== 0) {
      const digit = x % 10;
      x = ~~(x / 10);
      rev = rev * 10 + digit;
      if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
          return 0;
      }
  }
  return rev;
};