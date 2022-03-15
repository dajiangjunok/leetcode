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


// 转字符串方式
/**
 * @param {number} x
 * @return {number}
 */
 var reverse = function(x) {
  if(x === 0 ){
      return 0
  }

  const sign = x > 0 ? '' : '-'

  x = Math.abs(x).toString().split('')
  console.log(x)
  for(let i=0, j=x.length-1; i<j; ++i,--j){
     let prov = x[i]
     x[i] = x[j]
     x[j] = prov
  }
      x =  Number(sign + x.join(''))
  if(x < Math.pow(-2, 31) || x > Math.pow(2, 31) - 1){
      return 0
  }
  return x
};