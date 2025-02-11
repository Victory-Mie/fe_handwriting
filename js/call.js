var obj = {
    value: "vortesnail",
};

function fn(str) {
    console.log(this.value+str);
}

fn.call(obj,'');  // vortesnail

/*
- call的作用：
1. call 改变了 this 的指向，指向到 obj 。
2. fn 函数执行了。
*/

//手写call
Function.prototype.myCall = function (context) {
    //判断调用对象
    if (typeof this !== "function") {
        throw new Error("type error!");
    }
    //获取参数
    let args = [...arguments].slice(1);
    let result = null;
    //判断context
    context = context || window;
    //将被调用的方法（就是this）设为context的方法。
    context.fn=this;
    //执行要被调用的方法
    result=context.fn(args);
    //删除手动添加的属性方法
    delete context.fn;
    //返回结果
    return result;
}

fn.myCall(obj,"114514");  // vortesnail114514