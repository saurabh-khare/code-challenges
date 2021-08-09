/**
 * https://www.hackerrank.com/challenges/ctci-making-anagrams/problem?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=strings
 */

function makeAnagram(a, b) {
  let minDeletes = 0;
  const charArr = new Array(256);
  charArr.fill(0);
  const maxLength = b.length > a.length ? b.length : a.length;
  for (let i = 0; i < maxLength; i++) {
    charArr[a.charCodeAt(i)]++;
    charArr[b.charCodeAt(i)]--;
  }
  for (let j = 0; j < 256; j++) {
    minDeletes += Math.abs(charArr[j]);
  }
  return minDeletes;
}

console.log(
  makeAnagram("fcrxzwscanmligyxyvym", "jxwtrhvujlmrpdoqbisbwhmgpmeoke")
);
