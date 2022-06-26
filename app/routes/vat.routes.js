const { authJwt } = require("../middleware"),
  controller = require("../controllers/vat.controllers");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/vat/create",
    [authJwt.verifyToken, authJwt.isStaffOrAdmin],
    controller.createVatData
  );
};
