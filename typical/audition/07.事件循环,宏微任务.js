// 一.事件循环
console.log("Hi");

setTimeout(function cb() {
  console.log("cb"); // cb 即 callback
}, 5000);

console.log("Bye");

/**
 * 以上执行顺序：从上至下
 * 1.执行 console.log("Hi"); 控制台输出Hi
 * 2.遇到定时器，将定时器种回调执行函数压入宏任务队列【暂时不执行】，继续执行后面代码
 * 3.执行 console.log("Bye"); 控制台输出Bye
 * 4.后面没有执行的代码了，进入微任务队列，发现微任务队列没有需要执行的任务，进入宏任务队列，发现有任务需执行
 * 5.定时器五秒后执行宏任务队列中的cb函数
 * 6.执行 console.log("cb"); 控制台输出cb
 *
 * // 控制台：  Hi    Bye    cb
 */


// 二.宏微任务
// 宏任务：setTimeout，setInterval，Ajax，DOM 事件。 微任务：Promise async/await。
// - 宏任务：DOM 渲染后触发，如 `setTimeout` 、`setInterval` 、`DOM 事件` 、`script` 。
// - 微任务：DOM 渲染前触发，如 `Promise.then` 、`MutationObserver` 、Node 环境下的 `process.nextTick` 。
// - 微任务是 ES6 语法规定的（被压入 micro task queue）。
// - 宏任务是由浏览器规定的（通过 Web APIs 压入 Callback queue）。
// - 宏任务执行时间一般比较长。
// - 每一次宏任务开始之前一定是伴随着一次 event loop 结束的，而微任务是在一次 event loop 结束前执行的。

// 队列执行顺序遵循先进先出原则
// new Promise(cb1).then(cb2)   cb1是正常执行的，then中的cb2 需要压入微任务队列
/**
 *  sync await
 * const res = await foo()  // await 之前【包括所在行】均正常执行
 * console.log('abc')       // await 后面的代码全部压入微任务队列
 */

// https://blog.csdn.net/first_helloword/article/details/114372340?spm=1001.2014.3001.5502


