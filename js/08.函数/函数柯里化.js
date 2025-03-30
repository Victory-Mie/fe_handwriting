// 当接收的参数数量与原函数的形参数量相同时，执行原函数；
// 当接收的参数数量小于原函数的形参数量时，返回一个函数用于接收剩余的参数，直至接收的参数数量与形参数量一致，最后再执行原函数。
// 原始函数
function Fn_init(a, b, c) {
  console.log("最终的结果：", a * b * c);
}

// 柯里化函数
// function curryization(fn, params) {
//   // 获取函数参数长度
//   const lth = fn.length;
//   params = params || [];
//   return function (...args) {
//     // 收集fn函数的参数
//     newArgs = params.concat(args);
//     if (newArgs.length < lth) {
//       // 继续执行curryization柯里化函数，继续收集参数，this指向window
//       return curryization.call(this, fn, newArgs);
//     } else {
//       // 所有参数收集完毕，整体执行源函数，this指向window
//       return fn.apply(this, newArgs);
//     }
//   };
// }

function curryization(fn, params) {
  let len = fn.length;
  params = params || [];
  return function (...args) {
    const newArgs = params.concat(args);
    if (newArgs.length < len) {
      return curryization.call(this, fn, newArgs);
    } else {
      return fn.apply(this, newArgs);
    }
  };
}

const curryFunc = curryization(Fn_init);
const a = curryFunc(2);
const b = a(3, 4); //24
curryFunc(2)(3, 4); // 24
// curryFunc(2, 3)(4) // 24
// curryFunc(2, 3, 4) // 24
// curryFunc(2)(3)(4) // 24

const add = (a, b, c) => {
  return a + b + c;
};
const curryAdd = curryization(add);
console.log(curryAdd(1)(2)(3));
console.log(curryAdd(1)(2, 3));
