module.exports = (sequelize, Sequelize) => {
  const Salaries = sequelize.define("salaries", {
    salaryId: {
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
    month: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });
  return Salaries;
};
