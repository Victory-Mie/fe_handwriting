// 在原型式继承的基础上，增强对象，返回构造函数
// 在创建对象时，不仅仅将原型指向父对象，还可以为这个对象添加新的属性或方法，以增强其功能。
// 缺点同原型式继承

// 原型式继承的函数：
function object(obj) {
  function F() {}
  F.prototype = obj; // F 的实例会继承 obj 的属性和方法。
  return new F(); // 返回一个新对象，这个对象的原型是传入的 obj。
}

// 寄生函数：
// 我的理解：在一个寄生函数里过一遍原型式继承，创造出一个实例对象，增强他，再返回出这个对象。（就像过了一个加工厂）
function createAnother(original) {
  var clone = object(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function () {
    // 以某种方式来增强对象
    console.log("hi");
  };
  return clone; // 返回这个对象
}

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"],
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); // 输出 "hi"
