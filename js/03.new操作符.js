//传入 一个构造函数 若干参数
function my_new(con, ...arg) {
  // 0.保证con是一个函数
  if (typeof con !== "function") {
    throw new TypeError("Constructor must be a function");
  }
  let obj = {};
  // 1.设置原型链：将新创建的对象的__proto__属性指向构造函数的prototype属性。
  Object.setPrototypeOf(obj, con.prototype);
  // 2.将构造函数的this指向新创建的对象，并执行。
  let res = con.apply(obj, arg);
  // 3.保证返回的是对象
  return res instanceof Object ? res : obj;
}
// 要点：
// 0. 构造函数必须是个函数，否则类型报错。
// 1.创建一个临时obj，并设置它的【原型】为【构造函数的prototype属性】。
// 2.用apply函数把构造函数的this绑定到obj上，传入参数数组执行构造函数。
// 3.构造函数执行的结果如果是一个对象则返回，否则把返回obj
