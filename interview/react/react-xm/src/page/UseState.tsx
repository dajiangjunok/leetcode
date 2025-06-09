import React, { memo, useState } from 'react'

const UseState = memo(() => {
  const [count, setCount] = useState(0)

  function handleDoubleCount() {
    setCount(count => count + 1)
    setCount(count => count + 1)
    setCount(count => count + 1)
    console.log(count)
  }

  return (
    <div>
      <h4>当前数值：{count}</h4>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => handleDoubleCount()}>多操作</button>
    </div>
  )
})

export default UseState
