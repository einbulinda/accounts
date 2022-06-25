const express = require("express"),
  cors = require("cors"),
  db = require("./app/models"),
  Role = db.role,
  Category = db.category,
  app = express(),
  { PORT, CLIENT_URL, NODE_ENV, SERVER_URL } = require("./app/constants"),
  path = require("path");

// Production
db.sequelize.sync();

// This is for Dev only :Starts
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop & Resync DB");
//   initial();
//   initialCategories();
// });

// Create 3 rows in DB.
// const initial = () => {
//   Role.create({
//     id: 1,
//     name: "user",
//   });
//   Role.create({
//     id: 2,
//     name: "staff",
//   });
//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// };

// const initialCategories = () => {
//   [
//     "Fixed Assets",
//     "Current Assets",
//     "Accounts Receivable",
//     "Cash",
//     "Current Liabilities",
//     "Accounts Payable",
//     "Equity",
//     "Retained Earnings",
//     "Long Term Liabilities",
//     "Income",
//     "Other Income",
//     "Cost of Sales",
//     "Operating Expenses",
//     "Financial Costs",
//     "Admin Expenses",
//     "Other Expenses",
//   ].forEach((item, index) => {
//     Category.create({ id: index, name: item });
//   });
// };

// This is for Dev only :Ends

// CORS
var whitelist = [CLIENT_URL, SERVER_URL];

var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS..."));
    }
  },
  credentials: true,
};

// Allow cross site requests

if (NODE_ENV === "production") {
  app.use(cors());
} else {
  app.use(cors(corsOptions));
}

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/test.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/account.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ==> ${PORT}`);
});
