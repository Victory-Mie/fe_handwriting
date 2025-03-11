// 将借用构造函数继承和原型链继承结合在一起的继承方式。
// 它的目标是既能继承父类的实例属性，也能继承父类的原型属性和方法。

//缺点：
// 1.多次调用父类构造函数：
// 在组合继承中，父类的构造函数会被调用两次：
// 第一次在设置子类原型时，SubType.prototype = new SuperType()，这会给 SubType.prototype 添加父类的实例属性 name 和 colors。
// 第二次在创建实例时，SuperType.call(this, name)，这会给每个子类实例添加 name 和 colors 属性。
// 结果是：每个实例（比如 instance1）的属性（name, colors）会遮蔽原型对象（SubType.prototype）上的同名属性。这个会导致重复的属性/方法存在——实例和原型中各有一份相同的属性/方法。
// 2.性能问题：
// 每个实例都会创建父类的实例属性副本，这可能会导致性能问题，尤其是当属性较多时。

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  // 继承父类的实例属性
  SuperType.call(this, name);
  this.age = age;
}

// 继承父类的原型方法
SubType.prototype = new SuperType();
// SubType.prototype = new SuperType() 会把 SubType 的构造函数指向 SuperType，
// 所以需要重新设置 SubType.prototype.constructor = SubType
// 来确保 SubType 的 constructor 指向 SubType。
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function () {
  alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); // 输出 "red,blue,green,black"
instance1.sayName(); // 输出 "Nicholas"
instance1.sayAge(); // 输出 29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors); // 输出 "red,blue,green"
instance2.sayName(); // 输出 "Greg"
instance2.sayAge(); // 输出 27
