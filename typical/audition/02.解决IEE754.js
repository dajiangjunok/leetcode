function addStrings2(num1, num2) {
  // 判断是否有小数点
  const index1 = num1.indexOf('.')
  const index2 = num2.indexOf('.')

  // if (index1 > -1 || index2 > -1) {
  //  1.222  length:5 index1:1  222       11.1  length:4 index2:2  1
  let newLeftNum1
  let newLeftNum2
  let newRightNum1
  let newRightNum2

  if (index1 > -1) {
    newLeftNum1 = num1.substr(0, index1)
    newRightNum1 = num1.substr(index1 + 1)
  } else {
    newLeftNum1 = num1
    newRightNum1 = 0
  }

  if (index2 > -1) {
    newLeftNum2 = num2.substr(0, index2)
    newRightNum2 = num2.substr(index2 + 1)
  } else {
    newLeftNum2 = num2
    newRightNum2 = 0
  }

  const a = Number(newLeftNum1) + Number(newLeftNum2)
  const discrepancy = newRightNum2.length - newRightNum1.length

  if (discrepancy < 0) {
    // newRightNum2补0
    for (let i = 0; i < Math.abs(discrepancy); i++) {
      newRightNum2 = newRightNum2 + '0'
    }
  } else {
    // newRightNum1补0
    for (let i = 0; i < Math.abs(discrepancy); i++) {
      newRightNum1 = newRightNum1 + '0'
    }
  }
  const b = Number(newRightNum1) + Number(newRightNum2)

  return Number(a + '.' + b)
  // }
}

function addStrings(num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  const res = [];
  let carry = 0;
  while (i >= 0 || j >= 0) {
    const n1 = i >= 0 ? Number(num1[i]) : 0;
    const n2 = j >= 0 ? Number(num2[j]) : 0;
    const sum = n1 + n2 + carry;
    res.unshift(sum % 10);
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }
  if (carry) {
    res.unshift(carry);
  }
  return res.join("");
};

function sum(a, b) {
  let [intStr1, deciStr1] = a.toString().split(".");
  let [intStr2, deciStr2] = b.toString().split(".");

  // 判断是否有小数点
  deciStr1 = deciStr1 ? deciStr1 : 0
  deciStr2 = deciStr2 ? deciStr2 : 0

  const inteSum = addStrings(intStr1, intStr2); // 获取整数相加部分

  //保证小数部分长度一致
  const discrepancy = deciStr1.length - deciStr2.length

  if (discrepancy < 0) {
    // newRightNum2补0
    for (let i = 0; i < Math.abs(discrepancy); i++) {
      deciStr1 = deciStr1 + '0'
    }
  } else {
    // newRightNum1补0
    for (let i = 0; i < Math.abs(discrepancy); i++) {
      deciStr2 = deciStr2 + '0'
    }
  }
  const deciSum = addStrings(deciStr1, deciStr2); // 获取小数相加部分
  return inteSum + "." + deciSum
}

console.log(sum(1.213, 0.11));
