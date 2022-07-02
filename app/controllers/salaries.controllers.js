const db = require("../models"),
  Salaries = db.salaries;

exports.postSalaries = (req, res) => {
  const salariesData = [
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-1`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 1,
      amount: req.body.jan,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-2`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 2,
      amount: req.body.feb,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-3`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 3,
      amount: req.body.mar,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-4`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 4,
      amount: req.body.apr,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-5`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 5,
      amount: req.body.may,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-6`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 6,
      amount: req.body.jun,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-7`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 7,
      amount: req.body.jul,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-8`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 8,
      amount: req.body.aug,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-9`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 9,
      amount: req.body.sep,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-10`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 10,
      amount: req.body.oct,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-11`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 11,
      amount: req.body.nov,
      userId: req.body.userId,
    },
    {
      salaryId: `${req.body.companyId} - ${req.body.year}-12`,
      companyId: req.body.companyId,
      year: req.body.year,
      month: 12,
      amount: req.body.dec,
      userId: req.body.userId,
    },
  ];
  Salaries.bulkCreate(salariesData, {
    ignoreDuplicates: true,
  })
    .then(() => {
      res.status(200).send({ message: "Salaries Posted Successfully." });
    })
    .catch((err) => res.status(500).send(err.message));
};
