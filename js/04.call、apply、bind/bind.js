function greet(greeting) {
  console.log(this);
  return `${greeting}, ${this.name}`;
}

const person = { name: "Alice" };

// 创建一个绑定了 `this` 的新函数
const boundGreet = greet.bind(person, "Hello");

console.log(boundGreet()); // 输出: "Hello, Alice"

const boundGreet1 = greet.bind(person, "Hi");
const boundGreet2 = boundGreet1.bind({ name: "Bob" }, "Hey"); // 这不会改变 boundGreet1 的 `this`

console.log(boundGreet1()); // 输出: "Hi, Alice"
console.log(boundGreet2()); // 输出: "Hi, Alice"
