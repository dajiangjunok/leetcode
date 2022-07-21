globalThis.c = 100
var c = 3

const obj = {
  name: 'Tom',
  c: 10
}

// 手写call
Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    throw new Error("Type error");
  }

  context = typeof window === 'object' ? window : globalThis

  // 拿所有参数
  const args = [...arguments]
  // 拿到第一个参数，需要绑定this的参数
  const _this = args.shift(0)
  // 让this指向第一个传入的参数
  _this.fn = this
  const res = _this.fn(...args)
  delete _this.fn

  return res
}


function sum(a, b) {
  return a + b + this.c
}

// console.log(sum.call(obj, 1, 2,));
console.log(sum.myCall(undefined, 1, 2));
