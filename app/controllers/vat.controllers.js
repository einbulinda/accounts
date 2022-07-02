const db = require("../models"),
  Vat = db.vat;

exports.createVatData = (req, res) => {
  Vat.findOrCreate({
    where: {
      companyId: req.body.companyId,
      year: req.body.year,
      month: req.body.month,
    },
    defaults: {
      // companyId: req.body.companyId,
      // year: req.body.year,
      // month: req.body.month,
      genSales: req.body.genSales,
      reducedSales: req.body.reducedSales,
      zeroSales: req.body.zeroSales,
      exemptSales: req.body.exemptSales,
      genPurchase: req.body.genPurchase,
      reducedPurchases: req.body.reducedPurchases,
      exemptPurchases: req.body.exemptPurchases,
      zeroPurchases: req.body.zeroPurchases,
      userId: req.body.userId,
    },
  })
    .then((vatData) => {
      res.status(200).send(vatData);
    })
    .catch((err) => res.status(500).send(err.message));
};
