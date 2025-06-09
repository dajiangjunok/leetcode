import React, { memo, useState, useTransition, useDeferredValue } from 'react'
import { List, Input } from 'antd'
import mockjs from 'mockjs'

const UseTransition = memo(() => {
  const [likeQuery, setLikeQuery] = useState('')
  const [list] = useState(() => {
    return mockjs.mock({
      'list|10000': [
        {
          'id|+1': 1,
          name: '@natural',
          address: '@county(true)'
        }
      ]
    }).list
  })
  // const [isSearchPending, startTransition] = useTransition()
  const deferredValue = useDeferredValue(likeQuery)
  const isSearchLoading = deferredValue != likeQuery

  const findItem = () => {
    return list.filter((item: any) =>
      item.name.toString().includes(deferredValue)
    )

    // return list.filter((item: any) => {
    //   return item.age == deferredValue
    // })
  }

  return (
    <>
      <div>UseTransition</div>
      <Input value={likeQuery} onChange={e => setLikeQuery(e.target.value)} />
      {/* {isSearchPending ? <div>loading...</div> : null} */}
      <List
        style={{
          opacity: isSearchLoading ? 0.5 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
        dataSource={findItem()}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta title={item.address} description={item.name} />
          </List.Item>
        )}
      ></List>
    </>
  )
})

export default UseTransition
