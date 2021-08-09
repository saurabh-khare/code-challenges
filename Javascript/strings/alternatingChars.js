/**
 * https://www.hackerrank.com/challenges/alternating-characters/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=strings&h_r=next-challenge&h_v=zen
 */

function alternatingCharacters(s) {
  let result = s[0];
  let count = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[i - 1] === s[i]) {
      count++;
    }
  }
  return count;
}

let r = alternatingCharacters("AABAAB");
console.log(r);
