// 没有公共属性，而且其方法也不引用 this 的对象。
// 无法识别对象所属类型

function Person(name) {
  const p = new Object();
  p.getName = function () {
    console.log(name);
  };
  return p;
}

const person1 = person("Mary");
person1.getName();
