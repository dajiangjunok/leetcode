/**
 * 深拷贝 
 * @param {Object} obj 要拷贝的对象
 * @param {WeakMap} map 用于存储循环引用对象的地址
 */

function deepClone(obj = {}, map = new WeakMap()) {
  if (typeof obj !== "object") {
    return obj;
  }
  if (map.get(obj)) {
    return map.get(obj);
  }

  let result = {};
  // 初始化返回结果
  if (
    obj instanceof Array ||
    // 加 || 的原因是为了防止 Array 的 prototype 被重写，Array.isArray 也是如此
    Object.prototype.toString(obj) === "[object Array]"
  ) {
    result = [];
  }
  // 防止循环引用
  map.set(obj, result);
  for (const key in obj) {
    // 保证 key 不是原型属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      result[key] = deepClone(obj[key], map);
    }
  }

  // 返回结果
  return result;
}

// 1.简易  [被拷贝对象自己引用自己，此时拷贝出现栈溢出]
// function deepClone(obj) {
//   if (typeof obj === 'object') {
//     const cloneObj = Array.isArray(obj) ? [] : {}
//     for (let key in obj) {
//       cloneObj[key] = deepClone(obj[key])
//     }
//     return cloneObj
//   } else {
//     return obj
//   }
// }

// 2.WeakMap使用
// function deepClone(obj, map = new WeakMap()) {
//   if (typeof obj === 'object') {
//     const cloneObj = Array.isArray(obj) ? [] : {}

//     if (map.get(obj)) {
//       return map.get(obj)
//     }

//     map.set(obj, cloneObj)

//     for (let key in obj) {
//       cloneObj[key] = deepClone(obj[key], map)
//     }
//     return cloneObj
//   } else {
//     return obj
//   }
// }


const obj = { name: 1, age: 2, gender: '男', boolean: true, obj: { name: '子对象' }, arr1: [1, 2, 3] }
obj.obj = obj
const a = deepClone(obj)

console.log(a);
console.log(a === obj);