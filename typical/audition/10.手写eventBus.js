class EventBus {
  constructor() {
    this._event = {}
  }

  $on(eventName, handle) {
    if (!this._event.hasOwnProperty(eventName)) {
      this._event[eventName] = []
      this._event[eventName].push(handle)
    }
  }

  $emit(eventName, argument) {
    if (!this._event.hasOwnProperty(eventName)) {
      console.log('事件未注册');
      return
    }
    if (this._event[eventName].length === 0) {
      console.log('暂无事件');
      return
    }
    this._event[eventName].forEach(fn => {
      fn(argument)
    })
  }

  $off(eventName, handle) {
    if (!this._event.hasOwnProperty(eventName)) {
      console.log('事件未注册');
      return
    }
    if (this._event[eventName].length === 0) {
      console.log('暂无事件');
      return
    }
    const currentFnIndex = this._event[eventName].findIndex(fn => fn === handle)
    this._event[eventName].splice(currentFnIndex, 1)
  }
}

const bus = new EventBus()
const fn = (val) => {
  console.log(val);
}
bus.$on('fn', fn)

let i = 1

let timer = setInterval(() => {
  i++
  bus.$emit('fn', '章三')
  if (i > 3) {
    bus.$off('fn', fn)
    clearInterval(timer)
    timer = null
  }
}, 5000);