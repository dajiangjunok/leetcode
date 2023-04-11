// 一.作用域
// 1.函数被执行后其环境变量将从内存中删除。下面函数在每次执行后将删除函数内部的 total 变量。
// function count() {
//   let total = 0;
// }
// count();

// 2.函数每次调用都会创建一个新作用域
// let site = '后盾人'

// function a() {
//   let hd = 'houdunren.com'

//   function b() {
//     let cms = 'hdcms.com'
//     console.log(hd)
//     console.log(site)
//   }
//   b()
// }
// a()

// 3如果子函数被使用时父级环境将被保留
// function hd() {
//   let n = 1
//   return function () {
//     let b = 1
//     return function () {
//       console.log(++n)
//       console.log(++b)
//     }
//   }
// }
// let a = hd()()
// a() //2,2
// a() //3,3

// 4.构造函数也是很好的环境例子，子函数被外部使用父级环境将被保留
// function User() {
//   let a = 1
//   this.show = function () {
//     console.log(a++)
//   }
// }
// let a = new User()
// a.show() //1
// a.show() //2
// let b = new User()
// b.show() //1

// 使用 let/const 可以将变量声明在块作用域中（放在新的环境中，而不是全局中）
// {
//   let a = 9;
// }
// console.log(a); //ReferenceError: a is not defined
// if (true) {
//   var i = 1;
// }
// console.log(i);//1

// for (let i = 0; i < 10; i++) {
//   setTimeout(() => {
//     console.log(i)
//   }, 500)
// }

// let arr = []
// for (var i = 0; i < 10; i++) {
//   arr.push(() => i)
// }
// console.log(arr[3]())

// 在没有let/const 的历史中使用以下方式产生作用域 让i保存在该自执行函数作用域下
// let arr = []
// for (var i = 0; i < 10; i++) {
//   ;(function (x) {
//     arr.push(() => x)
//   })(i)
// }
// console.log(arr[3]())

// 二. 闭包
// 闭包指子函数可以访问外部作用域变量的函数特性，即使在子函数作用域外也可以访问。如果没有闭包那么在处理事件绑定，异步请求时都会变得困难。
// JS 中的所有函数都是闭包
// 闭包一般在子函数本身作用域以外执行，即延伸作用域

// 使用闭包返回数组区间元素
// const arr = [1, 22, 33, 41, 32, 434, 2, 3, 4, 56, 7]
// function between(a, b) {
//   return function (v) {
//     return v > a && v < b
//   }
// }

// console.log(arr.filter(between(1, 41)));

// 闭包排序
// let lessons = [
//   {
//     title: '媒体查询响应式布局',
//     click: 89,
//     price: 12
//   },
//   {
//     title: 'FLEX 弹性盒模型',
//     click: 45,
//     price: 120
//   },
//   {
//     title: 'GRID 栅格系统',
//     click: 19,
//     price: 67
//   },
//   {
//     title: '盒子模型详解',
//     click: 29,
//     price: 300
//   }
// ]

// function sort(filed, order) {
//   return (a, b) => {
//     if (order === 'desc') {
//       return b[filed] - a[filed]
//     } else {
//       return a[filed] - b[filed]
//     }
//   }
// }

// const newLessons = lessons.sort(sort('click', 'add'))
// console.table(newLessons)

// 三.闭包带来的内存泄漏问题解决
let divs = [
  { name: 'kim', age: 11 },
  { name: 'john', age: 13 },
  { name: 'tom', age: 12 }
]

divs.forEach(function (item) {
  const name = item.name

  setTimeout(function () {
    console.log(name)
    console.log(item)
  }, 1000)
  item = null
})
