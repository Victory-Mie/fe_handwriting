var obj = {
    value: "vortesnail",
};

function fn(str1,str2) {
    console.log(this.value+str1+str2);
}

fn.apply(obj,['1','2']);  // vortesnail12

/*使用 Symbol 来保证属性唯一,
也就是保证不会重写 用户自己原来定义在 context 中的 同名属性*/

Function.prototype.myApply = function (context) {
    if(typeof this!=="function"){
        throw new Error("type error!");
    }
    let result=null;
    context=context||window;

    const fnSym=Symbol();
    context[fnSym]=this;
    if(arguments[1]){
        result=context[fnSym](...arguments[1]);
    }else{
        result=context[fnSym];
    }
    
    delete context[fnSym];
    return result;
}
fn.myApply(obj,['1','2']);  // vortesnail12