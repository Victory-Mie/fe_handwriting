function Person(name) {
  this.name = name;
  // 实例属性：每个实例都会创建新的数组
  this.hobbies = [];
  this.getName = function () {
    console.log(this.name);
  };
}

// 在原型上添加引用类型属性
Person.prototype.sharedHobbies = ["reading"]; // 这个数组会被所有实例共享

var person1 = new Person("Mary");
var person2 = new Person("Sam");

// 实例属性hobbies是独立的
person1.hobbies.push("swimming");
console.log("实例属性 - person1.hobbies:", person1.hobbies); // ['swimming']
console.log("实例属性 - person2.hobbies:", person2.hobbies); // []

// 原型上的引用类型属性是共享的
person1.sharedHobbies.push("coding");
console.log("原型属性 - person1.sharedHobbies:", person1.sharedHobbies); // ['reading', 'coding']
console.log("原型属性 - person2.sharedHobbies:", person2.sharedHobbies); // ['reading', 'coding']

// 函数方法在每个实例中都创建一份
console.log("函数是否相同：", person1.getName === person2.getName); // false

//创建的对象可以关联到特定的构造函数
console.log(typeof person1); //object
console.log(person1 instanceof Person); //true

// 优点：
// 创建的对象可以关联到特定的构造函数。
// 可以通过原型链来共享方法。

// 缺点：
// 1. **原型对象**上的引用类型属性(如sharedHobbies)会被所有实例共享，
//    一个实例修改会影响所有实例。
// 2. 构造函数中的方法(如getName)会在每个实例中创建一份，造成内存浪费。

// 正确的做法是：
//    - 实例特有的属性放在构造函数中
//    - 方法和共享属性放在原型对象上，但要注意避免在原型上放可修改的引用类型属性
