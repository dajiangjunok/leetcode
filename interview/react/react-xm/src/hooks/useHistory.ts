import { useSyncExternalStore } from 'react'

export default function useHistory() {
  const push = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new Event('pushstate'))
  }

  const replace = (path: string) => {
    window.history.replaceState({}, '', path)
    window.dispatchEvent(new Event('replacestate'))
  }

  const subscribe = (callback: () => void) => {
    window.addEventListener('popstate', callback)
    window.addEventListener('pushstate', callback)
    window.addEventListener('replacestate', callback)

    return () => {
      window.removeEventListener('popstate', callback)
      window.removeEventListener('pushstate', callback)
      window.removeEventListener('replacestate', callback)
    }
  }

  const getSnapshot = () => {
    return window.location.href
  }

  const res = useSyncExternalStore(subscribe, getSnapshot)

  return [res, push, replace] as const
}
