// 将一个对象作为另一个对象的原型，来让子对象继承父对象的属性和方法。

// 缺点：
// 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
// 无法传递参数

// PS:ES5中存在Object.create()的方法，能够代替这个object方法。

function object(obj) {
  function F() {}
  F.prototype = obj; // F 的实例会继承 obj 的属性和方法。
  return new F(); // 返回一个新对象，这个对象的原型是传入的 obj。
}

var person = {
  name: "Mary",
  friends: ["Amy", "Tom"],
};

var anotherPerson = object(person);
anotherPerson.name = "Sam";
anotherPerson.friends.push("Alice");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Bob");

console.log(person.friends); 

//my test demo

// function person(obj) {
//   function F() {}
//   F.prototype = obj;
//   return new F();
// }

// let p1 = {
//   name: "Mary",
//   hobby: ["A", "B", "C"],
// };

// let p2 = person(p1);
// p2.name = "Tom";
// p2.hobby.push("D");

// let p3 = person(p1);
// p3.name = "Amy";

// console.log(p2.name);
// console.log(p3.name);

// console.log(p2.hobby);
// console.log(p3.hobby);
