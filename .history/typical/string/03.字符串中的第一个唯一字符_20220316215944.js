// 题：
// 给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。
// 输入： s = "leetcode" 输出: 0          输入: s = "loveleetcode"   输出: 2
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  const map = new Map()
  for (let i in s) {
    if (map.get(s[i]) == undefined) {
      map.set(s[i], i)
    } else {
      map.set(s[i], 'x')
    }
  }
  let number = undefined

  map.forEach(function (value, key) {
    if (value != 'x' && number == undefined) {
      number = value
    }
  });

  return number == undefined ? -1 : number
};

// 想法：
// 创建hash表   存储每个字符，重复的map对象属性中标记为x , 便利hash表找到第一个值不为x的值

var firstUniqChar = function (s) {
  const map = new Map()
  for (let i in s) {
    if (!map.has(s[i])) {
      map.set(s[i], i)
    } else {
      map.set(s[i], -1)
    }
  }
  let number = -1

  map.forEach(function (value, key) {
    if (value != -1) {
      number = value
    }
  });

  return number 
};