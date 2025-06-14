/**
 * new 操作符干了什么
 * 1.创建出来一个新的空对象
 * 2.将新对象的__proto__ 指向 构造函数的 prototype
 * 3.执行构造函数，并把 this 指向 这个对象
 * 4.最后返回这个空对象【如果构造器返回值是对象，则返回这个对象】
 */
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype = {
  foo() {
    console.log('name:' + this.name)
    console.log('age:' + this.age)
  }
}

function _new(constructor, ...args) {
  const obj = {}
  obj.__proto__ = constructor.prototype
  const res = constructor.call(obj, ...args)
  return typeof res === 'object' ? res : obj
}


const obj = _new(Person, 'Tom', 12)
console.log(obj)
obj.foo()
