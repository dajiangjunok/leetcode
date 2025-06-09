现代前端框架渲染机制都可以总结为公式：

`UI = F (state)`

上面的公式还可以进行一个拆分：

- 根据自变量（state） 的变化计算出 UI 的变化
- 根据 UI 的变化执行具体的宿主环境的 API

对应公式

```js
const state = reconcile(update) // 通过 reconciler 计算出最新的状态
const UI = commit(state) // 根据上一步计算出来的state 渲染出UI
```

对应到 react 里就两个阶段

- Render 阶段：调合虚拟 DOM ，计算出最终要渲染出来的虚拟 DOM
- Commit 阶段：根据上一步计算出来的虚拟 DOM， 渲染具体的 UI

每个阶段对应不同的组件：

- 调度器（Scheduer）: 调度任务，为任务排序优先级，先优先级高的任务先到 Reconciler
- 协调器（Reconciler）: 生成 Fiber 对象，收集副作用，找出哪些节点发生了变化，打上不同的 flags , Diff 算法也是这个组件中执行的
- 渲染器（Rederer）: 根据协调器计算出来的虚拟 DOM 同步的渲染节点到视图上。

```jsx
export default () => {
  const [count, setCount] = useState(0)

  return (
    <ul>
      <button onclick={() => setCount(count + 1)}> 乘 {count} </button>
      <li>{1 * count}</li>
      <li>{2 * count}</li>
      <li>{3 * count}</li>
    </ul>
  )
}
```

当用户点击按钮时，首先是由 Scheduler 进行任务的协调，render 阶段的工作流程是可以随时被以下原因中断：

- 有其他更高优先级的任务需要执行
- 当前的时间切片（ time slice ）没有剩余时间
- 或者发生了其他错误

注意上面的 render 阶段的工作是在内存里进行的，不会更新宿主环境 UI，因此这个阶段工作流程反复被中断，用户也不会看到，用户也不会看到“更新不完整的 UI”

当 Scheduler 调度完成后，将任务交给 reconciler , reconciler 就需要计算出新的 UI，最有由 renderer 同步进行渲染更新操作。

![image-20250608212151686](./img/img-render.png)

#### 调度器

在 React V16 版本以前，是采用 Stack 架构，所有任务只能同步进行，无法被打断，这就导致浏览器可能会出现丢帧的现象，表现出卡顿。react 为了解决这个问题， 从而在架构上进行了变更：

- 引入 `fiber`
- 新增了`scheduler`

`Scheduler` 在浏览器的原生 API 中实际上是有类似的实现的，这个 API 就是`requestIdleCallback`

虽然浏览器有类似的 API, 但是 react 团队并没有使用该 API , 因为该 API 存在兼容性问题，因此 react 团队自己实现了一套这样的机制，这个就是调度器`Scheduler`

#### 协调器

协调器是 render 阶段的第二阶段工作，类组件或者函数组件本身就是这个阶段被调用的

根据 Scheduler 调度结果的不同，协调器起点可能是不同的

- PerformSyncWorkOnRoot (同步更新流程)
- performConcurrentWorkOnRoot (并发更新流程)

```js
// performSyncWorkRoot 会执行该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWorkOnRoot(workInProgress)
  }
}
```

```js
// performConcurrentWorkOnRoot 会执行该方法
function workLoopSync() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWorkOnRoot(workInProgress)
  }
}
```

新的架构使用 Fiber 对象来描述 Dom 结构，最终需要形成一棵 Fiber tree, Fiber tree 通过链表的形式串联在一起，workInProgress 代表当前的 FiberNode

performUnitOfWork 方法会创建下一个 FiberNode , 并且还会将已创建的 Fiber Node 链接起来（child, return ,sibling）,从而形成一个链表结构的 Fiber tree

如果 workInProgress 为 null , 说明已经没有下一个 fiberNode ，也就是说明整棵 Fiber tree 已经构建完毕

上面两个方法唯一的区别就是是否调用了 shouldYieId 方法，该方法表明了是否可以中断

perFormUnitOfWork 在创建下一个 FiberNode 时候，整体工作流程可以分为两大块

- 递阶段

递阶段会从 HostRootFiber 开始向下以深度优先原则进行遍历，遍历到的每一个 FiberNode 执行 beginWork 方法。该方法会根据传入的 Fiber Node 创建下一级 Fiber Node , 此时存在两种情况：

- **下一级只有一个元素，beginWork 方法会创建对应的 FiberNode , 并于 workInProgress 连接**

```jsx
<ul>
  <li></li>
</ul>
```

这里就会创建 li 对应的 FiberNode ，做出如下的连接

```js
LiFiber.return = UIFiber
```

- 下一级有多个元素，这是 beginWork 方法会一次创建所有的子 FiberNode 并且通过 siblings 连接到一起，每个子 FiberNode 也会和 workInProgress 连接

```jsx
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

此时会创建 3 个 li 对应的 FiberNode , 连接情况如下

```js
// 所有的子 Fiber 依次连接
Li0Fiber.sibling = Li1Fiber
Li1Fiber.sibling = Li2Fiber

// 子 Fiber 还需要和父 Fiber 连接
Li0Fiber.return = UIFiber
Li1Fiber.return = UIFiber
Li2Fiber.return = UIFiber
```

由于采用的是深度优先的原则，因此无法再往下走的时候，会进入到归阶段

- 归阶段

归阶段会调用 `completeWork` 方法来处理 FiberNode , 做一些副作用收集。 当每个 FiberNode 执行完了 completeWork 方法后，存在兄弟元素，就会进入到兄弟元素的递阶段，如果不存在兄弟元素，就会进入父 FiberNode 的归阶段

```jsx
function performUnitOfWork(fiberNode) {
  // ... beginWork
  if (fiberNode.child) {
    performUnitOfWork(fiberNode.child)
  }

  // ... completeWork
  if (fiberNode.sibling) {
    performUnitOfWork(fiberNode.sibling)
  }
}
```

#### 渲染器 (Renderer)

属于 commit 阶段，该阶段会将各种副作用 commit 到宿主环境 UI 中. 相比较于之前的`render阶段`可以被打断，commit 阶段一旦开始，就会同步执行，直到完成渲染工作

渲染过程中可以分为 3 个子阶段：

- BeforeMutation 阶段
- Mutation 阶段
- Layout 阶段

Readt 整体的渲染流程可以分为两大阶段，分别是 render 阶段和 commit 阶段。render 阶段里面会经由调度器和协调器处理，此过程是在内存中运行，是异步可中断的。commit 阶段是由渲染器进行处理，根据副作用进行 UI 的更新，此过程是同步不可中断的，否则会造成 UI 和数据显示不一致。

调度器
调度器的主要工作就是调度任务，让所有的任务有优先级的概念，这样的话紧急的任务可以优先执行，Scheduler 实际上在浏览器的 API 中是有原生实现的，这个 API 叫做 requestIdleCallback，但是由于兼容性问题，React 放弃了使用这个 API，而是自己实现了一套这样的机制，并且后期会把 Scheduler 这个包单独的进行发布，变成一个独立的包，这就意味 Scheduler 不仅仅是只能在 React 中使用，后面如果有其他的项目涉及到了任务调度的需求，都可以使用这个 Scheduler。

协调器
协调器是 Render 的第二阶段工作。该阶段会采用深度优先的原则遍历并且创建一个一个的 FiberNode，并将其串联在一起，在遍历时分为了“递与归"两个阶段，其中在递阶段会执行 beginWork 方法，该方法会根据传入的 FiberNode 创建下一级 FiberNode。而“归”阶段则会执行 CompleteWork 方法，做一些副作用的收集

渲染器
渲染器的工作主要就是将各种副作用 (fags 表示) commit 到宿主环境的 UI 中。整个阶段可以分为三个子阶段，分别是 BeforeMutation 阶段、Mutation 阶段和 Layout 阶段。
