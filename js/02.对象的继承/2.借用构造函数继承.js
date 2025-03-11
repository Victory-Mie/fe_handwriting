// 在子类的构造函数中，通过调用父类的构造函数来获得父类的实例属性。
// 这样子类的每个实例都会有父类的实例属性，但不会共享父类的原型方法。

// 缺点：
// 只能继承父类的实例属性和方法，不能继承原型属性/方法
// 每次创建子类的实例时，都会调用父类构造函数并复制一份属性，多个实例之间无法共享父类的方法或属性。
function SuperType() {
  this.color = ["red", "green", "blue"];
}

function SubType() {
  // 调用父类的构造函数
  SuperType.call(this);
  // call() 方法的作用是把 SuperType 构造函数中的 this 指向子类 SubType，
  // 这样子类的每个实例就可以继承父类的 color 属性。
}

var instance1 = new SubType();
instance1.color.push("black");
alert(instance1.color); // 输出 "red, green, blue, black"

var instance2 = new SubType();
alert(instance2.color); // 输出 "red, green, blue"
