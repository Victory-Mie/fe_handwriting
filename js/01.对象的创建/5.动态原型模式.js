// 在构造函数内部设置原型属性，确保原型属性只被设置一次。（其实组合模式的原型属性也只设置一次）
// 注意：不能用对象字面量重写原型。建议手写apply后再回来看一遍原因：
// https://github.com/mqyqingfeng/Blog/issues/15

// 此处原型方法是在运行时（runtime）根据需要动态添加的，而不是在定义时就确定的。
function Person(name, age) {
  this.name = name;
  this.age = age;
  if (!Person.prototype.getName) {
    Person.prototype.getName = function () {
      console.log(this.name);
    };
  }
}

const person1 = new Person("Mary", 18);
const person2 = new Person("Tom", 17);
