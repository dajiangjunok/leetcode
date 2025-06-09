import { memo, useReducer } from 'react'

const UseReducer = memo(() => {
  interface UserData {
    name: string
    age: number
    gender: string
  }

  const initalUserData = {
    name: 'wyj',
    age: 18,
    gender: '男'
  }

  const [userData, dispatch] = useReducer(updateUser, initalUserData, initUser)

  function initUser(initalUserData: UserData): UserData {
    // 初始化函数只走一次，用来修饰初始值
    return { ...initalUserData, name: 'ymh' }
  }

  function updateUser<UserData>(
    userData: UserData,
    action: {
      type: 'updateName' | 'updateAge' | 'updateGender'
      name?: string
      age?: number
      gender?: string
    }
  ) {
    switch (action.type) {
      case 'updateName':
        return { ...userData, name: action.name }
      case 'updateAge':
        return { ...userData, age: action.age }
      case 'updateGender':
        return { ...userData, gender: action.gender }
      default:
        return userData
    }
  }

  return (
    <div>
      <p>name:{userData.name}</p>
      <p>age:{userData.age}</p>
      <p>gender:{userData.gender}</p>

      <button onClick={() => dispatch({ type: 'updateName', name: 'hmx' })}>
        修改名字
      </button>
      <button onClick={() => dispatch({ type: 'updateAge', age: 20 })}>
        修改年龄
      </button>
      <button onClick={() => dispatch({ type: 'updateGender', gender: '女' })}>
        修改性别
      </button>
    </div>
  )
})

export default UseReducer
