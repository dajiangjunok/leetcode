// 题：
// 旋转图像
// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像
//  例 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]  输出：[[7,4,1],[8,5,2],[9,6,3]]
// 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]   输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  const n = matrix.length
  // 上下交换
  for (let i = 0; i < Math.floor(n / 2); i++) {
    let temp = matrix[i];
    matrix[i] = matrix[n - i - 1];
    matrix[n - i - 1] = temp;
  }

  //在按照对角线交换
  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

};