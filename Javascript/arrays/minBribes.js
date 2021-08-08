/**
 * https://www.hackerrank.com/challenges/new-year-chaos/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays
 */

function minimumBribes(q) {
  let bribeSum = 0;
  for (let i = q.length - 1; i >= 0; i--) {
    if (q[i] !== i + 1) {
      if (q[i - 1] >= 0 && q[i - 1] === i + 1) {
        bribeSum++;
        swapPositions(i, i - 1, q);
      } else if (q[i - 2] >= 0 && q[i - 2] === i + 1) {
        bribeSum += 2;
        swapPositions(i - 1, i - 2, q);
        swapPositions(i, i - 1, q);
      } else {
        console.log("Too chaotic");
        return;
      }
    }
    console.log(q);
  }
  console.log(bribeSum);
}

function swapPositions(initialPosition, finalPosition, originalState) {
  const temp = originalState[initialPosition];
  originalState[initialPosition] = originalState[finalPosition];
  originalState[finalPosition] = temp;
}
// const a = [1, 2, 3, 5, 4, 6, 7, 8];
const a = [1, 2, 5, 3, 4, 7, 8, 6];
minimumBribes(a);
