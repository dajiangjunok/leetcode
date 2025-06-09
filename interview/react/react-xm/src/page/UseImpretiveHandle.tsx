import React, { useRef, useImperativeHandle, useState } from 'react'

interface IUser {
  name: string
  age: number
  phone: number
  changeUser: (userInfo: any) => void
}

// 子组件直接接收 ref 作为 prop（无需 forwardRef）
interface ChildProps {
  ref?: React.Ref<IUser> // 关键：声明 ref 的类型
}

const Child = ({ ref }: ChildProps) => {
  const [user, setUser] = useState<any>({
    name: 'Tom',
    age: 89,
    phone: 1822132312
  })

  // 将 ref 绑定到 useImperativeHandle
  useImperativeHandle(ref, () => ({
    ...user,
    changeUser: (val: IUser) => {
      setUser(val)
    }
  }))

  return (
    <div>
      <hr />
      child
      <p>{user.name}</p>
      <p>{user.age}</p>
      <p>{user.phone}</p>
    </div>
  )
}

// 父组件
export default function UseImperativeHandle() {
  const user = useRef<IUser>(null)

  const handleGetUserInfo = () => {
    console.log(user.current?.name) // 输出 "Tom"
    console.log(user.current?.age) // 输出 89
  }

  const handleChildUserChange = () => {
    user.current!.changeUser({
      name: 'Jerry',
      age: 189,
      phone: 'asdhklasjdlkas'
    })
  }

  return (
    <div>
      UseImperativeHandle
      <button onClick={handleChildUserChange}>父节点调用子节点方法</button>
      <Child ref={user} />
      <button onClick={handleGetUserInfo}>获取用户信息</button>
    </div>
  )
}
