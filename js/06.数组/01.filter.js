Array.prototype.myFilter = function (callback, thisArg) {
    const res = [];
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (!callback instanceof Function) {
        throw new TypeError(callback + ' is not a function');
    }

    const obj = Object(this);
    const len = obj.length >>> 0; // 无符号右移运算符, 保证为正整数
    for (let i = 0; i < len; i++) {
        if (i in obj) {
            if(callback.call(thisArg, obj[i], i, obj)){
                res.push(obj[i]);
            }
        }

    }
    return res;
};

console.log(
    "重写filter ->",
    [1, 2, "3"].myFilter((item) => {
        return item > 1;
    })
);