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
    console.log(value, key);
    if (value != 'x' && number == undefined) {
      number = value
    }
  });

  return number == undefined ? -1 : number
};