const { authJwt } = require("../middleware"),
  controller = require("../controllers/account.controllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/accounts/create",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.createAccount
  );

  app.get(
    "/api/accounts/categories",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.getCategories
  );

  app.get(
    "/api/accounts/all-accounts",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.getAllAccounts
  );
};
