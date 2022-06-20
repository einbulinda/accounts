const express = require("express"),
  cors = require("cors"),
  app = express();

require("dotenv").config();

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
