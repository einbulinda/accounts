const express = require("express"),
  cors = require("cors"),
  db = require("./app/models"),
  Role = db.role,
  app = express();

require("dotenv").config();

// Production
db.sequelize.sync();

// This is for Dev only :Starts
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop & Resync DB");
//   initial();
// });

// // Create 3 rows in DB.
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

// This is for Dev only :Ends

// CORS
var whitelist = ["http://localhost:3000", "http://localhost:8080"];

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
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) =>
  res.json({ message: "Welcome to Accounts application" })
);
require("./app/routes/auth.routes")(app);
require("./app/routes/test.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ==> ${PORT}`);
});
