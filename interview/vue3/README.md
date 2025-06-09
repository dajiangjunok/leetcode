#### vue3设计目标

* 更小；更快；更友好；优化方案

vue2存在的问题

* 随着功能增长，复杂组件的代码变得越来越难以维护
* 缺少一种比较（干净）的在多个组件之间提取和复用逻辑的机制
* 类型推断不够友好
* bundle的时间太久了 

Vue3做到了更小，更快，TS支持，API设计一致性，提高自身可维护性，开放更多底层功能

1.更小（引入tree-shaking，可将无用模块剪辑，仅打包需要的，使打包的体积变小）

2.更快（diff算法优化，静态提升，事件监听缓存，ssr优化）

3.更友好（composition API 增加了代码的逻辑组织和代码复用能力）

源码管理

整体通过`monorepo`  的方式维护的，根据功能将不同的模块拆分到packages 目录下面不同的子目录中，这样使得模块拆分更细化，指责划分更明确，模块之间的依赖关系也更加明确，开发人员也更容易阅读和更改所有模块源码，提高代码的可维护性，另外一些 `package`（比如 `reactivity` 响应式库）是可以独立于 `Vue` 使用的，这样用户如果只想使用 `Vue3 `的响应式能力，可以单独依赖这个响应式库而不用去依赖整个 `Vue`，`Vue3`是基于`typeScript`编写的，提供了更好的类型检查，能支持复杂的类型推导

数据劫持方案的改变，`Object.defineProperty`, 这个API有一些缺陷，并不能检测对象属性添加和删除



#### Vue3 性能提升主要体现在哪些方面

* 编译阶段

Vue2 每个组件实例都对应一个 `watcher` 实例，它会在组件渲染的过程中把用到的数据`property`记录为依赖，当依赖发生改变，触发`setter`，则会通知`watcher`，从而使关联的组件重新渲染

```vue
<template>
    <div id="content">
        <p class="text">静态文本</p>
        <p class="text">静态文本</p>
        <p class="text">{{ message }}</p>
        <p class="text">静态文本</p>
        ...
        <p class="text">静态文本</p>
    </div>
</template>
```

可以看到，组件内部只有一个动态节点，剩余一堆都是静态节点，所以这里很多 `diff` 和遍历其实都是不需要的，造成性能浪费,因此，`Vue3`在编译阶段，做了进一步优化（diff算法优化，静态提升，事件监听缓存，SSR优化）

**diff算法优化**

Vue3 在diff算法中增加了静态标记，关于静态标记，起作用是为了会发生变化的地方添加一个`flag`标记，下次发生变化的时候直接找该地方进行比较

**静态提升**

`Vue3`中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用，这样就免去了重复的创建节点，大型应用会受益于这个改动，免去了重复的创建操作，优化了运行时候的内存占用

**事件监听缓存**

默认情况下绑定事件行为会被视为动态绑定，所以每次都会去追踪它的变化

**SSR优化**

当静态内容大到一定量级时候，会用`createStaticVNode`方法在客户端去生成一个static node，这些静态`node`，会被直接`innerHtml`，就不需要创建对象，然后根据对象渲染



* 代码体积

相比`Vue2`，`Vue3`整体体积变小了，除了移出一些不常用的API，最重要的是`Tree shanking`

任何一个函数，如`ref`、`reavtived`、`computed`等，仅仅在用到的时候才打包，没用到的模块都被摇掉，打包的整体体积变小



* 响应式系统

`vue2`中采用 `defineProperty`来劫持整个对象，然后进行深度遍历所有属性，给每个属性添加`getter`和`setter`，实现响应式

`vue3`采用`proxy`重写了响应式系统，因为`proxy`可以对整个对象进行监听，所以不需要深度遍历

- 可以监听动态属性的添加
- 可以监听到数组的索引和数组`length`属性
- 可以监听删除属性



#### vue3中的treeshaking特性

```
Tree shaking` 是一种通过清除多余代码方式来优化项目打包体积的技术，专业术语叫 `Dead code elimination
```

在`Vue2`中，无论我们使用什么功能，它们最终都会出现在生产代码中。主要原因是`Vue`实例在项目中是单例的，捆绑程序无法检测到该对象的哪些属性在代码中被使用到，而`Vue3`源码引入`tree shaking`特性，将全局 API 进行分块。如果您不使用其某些功能，它们将不会包含在您的基础包中



通过`Tree shaking`，`Vue3`给我们带来的好处是：

- 减少程序体积（更小）
- 减少程序执行时间（更快）
- 便于将来对程序架构进行优化（更友好）



#### Vue3 实现一个model组件

1.组件设计。2.需求分析。3.实现流程



#### 关于vue3 文档相关读书笔记

##### 为什么使用ref?

为什么使用带有 `.value` 的 ref，而不是普通的变量？

* 当你模板使用了一个ref，然后改变这个ref的值，vue会检测到这个变化，并且相应的更新dom 
* 该 `.value` 属性给予了 Vue 一个机会来检测 ref 何时被访问或修改。在其内部，Vue 在它的 getter 中执行追踪，在它的 setter 中执行触发。 
* 另一个 ref 的好处是，与普通变量不同，你可以将 ref 传递给函数，同时保留对最新值和响应式连接的访问。当将复杂的逻辑重构为可重用的代码时，这将非常有用

Ref 默认是深层响应式，可以是任意类型的值。 当然你可以通过 `shallow ref `  来放弃深层响应式。对于浅层 ref，只有 `.value` 的访问会被追踪。浅层 ref 可以用于避免对大型数据的响应性开销来优化性能、或者有外部库管理其内部状态的情况。



##### reactive 

相比较ref , reactive 是另一种声明响应式状态的方式，即使用reactive() api。与将内部值包装在特殊对象中的 ref 不同，`reactive()` 将使对象本身具有响应性

* 响应式对象是 [JavaScript 代理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，其行为就和普通对象一样。不同的是，Vue 能够拦截对响应式对象所有属性的访问和修改，以便进行依赖追踪和触发更新
* 默认情况下reactive() 也会深层的转换对象，与ref一样，当想浅层响应式，也可使用`shallowReactive()` API可以选择退出深层响应式

* `reactive()` 返回的是一个原始对象的 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，它和原始对象是不相等的：

###### reactive的局限性

* 有限的值类型：它只能用于对象类型，不能将基本数据类型转化为响应式
* 不能替换整个对象
* 对解构操作不友好

**因此官方文档建议使用 ref() 作为声明响应式状态的主要APi**



##### computed

* getter 不应该有副作用，不要改变其他状态，在getter中做异步请求或者更改DOM

* 避免修改计算属性值



##### 生命周期钩子

当调用 `onMounted` 时，Vue 会自动将回调函数注册到当前正被初始化的组件实例上。这意味着这些钩子应当在组件初始化时被**同步**注册。因此不要在延迟执行函数，例如定时器中进行定义

```js
// 生命周期过程
渲染器到组件 -> setup 组合式API -> beforeCreate -> 初始化选项API -> created 
-> 是否存在编译模板 -> beforeMount -> 初始化渲染 -> mounted -> 挂载 -> (【更新】beforeUpdate -> 打补丁 -> updated) -> beforeUnmount -> 取消挂载 -> unmounted
```



##### watch

在组合式 API 中，我们可以使用 [`watch` 函数](https://cn.vuejs.org/api/reactivity-core.html#watch)在每次响应式状态发生变化时触发回调函数：

```js
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

// 注意！！不能直接侦听响应式对象的属性值
```

跟vue2一直，watch函数还有第三个可选参数，对象配置属性，可以在里面配置deep，immediate ，once`(3.4新特性)`等。 Deep深度监听要谨慎使用 `深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能`



##### WatchEffect

相当于watch的一个特殊情况的简易写法

* 1.不需要指定监听源
* 2.回调会立即执行

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。
- 无论是watch 还是 watchEffect ，触发的实际都是在父组件更新之后，所属组件DOM更新之前，也就是说watch中访问dom则会获得更新前的DOM状态

* 基于上一条，当我们想在侦听器的回调函数中拿到vue更新后的组件dom，则可以指定属性`flush: 'post' `。 或者直接使用 `watchPostEffect`

* 尽可能的在setup函数中创建同步侦听器，vue内做了绑定以及组件卸载后的解绑，避免造成内存泄露，一旦使用了异步创建，如定时器中创建的话，则vue 不会自动处理，你需要自己手动进行解绑操作，防止内存泄漏

```js
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```



##### Ref

`ref` 是一个特殊的 attribute，和 `v-for` 章节中提到的 `key` 类似。它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。这可能很有用，比如说在组件挂载时将焦点设置到一个 input 元素上，或在一个元素上初始化一个第三方库

注意，你只可以**在组件挂载后**才能访问模板引用。如果你想在模板中的表达式上访问 `input`，在初次渲染时会是 `null`。这是因为在初次渲染前这个元素还不存在呢！

```js
export default {
  setup() {
    const input = ref(null)
    // ...
    watchEffect(() => {
      if (input.value) {
        input.value.focus()
      } else {
        // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
      }
    })
    
    return {
      input
    }
  }
}

```

当在 `v-for` 中使用模板引用时，对应的 ref 中包含的值是一个数组，它将在元素被挂载后包含对应整个列表的所有元素：

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```



##### 作用域插槽

插槽有些类似于高阶组件，你传入了一个组件，经过处理对这个组件进行了增强，返回了新组件

* 作用域插槽则是在插槽预留的`<slot></slot>` 上添加props , 之后在使用的时候，就可以通过外层组件拿到定义的props
* 场景最多的就是list, table这类



##### 异步组件

在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。Vue 提供了 `defineAsyncComponent` 方法来实现此功能

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`
```

如你所见，`defineAsyncComponent` 方法接收一个返回 Promise 的加载函数。这个 Promise 的 `resolve` 回调方法应该在从服务器获得组件定义时调用。你也可以调用 `reject(reason)` 表明加载失败。

`ES 模块动态导入`也会返回一个 Promise，所以多数情况下我们会将它和 `defineAsyncComponent` 搭配使用。类似 Vite 和 Webpack 这样的构建工具也支持此语法 (并且会将它们作为打包时的代码分割点)，因此我们也可以用它来导入 Vue 单文件组件：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

与普通组件一样，异步组件可以使用 `app.component()` 全局注册

```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```

异步操作不可避免地会涉及到加载和错误状态，因此 `defineAsyncComponent()` 也支持在高级选项中处理这些状态：

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})

```

搭配实验性功能`Suspense`

如果使用 `<script setup>`，那么顶层 `await` 表达式会自动让该组件成为一个异步依赖：

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

`<Suspense>` 组件会触发三个事件：`pending`、`resolve` 和 `fallback`。`pending` 事件是在进入挂起状态时触发。`resolve` 事件是在 `default` 插槽完成获取新内容时触发。`fallback` 事件则是在 `fallback` 插槽的内容显示时触发。

例如，可以使用这些事件在加载新组件时在之前的 DOM 最上层显示一个加载指示器。

```vue
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <!-- 主要内容 -->
          <component :is="Component"></component>

          <!-- 加载中状态 -->
          <template #fallback>
            正在加载...
          </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>
```

