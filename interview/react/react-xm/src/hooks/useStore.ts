import { useSyncExternalStore } from 'react'

function useStore(key: any, defaultValue?: any) {
  const subscribe = (callback: () => void) => {
    // 订阅
    window.addEventListener('storage', () => {
      callback()
    })
    return () => {
      // 取消订阅
      window.removeEventListener('storage', callback)
    }
  }

  const getSnapshot = () => {
    // 获取快照 (注意引用对象，如果返回引用对象会导致对比始终不一致，react 一直更新，造成堆栈溢出)
    return (
      (localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key)!)
        : null) || defaultValue
    )
  }

  const res = useSyncExternalStore(subscribe, getSnapshot)

  const setStorage = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new Event('storage'))
  }

  return [res, setStorage]
}

export default useStore
