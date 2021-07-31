/** This is a unoptimized solution with too many mutations error prone regex matching.
 * Will try to come up with better solution when I have more time
 */

/**
 * @typedef {{isDirectory: boolean, name: string, files?: File[]}} File
 *
 * @param {File[]} files
 * @param {string[]} ignorePatterns
 * @returns {string[]}
 */
const getAllFilesExcept = (files, ignorePatterns) => {
  const fileList = {};
  // Starting with root directory '/'
  normalizePaths(files, fileList, "/");
  //extract(files, fileList);
  return evaluatePaths(fileList, ignorePatterns);
};

/**
 * This method gets the files object containing all normalized paths
 * for files and ignore pattern array and returns files not exluded
 * by ignore patterns by searching for pattern in all files at ONCE
 * @typedef {{filePath: string, isAdded: boolean}} File
 * @param {File[]} files
 * @param {string[]} ignorePatterns
 * @returns
 */
const evaluatePaths = (files = {}, ignorePatterns = []) => {
  // Create string will all paths which will be used to search for ignore patterns
  const fileString = Object.keys(files).join("#") + "#";
  const excludedFiles = {};
  // This is unavoidable. We need to iterate through each pattern
  ignorePatterns.forEach((p) => {
    // If pattern starts with ! then just remove it from excluded files
    if (p.charAt(0) === "!") {
      const filePath = p.substring(1);
      if (excludedFiles[filePath]) delete excludedFiles[filePath];
    }
    // We are using a regex for search for pattern matches,
    // hence we need to sanitize the pattern string to escape regex syntax
    p = p.replaceAll("(", "\\(").replaceAll(")", "\\)");
    const regexp = new RegExp(`${p}(\/.*?|)(?=#)`, "g");
    const arr = Array.from(fileString.matchAll(regexp), (m) => m[0]);
    // For each match found, add it to the excluded files
    arr.forEach((el) => (excludedFiles[el] = true));
  });
  // finally filter out the excluded files from main files
  Object.keys(excludedFiles).forEach((ef) => {
    if (files[ef]) {
      delete files[ef];
    }
  });
  return Object.keys(files).sort();
};

/**
 * This function flattens all paths for supplied
 * file structure recursively
 * It returns Object instead of Array since cost
 * of lookup for each file would be O(n) which can
 * be avoided by direct lookup of object property
 * @param {string} dirName
 * @param {string []} dirName
 * @param {string} dirName
 * @returns Object containing filepaths
 */
const normalizePaths = (files, fileList, dirName) => {
  files.forEach((file) => {
    if (file.isDirectory) {
      normalizePaths(file.files, fileList, dirName + file.name + "/");
    } else {
      const fileName = dirName + file.name;
      fileList[fileName] = true;
    }
  });
};

module.exports.getAllFilesExcept = getAllFilesExcept;
