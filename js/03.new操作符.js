//传入 一个构造函数 若干参数
function my_new(con,...arg){
    // 保证con是一个函数
    if (typeof con !== 'function') {
        throw new TypeError('Constructor must be a function');
    }
    let obj={};
    // 设置原型链：将新创建的对象的__proto__属性指向构造函数的prototype属性。
    Object.setPrototypeOf(obj,con.prototype);
    // 将构造函数的this指向新创建的对象，并执行。
    let res=con.apply(obj,arg);
    // 保证返回的是对象
    return res instanceof Object? res:obj;
}