const str1 = "123456789";
const str2 = "98765432156464645465";
console.log(add(str1, str2));

function add(str1, str2) {
  // 转成数组来遍历
  // 遍历对位相加(注意点位数可能不一样，不一样就补0,用 String.prototype.padStart())
  // 需要进位，就进位
  if (!str1) return str1 || 0;
  if (!str2) return str2 || 0;

  // 统一位数
  if (str1.length > str2.length) {
    str2 = str2.padStart(str1.length, "0");
  } else if (str1.length < str2.length) {
    str1 = str1.padStart(str2.length, "0");
  }

  let flag = 0; // 进位标志符
  let res = []; // 结果数组

  // 从各位开始逐位相加
  for (let i = str1.length - 1; i >= 0; i--) {
    const sum = Number(str1[i]) + Number(str2[i]) + flag;
    // sum>10，进位标志设为1，sum-10后插入结果数组的头部
    if (sum >= 10) {
      res.unshift(sum - 10);
      flag = 1;
    } else {
      //否则直接插入，进位标志置0
      res.unshift(sum);
      flag = 0;
    }
  }
  // 全部加完如果还有进位，在结果数组头部再插入一个1
  if (flag == 1) {
    res.unshift(1);
  }

  // 转为完整字符串返回
  return res.join("");
}
