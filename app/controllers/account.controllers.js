const { response } = require("express");

const db = require("../models"),
  Category = db.category,
  Account = db.account;

exports.getCategories = (req, res) => {
  Category.findAll()
    .then((category) => {
      res.status(200).send({ category });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.getAllAccounts = (req, res) => {
  Account.findAll().then((response) => {
    res.status(200).send({ response });
  });
};

exports.createAccount = (req, res) => {
  Account.create({
    accountName: req.body.accountName,
    mainAccount: req.body.mainAccount,
    category: req.body.category,
    userId: req.body.userId,
  })
    .then((account) => res.status(200).send(account))
    .catch((err) => res.status(500).send({ message: err.message }));
};
