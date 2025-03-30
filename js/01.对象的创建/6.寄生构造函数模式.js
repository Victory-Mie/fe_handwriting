function Obj() {
  let o = new Obj();
  o.attr = attr;
  o.getAttr = function () {
    console.log(this.attr);
  };
  return o;
}

// 寄生-构造函数-模式,即寄生在构造函数的一种方法。
// 也就是说打着构造函数的幌子挂羊头卖狗肉。
// 类似于工厂模式，
// 但它可以基于现有的构造函数进行扩展，
// 同时保持了原始构造函数的特性。
// 缺点：和工厂模式一样 无法通过类型来识别对象。
function Person(name) {
  const p = new Object();
  p.name = name;
  p.getName = function () {
    console.log(this.name);
  };
  return p;
}

const person1 = new Person("Mary");

console.log(person1 instanceof Person); // false
console.log(person1 instanceof Object); // true
