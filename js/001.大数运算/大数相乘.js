/**
 * 大数相乘
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function multiply(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0"; // 特殊情况处理

  const len1 = num1.length;
  const len2 = num2.length;
  const result = new Array(len1 + len2).fill(0); // 结果数组

  // 从后往前遍历每个数字进行相乘
  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      const mul = Number(num1[i]) * Number(num2[j]); // 字符转数字

      // 当前位的结果=本轮位数之积%10+当前位之前的结果
      const sum = mul + result[i + j + 1]; // 当前位置的和
      result[i + j + 1] = sum % 10; // 当前位

      result[i + j] += Math.floor(sum / 10); // 进位
    }
  }

  // 将结果数组转换为字符串
  let resultStr = result.join("");
  // 去掉前导零
  return resultStr.startsWith("0") ? resultStr.slice(1) : resultStr;
}

// 示例用法
console.log(multiply("123456789", "987654321")); // 输出: "121932631112635269"
