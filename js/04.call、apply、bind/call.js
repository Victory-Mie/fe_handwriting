Function.prototype.myCall = function (context) {
  // 调用myCall方法的必须是function类型
  if (typeof this !== "function") {
    throw new Error("Wrong type!");
  }

  let args = [...arguments].slice(1);
  let con = context || window;

  con.fn = this;

  let result = con.fn(args);
  delete con.fn;
  return result;
};
//test
var obj = {
  value: "vortesnail",
};

function fn(str) {
  console.log(this.value + str);
}
fn.myCall(obj, "114514"); // vortesnail114514
