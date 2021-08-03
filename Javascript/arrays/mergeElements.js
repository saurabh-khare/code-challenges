/**
 * You have three Arrays.
 * A = {2, 5, 3, 2, 8,1}
 * B = {7, 9, 5, 2, 4, 10, 10}
 * C = {6, 7, 5, 5, 3, 7}
 * make an array from this three arrays which elements is present in at least two array.
 */

const mergeElements = (arr1, arr2, arr3) => {
  const l1 = arr1.length;
  const l2 = arr2.length;
  const l3 = arr3.length;
  const maxLength = Math.max(l1, l2, l3);

  //This will hold numbers and their frequency
  //by scanning all three arrays
  const numbers = {};
  for (let i = 0; i < maxLength; i++) {
    if (!numbers[arr1[i]]) numbers[arr1[i]] = 0;
    numbers[arr1[i]]++;
    if (!numbers[arr2[i]]) numbers[arr2[i]] = 0;
    numbers[arr2[i]]++;
    if (!numbers[arr3[i]]) numbers[arr3[i]] = 0;
    numbers[arr3[i]]++;
  }
  const numberKeys = Object.keys(numbers);
  const result = [];
  for (let i = 0; i < numberKeys.length; i++) {
    if (numberKeys[i] !== "undefined" && numbers[numberKeys[i]] > 1) {
      result.push(numberKeys[i]);
    }
  }
  return result;
};

const A = [2, 5, 3, 2, 8, 1];
const B = [7, 9, 5, 2, 4, 10, 10];
const C = [6, 7, 5, 5, 3, 7];

console.log(mergeElements(A, B, C));
