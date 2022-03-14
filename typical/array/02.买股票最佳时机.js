// 题：
// 给定一个数组 prices ，其中 prices[i] 表示股票第 i 天的价格。

// 在每一天，你可能会决定购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以购买它，然后在 同一天 出售。
// 返回 你能获得的 最大 利润 。
// 例 【7，1，5，3，4，6】
var maxProfit = function(prices) {
  if (prices == null || prices.length <= 1) return 0;
      let  ans = 0 
      for (let i = 1; i < prices.length; i++) {
          if (prices[i] > prices[i-1]) {  // 卖出有利可图
             ans = ans + (prices[i] - prices[i-1])
          }
      }
       return  ans
};

// 想法：
/**
 * 无论数组如何变化，最终的最大差值利润都是爬坡的差值和
 * 因此只需要后值和前值对比   如果后值比前值大   则记录下差值   以此类推最终的差值和就是最大利润
 */