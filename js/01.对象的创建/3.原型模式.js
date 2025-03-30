// 原型模式
function Obj() {}
Obj.prototype = {
  attr: "undefined",
  getAttr: function () {
    console.log(this.attr);
  },
};

// 优点：
// 方法共享
// 缺点：
// 所有属性共享
// 无法在创建时传递参数

/*-------------------------------------------------------*/
// example：
// 利用了 JavaScript 中的原型链特性。
// 它可以将 公共的属性 和 方法 放在原型对象上，从而实现代码的复用。
function Person() {}

Person.prototype = {
  // 原型模式优化：加入constructor，使实例可以通过constructor属性找到所属构造函数
  // constructor: Person,
  name: "unknown",
  age: 0,
  getName: function () {
    console.log(this.name);
  },
};

const person1 = new Person();
person1.getName();

const person2 = new Person();
person2.name = "Mary";
person2.getName();

//方法只被创建一次，节省内存空间。
console.log(person1.getName === person2.getName); //true

// 优点：
// 方法只被创建一次，节省内存空间。
// 支持动态添加属性和方法。

// 缺点：
// 1. 所有的属性和方法都共享
// 2. 不能初始化参数
