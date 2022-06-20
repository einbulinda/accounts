const express = require("express"),
  cors = require("cors"),
  db = require("./app/models"),
  Role = db.role,
  app = express();

require("dotenv").config();

// Production
db.sequelize.sync();

// This is for Dev only :Starts
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop & Resync DB");
  initial();
});

// Create 3 rows in DB.
const initial = () => {
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "staff",
  });
  Role.create({
    id: 3,
    name: "admin",
  });
};

// This is for Dev only :Ends

var corsOptions = {
  origin: "http://localhost:8000",
};

// Allow cross site requests
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) =>
  res.json({ message: "Welcome to Accounts application" })
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ==> ${PORT}`);
});
