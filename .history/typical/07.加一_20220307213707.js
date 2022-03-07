// 题：
// 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。

// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

// 你可以假设除了整数 0 之外，这个整数不会以零开头。

 /**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  digits = digits.reverse() 

  for(let i=0; i<digits.length; i++){
      if(digits[i]!==9){
          digits[i] += 1
          break
      }else{
          if(i === digits.length-1){
              digits[i] = 0
              digits.push(1)
              break
          }else{
               digits[i] = 0
          }
      }
  }
  
  return digits.reverse()
};

// 想法：
/**
 * 1.旋转数组
 * 2.循环数组，判断循环位置数字是否等于9，如果等于9，说明之后该位置会因为加一变为0，如果一直到数组最后一位还是9，说明需要增加一位，该位应该是1
 * 3.如果循环数组的过程中发现循环的位置不是9，说明该位置需要加1  【如果他前面元素不是9，那么他就是第一位，需要加一，如果前面元素是9，那么到它这个位置需要进1，也是需要加一】，加一结束后立马跳出循环
 * 4.再将反转的数组反转回去
 */