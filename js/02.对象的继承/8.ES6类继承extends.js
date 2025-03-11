// ES6 的 extends 关键字本质上就是 寄生组合式继承 的语法糖，
// 它的实现方式和 inheritPrototype 非常类似

function my_extends(subType, superType) {
  // 1. 创建对象，创建父类原型的一个副本（Object.create）
  // 2. 增强对象，修复 constructor 指向 subType
  // 使子类继承实例方法
  subType.prototype = Object.create(superType && superType.prototype, {
    constructor: {
      value: subType,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });

  // 3. 设置子类的 `__proto__` 指向父类，确保 `subType` 也能访问 `superType` 的静态方法
  if (superType) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subType, superType)
      : (subType.__proto__ = superType);
  }
}

// test
function Parent() {}

Parent.staticMethod = function () {
  console.log("Parent's static method");
};

Parent.prototype.instanceMethod = function () {
  console.log("Parent's instance method");
};

function Child() {
  Parent.call(this); // 继承 Parent 的实例属性
}

// 手动实现 `extends`
my_extends(Child, Parent);

Child.staticMethod(); // ✅ 继承了静态方法，输出："Parent's static method"

const child = new Child();
child.instanceMethod(); // ✅ 继承了实例方法，输出："Parent's instance method"

// // using example
// class Rectangle {
//   // 构造函数
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }

//   // 计算面积的方法
//   calcArea() {
//     return this.height * this.width;
//   }

//   // getter 方法，返回面积
//   get area() {
//     return this.calcArea();
//   }
// }

// // 继承 Rectangle
// class Square extends Rectangle {
//   constructor(length) {
//     super(length, length); // 调用父类的构造函数
//     // PS: super() 必须在 this 之前调用，否则会报错。

//     this.name = "Square"; // 额外的属性
//   }
// }

// // 测试
// const rectangle = new Rectangle(10, 20);
// console.log(rectangle.area); // 输出 200

// const square = new Square(10);
// console.log(square.area); // 输出 100
