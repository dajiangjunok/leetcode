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

// 手写call
Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    throw new Error("Type error");
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
