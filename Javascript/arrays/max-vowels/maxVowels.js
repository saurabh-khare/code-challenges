function findSubstring(s, k) {
  let charArr = new Array(255);
  charArr.fill(0);
  charArr["a".charCodeAt()] = 1;
  charArr["e".charCodeAt()] = 1;
  charArr["i".charCodeAt()] = 1;
  charArr["o".charCodeAt()] = 1;
  charArr["u".charCodeAt()] = 1;
  let i = 0;
  let j = 0;
  let bestSum = 0;
  let bestIndex = 0;
  while (j < k) {
    bestSum += charArr[s.charCodeAt(j)];
    j++;
  }
  let sum = bestSum;
  for (; j < s.length; j++) {
    sum -= charArr[s.charCodeAt(i)];
    sum += charArr[s.charCodeAt(j)];
    i++;
    if (sum > bestSum) {
      bestSum = sum;
      bestIndex = i;
    }
  }
  if (bestSum === 0) {
    return "Not found!";
  }
  return s.substr(bestIndex, k);
}

//findSubstring("caberqiitefg", 5);
const result = findSubstring("azerdii", 5);
console.log(result);
