class MyPromise {
  static PENDING = '等待'
  static FULFILLED = '成功'
  static REJECTED = '失败'

  constructor(func) {
    this.status = MyPromise.PENDING
    this.result = null
    this.resolveCallBacks = []
    this.rejectCallBacks = []

    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error.message)
    }
  }

  resolve(result) {
    if (this.status === MyPromise.PENDING) {
      setTimeout(() => {
        this.status = MyPromise.FULFILLED
        this.result = result
        this.resolveCallBacks.forEach(fn => {
          fn(result)
        })
      })
    }
  }

  reject(result) {
    if (this.status === MyPromise.PENDING) {
      setTimeout(() => {
        this.status = MyPromise.REJECTED
        this.result = result
        this.rejectCallBacks.forEach(fn => {
          fn(result)
        })
      })
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => { }
      onRejected = typeof onRejected === 'function' ? onRejected : () => { }

      if (this.status === MyPromise.PENDING) {
        this.resolveCallBacks.push(onFulfilled)
        this.rejectCallBacks.push(onRejected)
      }

      if (this.status === MyPromise.FULFILLED) {
        onFulfilled(this.result)
      }

      if (this.status === MyPromise.REJECTED) {
        onRejected(this.result)
      }
    })
  }
}

// 用例
console.log('第一步')
const promise = new MyPromise((resolve, reject) => {
  console.log('第二步')
  setTimeout(() => {
    resolve('这次一定');
    reject('下次一定');
    console.log('第四步');
  });
}).then(
  res => console.log(res),
  err => console.log(err)
).then(
  res => console.log(res),
  err => console.log(err)
)

console.log('第三步');