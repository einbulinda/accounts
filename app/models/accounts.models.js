module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("chart_of_accounts", {
    accountName: { type: Sequelize.STRING },
    mainAccount: { type: Sequelize.STRING },
    category: { type: Sequelize.STRING },
  });

  return Account;
};
