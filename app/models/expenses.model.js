module.exports = (sequelize, Sequelize) => {
  const Expenses = sequelize.define("expenses", {
    expenseId: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: undefined,
    },
    companyId: {
      type: Sequelize.INTEGER,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    accountId: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });
  return Expenses;
};
