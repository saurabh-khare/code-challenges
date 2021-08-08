/**
 * https://www.hackerrank.com/challenges/2d-array/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays
 */

/*
 * Complete the 'hourglassSum' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function hourglassSum(arr) {
  let bestSum = -9999999;
  for (let x = 0; x + 3 <= arr.length; x++) {
    for (let y = 0; y + 3 <= arr[x].length; y++) {
      const sum = generateSum(arr, x, y);
      if (sum > bestSum) bestSum = sum;
    }
  }
  console.log(bestSum);
  return bestSum;
}

function generateSum(arr, x, y) {
  // [x,y],[x+1,y],[x+2,y]
  //[x+1,y+1]
  //[x,y+2],[x+1,y+2],[x+2,y+2]
  let sum = 0;
  for (let i = 0; i <= 2; i++) {
    if (i === 1) {
      sum += arr[y][x + i] + arr[y + 1][x + i] + arr[y + 2][x + i];
    } else {
      sum += arr[y][x + i] + arr[y + 2][x + i];
    }
  }
  return sum;
}

const sample = [
  [-9, -9, -9, 1, 1, 1],
  [0, -9, 0, 4, 3, 2],
  [-9, -9, -9, 1, 2, 3],
  [0, 0, 8, 6, 6, 0],
  [0, 0, 0, -2, 0, 0],
  [0, 0, 1, 2, 4, 0],
];
hourglassSum(sample);
