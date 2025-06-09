import React, { memo, useActionState, useState } from 'react'
import AddToCartForm from './AddToCartForm'

const Form = memo(() => {
  const [bookName, setBookName] = useState('')
  const [carList, setCarList] = useState([])

  return (
    <>
      <AddToCartForm
        setBookName={setBookName}
        setCarList={setCarList}
        carList={carList}
        bookName={bookName}
        itemTitle="知名书籍"
      />
      <ul>
        {carList.map((item, index) => (
          <li key={index}>{item.bookName}</li>
        ))}
      </ul>
    </>
  )
})

export default Form
