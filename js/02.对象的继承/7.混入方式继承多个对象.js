// 混入（Mixin）是一种在 JavaScript 中实现多个对象继承的方法，
// 通常用于模拟多重继承的行为。

// 在 JavaScript 中，类只能继承一个父类（即单继承），
// 但我们可以使用 Object.assign() 将多个对象的方法拷贝到子类的 prototype 上，从而达到继承多个对象的效果。

// ✅ 优点
// 实现多个类的继承（模拟多重继承）。
// 实例属性和原型方法都能正确继承。
// 避免原型链带来的问题：
// - 继承实例属性时使用了 call()，确保每个实例都有独立的属性，不会相互污染。
// - 继承原型方法时使用 Object.assign()，不会影响原型链。
// ❌ 缺点
// 可能会有命名冲突：
// 如果 SuperClass.prototype 和 OtherSuperClass.prototype 里有相同的方法，后者的方法会覆盖前者的方法。
// 方法拷贝（Object.assign）是浅拷贝：
// 继承的方法只是被复制到 MyClass.prototype，如果是引用类型（如对象或数组），它们仍然是共享的。

function SuperClass1() {
  this.name = "Mary";
}
SuperClass1.prototype.getName = function () {
  console.log(this.name);
};
function SuperClass2() {
  this.color = ["blue"];
}
SuperClass1.prototype.getColor = function () {
  console.log(this.color);
};

function SubClass() {
  // 继承多个父类的实例属性
  SuperClass1.call(this);
  SuperClass2.call(this);
}
// 继承SuperClass1的原型方法
SubClass.prototype = Object.create(SuperClass1.prototype);
// 混入superclass2的原型方法
Object.assign(SubClass.prototype, SuperClass2.prototype);
// 修正子类的constructor指向
SubClass.prototype.constructor = SubClass;

SubClass.prototype.getAge = function () {
  console.log("no no no no no age ~~~");
};

let instance = new SubClass();
console.log(instance.name);
console.log(instance.color);
instance.getName();
instance.getAge();
