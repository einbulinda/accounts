module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("accounts_classes", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Category;
};
