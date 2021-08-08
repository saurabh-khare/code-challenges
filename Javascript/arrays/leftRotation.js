/**
 * https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays&h_r=next-challenge&h_v=zen
 */

/*
 * Complete the 'rotLeft' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER d
 */

function rotLeft(a, d) {
  const result = [];
  const n = a.length;
  for (let i = n - 1; i >= 0; i--) {
    let finalIndex = i - d;
    if (finalIndex < 0) {
      finalIndex = finalIndex + n;
    }
    result[finalIndex] = a[i];
  }
  return result;
}

rotLeft([1, 2, 3, 4, 5], 4);
