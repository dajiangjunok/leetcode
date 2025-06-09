import React, { memo } from 'react'
import useStore from '../hooks/useStore'
import useHistory from '../hooks/useHistory'
import useOnLine from '../hooks/useOnLine'

const UseSyncExternalStore = memo(() => {
  const [count, setCount] = useStore('count', 0)
  const [href, push, replace] = useHistory()
  const isOnLine = useOnLine()

  return (
    <div>
      <p>当前storage中count值：{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>

      <p>当前url：{href}</p>
      <button onClick={() => push('/home')}>push</button>
      <button onClick={() => replace('/about')}>replace</button>

      <p>当前网络：{isOnLine ? '🛜网络在线' : '❌网络错误'}</p>
    </div>
  )
})

export default UseSyncExternalStore
