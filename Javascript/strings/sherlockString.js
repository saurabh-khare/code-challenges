/**
 * https://www.hackerrank.com/challenges/sherlock-and-valid-string/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=strings&h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen
 */

function isValid(s) {
  const charArr = new Array(255);
  let charCount = 0;
  charArr.fill(0);
  for (let i = 0; i < s.length; i++) {
    charArr[s.charCodeAt(i)]++;
  }
  const baseCount = charArr[s.charCodeAt(0)];
  for (let j = 0; j < 255; j++) {
    if (charArr[j] !== 0 && charArr[j] !== baseCount) {
      charCount++;
    }
  }
  return charCount > 1 ? "NO" : "YES";
}

console.log(isValid("abcdefghhgfedecba"));
