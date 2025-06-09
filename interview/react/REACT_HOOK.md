### React hook

#### useState

1.**使用**

`useState` 接收一个参数，即状态的初始值，然后返回一个数组，其中包含两个元素：当前的状态值和一个更新该状态的函数

2.**注意事项**

`useState` 是一个 Hook，因此你只能在 `组件的顶层` 或自己的 `Hook` 中调用它。你不能在循环或条件语句中调用它。

在严格模式中，React 将 `两次调用初始化函数`，以 帮你找到意外的不纯性。这只是开发时的行为，不影响生产

3.**异步机制**

本身 useState 的更新机制是异步的，React 会进行比较，如果值相同，则会屏蔽后续的更新行为。自带`防抖`的功能，防止频繁的更新。如果不想更新操作不被合并，则可以传给更新函数的参数改为回调函数

```react
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    // 回调函数的参数即是useState定义的值
    setIndex(index => index + 1) //1
    setIndex(index => index + 1) //2
    setIndex(index => index + 1) //3
  }
  return (
    <>
      <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>

    </>
  )
}
export default App 
```



#### useReducer

`useReducer`是React提供的一个高级Hook,没有它我们也可以正常开发，但是`useReducer`可以使我们的代码具有更好的可读性，可维护性。

1. **用法**

```react
const [state, dispatch] = useReducer(reducer, initialArg, init?)

// 1.reducer 是一个处理函数，用于更新状态, reducer 里面包含了两个参数，第一个参数是 state，第二个参数是 action。reducer 会返回一个新的 state。
// 2.initialArg 是 state 的初始值。
// 3.init 是一个可选的函数，用于初始化 state，如果编写了init函数，则默认值使用init函数的返回值，否则使用initialArg。
 
```

2.**注意**

```react
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
```

* reducer 是一个用来根据不同的 action 来更新状态的纯函数。

* 它接收当前状态 (state) 和一个动作对象 (action)，根据 action.type 来决定如何更新 state。

* 如果 action.type 是 'increment'，则 count 增加 1；如果是 'decrement'，则 count 减少 1。

* 如果 action.type 不匹配任何已定义的情况，则抛出一个错误。



#### useSyncExternalStore

useSyncExternalStore 是 React 18 引入的一个 Hook，用于从外部存储（例如状态管理库、浏览器 API 等）获取状态并在组件中同步显示。这对于需要跟踪外部状态的应用非常有用

1.**场景**

1. 订阅外部 store 例如(redux,Zustand`德语`)
2. 订阅浏览器API 例如(online,storage,location)等
3. 抽离逻辑，编写自定义hooks
4. 服务端渲染支持



2.**用法**

```js
// 返回getSnapshot快照对应的值
const res = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
// 这个值更新，在页面上使用的地方，UI也会更新
```

- subscribe：用来订阅数据源的变化，接收一个回调函数，在数据源更新时调用该回调函数。
- getSnapshot：获取当前数据源的快照（当前状态）。
- getServerSnapshot?：在服务器端渲染时用来获取数据源的快照

返回值：该 res 的当前快照，可以在你的渲染逻辑中使用

```react
const subscribe = (callback: () => void) => {
    // 订阅(监听器中执行callback)
    callback() 
    return () => { 
        // 取消订阅(监听器中执行callback)
    }
}

const getSnapshot = () => {
    return data
}

const res = useSyncExternalStore(subscribe, getSnapshot) 
```



#### useTranstion

`useTransition` 是 React 18 中引入的一个 Hook，用于管理 UI 中的过渡状态，特别是在处理长时间运行的状态更新时。它允许你将某些更新标记为“过渡”状态，这样 React 可以优先处理更重要的更新，比如用户输入，同时延迟处理过渡更新

1. **用法**(useTransition 不需要任何参数)

```react
const [isPending, startTransition] = useTransition();
```

2.**返回值**

1. `isPending`(boolean)，告诉你是否存在待处理的 transition。
2. `startTransition`(function) 函数，你可以使用此方法将状态更新标记为 transition



#### useDeferredValue

useDeferredValue 用于延迟某些状态的更新，直到主渲染任务完成。这对于高频更新的内容（如输入框、滚动等）非常有用，可以让 UI 更加流畅，避免由于频繁更新而导致的性能问题。

`useTransition` 和 `useDeferredValue` 都涉及延迟更新，但它们关注的重点和用途略有不同：

- useTransition主要关注点是`状态的过渡`。它允许开发者控制某个更新的延迟更新，还提供了过渡标识，让开发者能够添加过渡反馈。
- useDeferredValue主要关注点是`单个值`的延迟更新。它允许你把特定状态的更新标记为低优先级。

 1.**用法**

`const deferredValue = useDeferredValue(value)`

2.**参数**/**返回值**

- value: 延迟更新的值(支持任意类型)
- deferredValue: 延迟更新的值,在初始渲染期间，返回的延迟值将与您提供的值相同

3.**注意事项**

1. 当 `useDeferredValue` 接收到与之前不同的值（使用 Object.is 进行比较）时，除了当前渲染（此时它仍然使用旧值），它还会安排一个后台重新渲染。这个后台重新渲染是可以被中断的，如果 value 有新的更新，React 会从头开始重新启动后台渲染。举个例子，如果用户在输入框中的输入速度比接收延迟值的图表重新渲染的速度快，那么图表只会在用户停止输入后重新渲染 
2. `useDeferredValue` 并不是防抖,防抖是需要一个固定的延迟时间，譬如1秒后再处理某些行为，但是useDeferredValue并不是一个固定的延迟，它会根据用户设备的情况进行延迟，当设备情况好，那么延迟几乎是无感知的



#### useEffect

`useEffect` 是 React 中用于处理`副作用`的钩子。并且`useEffect` 还在这里充当生命周期函数，在之前你可能会在类组件中使用 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 来处理这些生命周期事件。

 1.**什么是纯函数**

1. 输入决定输出：相同的输入永远会得到相同的输出。这意味着函数的行为是可预测的。
2. 无副作用：纯函数`不会修改外部状态`，也不会依赖外部可变状态。因此，纯函数内部的操作不会影响外部的变量、文件、数据库等。

2.**什么是副作用函数**

1. 副作用函数 指的是那些在执行时会改变外部状态或依赖外部可变状态的函数。
2. 可预测性降低但是副作用不一定是坏事有时候副作用带来的效果才是我们所期待的
3. 高耦合度函数非常依赖外部的变量状态紧密

- 操作引用类型
- 操作本地存储例如`localStorage`
- 调用外部API，例如`fetch` `ajax`
- 操作`DOM`
- 计时器

#####  用法

* setup：Effect处理函数,可以返回一个清理函数。组件挂载时执行setup,依赖项更新时先执行cleanup再执行setup,组件卸载时执行cleanup。

* dependencies(可选)：setup中使用到的响应式值列表(props、state等)。必须以数组形式编写如[dep1, dep2]。不传则每次重渲染都执行Effect。
* **返回值**为 `undefined`

##### 执行时机

1.组建挂载时执行

2.组建更新时执行（无需依赖） 【整体类似于`componentDidMount` + `componentDidUpdate`的结合】

3.有依赖项更新 ，当依赖项发生变化时候则执行副作用函数

4.依赖项为空值

* 根据我们下面的例子可以观察到，当依赖项为空数组时，`useEffect`的副作用函数只会执行一次，也就是组件挂载时执行。类似 `componentDidMount` 生命周期

5.`useEffect`的副作用函数可以返回一个清理函数，当组件卸载时，`useEffect`的副作用函数就会执行清理函数。确切说清理函数就是副作用函数运行之前，会清楚上一次的副作用函数。

* 场景：清除副作用函数中的定时器



#### useLayoutEffect

`useLayoutEffect` 是 React 中的一个 Hook，用于在浏览器重新绘制屏幕之前触发。与 useEffect 类似。

##### 区别（useLayoutEffect/useEffect）

| 区别     | useLayoutEffect                      | useEffect                            |
| -------- | ------------------------------------ | ------------------------------------ |
| 执行时机 | 浏览器完成布局和绘制`之前`执行副作用 | 浏览器完成布局和绘制`之后`执行副作用 |
| 执行方式 | 同步执行                             | 异步执行                             |
| DOM渲染  | 阻塞DOM渲染                          | 不阻塞DOM渲染                        |

#####  应用场景

* 需要同步读取或更改DOM：例如，你需要读取元素的大小或位置并在渲染前进行调整。

* 防止闪烁：在某些情况下，异步的useEffect可能会导致可见的布局跳动或闪烁。例如，动画的启动或某些可见的快速DOM更改。

* 模拟生命周期方法：如果你正在将旧的类组件迁移到功能组件，并需要模拟 componentDidMount、componentDidUpdate和componentWillUnmount的同步行为。

##### 具体案例

 可以记录滚动条位置，等用户返回这个页面时，滚动到之前记录的位置。增强用户体验。 



#### useRef

当你在React中需要处理DOM元素或需要在组件渲染之间保持持久性数据时，便可以使用useRef。

1.**参数** ：initialValue：ref 对象的 current 属性的初始值。可以是任意类型的值。这个参数在首次渲染后被忽略

2.**返回值**：对象的current属性指向传入的初始值。 `{current:xxxx}`

* 改变 ref.current 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象。

* 除了 初始化 外不要在渲染期间写入或者读取 ref.current，否则会使组件行为变得不可预测。

 3.**数据存储**

例如计数器案例，正常情况下`useState`的 `SetCount`执行之后，组件会重新rerender, 如果函数内用普通变量num记录上次count的值, 则num又被初始化为了0，所以num的值一直为0。 此时定义num的值我们可以使用useRef 来定义，因为组件render 不会让useRef的值重新初始化



##### 注意事项：

* 组件在重新渲染的时候，useRef的值不会被重新初始化。

* 改变 ref.current 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象。

* **useRef的值不能作为useEffect等其他hooks的依赖项**，因为它并不是一个响应式状态。

* useRef不能直接获取子组件的实例，需要使用forwardRef。



#### useImperativeHandle

可以在子组件内部暴露给父组件`句柄`，那么说人话就是，父组件可以调用子组件的方法，或者访问子组件的属性。 如果你学过Vue，就类似于Vue的`defineExpose`。

1.**用法**

```react
useImperativeHandle(ref, ()=>{
    return {
        // 暴露给父组件的方法或属性
    }
}, [deps])
```

2.**参数**

- ref: 父组件传递的ref对象
- createHandle: 返回值，返回一个对象，对象的属性就是子组件暴露给父组件的方法或属性
- deps?:[可选] 依赖项，当依赖项发生变化时，会重新调用createHandle函数，类似于`useEffect`的依赖项

**18版本需要配合`forwardRef`一起使用**

forwardRef包装之后，会有两个参数，第一个参数是props，第二个参数是ref

我们使用的时候只需要将ref传递给`useImperativeHandle`即可，然后`useImperativeHandle` 就可以暴露子组件的方法或属性给父组件， 然后父组件就可以通过ref调用子组件的方法或访问子组件的属性

 **19版本**

1. 19版本不需要配合`forwardRef`一起使用，直接使用即可，他会把Ref跟props放到一起，你会发现变得更加简单了
2. 19版本useRef的参数改为必须传入一个参数例如`useRef<ChildRef>(null)`



#### useContext

useContext 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。设计的目的就是解决组件树间数据传递的问题。

1.**使用**

```react
const MyThemeContext = React.createContext({theme: 'light'}); // 1.创建一个上下文

function App() {
   const [theme, setTheme] = useState('light');
   return (
      <div>
         <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换主题</button>
       		{* 2.使用Provide 去将需要透传的值绑定在value属性上， 此处Provide在react19 版本以后可以忽略  *}
         <MyThemeContext.Provider value={{ theme, setTheme }}>
            <MyComponent />
         </MyThemeContext.Provider>
      </div >
   );
}

 

function MyComponent() {
    const themeContext = useContext(MyThemeContext); // 3.通过useContext使用上下文
    return (<div>{themeContext.theme}</div>);
}

 
```



#### useMemo

1.`useMemo` 是 React 提供的一个性能优化 Hook。它的主要功能是避免在每次渲染时执行复杂的计算和对象重建。通过记忆上一次的计算结果，仅当依赖项变化时才会重新计算，提高了性能，有点类似于Vue的`computed`。

2.`React.memo` 是一个 React API，用于优化性能。它通过记忆上一次的渲染结果，仅当 props 发生变化时才会重新渲染, 避免重新渲染。



react**组件渲染的条件**

1. 组件的 props 发生变化
2. 组件的 state 发生变化
3. useContext 发生变化

##### React.memo 总结

1. **使用场景**：
   - 当子组件接收的 props 不经常变化时
   - 当组件重新渲染的开销较大时
   - 当需要避免不必要的渲染时
2. **优点**：
   - 通过记忆化避免不必要的重新渲染
   - 提高应用性能
   - 减少资源消耗
3. **注意事项**：
   - 不要过度使用，只在确实需要优化的组件上使用
   - 对于简单的组件，使用 `memo` 的开销可能比重新渲染还大
   - 如果 props 经常变化， `memo` 的效果会大打折扣



##### useMemo 执行时机(依赖项)

1. 如果依赖项是个空数组，那么 `useMemo` 的回调函数会执行一次
2. 指定依赖项，当依赖项发生变化时， `useMemo` 的回调函数会执行
3. 不指定依赖项，不推荐这么用，因为每次渲染和更新都会执行

##### useMemo 总结

1. **使用场景**：
   - 当需要缓存复杂计算结果时
   - 当需要避免不必要的重新计算时
   - 当计算逻辑复杂且耗时时
2. **优点**：
   - 通过记忆化避免不必要的重新计算
   - 提高应用性能
   - 减少资源消耗
3. **注意事项**：
   - 不要过度使用，只在确实需要优化的组件上使用
   - 如果依赖项经常变化，useMemo 的效果会大打折扣
   - 如果计算逻辑简单，使用 useMemo 的开销可能比重新计算还大

 

#### useCallback

1.useCallback 用于优化性能，返回一个记忆化的回调函数，可以减少不必要的重新渲染，也就是说它是用于缓存组件内的函数，避免函数的重复创建。

2.useCallback的使用需要有所节制，不要盲目地对每个方法应用useCallback，这样做可能会导致不必要的性能损失。useCallback本身也需要一定的性能开销。

3.useCallback并不是为了阻止函数的重新创建，而是通过依赖项来决定是否返回新的函数或旧的函数，从而在依赖项不变的情况下确保函数的地址不变。

4.和useMemo比较，useCallback 缓存的是函数，前者缓存的是值。一个注重值的缓存，避免不必要的复杂逻辑操作影响性能，一个注重由于组件render导致的函数被反复重新创建的问题。

 

