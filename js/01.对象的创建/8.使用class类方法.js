// ES6 引入了 class 关键字，它提供了一种更接近传统面向对象语言的语法来定义类和实例化对象。
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}

const person1 = new Person("Mary");
person1.getName();
