// Symbol  可以理解为唯一的一个字符串，永远不会重复
// Symbol用于防止属性名冲突而产生的，比如向第三方对象中添加属性时。
// Symbol 的值是唯一的，独一无二的不会重复的

// let hd = Symbol();
// let edu = Symbol();
// console.log(hd); //symbol
// console.log(hd == edu); //false

// 一.Symbol 不可以添加属性
// let hd = Symbol();
// hd.name = "张三";
// console.log(hd.name);

// 二.可传入字符串用于描述Symbol，方便在控制台分辨Symbol
// let hd = Symbol("is name");
// let edu = Symbol("这是一个测试");

// console.log(hd); //Symbol(is name)
// console.log(edu.toString()); //Symbol(这是一个测试)
// console.log(hd.description); //is name

// 三.Symbol.for
// 根据描述获取Symbol，如果不存在则新建一个Symbol
// 使用Symbol.for会在系统中将Symbol登记    使用Symbol则不会登记
// let hd = Symbol.for("张三");
// let edu = Symbol.for("张三");
// console.log(hd == edu); //true

// 四.Symbol.keyFor
// Symbol.keyFor 根据使用Symbol.for登记的Symbol返回描述，如果找不到返回undefined 。
// let hd = Symbol.for("张三");
// console.log(Symbol.keyFor(hd)); //张三

// let edu = Symbol("李四");
// console.log(Symbol.keyFor(edu)); //undefined


// 五.遍历属性
// Symbol 不能使用 for/in、for/of 遍历操作
// let symbol = Symbol("张三");
// let obj = {
//   name: "李四",
//   [symbol]: "王五"
// };

// for (const key in obj) {
//   console.log(key); //name
// }

// for (const key of Object.keys(obj)) {
//   console.log(key); //name
// }
// 可以使用 Object.getOwnPropertySymbols 获取所有Symbol属性
// ...
// for (const key of Object.getOwnPropertySymbols(obj)) {
//   console.log(key);
// }
// 也可以使用 Reflect.ownKeys(obj) 获取所有属性包括Symbol
// ...
// for (const key of Reflect.ownKeys(obj)) {
//   console.log(key);
// }
// ...
// 因此如果对象属性不想被遍历，可以使用Symbol保护
// const site = Symbol("网站名称");
// class User {
//   constructor(name) {
//     this[site] = "后盾人";
//     this.name = name;
//   }
//   getName() {
//     return `${this[site]}-${this.name}`;
//   }
// }
// const hd = new User("向军大叔");
// console.log(hd.getName());
// for (const key in hd) {
//   console.log(key);
// }