/**
 * Method found on internet to generate hashcode.
 * This is to avoid spending time to write original
 * method or use library
 */
String.prototype.hashCode = function () {
  let hash = 0;
  if (this.length == 0) return hash;
  for (let i = 0; i < this.length; i++) {
    let char = this.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

/**
 * Transaction will be termed as duplicate if it is repeated for
 * same source and target account in same category with same amount
 * Assuming above properties are checked elsewhere here we just
 * check if the duplicate transaction is repeated if it occurs again
 * within one minute
 *
 * @param {Transaction} transaction1 - Lower range for duration.
 * @param {Transaction} transaction2 - Uppert range for duration.
 * @returns {boolean} Transaction within given duration
 */
const isRepeatedTransaction = (transaction1, transaction2) => {
  if (transaction1 == null || transaction2 == null) {
    return false;
  }
  return (
    Math.abs(
      (new Date(transaction1.time) - new Date(transaction2.time)) / 60000
    ) < 1
  );
};

/**
 * Comparator to sort transactions by time
 * @param {Transaction} transaction1
 * @param {Transaction} transaction2
 * @returns time interval
 */
const sortTransactionsByTime = (transaction1, transaction2) => {
  return new Date(transaction1.time) - new Date(transaction2.time);
};

/**
 * Generate a hashcode based on certain properties of a transaction
 * @param {Transaction} transaction
 * @returns Unique hash code
 */
const generateHash = (transaction) => {
  let uniqueId =
    transaction.category +
    transaction.sourceAccount +
    transaction.targetAccount +
    transaction.amount;
  return uniqueId.hashCode();
};

/**
 * Returns array of transactions grouped by criteria of duplicity
 * All transactions in a group will be executed within interval of 1 minute
 * between two consecutive transactions.
 * In case between duplicate transaction if interval is greater than 1 minute
 * then new group will be created assuming that the next transaction is a new
 * transaction
 * @param {Transaction} transactions
 * @returns Group of duplicate transactions
 */
const findDuplicateTransactions = (transactions = []) => {
  //Sort the transactions based on execution time. After this we never have to
  //use another pass to group transactions by increasing order of time
  transactions.sort(sortTransactionsByTime);
  //Use another single pass to group transactions
  let transactionGroups = transactions.reduce(
    (accumulator, currentItem, currentIndex, array) => {
      //"bucket" is very important property as it keeps a check on which bucket
      //should a transaction land.
      if (!("bucket" in accumulator)) {
        accumulator.bucket = 0;
      }
      //Duplicate transactions should have SAME hashcode
      let key = generateHash(currentItem);
      //In case if next DUPLICATE transaction occurs after 1 minute, change the bucket
      if (
        array[currentIndex - 1] != null &&
        !isRepeatedTransaction(currentItem, array[currentIndex - 1])
      ) {
        accumulator.bucket++;
      }
      key = key + accumulator.bucket;
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(currentItem);
      return accumulator;
    },
    {}
  );
  let result = [];
  // Accumulate changes in format required for output
  Object.keys(transactionGroups).forEach((key) => {
    if (
      Array.isArray(transactionGroups[key]) &&
      transactionGroups[key].length > 1
    ) {
      result.push(transactionGroups[key]);
    }
  });
  return result;
};

module.exports = findDuplicateTransactions;
