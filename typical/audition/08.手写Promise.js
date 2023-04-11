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
    resolve('这次一定')
    reject('下次一定')
    console.log('第四步')
  })
})
  .then(
    res => {
      console.log(res)
      console.log(111)
    },
    err => console.log(err)
  )
  .then(
    res => {
      console.log(res)
      console.log(222);
    },
    err => console.log(err)
  )

console.log('第三步')

// 实现Promise.all
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    // 参数可以不是数组，但必须具有 Iterator 接口
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('Type error')
    }
    if (promises.length === 0) {
      resolve([])
    } else {
      const res = []
      let count = 0
      const len = promises.length
      for (let i = 0; i < len; i++) {
        //考虑到 promises[i] 可能是 thenable 对象也可能是普通值
        Promise.resolve(promises[i])
          .then(data => {
            res[i] = data
            if (++count === len) {
              resolve(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      }
    }
  })
}
