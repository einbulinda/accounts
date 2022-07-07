const db = require("../models"),
  Expenses = db.expenses;

exports.createExpense = (req, res) => {
  const { companyId, year, userId, accountId, amount } = req.body;
  const expenseId = `${companyId}-${year}-${accountId}`;
  Expenses.findOrCreate({
    where: { expenseId: expenseId },
    defaults: {
      expenseId: expenseId,
      companyId: companyId,
      year: year,
      accountId: accountId,
      amount: amount,
      userId: userId,
    },
  })
    .then((expenses) => res.status(200).send(expenses))
    .catch((err) => res.status(500).send(err.message));
};

exports.getAllExpenses = (req, res) => {
  Expenses.findAll()
    .then((allExpenses) => res.status(200).send(allExpenses))
    .catch((err) => res.status(500).send(err.message));
};
