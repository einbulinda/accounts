const { profile } = require("../models"),
  db = require("../models"),
  Profile = db.profile;

exports.createProfile = (req, res) => {
  Profile.create({
    companyName: req.body.companyName,
    kraPin: req.body.kraPin,
    companyType: req.body.companyType,
    yearEnd: req.body.yearEnd,
    totalShares: req.body.totalShares,
    paidShares: req.body.paidShares,
    nominalValue: req.body.nominalValue,
    userId: req.body.userId,
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
