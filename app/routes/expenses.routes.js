const { authJwt } = require("../middleware"),
  controller = require("../controllers/expenses.controllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/expense/create",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.createExpense
  );

  app.get(
    "/api/expenses/all-expenses",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.getAllExpenses
  );
};
