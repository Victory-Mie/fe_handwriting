Function.prototype.myApply = function (context) {
  if (typeof this !== "function") return;
  let con = context || window;
  let fnSym = Symbol();
  con[fnSym] = this;
  let result = null;
  if (arguments[1]) {
    result = con[fnSym](...arguments[1]);
  } else {
    result = con[fnSym];
  }
  delete con[fnSym];
  return result;
};

// test
var obj = {
  value: "vortesnail",
};

function fn(str1, str2) {
  console.log(this.value + str1 + str2);
}

fn.myApply(obj, ["1", "2"]);
