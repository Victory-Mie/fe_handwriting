/*bind() 方法创建一个新的函数，
在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，
而其余参数将作为新函数的参数，供调用时使用。 */

/*bind 方法与 call / apply 最大的不同就是
前者返回一个 绑定上下文的函数，
而后两者是直接 执行了函数。 */

let value = 2;
let foo = {
    value: 1
};
function bar(name, age) {
    return {
		value: this.value,
		name: name,
		age: age
    }
};


let bindFoo1 = bar.bind(foo, "Jack", 20); // 返回一个函数
console.log(bindFoo1());
// {value: 1, name: "Jack", age: 20}

let bindFoo2 = bar.bind(foo, "Jack"); // 返回一个函数
console.log(bindFoo2(20));
// {value: 1, name: "Jack", age: 20}

/* bind 有如下特性：
1、指定 this
2、传入参数
3、返回一个函数
4、柯里化 */
Function.prototype.myBind = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
      throw new Error("Type error");
    }
    // 获取参数
    const args = [...arguments].slice(1);
    const fn = this;
    return function Fn() {
      return fn.apply(
        this instanceof Fn ? this : context,
        // 当前的这个 arguments 是指 Fn 的参数
        args.concat(...arguments)
      );
    };
  };
  

let bindFoo3 = bar.myBind(foo, "Rose",30); // 返回一个函数
console.log(bindFoo3());