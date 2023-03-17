// 创建一个代理对象，当获取的属性并不在设置的空对象fakeWindow上则直接去window属性上找
// 而设置的时候则判断该微应用是否激活，如果激活则直接改fakeWindow，没有激活，直接不管该设置操作

class ProxySandBox {
  proxyWindow
  isRunning = false

  active() {
    this.isRunning = true
  }

  inactive() {
    this.isRunning = false
  }

  constructor() {
    const fakeWindow = Object.create(null)
    this.proxyWindow = new Proxy(fakeWindow, {
      set: (target, prop, value, receiver) => {
        if (this.isRunning) {
          target[prop] = value

        }
      },
      get: (target, prop, receiver) => {
        return prop in target ? target[prop] : window[prop]
      }
    })
  }
}


window.city = 'Beijing'
let proxySandBox1 = new ProxySandBox()
let proxySandBox2 = new ProxySandBox()

proxySandBox1.active()
proxySandBox2.active()

proxySandBox1.proxyWindow.city = 'Shanghai'
proxySandBox2.proxyWindow.city = 'Chengdu'

console.log('proxySandBox1----', proxySandBox1.proxyWindow.city);
console.log('proxySandBox2----', proxySandBox2.proxyWindow.city);
console.log('window.city----', window.city);
console.log('⬇️⬇️⬇️⬇️⬇️');
proxySandBox1.inactive()
proxySandBox2.inactive()

console.log('proxySandBox1----', proxySandBox1.proxyWindow.city);
console.log('proxySandBox2----', proxySandBox2.proxyWindow.city);
console.log('window.city-----', window.city);