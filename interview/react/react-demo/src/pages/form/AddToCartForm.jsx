import React, { memo, useActionState } from 'react'
import { addToCart } from './actions'

const AddToCartForm = ({
  bookName,
  itemTitle,
  setBookName,
  carList,
  setCarList
}) => {
  const [message, formAction, isPending] = useActionState(
    (prevState, queryDat) =>
      addToCart(prevState, queryDat, carList, setCarList),
    null
  )

  function handleBookChange(e) {
    setBookName(e.target.value)
  }

  return (
    <form action={formAction}>
      <h2>{itemTitle}</h2>
      <input
        type="text"
        name="bookName"
        value={bookName}
        onChange={e => handleBookChange(e)}
      />
      <button type="submit">加入购物车</button>
      {isPending ? '加载中……' : message}
    </form>
  )
}

export default AddToCartForm
