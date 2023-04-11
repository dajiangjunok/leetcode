// 单例代理盒子

class LegacySandBox {
  currentUpdateValueMap = new Map()
  modifedPropsOriginalValueMapSandBox = new Map()
  addedPropsMapInSandBox = new Map()
  proxyWindow = {}

  constructor() {
    const fakeWindow = Object.create(null)
    this.proxyWindow = new Proxy(fakeWindow, {
      set: (target, prop, value, receiver) => {
        const originalVal = window[prop]
        if (!window.hasOwnProperty(prop)) {
          this.addedPropsMapInSandBox.set(prop, value)
        } else if (!this.modifedPropsOriginalValueMapSandBox.has(prop)) {
          this.modifedPropsOriginalValueMapSandBox.set(prop, originalVal)
        }

        this.currentUpdateValueMap.set(prop, value)
        window[prop] = value
      },

      get: (target, prop, receiver) => {
        return window[prop]
      }
    })
  }

  setWindowProp(prop, value, isToDelete) {
    if (value === undefined && isToDelete) {
      delete window[prop]
    } else {
      window[prop] = value
    }
  }

  active() {
    // 恢复上一次微应用处于运行状态时候，对window上做的左右修改
    this.currentUpdateValueMap.forEach((value, prop) => {
      this.setWindowProp(prop, value)
    })
  }

  inactive() {
    // 还原window上原有的属性
    this.modifedPropsOriginalValueMapSandBox.forEach((value, prop) => {
      this.setWindowProp(prop, value)
    })
    // 删除在微应用运行期间window新增的属性
    this.addedPropsMapInSandBox.forEach((_, prop) => {
      this.setWindowProp(prop, undefined, true)
    })
  }
}


window.city = 'Beijing'
const legacySandBox = new LegacySandBox()
console.log(window.city + '--------01')
legacySandBox.active()
legacySandBox.proxyWindow.city = 'Shanghai'
console.log(window.city + '--------02')
legacySandBox.inactive()
console.log(window.city + '--------03')

