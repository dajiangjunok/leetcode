/**
 *  1.原型链继承【重写原型对象，代之以一个新类型的实例。】
 *  缺陷：1.多个实例对引用类型的操作会被篡改  2.无法传参
 *
 * */
// function Parent() {
//   this.colors = ['red', 'blue', 'green']
// }

// Parent.prototype.say = function () {
//   console.log('hhh')
// }

// function Son() {}
// Son.prototype = new Parent() // 核心
// Son.prototype.constructor = Son

// const test1 = new Son()
// test1.say() // hhh

// const test2 = new Son()
// test2.colors.push('orange')
// console.log(test1.colors) //[ 'red', 'blue', 'green', 'orange' ]

/**
 * 2.借用构造函数继承 【使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）】
 * 子函数内执行父函数
 * 缺陷：1只能继承父类的实例属性和方法，不能继承原型属性/方法
 *      2无法实现复用，每个子类都有父类实例函数的副本，影响性能
 */
// function SuperType() {
//   this.color = ['red', 'green', 'blue']
// }
// function SubType() {
//   //继承自SuperType
//   SuperType.call(this)
// }
// const instance1 = new SubType()
// instance1.color.push('black')
// console.log(instance1.color) //"red,green,blue,black"

// const instance2 = new SubType()
// console.log(instance2.color) //"red,green,blue"

/**
 * 3.组合式继承【伪经典继承】
 * 缺点： 1.父类Person 被执行了两次
 *       2.子类实例属性和方法  在实例和原型上都存在了一份
 */
// function Person(name, age) {
//   this.name = name
//   this.age = age
// }
// Person.prototype.getName = function () {
//   return this.name
// }

// function Son(name, age) {
//   Person.call(this, name, age)
// }
// Son.prototype = new Person()
// Son.prototype.constructor = Son

// const instance1 = new Son('Tom', 12)

/**
 * 4.寄生组合式继承【经典模式】
 */
// function A(name, age) {
//   this.name = name
//   this.age = age
// }

// A.prototype.getName = function () {
//   return this.name
// }

// function B(name, age) {
//   A.call(this, name, age)
// }

// B.prototype = Object.create(A.prototype)
// B.prototype.constructor = B

// const Bb = new B('Tom', 18)
// console.log(Bb.getName())
// console.log(Bb)
