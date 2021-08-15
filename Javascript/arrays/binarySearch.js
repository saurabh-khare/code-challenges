function binarySearch(arr, val) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const mid = Math.trunc(start + (end - start) / 2); //Using this expression instead of (start+end)/2 to avoid overflow
    if (arr[mid] === val) return true;
    else if (arr[mid] < val) start = mid + 1;
    else end = mid - 1;
  }
  return false;
}

function binarySearchRecursive(arr, start, end, val) {
  if (start > end) return false;
  const mid = Math.trunc(start + (end - start) / 2);
  if (arr[mid] === val) return true;
  else if (val < arr[mid])
    return binarySearchRecursive(arr, start, mid - 1, val);
  else return binarySearchRecursive(arr, mid + 1, end, val);
}

/**
 *
 * Uses bibary search to find the occurence of val in arr
 * if isFirst is set to true then first index of first occurence
 * is returned, if not then index of last occurence is returned
 */
function searchOccurrence(arr, val, isFirst) {
  let start = 0;
  let end = arr.length - 1;
  let result = -1;
  while (start <= end) {
    const mid = Math.trunc(start + (end - start) / 2);
    if (val == arr[mid]) {
      result = mid;
      if (isFirst) end = mid - 1;
      else start = mid + 1;
    } else if (val < arr[mid]) end = mid - 1;
    else start = mid + 1;
  }
  return result;
}

function getCount(arr, val) {
  const firstIndex = searchOccurrence(arr, val, true);
  if (firstIndex === -1) {
    console.log("item not found");
  }
  const lastIndex = searchOccurrence(arr, val, false);
  const count = lastIndex - firstIndex + 1;
  console.log(`${val} occurred ${count} times`);
}
console.log(binarySearch([2, 5, 8, 1, 4, 7].sort(), 4));
console.log(binarySearch([2, 5, 8, 1, 4, 7].sort(), 6));
console.log(binarySearch([2, 5, 8, 1, 4, 7, 4].sort(), 4));

console.log(binarySearchRecursive([1, 3, 4, 5, 6, 7, 8, 9], 0, 7, 7));
console.log(binarySearchRecursive([1, 3, 4, 5, 6, 7, 8, 9], 0, 7, 11));

getCount([1, 2, 3, 3, 3, 3, 4, 4, 5, 6, 6], 4);
