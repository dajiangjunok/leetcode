import { useSyncExternalStore } from 'react'

export default function useOnLine() {
  const subScribe = (callback: () => void) => {
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)

    return () => {
      window.removeEventListener('online', callback)
      window.removeEventListener('offline', callback)
    }
  }

  const getSnapshot = (): Boolean => {
    return window.navigator.onLine
  }

  const isOnLine = useSyncExternalStore(subScribe, getSnapshot)

  return isOnLine
}
