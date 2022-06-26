module.exports = (sequelize, Sequelize) => {
  const Vat = sequelize.define("vat", {
    companyId: {
      type: Sequelize.INTEGER,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    month: {
      type: Sequelize.INTEGER,
    },
    genSales: {
      type: Sequelize.INTEGER,
    },
    reducedSales: {
      type: Sequelize.INTEGER,
    },
    zeroSales: {
      type: Sequelize.INTEGER,
    },
    exemptSales: {
      type: Sequelize.INTEGER,
    },
    genPurchase: {
      type: Sequelize.INTEGER,
    },
    reducedPurchases: {
      type: Sequelize.INTEGER,
    },
    exemptPurchases: {
      type: Sequelize.INTEGER,
    },
    zeroPurchases: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
  });
  return Vat;
};
