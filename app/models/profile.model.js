module.exports = (sequelize, Sequelize) => {
  const CompanyProfile = sequelize.define("company_profile", {
    companyName: {
      type: Sequelize.STRING,
    },
    kraPin: {
      type: Sequelize.STRING,
    },
    companyType: {
      type: Sequelize.STRING,
    },
    yearEnd: {
      type: Sequelize.INTEGER,
    },
    totalShares: {
      type: Sequelize.INTEGER,
    },
    paidShares: {
      type: Sequelize.INTEGER,
    },
    nominalValue: {
      type: Sequelize.INTEGER,
    },
  });

  return CompanyProfile;
};
