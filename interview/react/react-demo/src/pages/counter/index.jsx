import React, { memo, useState, useReducer } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '@/store/counter/conterSlice'
import { incrementByAmount } from '../../store/counter/conterSlice'

const reducerCounter = (state, action) => {
  switch (action) {
    case 'increment':
      return state + 1

    case 'decrement':
      return state - 1
    default:
      return state
  }
}

const Counter = memo(() => {
  // const [counter, setCounter] = useState(0)
  const counter = useSelector(state => state.counter.value)
  const [reducerCount, dispatchReducerCount] = useReducer(reducerCounter, 0)

  const [inputVal, setInputVal] = useState(0)
  const dispatch = useDispatch()

  function handleDecrement() {
    // setCounter(counter - 1)
    return dispatch(decrement())
  }

  function handleIncrement() {
    // setCounter(counter + 1)
    return dispatch(increment())
  }

  function handleSubmit() {
    dispatch(incrementByAmount(inputVal))
  }

  return (
    <div>
      <h4>counter</h4>
      <p>{counter}</p>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrement}>+</button>
      <div>
        <h6>useReducer</h6>
        <p>ReducerCount:{reducerCount}</p>
        <button onClick={() => dispatchReducerCount('decrement')}>-</button>
        <button onClick={() => dispatchReducerCount('increment')}>+</button>
      </div>

      <div>
        <input
          type="number"
          value={inputVal}
          onInput={e => {
            return setInputVal(Number(e.target.value.trim()))
          }}
        />
        <button onClick={handleSubmit}>提交</button>
      </div>
    </div>
  )
})

export default Counter
