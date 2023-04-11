/**
 * 快照沙箱，主要用于不支持proxy的浏览器(低版本浏览器)
 * 激活沙箱时候：将window信息存储到windowSnapshot中，如果modifyPropMap中有值，还需要
 * 还原上次的状态；激活期间，可能修改了window的数据，退出沙箱时将修改过的信息存储到modifyPropMap中
 * 并且把window还原
 * 
 *  new SnapshotSandbox() => 将window的快照信息存储到windowSnapshot中，并且从modifyPropMap中还原上次修改的值   =>   退出前：对windowSnapshot 和 当前window做diff比较，对于变更的信息存到modifyPropMap中，同时将windowSnapshot还原给window(还原进入时候的window)
 */
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

