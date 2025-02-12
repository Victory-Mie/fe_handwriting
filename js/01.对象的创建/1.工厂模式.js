function createPerson(name) {
  var p = new Object();
  p.name = name;
  p.getName = function () {
    console.log(this.name);
  };
  return p;
}

var person1 = createPerson("Mary");
person1.getName(); //Mary

var person2 = createPerson("Sam");
person2.name = "Tom";
person2.getName(); //Tom

// createPerson 函数返回的是一个普通的 JavaScript 对象。
console.log(typeof person1); //object
// createPerson 并没有作为构造函数来创建对象（没有使用 new 关键字）。
// 对象 person1 的构造函数是 Object，所以它不属于 createPerson 类型。
console.log(person1 instanceof createPerson); //false

// 优点：
// 封装了创建逻辑，减少了重复代码。

// 缺点：
// 创建的对象无法通过类型来识别。所有的实例都指向一个原型。
