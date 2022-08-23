globalThis.c = 100
var c = 3

const obj = {
  name: 'Tom',
  c: 10,
  fn: 2
}

function sum(a, b) {
  return a + b + this.c
}

/**
 * 手写call
 * @param {*} context
 * @returns
 * 思路， this永远指向调用它的那个对象。因此myCall中的this是指向调用它的那个
 * 首先判断调用它想要改变this指向的是不是个函数，如果不是，则抛出错误，因为不是则没有意义
 * 其次想要改变原有函数调用者中this的指向，那么我们想办法将要将this指向的对象上加上这个函数，然后再通过 （对象.方法）
 * 来调用这个函数，那么执行的这个方法中的this自然就绑定到了这个对象上了。因此我们只要把原来的this对应的这个函数赋给需要
 * 改变this的这个对象上，然后执行方法，将后续参数传入，拿到结果后返回即可【当然返回结果前把这个放上去的函数再删除即可】
 *
 * apply  和  bind 同理，返回不同而已
 */
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new Error('Type error')
  }

  if (!context) {
    context = typeof window === 'object' ? window : globalThis
  }
  const fnSymbol = Symbol('fn')
  // 拿所有参数
  const args = [...arguments]
  // 拿到第一个参数，需要绑定this的参数
  const _this = args.shift(0)
  // 让this指向第一个传入的参数
  _this[fnSymbol] = this
  const res = _this[fnSymbol](...args)
  delete _this[fnSymbol]

  return res
}

// 手写apply
Function.prototype.myApply = function (context, arg = []) {
  // 1.解决this重新绑定给context  2.执行函数时将arg解构传入
  if (!context) {
    context = typeof window === 'object' ? window : globalThis
  }

  const fnSymbol = Symbol('fn')

  context[fnSymbol] = this
  const result = context[fnSymbol](...arg)
  delete context[fnSymbol]
  return result
}

// 手写bind
Function.prototype.myBind = function () {
  const args = [...arguments]
  let context = args.shift(0)
  if (!context) {
    context = typeof window === 'object' ? window : globalThis
  }

  const fnSymbol = Symbol('fn')

  context[fnSymbol] = this

  // 由于bind返回的是函数，并不是函数的调用
  const val = context[fnSymbol](...args)

  delete context[fnSymbol]

  return function () {
    return val
  }
}

// console.log(sum.call(obj, 1, 2,));
// console.log(sum.myCall(obj, 1, 2));

// console.log(sum.apply(obj, [1, 2]));
// console.log(sum.myApply(obj, [1, 2]));

// console.log(sum.bind(obj, 1, 2)());
// console.log(sum.myBind(obj, 1, 2)());

// console.log(obj);
