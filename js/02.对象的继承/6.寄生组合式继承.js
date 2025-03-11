// 结合了借用构造函数和寄生式继承的继承方式。
// 通过 借用构造函数 来确保 实例属性 得到正确初始化
// 用 寄生式继承 来避免多次调用父类构造函数 并且继承父类的原型方法 。

// 优点：
// 1.性能优化：通过借用构造函数只初始化一次实例属性，
// 并且避免在 SubType.prototype 上创建不必要的属性。这样可以减少不必要的内存消耗。
// 2.正确的原型链：inheritPrototype 确保了子类继承了父类的原型方法，同时不会破坏原型链。
// 3.避免多次调用构造函数：相比组合继承，它只调用了父类构造函数一次，
// 避免了多次调用父类构造函数导致的性能问题

// 利用寄生式继承：
// 通过一个中间的父类副本 继承父类原型方法，
// 并且避免了一次对父类构造函数的调用，此处不会继承父类的实例属性
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype); // 创建父类原型的副本
  prototype.constructor = subType; // 修复子类的constructor指向
  subType.prototype = prototype; // 将新创建的副本赋值给子类的原型
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  alert(this.name);
};

function SubType(name, age) {
  // 调用父类构造函数初始化实例属性
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
  alert(this.age);
};
var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);
instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]

// my test demo

// function inherit(subType, superType) {
//   let prototype = Object.create(superType.prototype);
//   prototype.constructor = subType;
//   subType.prototype = prototype;
// }

// function SuperType(name, age) {
//   this.name = name;
//   this.color = ["red", "blue"];
// }

// SuperType.prototype.getName = function () {
//   console.log(this.name);
// };

// function SubType(name, age) {
//   SuperType.call(this, name);
//   this.age = age;
// }

// inherit(SubType, SuperType);

// SubType.prototype.getAge = function () {
//   console.log(this.age);
// };

// let instance1 = new SubType("Mary", 18);
// let instance2 = new SubType("Amy", 17);

// instance1.getName();
// instance2.getAge();

// instance1.color.push("yellow");
// instance2.color.push("green");

// console.log(instance1.color);
// console.log(instance2.color);
