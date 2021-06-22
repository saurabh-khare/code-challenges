const findDuplicateTransactions = require("../src/exercise2");

describe("test findDuplicateTransactions", () => {
  const transactions = [
    {
      id: 3,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:34:30.000Z",
    },
    {
      id: 1,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:33:00.000Z",
    },
    {
      id: 6,
      sourceAccount: "A",
      targetAccount: "C",
      amount: 250,
      category: "other",
      time: "2018-03-02T10:33:05.000Z",
    },
    {
      id: 4,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:36:00.000Z",
    },
    {
      id: 40,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:36:05.000Z",
    },
    {
      id: 42,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:37:15.000Z",
    },
    {
      id: 44,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:37:45.000Z",
    },
    {
      id: 45,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:37:55.000Z",
    },
    {
      id: 2,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 100,
      category: "eating_out",
      time: "2018-03-02T10:33:50.000Z",
    },
    {
      id: 5,
      sourceAccount: "A",
      targetAccount: "C",
      amount: 250,
      category: "other",
      time: "2018-03-02T10:33:00.000Z",
    },
    {
      id: 9,
      sourceAccount: "A",
      targetAccount: "B",
      amount: 250,
      category: "other",
      time: "2018-03-02T10:33:00.000Z",
    },
  ];
  const result = findDuplicateTransactions(transactions);
  it("should contain atleast one group with 2 transactions with same category, source and target account", () => {
    const group1 = result[0];
    if (group1) {
      const t1 = group1[0];
      const t2 = group1[1];
      expect({
        category: t1.category,
        sourceAccount: t1.sourceAccount,
        targetAccount: t1.targetAccount,
      }).toMatchObject({
        category: t2.category,
        sourceAccount: t2.sourceAccount,
        targetAccount: t2.targetAccount,
      });
    }
  });

  test("duplicate transations which have time difference of less than 1 min", () => {
    const group1 = result[0];
    if (group1) {
      //The group should atleast contain 2 transactions which will be marked
      //duplicate if repeated within a minute
      const transaction1 = group1[0];
      const transaction2 = group1[1];
      expect(
        Math.abs(
          (new Date(transaction1.time) - new Date(transaction2.time)) / 60000
        )
      ).toBeLessThan(1);
    }
  });
});
