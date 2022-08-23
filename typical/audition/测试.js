/**
 * 1.创建空对象
 * 2.将空对象__proto__ 指向构造函数的 prototype
 * 3.执行构造器函数，并把this指向这个空对象
 * 4.最后返回这个空对象【如果构造器返回值是对象，则返回这个对象】
 */
function _new(constructor, ...args) {
  const obj = {}
  obj.__proto__ = constructor.prototype
  const res = constructor.call(obj, ...args)

  return typeof res === 'object' ? res : obj
}

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

const obj = _new(Person, 'Tom', 18)
obj.foo()
