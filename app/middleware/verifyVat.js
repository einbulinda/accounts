const db = require("../models"),
  Vat = db.vat;

vatDataExists = (req, res, next) => {
      Vat.findOne()
  }