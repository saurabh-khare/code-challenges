const getBalanceByCategoryInPeriod =
  require("../src/index").getBalanceByCategoryInPeriod;

describe("test exercise 1", () => {
  it("should return 0 if there are no transactions", () => {
    const result = getBalanceByCategoryInPeriod(
      [],
      "groceries",
      new Date("2019-03-01"),
      new Date("2019-03-31")
    );
    expect(result).toBe(0);
  });

  it("should return 321 for balance in beauty category", () => {
    const transactions = [
      {
        id: 1,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: -30,
        category: "eating_out",
        time: "2018-03-12T12:34:00Z",
      },
      {
        id: 4,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: -60,
        category: "eating_out",
        time: "2018-09-16",
      },

      {
        id: 2,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: 300,
        category: "beauty",
        time: "2018-09-15T12:34:00Z",
      },

      {
        id: 3,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: 21,
        category: "beauty",
        time: "2018-09-18T11:34:00Z",
      },
    ];
    const result = getBalanceByCategoryInPeriod(
      transactions,
      "beauty",
      new Date("2018-09-14"),
      new Date("2018-09-19")
    );
    expect(result).toBe(321);
  });

  it("returns calculated balance for 'groceries' category until and not including 2019-07-31", () => {
    const transactions = [
      {
        id: 1,
        sourceAccount: "my_account",
        targetAccount: "coffee_shop",
        amount: -100,
        category: "groceries",
        time: "2019-07-31T00:00:00Z",
      },
      {
        id: 2,
        sourceAccount: "my_account",
        targetAccount: "restaurant",
        amount: -50,
        category: "groceries",
        time: "2019-07-31T00:00:01Z",
      },
      {
        id: 3,
        sourceAccount: "klarna",
        targetAccount: "my_account",
        amount: 25000,
        category: "groceries",
        time: "2019-06-30T23:59:59Z",
      },
      {
        id: 4,
        sourceAccount: "mini_market",
        targetAccount: "my_account",
        amount: 200,
        category: "groceries",
        time: "2019-07-31T10:27:00Z",
      },
      {
        id: 5,
        sourceAccount: "my_account",
        targetAccount: "mini_market",
        amount: -75,
        category: "groceries",
        time: "2019-07-30T10:27:00Z",
      },
    ];
    const result = getBalanceByCategoryInPeriod(
      transactions,
      "groceries",
      new Date("2019-07-01T00:00:00Z"),
      new Date("2019-07-31T00:00:00Z")
    );
    expect(result).toBe(-75);
  });
});
