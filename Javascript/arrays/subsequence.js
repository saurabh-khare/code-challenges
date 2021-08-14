function isValidSubsequence(array, sequence) {
  let seqCount = 0;
  let i = 0;
  let j = 0;
  while (j !== sequence.length && i < array.length) {
    if (array[i] === sequence[j]) {
      j++;
    }
    i++;
  }
  return j === sequence.length;
}

const result = isValidSubsequence([5, 1, 22, 25, 6, -1, 8, 10], [1, 6, -1, -2]);
console.log(result);
