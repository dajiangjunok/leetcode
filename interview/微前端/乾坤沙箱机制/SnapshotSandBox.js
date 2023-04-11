class SnapshotSandbox {
  windowSnapshot = {}
  modifyPropMap = {}

  // 微应用处于运行的状态 
  active() {
    // 1.保存window对象上所有属性的状态
    for (const prop in window) {
      this.windowSnapshot[prop] = window[prop]
    }
    //  2.恢复上一次在运行该微应用的时候所修改过的window上的属性
    Object.keys(this.modifyPropMap).forEach(prop => {
      window[prop] = this.modifyPropMap[prop]
    })
  }
  // 微应用即将退出状态 
  inactive() {
    for (const prop in window) {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 1.记录修改了window上的哪些属性 
        this.modifyPropMap[prop] = window[prop]
        // 2.将window上的属性状态还原至微应用运行之前的状态
        window[prop] = this.windowSnapshot[prop]
      }
    }

  }
}

window.city = 'Beijing'
const snapshotSandbox = new SnapshotSandbox()
console.log(window.city + '--------01')
snapshotSandbox.active()
window.city = 'Shanghai'
console.log(window.city + '--------02')
snapshotSandbox.inactive()
console.log(window.city + '--------03')
snapshotSandbox.active()
console.log(window.city + '--------04')

