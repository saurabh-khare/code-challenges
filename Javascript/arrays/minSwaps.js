/**
 * https://www.hackerrank.com/challenges/minimum-swaps-2/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays&h_r=next-challenge&h_v=zen
 */

function minimumSwaps(arr) {
  let swapCount = 0;
  let f = 0;
  let l = arr.length - 1;
  while (l !== f) {
    if (arr[l] === l + 1) {
      l--;
    } else if (arr[f] === f + 1) {
      f++;
    } else {
      swap(f, arr[f] - 1, arr);
      swapCount++;
    }
  }

  return swapCount;
}

function swap(i, j, arr) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

let tesult = minimumSwaps([1, 3, 5, 2, 4, 6, 7]);
console.log(tesult);
