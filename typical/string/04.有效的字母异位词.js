// 题
// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  const map1 = new Map()
  const map2 = new Map()
  for (let i of s) {
    if (map1.has(i)) {
      map1.set(i, map1.get(i) + 1)
    } else {
      map1.set(i, 1)
    }
  }
  for (let j of t) {
    if (map2.has(j)) {
      map2.set(j, map2.get(j) + 1)
    } else {
      map2.set(j, 1)
    }
  }

  if (Array.from(map2.keys()).length !== Array.from(map1.keys()).length) {
    return false
  }

  for (let [key, value] of map1) {
    if (value !== map2.get(key)) {
      return false
    }
  }
  return true
};

// 想法
/**
 * 分别存入哈希表，并开始计数，判断两张表长度是否一致，    最后若一致则开始对比表1中的元素和表二中元素计数是否一致
 */