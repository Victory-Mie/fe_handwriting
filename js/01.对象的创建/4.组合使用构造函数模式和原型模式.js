// 构造函数 用于初始化 实例属性
// 原型 用于定义共享的 方法
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function () {
  console.log(this.name);
};

// 实例属性由构造函数初始化，保证了每个实例的独立性。
const person1 = new Person("Mary", 18);
console.log(person1.name);

const person2 = new Person("Tom", 17);

// 共享的方法存储在原型中，节省内存空间。
console.log(person1.getName === person2.getName); // true
