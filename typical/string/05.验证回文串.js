// 题
/**
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 * 说明：本题中，我们将空字符串定义为有效的回文串。
 * 输入: "A man, a plan, a canal: Panama"   输出: true   |     输入: "race a car"   输出: false
 */

/**
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) {
  const str = s.toLocaleLowerCase().replace(/[\W_]/ig, '')
  const n = str.length
 
   for(let i=0,j=n-1;j>i;++i,--j){
       if(str[i]!==str[j]){
          
           return false
       }
   }
   return true
};

// 想法
// 转为大小写一致，正则去除干扰元素，双指针前后对比，一旦不一致return  false  反之  return true

/**
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) {
  const str = s.toLocaleLowerCase().replace(/[\W_]/ig, '')
    if(Math.floor(str.length/2) === 0){
        return true
    }
    if(str.substring(0,Math.floor(str.length/2)) === Array.from(str.slice(-Math.floor(str.length/2))).reverse().join('')){
        return true
    }else{
        return false
    }
};

// 想法
// 转为大小写一致，正则去除干扰元素，拆成两半，反转后面字符串然后两个对比，一致则返回true   不一致false