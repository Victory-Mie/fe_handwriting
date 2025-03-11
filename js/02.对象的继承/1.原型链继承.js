// 原型链继承的核心思想是：让子类型（SubType）的原型指向父类型（SuperType）的一个实例，从而让子类型继承父类型的属性和方法。

// 缺点：
// 共享问题：如果 SuperType 内部有 引用类型的属性，那么所有 SubType 实例会共享该属性，导致互相影响。 多个实例对引用类型的操作会被篡改。
// 无法向 SuperType 传参：SubType.prototype = new SuperType(); 直接调用了 SuperType 的构造函数，但 无法传递参数。

// 定义一个父构造函数 SuperType
function SuperType() {
  this.property = "SuperType"; // 在实例上定义一个属性
}
// 在 SuperType 的原型上添加一个方法
SuperType.prototype.getSuperValue = function () {
  return this.property;
};

// 定义一个子构造函数 SubType
function SubType() {
  this.subProperty = "SubType"; // 子类型特有的属性
}

// **关键步骤**：
// 让 SubType 继承 SuperType
// 这里创建 SuperType 的实例，并赋值给 SubType 的原型
// 这样 SubType 的原型链上就包含了 SuperType 的实例。
// 于是，SubType 继承了 SuperType 的所有属性和方法。
SubType.prototype = new SuperType();

// 在 SubType 的原型上添加一个新方法
SubType.prototype.getSubValue = function () {
  return this.subProperty;
};

// 创建 SubType 的实例
var instance = new SubType();

//由于 instance 没有 getSuperValue 方法，JS 解析器会去 SubType.prototype 查找。
console.log(instance.getSuperValue()); // 继承自 SuperType
console.log(instance.getSubValue());

// my test demo

// function Mom() {
//   this.name = "Mary";
// }

// Mom.prototype.getMomName = function () {
//   return this.name;
// };

// function Child() {
//   this.childName = "Amy";
// }

// Child.prototype = new Mom();

// Child.prototype.getChildName = function () {
//   return this.childName;
// };

// let instance = new Child();
// console.log(instance.getMomName());
// console.log(instance.getChildName());
