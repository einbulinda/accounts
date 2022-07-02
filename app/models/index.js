const config = require("../config/db.config"),
  Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./roles.model")(sequelize, Sequelize);
db.profile = require("./profile.model")(sequelize, Sequelize);
db.account = require("./accounts.models")(sequelize, Sequelize);
db.category = require("./categories.models")(sequelize, Sequelize);
db.vat = require("./vat.models")(sequelize, Sequelize);
db.salaries = require("./salaries.models")(sequelize, Sequelize);

// Relationship between roles and users is many to many
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

// A user can have many companies
db.user.hasMany(db.profile, {
  foreignKey: "userId",
});
db.profile.belongsTo(db.user);

// Chart of Accounts
db.user.hasMany(db.account, {
  foreignKey: "userId",
});
db.account.belongsTo(db.user);

// relationship between accounts and categories
db.category.belongsToMany(db.account, {
  through: "account_category",
  foreignKey: "categoryId",
  otherKey: "accountId",
});

db.account.belongsToMany(db.category, {
  through: "account_category",
  foreignKey: "accountId",
  otherKey: "categoryId",
});

// VAT Table relationships
// db.profile.hasMany(db.vat, { foreignKey: "companyId" });
// db.vat.belongsTo(db.profile);

// Define available roles options
db.ROLES = ["user", "admin", "staff"];

// Define Available Categories
db.CATEGORIES = [
  "Fixed Assets",
  "Current Assets",
  "Accounts Receivable",
  "Cash",
  "Current Liabilities",
  "Accounts Payable",
  "Equity",
  "Retained Earnings",
  "Long Term Liabilities",
  "Income",
  "Other Income",
  "Cost of Sales",
  "Operating Expenses",
  "Financial Costs",
  "Admin Expenses",
  "Other Expenses",
];

module.exports = db;
