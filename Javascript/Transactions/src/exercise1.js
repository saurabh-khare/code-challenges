/**
 * Returns transaction if it matches supplied category.
 * The function is curried so inner function can be called
 * repeatedly called without performance cost incase we need to sanitize
 * category parameter
 *
 *
 * @param {String} category
 * @returns {Transaction} Transaction for given category
 */
const filterTransactionByCategory = (category) => {
  //Perform some sanitization for category input like always convert to lower case
  return (transaction) => {
    if (!transaction || transaction.category !== category) {
      return null;
    }
    return transaction;
  };
};

/**
 * Returns transaction if it falls in supplied date range.
 * The function is curried so inner function can be called
 * repeatedly called without performance cost incase we need to
 * manipulate date parameters
 *
 * @param {Date} startTime - Lower range for duration.
 * @param {Date} endTime - Uppert range for duration.
 * @returns {Transaction} Transaction within given duration
 */
const filterByDateRange = (startTime, endTime) => {
  //let startDate = new Date(startTime);  In case date range needs to be evaluated from string
  //let endDate = new Date(endTime); then it can be done just once and inner function will be returned with supplied date strings
  return (transaction) => {
    if (!transaction) {
      return null;
    }
    let transactionTime = new Date(transaction.time);
    if (transactionTime >= startTime && transactionTime < endTime) {
      return transaction;
    } else {
      return null;
    }
  };
};

/**
 * Since we do not want to run big transaction list in mulitple passes
 * we can use this function to compose functions applied from right to
 * left
 * For this use case we have two functions combined into one. But we can
 * add more like adding another criteria to filter transaction and we will
 * not require to change anything else beside defining the function and adding
 * it to the list of functions
 *
 * @param {Function} tfn - Transaction function.
 * @param {Function} functions - list of functions.
 * @returns {Function} Composed function
 */
const composeTransactionFunction =
  (tf1, tf2) =>
  (...functions) =>
    tf1(tf2(...functions));

/**
 * Use {@code composeTransactionFunction} to create one single filter
 * predicate
 *
 * @param {Function} functions - list of functions.
 * @returns {Function} Filter function
 */
const createPredicate = (...functions) =>
  functions.reduce(composeTransactionFunction);

getBalanceByCategoryInPeriod = (transactions = [], category, start, end) => {
  const categoryFilter = filterTransactionByCategory(category);
  const dateRangeFilter = filterByDateRange(start, end);
  //Since componse evaluates right to left, first evaulate category then date range
  const transactionFilter = createPredicate(dateRangeFilter, categoryFilter);
  return transactions
    .filter((transaction) => transactionFilter(transaction))
    .reduce((balance, transaction) => balance + transaction.amount, 0);
};

module.exports = getBalanceByCategoryInPeriod;
