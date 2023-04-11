class EventBus {
  constructor() {
    this._events = {}
  }

  $on(eventName, fn) {
    if (!this._events.hasOwnProperty(eventName)) {
      this._events[eventName] = []
      this._events[eventName].push(fn)
    }
  }

  $emit(eventName, payload) {
    if (!this._events.hasOwnProperty(eventName)) {
      return
    }

    if (this._events[eventName].length === 0) {
      return
    }

    this._events[eventName].forEach(fn => {
      fn(payload)
    })
  }

  $off(eventName, handleFn) {
    if (this._events.hasOwnProperty(eventName) && this._events[eventName].length) {
      const currentFnIndex = this._events[eventName].findIndex(fn => fn === handleFn)
      if (currentFnIndex >= 0) {
        this._events[eventName].splice(currentFnIndex, 1)
      }
    }
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

